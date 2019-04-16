const webPush = require('web-push')
const config = require('../../config')
const { removePushSubscriptionById } = require('../db/models/push-subscription')

webPush.setVapidDetails(
  config.vapidSubject,
  config.vapidPublicKey,
  config.vapidPrivateKey
)

module.exports = async function sendPushNotification(
  subscriptionModel,
  notificationData,
  options
) {
  const subscriptionInfo = JSON.parse(subscriptionModel.subscriptionJson)
  try {
    await webPush.sendNotification(
      subscriptionInfo,
      JSON.stringify(notificationData),
      options
    )
  } catch (error) {
    console.error('failed to send push notification', {
      subscription: subscriptionModel.id,
      error
    })

    if (error.statusCode === 404 || error.statusCode === 410) {
      console.log('removing subscription', {
        subscription: subscriptionModel.id
      })
      await removePushSubscriptionById(subscriptionModel.id)
    }

    throw error
  }
}
