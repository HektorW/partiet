# Tables

## League

* Id
* PartietId

## TeamMatch

* Id
* LeagueId
* Date
* Result
* TeamA
* TeamB
* HasNotified

## UserSubscription

* Id
* ServiceUrl
* SubscribeDate

## SentMatchNotification

* MatchId
* UserSubscriptionId
* SentDate
* FailedDate

```js
const isMoreThanXDaysAgo = (maxDays, date) =>
  Date.now() - new Date(date) > maxDays * 60 * 60 * 24

async function pushLeagueMatchNotifications() {
  const leagues = await getActiveLeagues()

  leagues.forEach(async league => {
    const partietId = league.partietId
    const leagueMatches = await fetchMathes(league.id)

    const partietMatches = leagueMatches.filter(match =>
      match.teams.some(team => team.id === partietId)
    )

    const finishedLatestMatches = partietMatches
      .filter(match => match.result !== null)
      .filter(match => !isMoreThanXDaysAgo(1, match.activity.startTime))

    const pushSubscriptions = await getPushSubscriptions(league.id)
    pushSubscriptions.forEach(async subscription => {
      const sentNotifications = await getSubscriptionNotifications(
        subscription.id
      )

      finishedLatestMatches.forEach(async match => {
        const hasSentForMatch = Boolean(
          sentNotifications.find(
            notification => notification.matchId === match.id
          )
        )

        if (!hasSentForMatch) {
          sendPushForMatch(subscription, match)
        }
      })
    })
  })
}
```
