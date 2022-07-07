const PORT = 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const app = express()


app.get('/', (req, res) => {
  res.json('Bem vindo ao palavras aleatórias API!')
})

app.get('/words', (req, res) => {
  const words = []
  axios.get('https://www.hugonobrega.com/palavras.txt')
    .then((response) => {
      const allWords = response.data.split('\n')
      allWords.forEach(word => {
        length = word.length
        words.push({
          word,
          length
        })
      })
      res.json(words.filter(word => word.length == 5 )[Math.floor(Math.random() * 10)])
    })
})
app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))
