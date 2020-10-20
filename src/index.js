import React from 'react'
import ReactDOM from 'react-dom'


const Header = (props) => {

  return (
  
  <h1>Basic {props.course}</h1>

  )
}

const Part = (props) => {

  return (

    <div>
      <hr />
      <h2>Course: {props.part.name}</h2>
      <p>Exercises: {props.part.exercises} 😶</p> 
    </div>
  
  )
}


const Content = (props) => {

  return (

    <div>
      <Part part={props.part[0]} />
      <Part part={props.part[1]} />
      <Part part={props.part[2]} />
    </div>

  )
}

const Total = (props) => {

    // Add all exercise values together -- Refactor when knowledge grows
  let exercise = props.sum[0].exercises + props.sum[1].exercises + props.sum[2].exercises

  return (

    // Display Total
  <h3>Total number of exercises: {exercise}</h3>

  )
}

const App = () => {

  const course = 'Half Stack application development'
  const parts = 
  [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },

    {
      name: 'Using props to pass data',
      exercises: 7
    },

    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (

    <div>
      
      <Header course={course} />
      <Content part={parts} />
      <hr />
      <Total sum={parts} />

    </div>

  )
}

ReactDOM.render(<App />, document.getElementById('root'))