interface exerciseArgs {
  dailyHours: Array<number>
  targetGoal: number
}

interface exerciseResults {
  totalDays: number
  trainedDays: number
  targetHours: number
  success: boolean
  rating: number
  ratingDesc: string
  average: number
}

const parseArgs = (args: Array<string>): exerciseArgs => {
  if (args.length < 4) throw new Error('Not enough arguments')
  if (args.length > 4) throw new Error('Too many arguments')

  const arrayOfHours = args[2].split(',')
  const numberArrayOfHours = arrayOfHours.map(Number)

  return {
    dailyHours: numberArrayOfHours,
    targetGoal: Number(args[3])
  }
}

const calculateExercises = (
  hours: Array<number>,
  target: number
): exerciseResults => {
  const totalHours = hours.reduce((a, b) => a + b)
  const avgHours = totalHours / hours.length

  const rate = (avgHours: number, target: number): number => {
    if (avgHours > target * 1.5) {
      return 3
    } else if (avgHours < target * 0.5) {
      return 0
    } else if (avgHours > target) {
      return 2
    } else {
      return 1
    }
  }

  const rating = rate(avgHours, target)

  const describe = (rating: number): string => {
    if (rating === 3) {
      return 'Great job! Keep up the grind 👍'
    } else if (rating === 2) {
      return 'You reached your goal, but it could be better 👌'
    } else if (rating === 1) {
      return 'Missed your goal, good luck for next time 👀'
    } else if (rating === 0) {
      return '...try exercising for next time 😑'
    }
  }

  return {
    totalDays: hours.length,
    trainedDays: hours.filter((d) => d).length,
    targetHours: target,
    success: avgHours > target,
    rating: rating,
    ratingDesc: describe(rating),
    average: avgHours
  }
}

try {
  const { dailyHours, targetGoal } = parseArgs(process.argv)
  console.log(calculateExercises(dailyHours, targetGoal))
} catch (err) {
  console.log('An error has occured...', err.message)
}

// returns =>     days          | training days     | orig target value
//                cacl avg time | boolean if reach  | rating between 1-3 depending on how goal met
//                text value explaining the rating finally
