import React, { useState } from 'react'
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

  // Counter Practice Session
const Counter = () => {
   
  const [ counter, setCounter ] = useState(0)
  
  const increaseByOne = () => setCounter(counter + 1)
  const setToZero = () => setCounter(0)
  const decreaseByOne = () => setCounter(counter - 1)

  return (
    <div>
      <hr />
      <Display counter={counter} />
      <Button handleClick={increaseByOne} text="plus" />
      <Button handleClick={setToZero} text="zero" />
      <Button handleClick={decreaseByOne} text="minus" />
    </div>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Display = ({counter}) => <p>Counter: {counter} ⏲️</p>


  /* useState Practice 😄 
  * Reference to fullstackopen.com part 1d 
  */

const History = (props) => {
  
  if (props.allClicks.length === 0) {
    return (
      <div>
        This app is used by pressing the buttons.
      </div>
    )
  }

  return (
    <div>
      Button Press History: {props.allClicks.join(' ')}
    </div>
  )
}

// Refactor to use the same button component as the Counter exercise

const StateButton = ({onClick, text}) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const State = () => {

  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  
  const handleLeftClick = () => {    
    setAll(allClicks.concat('L'))    
    setLeft(left + 1)  
  }
  
    const handleRightClick = () => {    
    setAll(allClicks.concat('R'))    
    setRight(right + 1)  
  }

  return ( // Return HTML
    <div>
      {left}
      <StateButton onClick={handleLeftClick} text='left' />
      <StateButton onClick={handleRightClick} text='right' />
      {right}
      <History allClicks={allClicks} />
    </div>
  )
}

  // Quick Test

  const TestOne = () => {

    const [value, setValue] = useState(10)
  
    const hello = (who) => () => console.log('hello', who)
      
    const setToValue = (newValue) => setValue(newValue)

    return (
      <div>
        <p>{value}</p>
        <button onClick={() => setToValue(1000)}>thousand</button>
        <button onClick={() => setToValue(0)}>reset to 0</button>
        <button onClick={() => setToValue(value + 1)}>do another</button>
        <br /><br />
        <button onClick={hello('world')}>hello world</button>
        <button onClick={hello('react')}>hello react</button>
        <button onClick={hello('function')}>hello function</button>
        <br /><br />
      </div>
    )
  }


const App = () => {  
  
  const name = 'Peter'
  const age = 10

  return (
    <div>
      <h1>Greetings There 👋</h1>
      <h2>This is a React sandbox of codePlay.</h2>
      <Hello name="Sam" age={26 + 10} />
      <Hello name={name} age={age} />
      <Hello name="Douglas" age={74} />
      <Counter />
      <br />
      <State />
      <p>Touch my buttons 🖕</p>
      <hr />
      <TestOne />
      <Footer />
    </div>
  )

}

ReactDOM.render(<App />, document.getElementById('root'))