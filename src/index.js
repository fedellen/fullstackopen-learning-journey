import React from 'react'
import ReactDOM from 'react-dom'

const Hello = ({ name, age }) => {

  const bornYear = () => new Date().getFullYear() - age

  return (

    <div>
      <hr />
      <br />
      <p>Hello {name}, this is React 🧬</p>
      <p>I'm a highly popular JavaScript library.</p>
      <p>You are currently {age} years old</p>
      <p>So, you were probably born in {bornYear()} 🎂</p>
      <br />
    </div>
  )

}

const Footer = () => {
  return (
    <div>
      <hr />
      <p>greeting app created by <a href="https://github.com/fedellen">fedellen</a></p>
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