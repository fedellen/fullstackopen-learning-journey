import React from 'react'
import ReactDOM from 'react-dom'

const Header = () => {

  const course = 'Half Stack application development'

  return (

  <h1>{course}</h1>

  )
}

const exercises1 = 10
const exercises2 = 7
const exercises3 = 14
const part1 = 'Fundamentals of React'
const part2 = 'Using props to pass data'
const part3 = 'State of a component'

// This is clearly not an efficient way of producing
// parts; would like to return to this when I learn more

const Part = (props) => {

  return (

    <div>
      <h2>Course: {props.part}</h2>
      <p>Exercises: {props.exercise}</p>
    </div>

  )
}

const Content = () => {

  return (
  
    <div>

        <hr />
        <Part part={part1} exercise={exercises1} />
        <hr />
        <Part part={part2} exercise={exercises2} />
        <hr />
        <Part part={part3} exercise={exercises3} />
        <hr />

    </div>
  
  )
}

const Total = () => {

  return (

  <h3>Total number of exercises {exercises1 + exercises2 + exercises3}</h3>

  )
}

const App = () => {

  return (

    <div>

      <Header />
      <Content />
      <Total />
  
    </div>

  )
}

ReactDOM.render(<App />, document.getElementById('root'))