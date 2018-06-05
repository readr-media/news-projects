const _ = require('lodash')
const Cookies = require('cookies')
const debug = require('debug')('NEWS-PROJECT:server.js')
const fs = require('fs')
const path = require('path')
const LRU = require('lru-cache')
const express = require('express')
const favicon = require('serve-favicon')
const compression = require('compression')
const microcache = require('route-cache')
const requestIp = require('request-ip')
const resolve = file => path.resolve(__dirname, file)
const useragent = require('express-useragent')
const uuidv4 = require('uuid/v4')
// const { VALID_PREVIEW_IP_ADD } = require('./api/config')
const { createBundleRenderer } = require('vue-server-renderer')

const config = require('./api/config')
const isProd = process.env.NODE_ENV === 'production'
const useMicroCache = process.env.MICRO_CACHE !== 'false'
const serverInfo =
  `express/${require('express/package.json').version} ` +
  `vue-server-renderer/${require('vue-server-renderer/package.json').version}`

const app = express()

function createRenderer (bundle, options) {
  // https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
  return createBundleRenderer(bundle, Object.assign(options, {
    // for component caching
    cache: LRU({
      max: 1000,
      maxAge: 1000 * 60 * 15
    }),
    // this is only needed when vue-server-renderer is npm-linked
    basedir: resolve('./dist'),
    // recommended for performance
    runInNewContext: false
  }))
}

app.use(useragent.express())
app.use(requestIp.mw())
app.set('views', path.join(__dirname, 'src/views'))
app.set('view engine', 'ejs')

let renderer
let readyPromise
const templatePath = resolve('./src/index.template.html')
if (isProd) {
  // In production: create server renderer using template and built server bundle.
  // The server bundle is generated by vue-ssr-webpack-plugin.
  const template = fs.readFileSync(templatePath, 'utf-8')
  const bundle = require('./dist/vue-ssr-server-bundle.json')
  // The client manifests are optional, but it allows the renderer
  // to automatically infer preload/prefetch links and directly add <script>
  // tags for any async chunks used during render, avoiding waterfall requests.
  const clientManifest = require('./dist/vue-ssr-client-manifest.json')
  renderer = createRenderer(bundle, {
    template,
    clientManifest
  })
} else {
  // In development: setup the dev server with watch and hot-reload,
  // and create a new renderer on bundle / index template update.
  readyPromise = require('./build/setup-dev-server')(
    app,
    templatePath,
    (bundle, options) => {
      renderer = createRenderer(bundle, options)
    }
  )
}

const serve = (path, cache) => express.static(resolve(path), {
  maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
})

app.use(compression({ threshold: 0 }))
// app.use(favicon(path.join(__dirname, './public/favicon-48x48.png')))
app.use('/dist', serve(path.join(__dirname, './dist'), true))
// app.use('/public', serve(path.join(__dirname, './public'), true))
app.use('/manifest.json', serve(path.join(__dirname, './manifest.json'), true))
app.use('/project/service-worker.js', serve(path.join(__dirname, './dist/service-worker.js')))
app.use('/service-worker.js', serve(path.join(__dirname, './dist/service-worker.js')))

if (!isProd) {
  app.use('/proj-assets', serve(path.join(__dirname, './proj-assets'), true))
}

// since this app has no user-specific content, every page is micro-cacheable.
// if your app involves user-specific content, you need to implement custom
// logic to determine whether a request is cacheable based on its url and
// headers.
// 1-second microcache.
// https://www.nginx.com/blog/benefits-of-microcaching-nginx/
app.use(microcache.cacheSeconds(1, req => useMicroCache && req.originalUrl))

function render (req, res, next) {
  debug('req.useragent:')
  debug(req.useragent)
  const s = Date.now()
  console.log('got req at ', s)
  console.log('req.url', req.url)
  console.log('dist path: (./dist)', path.join(__dirname, './dist'))
  
  if (req.url.indexOf('/project-api/') === 0) {
    next()
    return
  }

  let isPageNotFound = false
  let isErrorOccurred = false  

  res.setHeader('Cache-Control', 'public, max-age=3600')
  res.setHeader("Content-Type", "text/html")
  res.setHeader("Server", serverInfo)

  const cookies = new Cookies( req, res, {} )
  const mmid = cookies.get('mmid')
  if (!mmid) {
    cookies.set('mmid', uuidv4(), { httpOnly: false, expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) })
  }

  const handleError = err => {
    if (err.url) {
      console.log('err', err)
      res.redirect(err.url)
    } else if(err.code === 404) {
      res.status(404).send('404 | Page Not Found')
    } else {
      // Render Error Page or Redirect
      res.status(500).send('500 | Internal Server Error')
      console.error(`error during render : ${req.url}`)
      console.error(err.stack)
    }
  }

  const context = {
    title: 'Readr Projects', // default title
    url: req.url,
    useragent: req.useragent,
    setting: {
      GOOGLE_RECAPTCHA_SITE_KEY: config.GOOGLE_RECAPTCHA_SITE_KEY
    },
    favicon: 'https://www.readr.tw/public/favicon.png',
    siteName: '讀＋READr'
  }
  renderer.renderToString(context, (err, html) => {
    if (err) {
      return handleError(err)
    }
    res.send(html)
    if (!isProd) {
      console.log(`whole request: ${Date.now() - s}ms`)
    }
  })
}

app.get('*', isProd ? render : (req, res, next) => {
  readyPromise.then(() => render(req, res, next))
})

app.use('/project-api', require('./api/index'))

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})
