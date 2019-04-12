const createTable = require('./utils/createTable')
const pushSubscription = require('./push-subscription')

const tableName = 'match_notification'

const tableColumns = [
  'id SERIAL PRIMARY KEY',
  `pushSubscriptionId INTEGER REFERENCES ${pushSubscription.tableName}`,
  'matchId TEXT',
  'sentDate TIMESTAMP DEFAULT now()',
  'failedDate TIMESTAMP'
]

exports.setup = db => {
  return createTable(db, tableName, tableColumns)
}
