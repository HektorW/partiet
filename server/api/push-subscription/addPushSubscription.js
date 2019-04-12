const pushSubscriptionModel = require('../../db/models/push-subscription')

module.exports = async function addPushSubscription(ctx) {
  const { subscription } = ctx.request.body

  await pushSubscriptionModel.addPushSubscription(subscription)

  ctx.body = { success: true }
}
