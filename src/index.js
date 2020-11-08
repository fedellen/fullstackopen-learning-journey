import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'

import noteReducer from './reducers/noteReducer'

/*
  // Redux Counter Example App

import counterReducer from './reducers/counterReducer' 

const store = createStore(counterReducer)

const App = () => {

  return(
    <div>
      <div>
        {store.getState()}
      </div>
      <button onClick={e => store.dispatch({ type: 'INCREMENT' })}>
        plus
      </button>
      <button onClick={e => store.dispatch({ type: 'DECREMENT' })}>
        minus
      </button>
      <button onClick={e => store.dispatch({ type: 'ZERO' })}>
        zero
      </button>
    </div>
  )
}
*/





const store = createStore(noteReducer)

store.dispatch({
  type: 'NEW_NOTE',
  data: {
    content: 'the app state is in redux store',
    important: true,
    id: 1
  }
})

store.dispatch({
  type: 'NEW_NOTE',
  data: {
    content: 'state changes are made with actions',
    important: false,
    id: 2
  }
})

const App = () => {
  return(
    <div>
      <ul>
        {store.getState().map(note =>
          <li key={note.id}>
            {note.content} <strong>{note.important ? 'important' : ''}</strong>
          </li>  
        )}
      </ul>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)