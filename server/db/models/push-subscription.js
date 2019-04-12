const db = require('../index')
const createTable = require('./utils/createTable')
const { createModelCamelCaser } = require('./utils/camelCaseModel')

const tableName = (exports.tableName = 'push_subscription')

const tableColumnDefinitions = [
  'id SERIAL PRIMARY KEY',
  'subscriptionJson TEXT',
  'subscribeDate TIMESTAMP DEFAULT now()'
]

const { camelCaseAll } = createModelCamelCaser(tableColumnDefinitions)

exports.setup = () => createTable(db, tableName, tableColumnDefinitions)

const subscriptionToJson = subscription => JSON.stringify(subscription)

exports.addPushSubscription = async subscription => {
  const subscriptionJson = subscriptionToJson(subscription)

  const selectQuery = `SELECT id FROM ${tableName} WHERE subscriptionJson = $1`
  const selectValues = [subscriptionJson]
  const existingId = await db.get(selectQuery, selectValues)

  if (existingId) {
    return
  }

  const insertColumns = ['subscriptionJson']
  const insertValues = [subscriptionJson]
  await db.insert(tableName, insertColumns, insertValues)
}

exports.removePushSubscription = async subscription => {
  const subscriptionJson = subscriptionToJson(subscription)

  const query = `DELETE FROM ${tableName} WHERE subscriptionJson = $1`
  const values = [subscriptionJson]

  return db.run(query, values)
}

exports.getAllPushSubscriptions = async () => {
  const query = `SELECT * from ${tableName}`
  return db.all(query).then(camelCaseAll)
}
