import type { VitePWAOptions, VitePWAStrategy } from '@unplugin-pwa/core'
import type { SWType } from '@vite-pwa/workbox-build/types'

export type TanStackPWAOptions<
  UserStrategy extends VitePWAStrategy,
  T extends SWType,
> = Omit<VitePWAOptions<UserStrategy, T>, 'injectRegister'> & {
  injectRegister: false
}
