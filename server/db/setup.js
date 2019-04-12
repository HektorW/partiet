const db = require('./postgres')
const leagueModel = require('./models/league')
const pushSubscriptionModel = require('./models/push-subscription')
const matchNotificationModel = require('./models/match-notification')

module.exports = function setupDb() {
  return db
    .setup()
    .then(() => leagueModel.setup(db))
    .then(() => pushSubscriptionModel.setup(db))
    .then(() => matchNotificationModel.setup(db))
    .then(() => console.log('Database and models setup'))
}
