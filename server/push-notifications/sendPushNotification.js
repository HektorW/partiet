const webPush = require('web-push')
const config = require('../../config')

webPush.setVapidDetails(
  config.vapidSubject,
  config.vapidPublicKey,
  config.vapidPrivateKey
)

module.exports = function sendPushNotification(
  subscriptionModel,
  notificationData,
  options
) {
  const subscription = JSON.parse(subscriptionModel.subscriptionJson)
  return webPush.sendNotification(
    subscription,
    JSON.stringify(notificationData),
    options
  )
}
