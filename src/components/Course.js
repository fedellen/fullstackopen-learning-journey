import React from 'react'

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

export default Course