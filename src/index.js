import React from 'react'
import ReactDOM from 'react-dom'

const Hello = (props) => {

  return (
    <div>
      <p>Hello {props.name}, this is React 🧬</p>
      <p>You are {props.age} years old</p>
    </div>
  )

}

const Footer = () => {
  return (
    <div>
      greeting app created by <a href="https://github.com/fedellen">fedellen</a>
    </div>
  )
}

const App = () => {
  
  const name = 'Peter'
  const age = 10

  return (
    <div>
      <h1>Greetings There 👋</h1>
      <Hello name="Sam" age={26 + 10} />
      <Hello name={name} age={age} />
      <Hello name="Douglas" age={74} />
      <Footer />
    </div>
  )

}

ReactDOM.render(<App />, document.getElementById('root'))