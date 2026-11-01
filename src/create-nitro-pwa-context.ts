import type { VitePWAStrategy } from '@unplugin-pwa/core'
import type { SWType } from '@vite-pwa/workbox-build/types'
import type { Nitro } from 'nitro/types'
import type { TanStackPWAContext } from './create-pwa-context.ts'
import type { TanStackPWAOptions } from './types.ts'
import { createTanStackPWAContext } from './create-pwa-context.ts'

export type TanStackNitroPWAContext<
  UserStrategy extends VitePWAStrategy,
  T extends SWType,
> = Omit<TanStackPWAContext<UserStrategy, T>, 'tanstack'> & {
  tanstack: {
    /**
     * The nitro instance.
     */
    nitro: Nitro
    /**
     * Alias for `build-sw` strategy: will use nitro alias once all modules configured.
     */
    buildSWAlias: Record<string, string>
  }
}

export function createTanStackNitroPWAContext<
  UserStrategy extends VitePWAStrategy,
  T extends SWType,
>(
  options: Partial<TanStackPWAOptions<UserStrategy, T>>,
): TanStackNitroPWAContext<UserStrategy, T> {
  return Object.assign(
    createTanStackPWAContext<UserStrategy, T>(options),
    {
      tanstack: {
        nitro: undefined!,
        buildSWAlias: {},
      },
    },
  )
}
