import express from 'express'
import { bodyMassIndex } from './bmiCalculator'
import { calculateExercises } from './exerciseCalculator'

const app = express()
app.use(express.json())

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.post('/exercise', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dailyHours: any = req.body.dailyHours
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const target: any = req.body.target

  if (!req.body.dailyHours || !req.body.target) {
    res.status(400).json('parameters missing')
  } else if (isNaN(target) || !Array.isArray(dailyHours)) {
    res.status(400).json('malformatted parameters')
  } else {
    res.status(200).json(calculateExercises(dailyHours, target))
  }
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
