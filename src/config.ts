import type { VitePWAStrategy } from '@unplugin-pwa/core'
import type { ExternalPWAOptions } from '@unplugin-pwa/vite/config/types'
import type { SWType } from '@vite-pwa/workbox-build/types'
import type { TanStackPWAOptions } from './types.ts'

export type TanStackExternalPWAOptions<
  UserStrategy extends VitePWAStrategy,
  T extends SWType,
> = ExternalPWAOptions<UserStrategy, T, TanStackPWAOptions<UserStrategy, T>>

export function definePwaConfig<
  UserStrategy extends VitePWAStrategy,
  T extends SWType,
>(
  config: Partial<TanStackExternalPWAOptions<UserStrategy, T>>,
): Partial<TanStackExternalPWAOptions<UserStrategy, T>> {
  return config
}
