import type { VitePWAStrategy } from '@unplugin-pwa/core'
import type { SWType } from '@vite-pwa/workbox-build/types'
import type { PluginOption } from 'vite'
import type { TanStackPWAOptions } from './types'
import { BuildPwaAssetsPlugin } from '@unplugin-pwa/vite/plugins/build-pwa-assets'
import { DevPlugin } from '@unplugin-pwa/vite/plugins/dev'
import { DevMiddlewarePlugin } from '@unplugin-pwa/vite/plugins/dev-middleware'
import { DevAssetsMiddlewarePlugin } from '@unplugin-pwa/vite/plugins/dev-pwa-assets-middleware'
import { DevtoolsPlugin } from '@unplugin-pwa/vite/plugins/devtools'
import { InfoPlugin } from '@unplugin-pwa/vite/plugins/info'
import { InspectorPlugin } from '@unplugin-pwa/vite/plugins/inspector'
import { MainPlugin } from '@unplugin-pwa/vite/plugins/main'
import { AssetsPlugin } from '@unplugin-pwa/vite/plugins/pwa-assets'
import { VirtualModulesPlugin } from '@unplugin-pwa/vite/plugins/virtual-modules'
import { createTanStackPWAContext } from './create-pwa-context.ts'
import { BuildSWPlugin } from './vite/build-sw.ts'

export function TanStackVitePWAPlugin<
  UserStrategy extends VitePWAStrategy,
  T extends SWType,
>(
  options: Partial<TanStackPWAOptions<UserStrategy, T>> = {},
): PluginOption[] {
  const ctx = createTanStackPWAContext(
    options,
  )

  return [
    MainPlugin(ctx),
    VirtualModulesPlugin(ctx),
    InfoPlugin(ctx),
    DevPlugin(ctx),
    DevMiddlewarePlugin(ctx),
    DevAssetsMiddlewarePlugin(ctx),
    AssetsPlugin(ctx),
    BuildPwaAssetsPlugin(ctx),
    BuildSWPlugin(ctx),
    DevtoolsPlugin(ctx),
    InspectorPlugin(ctx),
  ]
}
