import React, { useEffect } from 'react'

// Components
import CreateNew from './components/CreateNew'
import Anecdotes from './components/Anecdotes'
import Notification from './components/Notification'
import Filter from './components/Filter'

// For initializing anecdotes
import anecdoteService from './services/anecdotes'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

// 👍

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    anecdoteService
      .getAll()
      .then(anecdotes => dispatch(initializeAnecdotes(anecdotes)))
  }, [dispatch])


  return(
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <Anecdotes />
      <CreateNew />
    </div>
  )
}

export default App