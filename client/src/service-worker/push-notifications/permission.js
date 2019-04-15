import { isPushSupported } from '../feature-support'

const PERMISSION_GRANTED = 'granted'
const PERMISSION_DENIED = 'denied'

export const requestPushPermission = async () => {
  if (isPushSupported === false) {
    throw new Error('Web Push is not supported')
  }

  const result = await new Promise((resolve, reject) => {
    const permissionPromise = window.Notification.requestPermission(result => {
      resolve(result)
    })

    if (permissionPromise) {
      permissionPromise.then(resolve, reject)
    }
  })

  if (result !== PERMISSION_GRANTED) {
    throw new Error('Permission was not granted to send push notifications')
  }
}

export const isPermissionGranted = () =>
  window.Notification.permission === PERMISSION_GRANTED

export const isPermissionDenied = () =>
  window.Notification.permission === PERMISSION_DENIED
