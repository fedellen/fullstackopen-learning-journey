import express from 'express'

const app = express()

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

const PORT = 9001

app.listen(PORT, () => {
  console.log(`The express server is now running on port ${PORT}`)
})
