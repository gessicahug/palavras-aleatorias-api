const PORT = process.env.PORT || 8000
const express = require('express')
const axios = require('axios')

const app = express()
const url = 'https://www.hugonobrega.com/palavras.txt'
const sampleWords = (arr, num) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}
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
      const filteredWords = response.data.split('\n').filter(word => word.length == wordLength)
      const selectedNumberOfWords = sampleWords(filteredWords, howManywords)
      selectedNumberOfWords.forEach(word => {
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
