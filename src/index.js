import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = (props) => <button onClick={props.call}>{props.text}</button>

const App = (props) => {

  const [selected, setSelected] = useState(0)


  const randomInt = () => Math.floor(Math.random() * listLength)
  const randomAnecdote = () => setSelected(randomInt())
  const listLength = props.anecdotes.length

  const points = (Array(listLength).fill(0))

  const voteAnecdote = () => {
    const copy = [...points]
    copy[selected] += 1
    randomAnecdote()
  }
  




  return (
    <div>
      {props.anecdotes[selected]}
      <br /><br />
      <Button text="Next Anecdote" call={randomAnecdote} />
      <Button text="Vote for Anecdote" call={voteAnecdote} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)