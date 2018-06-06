const fetch = require('node-fetch')
const { parse: parseCookie } = require('cookie')
const cheerio = require('cheerio')
const FormData = require('form-data')

module.exports = async function fetchTable(
  tableUrl,
  queryKey,
  leagueId,
  teamName
) {
  let response = await fetch(`${tableUrl}?${queryKey}=${leagueId}`)

  let cookie = `ASP.NET_SessionId=${
    parseCookie(response.headers.get('set-cookie'))['ASP.NET_SessionId']
  }`

  response = await fetch(tableUrl, {
    headers: { cookie }
  })

  let $ = cheerio.load(await response.text())

  let form = new FormData()
  form.append('__VIEWSTATE', $('#__VIEWSTATE').val())
  form.append('__EVENTVALIDATION', $('#__EVENTVALIDATION').val())

  const $teamOption = $('#cmbLag option')
    .filter((index, optionEl) => {
      return (
        $(optionEl)
          .text()
          .toLowerCase() === teamName.toLowerCase()
      )
    })
    .eq(0)

  form.append('cmbLag', $teamOption.val())
  form.append('buttonValjLag', 'Välj')

  response = await fetch(tableUrl, {
    method: 'post',
    body: form,
    headers: { cookie }
  })

  $ = cheerio.load(await response.text())

  return parseTable($)
}

const parseTable = $ => {
  const $tables = $('#pData table').slice(3)

  let lastTeamIndex = $tables.length - 1
  for (let i = 0; i < $tables.length; i++) {
    const $table = $tables.eq(i)
    const leaguePosition = parseInt(
      $table
        .find('td')
        .eq(0)
        .text(),
      10
    )

    console.log(
      $table
        .find('td')
        .eq(1)
        .text()
    )

    if (typeof leaguePosition !== 'number' || Number.isNaN(leaguePosition)) {
      lastTeamIndex = i - 1
      break
    }
  }

  return $tables
    .slice(0, lastTeamIndex)
    .map((index, element) => {
      const $tds = $(element).find('td')
      const [scoredGoals, concededGoals] = $tds
        .eq(6)
        .text()
        .split(' - ')

      return {
        position: parseInt($tds.eq(0).text(), 10),
        name: $tds.eq(1).text(),
        played: parseInt($tds.eq(2).text(), 10),
        won: parseInt($tds.eq(3).text(), 10),
        draw: parseInt($tds.eq(4).text(), 10),
        lost: parseInt($tds.eq(5).text(), 10),
        scored: parseInt(scoredGoals, 10),
        conceded: parseInt(concededGoals, 10),
        points: parseInt($tds.eq(7).text(), 10)
      }
    })
    .get()
}
