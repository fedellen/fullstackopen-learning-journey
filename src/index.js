import React from 'react'
import ReactDOM from 'react-dom'


const Header = ({course}) => <h1>Basic {course}</h1>

const Course = ({course}) => (
  <div>
    <Header course={course.name} />
    <hr />
    <Content part={course.parts} />
    <br /><br />
    <Total sum={course.parts} />
    <br /><br />
  </div>
)

const Part = ({part}) => (
  <div>
    <br />
    <h2>Part: {part.name}</h2>
    <p>Exercises: {part.exercises} 😶</p> 
  </div>
)

const Content = ({part}) => (
  <div>
    {part.map((element, i) => (
      <Part key={i} part={element} /> 
    ))}
  </div>
)


const Total = ({sum}) => {

  const total = sum.reduce((getSum, currentValue) =>
    getSum + currentValue.exercises, 0
  )

  return (
    <h4>Total number of exercises: {total}</h4>
  )
}

const App = () => {

  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <Course course={courses[0]} />
      <Course course={courses[1]} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))