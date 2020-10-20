import React from 'react'
import ReactDOM from 'react-dom'

const exercises = [10, 7, 14]
const parts = ['Fundamentals of React', 'Using props to pass data', 'State of a component']

const Header = () => {

  const course = 'Half Stack application development'

  return (

  <h1>{course}</h1>

  )
}

const Part = (props) => {

  return (

    <div>
      <h2>Course: {parts[props.part]}</h2>
      <p>Exercises: {exercises[props.part]}</p>
    </div>

  )
}

const Content = () => {

  return (
  
    <div>

        <hr />
        <Part part="0" />
        <hr />
        <Part part="1" />
        <hr />
        <Part part="2" />
        <hr />

    </div>
  
  )
}

const Total = () => {

  const sum = "Total number of exercises: " + exercises.reduce( (a, b) => {
    return a + b;
  }, 0);

  return (

  <h3>{sum}</h3>

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