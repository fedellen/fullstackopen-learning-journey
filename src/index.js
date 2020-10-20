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

const Content = () => {

  const part1 = 'Fundamentals of React'
  
  const part2 = 'Using props to pass data'
  
  const part3 = 'State of a component'
  

  return (
  
    <div>
      <p>
        {part1} {exercises1}
      </p>
      <p>
        {part2} {exercises2}
      </p>
      <p>
        {part3} {exercises3}
      </p>
      
    </div>
  
  )
}

const Total = () => {

  return (
  <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
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