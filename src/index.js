import React from 'react'
import ReactDOM from 'react-dom'


const Header = (course) => {

  return (
  
  <h1>Basic {course.course}</h1>

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

    // Should refactor to utilize loop

  return (

    <div>
      <Part part={props.part[0]} />
      <Part part={props.part[1]} />
      <Part part={props.part[2]} />
    </div>

  )
}

const Total = (props) => {
  
    let exercise = 0

    for (var i = 0; i < props.sum.length; i++) {

        // Loop to add exercise totals together
      exercise = exercise + props.sum[i].exercises

    }

  return (

    // Display Total
  <h3>Total number of exercises: {exercise}</h3>

  )
}

const App = () => {


  const course = {

    name: 'Half Stack application development',
    parts: [
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
  }

  return (

    <div>
      
      <Header course={course.name} />
      <Content part={course.parts} />
      <hr />
      <Total sum={course.parts} />

    </div>

  )
}

ReactDOM.render(<App />, document.getElementById('root'))