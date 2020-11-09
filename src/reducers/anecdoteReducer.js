
const anecdoteReducer = (state = [], action) => {

  switch(action.type) {

    case 'INIT':
      return action.data

    case 'VOTE':
      const id = action.data.id
      const anecdote = state.find(a => a.id === id)
      const newAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
      return state.map(a =>
        a.id !== id ? a : newAnecdote  
      )
    
    case 'NEW_ANECDOTE':
      return [ ...state, action.data ]

    default:
      return state
  }
}

export const initializeAnecdotes = anecdotes => {
  return {
    type: 'INIT',
    data: anecdotes
  }
}

export const createAnecdote = data => {
  return {
    type: 'NEW_ANECDOTE',
    data
  }
}

export const voteAnecdote = id => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export default anecdoteReducer