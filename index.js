const PORT = process.env.PORT || 8000
const express = require('express')
const axios = require('axios')

const app = express()
const url = 'https://www.hugonobrega.com/palavras.txt'

app.get('/', (req, res) => {
  res.json('Bem vindo ao palavras aleatórias API!')
})

app.get('/words', (req, res) => {
  const words = []
  axios.get(url)
    .then((response) => {
      const allWords = response.data.split('\n')
      allWords.forEach(word => {
        length = word.length
        words.push({
          word,
          length
        })
      })
      res.json(words)
    })
})

app.get('/words/:wordLength', (req, res) => {
  const wordLength = req.params.wordLength
  const words = []
  axios.get(url)
    .then((response) => {
      const filteredWords = response.data.split('\n').filter(word => word.length == wordLength)
      filteredWords.forEach(word => {
        length = word.length
        words.push({
          word,
          length
        })
      })
      res.json(words)
    })
})

app.get('/words/:wordLength/:howMany', async (req, res) => {
  const wordLength = req.params.wordLength
  const howManywords = req.params.howMany
  const words = []
  axios.get(url)
    .then((response) => {
      const filteredWords = response.data.split('\n').filter(word => word.length == wordLength).slice(0, howManywords)
      filteredWords.forEach(word => {
        length = word.length
        words.push({
          word,
          length
        })
      })
      res.json(words)
    })

})

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))
