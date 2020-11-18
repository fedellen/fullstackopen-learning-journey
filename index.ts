import express from 'express'
import { bodyMassIndex } from './bmiCalculator'

const app = express()

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height)
  const weight = Number(req.query.weight)

  if (isNaN(weight) || isNaN(height)) {
    console.log('not numbers')
    res
      .status(400)
      .json(
        'Queries Height(cm) and Weight(kg) as Numbers are required to calculate your bmi. For example: localhost:9001/bmi?height=165&weight=65'
      )
  } else {
    interface bmiResponse {
      height: number
      weight: number
      bmi: string
    }

    const bmiResponse: bmiResponse = {
      height: height,
      weight: weight,
      bmi: bodyMassIndex(height, weight)
    }
    res.send(bmiResponse)
  }
})

const PORT = 9001

app.listen(PORT, () => {
  console.log(`The express server is now running on port ${PORT}`)
})
