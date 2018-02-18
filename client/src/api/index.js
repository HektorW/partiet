import HttpError from './HttpError'
// import mergeDeep, { isObject } from 'utils/mergeDeep'


async function request (url, options) {
  let response
  try {
    response = await fetch(url, parseRequestOptions(options))
  } catch (error) {
    throw new HttpError(500, error.message)
  }

  const responseData = await parseResponseData(response)

  const { status } = response
  if (status < 200 || status >= 300) {
    throw new HttpError(status, response.statusText, responseData)
  }

  return responseData
}


const parseRequestOptions = options => {
  // const body = isObject(options.body)
  //   ? JSON.stringify(options.body)
  //   : options.body

  return { ...options }
  // return mergeDeep({}, options, {
  //   body,
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // })
}


const parseResponseData = response =>
  response
    .clone().json()
    .catch(() =>
      response.clone().text()
    )


export const get = (url, options) => request(url, { ...options, method: 'GET' })
export const post = (url, options) => request(url, { ...options, method: 'POST' })
