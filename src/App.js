import React from 'react'
import CreateNew from './components/CreateNew'
import Anecdotes from './components/Anecdotes'
import Notification from './components/Notification'
import Filter from './components/Filter'

// 👍

const App = () => (

  <div>
    <h2>Anecdotes</h2>
    <Notification />
    <Filter />
    <Anecdotes />
    <CreateNew />
  </div>
)

export default App