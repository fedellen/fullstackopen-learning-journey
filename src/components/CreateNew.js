import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notification, endNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'


const CreateNew = () => {
  const dispatch = useDispatch()

  const addAnecdote = async e => {
    e.preventDefault()
    const anecdote = e.target.anecdote.value
    e.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createNew(anecdote)
    console.log(newAnecdote)
    dispatch(createAnecdote(newAnecdote))

      // Do a notification message -- needs reusable refactor? 
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