const port = parseInt(process.env.PORT, 10) || 3030
const dev = process.env.NODE_ENV !== 'production'
const moduleAlias = require('module-alias')

// For the development version, we'll use React.
// Because, it support react hot loading and so on.
if (!dev) {
  moduleAlias.addAlias('react', 'preact-compat')
  moduleAlias.addAlias('react-dom', 'preact-compat')
}

moduleAlias.addAliases({ // transpile 된 파일의 directory를 참조하도록함
    components: __dirname + '/.next/dist/src/components/',
    constants: __dirname + '/.next/dist/src/constants/',
    entities: __dirname + '/.next/dist/src/entities/',
    actions:  __dirname + '/.next/dist/src/redux/actions'
    services: __dirname + '/.next/dist/src/services/',
    utils: __dirname + '/.next/dist/src/util/',
})

const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
    createServer((req, res) => {
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
