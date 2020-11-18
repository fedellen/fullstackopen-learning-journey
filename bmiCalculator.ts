interface BodyValues {
  height: number
  weight: number
}

type Result = string

const parseArguments = (args: Array<string>): BodyValues => {
  if (args.length < 4) throw new Error('Not enough arguments')
  if (args.length > 4) throw new Error('Too many arguments')

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!')
  }
}

const bodyMassIndex = (height: number, weight: number): Result => {
  // BMI function: Weight (KG) / Height (CM coverted to M) Sqaured
  const bmi: number = weight / ((height / 100) * (height / 100))

  // BMI Logic
  if (bmi > 40) return `Obese Class III (Very severely obese): ${bmi} BMI`
  else if (bmi > 35) return `Obese Class II (Severely obese): ${bmi} BMI`
  else if (bmi > 30) return `Obese Class I (Moderately obese): ${bmi} BMI`
  else if (bmi > 25) return `Overweight: ${bmi} BMI`
  else if (bmi > 18.5) return `Normal (healthy weight): ${bmi} BMI`
  else if (bmi > 16) return `Underweight: ${bmi} BMI`
  else if (bmi > 15) return `Severely underweight: ${bmi} BMI`
  else return `Very severely underweight: ${bmi} BMI`
}

try {
  const { height, weight } = parseArguments(process.argv)
  console.log(bodyMassIndex(height, weight))
} catch (err) {
  console.log('Error:', err.message)
}
