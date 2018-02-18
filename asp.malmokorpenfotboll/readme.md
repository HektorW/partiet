# Scraping from asp.malmokorpenfotboll

Scraping values from asp.malmokorpenfotboll takes 3 steps.

## Step 1, get a session cookie

Make a `GET` request to the base url with a query specifying the ID of the league we want.
The response will contain a `set-cookie` header with a session-ID (`ASP.NET_SessionId`).

## Step 2, POST form with selected list choice

Make a new `GET` request to the base url, this time without the query but including the session cookie in the request headers.
The response will contain HTML a form and two lists.
The form holds two hidden inputs, `__VIEWSTATE` and `__EVENTVALIDATION`. Both of these values need to be included with the `POST` data.
Includes viewstate and eventvalidation

## Step 3, scrape resulting markup
