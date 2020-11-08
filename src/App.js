import React from 'react'
import CreateNew from './components/CreateNew'
import Anecdotes from './components/Anecdotes'
import Notification from './components/Notification'

// 👍

const App = () => (

  <div>
    <Notification />
    <Anecdotes />
    <CreateNew />
  </div>
)

export default App