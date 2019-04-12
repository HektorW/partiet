const { getAllActiveLeagues } = require('../db/models/league')
const { getAllPushSubscriptions } = require('../db/models/push-subscription')
const {
  getNotificationsForSubscription
} = require('../db/models/match-notification')
const fetchMatchesForTeam = require('../malmokorpen/fetchMatchesForTeam')
const sendPushNotificationForMatch = require('../push-notifications/sendPushNotificationForMatch')
const { isMoreThanXDaysAgo } = require('../../common/utils/date')

const log = (...args) =>
  console.log('scheduled-jobs.sendMatchNotifications', ...args)

module.exports = async function sendMatchNotifications() {
  log('start')

  const activeLeagues = await getAllActiveLeagues()

  log({ activeLeagues })

  activeLeagues.forEach(async league => {
    const teamMatches = await fetchMatchesForTeam(league.id, league.mainTeamId)

    const finishedLatestMatches = teamMatches.filter(
      match => match.result !== null
    )
    // .filter(match => !isMoreThanXDaysAgo(1, match.activity.startTime))

    if (finishedLatestMatches.length === 0) {
      return
    }

    log({ finishedLatestMatches })

    const pushSubscriptions = await getAllPushSubscriptions()
    pushSubscriptions.forEach(async subscription => {
      const sentNotifications = await getNotificationsForSubscription(
        subscription.id
      )

      finishedLatestMatches.forEach(async match => {
        const hasSentForMatch = Boolean(
          sentNotifications.find(
            notification => notification.matchId === match.id
          )
        )

        if (!hasSentForMatch) {
          log(
            'Sending notification for',
            subscription.id,
            'for match',
            match.id
          )

          sendPushNotificationForMatch(subscription, match)
        }
      })
    })
  })
}
