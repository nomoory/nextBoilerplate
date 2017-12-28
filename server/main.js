const express = require('express')
const bodyParser = require('body-parser')

const moduleAlias = require('module-alias')
const { parse } = require('url')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 15000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev });
const handle = app.getRequestHandler()

import api from './routes'

if (!dev) {
  moduleAlias.addAlias('react', 'preact-compat')
  moduleAlias.addAlias('react-dom', 'preact-compat')
}

app.prepare()
.then(() => {
  const server = express()
  server.use(bodyParser.json())
  server.use('/api', api)
  server.use('/hello', (req,res) => {
    res.render('hello')
  })

  server.use('/',(req, res) => {
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl
    handle(req, res, parsedUrl)
    // Router 변경 예시
    // if (pathname === '/') {
    //     app.render(req, res, '/template', query)
    // } else if (pathname === '/template') {
    //     app.render(req, res, '/', query)
    // } else {
    //     handle(req, res, parsedUrl)
    // }
  })
  .listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
