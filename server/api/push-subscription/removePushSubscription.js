const pushSubscriptionModel = require('../../db/models/push-subscription')

module.exports = async function removePushSubscription(ctx) {
  const { subscription } = ctx.request.body

  await pushSubscriptionModel.removePushSubscription(subscription)

  ctx.body = { success: true }
}
