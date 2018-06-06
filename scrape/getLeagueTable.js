const rootUrl = 'http://asp.malmokorpenfotboll.com/matchtabell.aspx'
const teamName = 'Partiet'

module.exports = function getLeagueTable(leagueId) {
  const steps = [
    {
      url: `${rootUrl}?cup=${leagueId}`
    },
    {
      url: rootUrl
    },
    {
      method: 'POST',
      optionValue: teamName,
      callback: ($html, form) => {
        const $listOptions = $html.find('#cmbLag option')
        const teamOption = $listOptions.filter(
          (index, option) => option.innerText === teamName
        )[0]
        form.append('cmbLag', teamOption.value)
        form.append('buttonValjLag', 'Välj')
      }
    }
  ]
}
