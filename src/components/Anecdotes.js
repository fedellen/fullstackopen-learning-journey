import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notification, endNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => (
  <div>
    <div>{anecdote.content}</div>
    <div>has {anecdote.votes} votes</div>
    <button onClick={ handleClick }>vote</button>
  </div>
)

const Anecdotes = () => {

  const anecdotes = useSelector(state => state.anecdote)
  const dispatch = useDispatch()

  const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)

  const voteFor = anecdote => {
    dispatch(voteAnecdote(anecdote.id))
    dispatch(notification(`you voted for anecdote: '${anecdote.content}'`))
    setTimeout(() => {
      dispatch(endNotification())
    }, 5000)
  }

  return(
    <div>
      <h2>Anecdotes</h2>
      {sortedAnecdotes.map(anecdote =>
        <Anecdote 
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => voteFor(anecdote)}
        />  
      )}
    </div>
  )
}

export default Anecdotes