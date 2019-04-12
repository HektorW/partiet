const db = require('../index')
const createTable = require('./utils/createTable')
const { createModelCamelCaser } = require('./utils/camelCaseModel')

const tableName = (exports.tableName = 'league')

const tableColumnDefinitions = ['id INTEGER PRIMARY KEY', 'mainTeamId INTEGER']

const { camelCaseAll } = createModelCamelCaser(tableColumnDefinitions)

exports.setup = () => createTable(db, tableName, tableColumnDefinitions)

exports.addLeague = (leagueId, mainTeamId) => {
  const columns = ['id', 'mainTeamId']
  const values = [leagueId, mainTeamId]

  return db.insert(tableName, columns, values)
}

exports.getAllActiveLeagues = async () => {
  const query = `SELECT * from ${tableName}`
  return db.all(query).then(camelCaseAll)
}
