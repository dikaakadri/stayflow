'use client';

import { useEffect } from 'react';

// Bump this version string every deploy to force SW refresh on all devices
const SW_VERSION = 'v3';
const SW_VERSION_KEY = 'stayflow-sw-version';

export function ServiceWorkerRegister() {
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;

    const run = async () => {
      try {
        const registrations = await navigator.serviceWorker.getRegistrations();
        const lastVersion = localStorage.getItem(SW_VERSION_KEY);

        // If version mismatch — unregister ALL old SWs first, then re-register fresh
        if (lastVersion !== SW_VERSION && registrations.length > 0) {
          console.log('[SW] Version mismatch, unregistering old SWs...');
          await Promise.all(registrations.map((r) => r.unregister()));

          // Also nuke all old caches
          const cacheKeys = await caches.keys();
          await Promise.all(cacheKeys.map((key) => caches.delete(key)));

          console.log('[SW] All old caches cleared.');
        }

        // Register fresh SW
        await navigator.serviceWorker.register('/sw.js', { updateViaCache: 'none' });
        localStorage.setItem(SW_VERSION_KEY, SW_VERSION);
        console.log('[SW] Registered successfully.');
      } catch (err) {
        console.warn('[SW] Registration failed:', err);
      }
    };

    run();
  }, []);

  return null;
}
