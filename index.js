const PORT = 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const app = express()

const words = []
app.get('/', (req, res) => {
  res.json('Bem vindo ao palavras aleatórias API!')
})

app.get('/words', (req, res) => {
  axios.get('https://www.hugonobrega.com/palavras.txt')
    .then((response) => {
      const html = response.data
      const $ = cheerio.load(html)
      $('pre', html).each(function () {
        const word = $(this).text()
        const length = $(this).text().length
        words.push({
          word,
          length
        })
      })
      res.json(words)
    })
})
app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))
