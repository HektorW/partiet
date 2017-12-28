const Koa = require('koa')
const fetchTable = require('./scrape/fetchTable')

const app = new Koa()

app.use(async ctx => {
  if (ctx.path !== '/') {
    ctx.status = 404
    return
  }

  // ctx.body = await fetchTable(
  //   'http://asp.malmokorpenfotboll.com/matchtabell.aspx',
  //   'cup',
  //   'Inomhusserien%207%20manna%20Herrar%202017%20-%202018',
  //   'Partiet'
  // )

  ctx.body = await fetchTable(
    'http://asp.malmokorpenfotboll.com/matchtabell.aspx',
    'cup',
    'Utomhusserien%202017',
    'Partiet'
  )

  // http://asp.malmokorpenfotboll.com/matchtabell.aspx?cup=Utomhusserien%202017
})

app.listen(8000)
