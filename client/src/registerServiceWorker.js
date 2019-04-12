import { post } from './api'

const serviceWorkerUrl = 'service-worker.js'

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')
  const rawData = window.atob(base64)
  return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)))
}

export default function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    return
  }

  if (!('PushManager' in window)) {
    return
  }

  return navigator.serviceWorker
    .register(serviceWorkerUrl)
    .then(
      registration => {
        const subscriptionOptions = {
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(
            'BKPhZ--aJN_GTO0rEp1sFOa3PW-UIsTjetRr7FUJ7pg0lbP7PBiOn2wfckf1PeEsPcodUQ1mubujzSElHSnKO4c'
          )
        }

        return registration.pushManager.subscribe(subscriptionOptions)
      },
      error => console.error('Failed to register service worker', error)
    )
    .then(async subscription => {
      const result = await post('/api/push-subscription/add', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          subscription
        })
      })

      console.log(result)
    })
}
