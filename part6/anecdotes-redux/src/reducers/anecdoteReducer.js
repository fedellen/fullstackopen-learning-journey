import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {

  switch(action.type) {

    case 'INIT':
      return action.data

    case 'VOTE':
      const id = action.data.id
      return state.map(a =>
        a.id !== id ? a : action.data  
      )
    
    case 'NEW_ANECDOTE':
      return [ ...state, action.data ]

    default:
      return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}

export const createAnecdote = anecdote => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch ({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const voteAnecdote = anecdote => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.voteFor(anecdote)
    dispatch({
      type: 'VOTE',
      data: newAnecdote
    })
  }
}

export default anecdoteReducer