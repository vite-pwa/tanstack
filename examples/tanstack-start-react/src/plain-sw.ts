/// <reference types="vite/client" />
/// <reference lib="webworker" />

import { clientsClaim } from '@vite-pwa/workbox-swkit/core'
import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from '@vite-pwa/workbox-swkit/precaching'
import { NavigationRoute, registerRoute } from '@vite-pwa/workbox-swkit/routing'
import { hello, sayHello } from './sw-helper'

// eslint-disable-next-line no-console
console.log(hello)
// eslint-disable-next-line no-console
console.log(sayHello('from SW'))

declare let self: ServiceWorkerGlobalScope

/// self.__WB_MANIFEST is the default injection point
const manifest = self.__WB_MANIFEST
if (import.meta.env.DEV) {
  const entry = manifest.findIndex(entry => typeof entry !== 'string' && entry.url === '/')
  if (entry !== -1)
    manifest.splice(entry, 1)

  // add the navigateFallback to the manifest
  manifest.push({
    url: '/',
    revision: Math.random().toString(),
  })
}

precacheAndRoute(manifest, {
  parallel: { enabled: true, concurrency: 5 },
})

// clean old assets
cleanupOutdatedCaches()

let allowlist: RegExp[] | undefined
// in dev mode, we disable precaching to avoid caching issues
if (import.meta.env.DEV) {
  allowlist = [/^\/$/]
}

// to allow work offline
registerRoute(new NavigationRoute(
  createHandlerBoundToURL('/'),
  { allowlist },
))

self.skipWaiting()
clientsClaim()
