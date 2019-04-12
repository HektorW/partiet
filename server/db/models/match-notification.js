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

exports.setup = () => createTable(db, tableName, tableColumnDefinitions)

exports.getNotificationsForSubscription = subscriptionId => {
  const query = `SELECT * from ${tableName} WHERE pushSubscriptionId = $1`
  const values = [subscriptionId]
  return db.all(query, values).then(camelCaseAll)
}

exports.addNotification = (subscriptionId, matchId) => {
  const columns = ['pushSubscriptionId', 'matchId']
  const values = [subscriptionId, matchId]
  return db.insert(tableName, columns, values)
}
