import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = (props) => {
  return (
    <tr>
      <th>{props.text}</th>
      <td>{props.value} {props.percent}</td> 
    </tr>
  )
}

const Statistics = (props) => {

  const good = props.stats[0]
  const neutral = props.stats[1]
  const bad = props.stats[2]

  const total = good + neutral + bad
  const average = ((good * 1) + (bad * -1) / total)
  const percentage = good / total * 100 

  if (total > 0) {
    return (
      <table>
        <thead>
          <Statistic text="Good: " value={good} />
          <Statistic text="Neutral: " value={neutral} />
          <Statistic text="Bad: " value={bad} />
          <Statistic text="Total Feedback: " value={total} />
          <Statistic text="Average Feedback: " value={average} />
          <Statistic text="Percentage Positive: " value={percentage} percent="%" />
        </thead>
      </table>
    )
  }
  return (<h2>No feedback has been given</h2>)
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
      <h2>Our Amazing Statistics 📈 </h2>
      <Statistics stats={[good, neutral, bad, good + neutral + bad]} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)