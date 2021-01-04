import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => (
  <div>
    <div>{anecdote.content}</div>
    <div>has {anecdote.votes} votes</div>
    <button onClick={ handleClick }>vote</button>
  </div>
)

const Anecdotes = props => {

  const voteFor = anecdote => {
    props.voteAnecdote({ ...anecdote, votes: anecdote.votes + 1 })
    props.notify(`you voted for anecdote: '${anecdote.content}'`, 5)
  }

  return(
    <div>
      {props.anecdotes.map(anecdote =>
        <Anecdote 
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => voteFor(anecdote)}
        />  
      )}
    </div>
  )
}

const mapStateToProps = state => {

  // Possible spaghetti code ahead
  
  if ( state.anecdote ) {

    const sortedAnecdotes = state.anecdote.sort((a, b) => b.votes - a.votes)

    if ( state.filter === '' ) {
      return { anecdotes: sortedAnecdotes }
    }

    const filterAnecdotes = (arr, filter) => {
      return arr.filter(a => a.content.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
    }

    return { 
      anecdotes: filterAnecdotes(sortedAnecdotes, state.filter)
    }
  }

  return { anecdotes: state.anecdote }
}



const mapDispatchToProps = {
  voteAnecdote,
  notify
}

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(Anecdotes)

export default ConnectedAnecdotes