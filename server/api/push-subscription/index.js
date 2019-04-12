const Router = require('koa-router')

const pushSubscriptionRoutes = new Router()

pushSubscriptionRoutes.post('/add', require('./addPushSubscription'))
pushSubscriptionRoutes.delete('/remove', require('./removePushSubscription'))

module.exports = pushSubscriptionRoutes
