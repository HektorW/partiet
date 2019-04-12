const fetch = require('node-fetch')
const urlJoin = require('url-join')

const baseUrl = 'https://korpenmalmoidrottsforening.zoezi.se/api/'

class HttpError extends Error {
  constructor(status) {
    super()
    this.status = status
  }
}

module.exports = async function getJson(apiPath) {
  const url = urlJoin(baseUrl, apiPath)
  const result = await fetch(url)

  if (result.ok) {
    return result.json()
  }

  throw new HttpError(result.status)
}
