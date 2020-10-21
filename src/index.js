import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {

  const good = props.stats[0]
  const neutral = props.stats[1]
  const bad = props.stats[2]


  const total = good + neutral + bad
  const average = ((good * 1) + (bad * -1) / total)
  const percentage = good / total * 100 

  console.log(total)
  console.log(average)
  console.log(percentage)



  return (
    <div>
      <h2>Our Amazing Statistics</h2>
      <ul>
        <li>Good: {good}</li>
        <li>Neutral: {neutral}</li>
        <li>Bad: {bad}</li>
      </ul>

      <ul>
        <li>Total Feedback: {total}</li>
        <li>Average Feedback: {average}</li>
        <li>Percentage Positive: {percentage}%</li>

      </ul>
    </div>
  )
}

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const App = () => {
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => setGood(good + 1) 
  const addNeutral = () => setNeutral(neutral + 1) 
  const addBad = () => setBad(bad + 1) 

  return (
    <div>
      <h1>Give Us Feedback 💙</h1>
      <Button handleClick={addGood} text="Good" />
      <Button handleClick={addNeutral} text="Neutral" />
      <Button handleClick={addBad} text="Bad" />
      <Statistics stats={[good, neutral, bad, good + neutral + bad]} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)