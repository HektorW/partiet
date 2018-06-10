const fetch = require('node-fetch')
const { parse: parseCookie } = require('cookie')
const cheerio = require('cheerio')
const FormData = require('form-data')

const submitButtonValue = 'Välj'

module.exports = async function fetchPageDOM(
  url,
  query,
  optionListId,
  searchOptionText,
  submitButtonId
) {
  const cookie = await getSessionCookie(url, query)

  const pickOptionResponse = await fetch(url, {
    headers: { cookie }
  })

  const $pickOptionDOM = cheerio.load(await pickOptionResponse.text())

  const form = new FormData()
  form.append('__VIEWSTATE', $pickOptionDOM('#__VIEWSTATE').val())
  form.append('__EVENTVALIDATION', $pickOptionDOM('#__EVENTVALIDATION').val())

  const $teamOption = $pickOptionDOM(`#${optionListId} option`)
    .filter((index, optionEl) => {
      return (
        $pickOptionDOM(optionEl)
          .text()
          .toLowerCase() === searchOptionText.toLowerCase()
      )
    })
    .eq(0)

  form.append(optionListId, $teamOption.val())
  form.append(submitButtonId, submitButtonValue)

  const resultResponse = await fetch(url, {
    method: 'POST',
    body: form,
    headers: { cookie }
  })

  return cheerio.load(await resultResponse.text())
}

const getSessionCookie = async (url, query) => {
  const sessionKey = 'ASP.NET_SessionId'

  const response = await fetch(`${url}?${query}`)
  const setCookieHeader = response.headers.get('set-cookie')
  const sessionValue = parseCookie(setCookieHeader)[sessionKey]

  return `${sessionKey}=${sessionValue}`
}
