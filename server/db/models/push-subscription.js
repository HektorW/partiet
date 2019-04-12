const createTable = require('./utils/createTable')

const tableName = (exports.tableName = 'push_subscription')

const tableColumns = [
  'id SERIAL PRIMARY KEY',
  'subscriptionJson TEXT',
  'subscribeDate TIMESTAMP DEFAULT now()'
]

exports.setup = db => createTable(db, tableName, tableColumns)
