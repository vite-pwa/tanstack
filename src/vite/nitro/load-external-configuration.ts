import type { VitePWAStrategy } from '@unplugin-pwa/core'
import type { SWType } from '@vite-pwa/workbox-build/types'
import type { TanStackNitroPWAContext } from '../../create-nitro-pwa-context.ts'
import path from 'node:path'
import process from 'node:process'
import { resolvePwaConfiguration } from '@unplugin-pwa/core/config'
import { normalizePath } from '@vite-pwa/workbox-build/utils/resolve-sw-names'

export async function loadExternalConfiguration<
  UserStrategy extends VitePWAStrategy,
  T extends SWType,
>(
  ctx: TanStackNitroPWAContext<UserStrategy, T>,
): Promise<void> {
  const resolvedOptions = await resolvePwaConfiguration(
    ctx.consumerOptions ?? {},
    {
      isDev: false,
      isWrongInjectManifest: (swSrc) => {
        // nitro will check for public folder
        const swSrcDir = normalizePath(path.dirname(swSrc))
        const publicDir = normalizePath(path.resolve(process.cwd(), 'public'))

        return !(swSrcDir === publicDir)
      },
    },
  )
  Object.assign(ctx, { resolvedOptions })
}
