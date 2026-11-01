import { fileURLToPath } from 'node:url'
import { defineConfig } from 'tsdown'

const cwd = fileURLToPath(new URL('.', import.meta.url))

export async function cleanupDistFiles(patterns: string | string[]) {
  const [fs, path] = await Promise.all([
    import('node:fs/promises'),
    import('node:path'),
  ])
  const dir = fs.glob(patterns, {
    withFileTypes: true,
    cwd: path.resolve(cwd, 'dist'),
  })

  for await (const file of dir) {
    await fs.rm(path.resolve(file.parentPath, file.name), { force: true })
  }
}

export async function cleanupJSTypes() {
  await cleanupDistFiles(['**/types.{js,mjs}'])
}

export default defineConfig({
  entry: [
    'src/config.ts',
    'src/create-nitro-pwa-context.ts',
    'src/create-pwa-context.ts',
    'src/index.ts',
    'src/types.ts',
    {
      'vite/*': ['./src/vite/*'],
      'vite/nitro/*': [
        './src/vite/nitro/*',
        '!./src/vite/nitro/load-external-configuration.ts',
      ],
    },
    {
      'react-components': './src/react-components/index.ts',
    },
  ],
  platform: 'node',
  dts: true,
  attw: {
    level: 'error',
    profile: 'esm-only',
  },
  publint: true,
  deps: {
    neverBundle: [
      'react',
      'react-jsx-runtime',
      'react-dom',
      'vite',
      'rolldown',
      'magicast',
      'nitro',
      '@unplugin-pwa/core',
      '@unplugin-pwa/inspector',
      '@unplugin-pwa/vite',
      '@vite-pwa/workbox-window',
      '@vite-pwa/workbox-build',
      'virtual:pwa-info',
      'virtual:pwa-assets/head',
      '@vite-pwa/workbox/swkit/core',
      '@vite-pwa/workbox/swkit/precaching',
      '@vite-pwa/workbox/swkit/routing',
    ],
  },
  hooks: {
    'build:done': async () => {
      await cleanupJSTypes()
    },
  },
})
