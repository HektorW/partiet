const db = require('../index')
const createTable = require('./utils/createTable')
const { createModelCamelCaser } = require('./utils/camelCaseModel')
const pushSubscription = require('./push-subscription')

const tableName = 'match_notification'

const tableColumnDefinitions = [
  'id SERIAL PRIMARY KEY',
  `pushSubscriptionId INTEGER REFERENCES ${pushSubscription.tableName}`,
  'matchId INTEGER',
  'sentDate TIMESTAMP DEFAULT now()',
  'failedDate TIMESTAMP'
]

const { camelCaseAll } = createModelCamelCaser(tableColumnDefinitions)

const log = (...args) => console.log(tableName, ...args)

exports.setup = () =>
  createTable(db, tableName, tableColumnDefinitions).then(() =>
    log('model setup')
  )

exports.getNotificationsForSubscription = subscriptionId => {
  const query = `SELECT * from ${tableName} WHERE pushSubscriptionId = $1`
  const values = [subscriptionId]
  return db.all(query, values).then(camelCaseAll)
}

exports.addNotification = async (subscriptionId, matchId) => {
  log('addNotification', { subscriptionId, matchId })

  const columns = ['pushSubscriptionId', 'matchId']
  const values = [subscriptionId, matchId]

  const notificationId = await db.insert(tableName, columns, values)

  log('addNotification - successfull', {
    subscriptionId,
    matchId,
    notificationId
  })

  return notificationId
}

exports.removeNotificationsForSubscription = subscriptionId => {
  log('removeNotificationsForSubscription', { subscriptionId })

  const query = `DELETE FROM ${tableName} WHERE pushSubscriptionId = $1`
  const values = [subscriptionId]

  return db.run(query, values)
}
