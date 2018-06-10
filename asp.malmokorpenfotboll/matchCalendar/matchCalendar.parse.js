const firstMatchTableIndex = 2

module.exports = function parseMatcheCalendar($) {
  const $tables = $('#pData table').slice(firstMatchTableIndex)
  const matchCount = $tables.length / 3

  const matches = []
  for (let i = 0; i < matchCount; i++) {
    const matchStartIndex = i * 3
    const $dateTable = $tables.eq(matchStartIndex)
    const $contentTable = $tables.eq(matchStartIndex + 2)
    matches.push(parseMatch($dateTable, $contentTable))
  }

  return matches
}

const parseMatch = ($dateTable, $contentTable) => {
  const date = parseDate($dateTable)
  const { hours, minutes } = parseTime($contentTable)
  date.setUTCHours(hours, minutes)

  return {
    date,
    ...parseTeams($contentTable),
    result: parseResult($contentTable),
    matchField: parseMatchField($contentTable),
    referee: parseReferee($contentTable)
  }
}

const parseDate = $dateTable => {
  const swedishMonths = [
    'januari',
    'februari',
    'mars',
    'april',
    'maj',
    'juni',
    'juli',
    'augusti',
    'september',
    'oktober',
    'november',
    'december'
  ]

  const [, dateStr] = $dateTable.text().split(',')

  const [dayStr, monthStr, yearStr] = dateStr
    .trim()
    .toLowerCase()
    .split(' ')

  const utcDate = Date.UTC(
    parseInt(yearStr, 10),
    swedishMonths.indexOf(monthStr),
    parseInt(dayStr, 10)
  )

  return new Date(utcDate)
}

const parseTime = $contentTable => {
  const timeStr = $contentTable
    .find('font')
    .eq(0)
    .text()
  const [hours, minutes] = timeStr.split(':')
  return { hours, minutes }
}

const parseTeams = $contentTable => {
  const [, ...rest] = $contentTable
    .find('b')
    .eq(0)
    .text()
    .trim()
    .split(/\s+/)

  const [teamA, teamB] = rest.join(' ').split('-')

  return { teamA: teamA.trim(), teamB: teamB.trim() }
}

const parseResult = $contentTable => {
  const text = $contentTable.text()
  if (text.indexOf('Resultat:') !== -1) {
    const [, score, teamAScore, teamBScore] = text.match(
      /Resultat:\s*((\d+) - (\d+))/
    )
    return { score, teamAScore, teamBScore }
  }

  return null
}

const parseMatchField = $contentTable => {
  const text = $contentTable.text()
  if (text.indexOf('Mellanhedens IP') !== -1) {
    const [matchField] = text.match(/Mellanhedens IP [AB]/)
    return matchField
  }

  return null
}

const parseReferee = $contentTable => {
  const text = $contentTable.text()
  if (text.indexOf('Domare:') !== -1) {
    const [, referee] = text.match(/Domare:\s+((?:\w+\s)+)/)
    return referee.trim()
  }

  return null
}
