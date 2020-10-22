import React from 'react'
import ReactDOM from 'react-dom'


const Header = ({course}) => <h1>Basic {course}</h1>

const Course = ({course}) => (
  <div>
    <Header course={course.name} />
    <Content part={course.parts} />
    <hr />
    <Total sum={course.parts} />
  </div>
)

const Part = (props) => (

  <div>
    <hr />
    <h2>Part: {props.part.name}</h2>
    <p>Exercises: {props.part.exercises} 😶</p> 
  </div>
)

 // Should refactor to utilize loop
const Content = (props) => (
  <div>
    <Part part={props.part[0]} />
    <Part part={props.part[1]} />
    <Part part={props.part[2]} />
    <Part part={props.part[3]} />
  </div>
)

const Total = ({sum}) => {

  const total = sum.reduce((getSum, currentValue) =>
    getSum + currentValue.exercises, 0
  )

  return (
    <h3>Total number of exercises: {total}</h3>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Basic Node.js Overview',
        exercises: 4,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

ReactDOM.render(<App />, document.getElementById('root'))