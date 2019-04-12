const createTable = require('./utils/createTable')

const tableName = (exports.tableName = 'league')

const tableColumns = ['id INTEGER PRIMARY KEY', 'mainTeamId INTEGER']

exports.setup = db => {
  return createTable(db, tableName, tableColumns)
}

exports.addLeague = (db, leagueId, mainTeamId) => {
  const columns = ['id', 'mainTeamId']
  const values = [leagueId, mainTeamId]

  return db.insert(tableName, columns, values)
}
