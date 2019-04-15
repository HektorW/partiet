const { addNotification } = require('../db/models/match-notification')
const sendPushNotification = require('./sendPushNotification')

module.exports = async function sendPushNotificationForMatch(
  subscriptionModel,
  match
) {
  const [teamA, teamB] = match.teams

  const notificationData = {
    date: match.activity.startTime,
    teamA: {
      id: teamA.id,
      name: teamA.name,
      score: match.result[0].result
    },
    teamB: {
      id: teamB.id,
      name: teamB.name,
      score: match.result[1].result
    }
  }

  try {
    const result = await sendPushNotification(
      subscriptionModel,
      notificationData
    )

    if (result.statusCode >= 200 && result.statusCode < 300) {
      addNotification(subscriptionModel.id, match.id)
    }
  } catch (error) {
    console.error('failed to send match notification', {
      subscription: subscriptionModel.id
    })
  }
}
