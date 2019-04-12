self.addEventListener('push', event => {
  const notificationData = event.data.json()

  event.waitUntil(
    self.registration.showNotification('Match result', {
      body: JSON.stringify(notificationData)
    })
  )
})
