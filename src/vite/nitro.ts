import type { VitePWAStrategy } from '@unplugin-pwa/core'
import type { SWType } from '@vite-pwa/workbox-build/types'
import type { PluginOption } from 'vite'
import type { TanStackPWAOptions } from '../types.ts'
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
import { createTanStackNitroPWAContext } from '../create-nitro-pwa-context.ts'
import { NitroConfigurationPlugin } from './nitro/config.ts'

export function TanStackNitroPWAPlugin<
  UserStrategy extends VitePWAStrategy,
  T extends SWType,
>(
  options: Partial<TanStackPWAOptions<UserStrategy, T>> = {},
): PluginOption[] {
  const ctx = createTanStackNitroPWAContext(
    options,
  )

  return [
    NitroConfigurationPlugin(ctx),
    MainPlugin(ctx),
    VirtualModulesPlugin(ctx),
    InfoPlugin(ctx),
    DevPlugin(ctx),
    DevMiddlewarePlugin(ctx),
    DevAssetsMiddlewarePlugin(ctx),
    AssetsPlugin(ctx),
    BuildPwaAssetsPlugin(ctx),
    DevtoolsPlugin(ctx),
    InspectorPlugin(ctx),
  ]
}
