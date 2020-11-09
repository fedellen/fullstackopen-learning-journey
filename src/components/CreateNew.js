import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notification, endNotification } from '../reducers/notificationReducer'


const CreateNew = () => {
  const dispatch = useDispatch()

  const addAnecdote = e => {
    e.preventDefault()
    const anecdote = e.target.anecdote.value
    e.target.anecdote.value = ''
    dispatch(createAnecdote(anecdote))
    dispatch(notification(`you created a new anecdote: '${anecdote}'`))
    setTimeout(() => {
      dispatch(endNotification())
    }, 5000)
  }


  return(
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default CreateNew