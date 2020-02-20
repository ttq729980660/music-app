const express = require('express')
const config = require('./config/index')
const axios = require('axios')

const port = process.env.PORT || config.dev.port

const app = express()

const apiRoutes = express.Router()

apiRoutes.get('/getDiscList', function (req, res) {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: {
      g_tk: 1928093487,
      inCharset: 'utf-8',
      outCharset: 'utf-8',
      notice: 0,
      format: 'json',
      platform: 'yqq',
      hostUin: 0,
      sin: 30,
      ein: 35,
      sortId: 5,
      needNewCode: 0,
      categoryId: 10000000,
      rnd: Math.random()
    }
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

app.use('/api', apiRoutes)

app.use(express.static('./dist'))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
