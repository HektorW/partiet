import { getRegistration } from '../registration'
import urlBase64ToUint8Array from '../../utils/urlBase64ToUint8Array'

export const getSubscription = () =>
  getRegistration().then(swRegistration =>
    swRegistration.pushManager.getSubscription().then(subscription => {
      if (!subscription) {
        throw new Error('No existing web push subscription')
      }
      return subscription
    })
  )

export const subscribe = publicVapidKey =>
  getRegistration().then(swRegistration =>
    swRegistration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    })
  )

export const unsubscribe = () =>
  getSubscription().then(subscription => subscription.unsubscribe())
