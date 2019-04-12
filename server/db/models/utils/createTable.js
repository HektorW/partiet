module.exports = function createTable(db, tableName, tableColumns) {
  return db.run(
    `CREATE TABLE IF NOT EXISTS ${tableName} (${tableColumns.join(', ')})`
  )
}
