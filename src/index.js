import React from 'react'
import ReactDOM from 'react-dom'


const Header = (props) => {

  console.log(props)

  return (
  
  <h1>{props.course}</h1>

  )
}

const Part = (props) => {

  return (

    <div>
      <h2>Course: {props.part.name}</h2>
      <p>Exercises: {props.part.exercises} 😶</p> 
    </div>

  )
}

const Total = (props) => {

  return (

  <h3>Total number of exercises: {props.sum}</h3>

  )
}

const App = () => {

  const course = 'Half Stack application development'

  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }

  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }

  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (

    <div>
      
      <Header course={course} />
      <Part part={part1} />
      <Part part={part2} />
      <Part part={part3} />
      <Total sum={part1.exercises + part2.exercises + part3.exercises} />

    </div>

  )
}

ReactDOM.render(<App />, document.getElementById('root'))