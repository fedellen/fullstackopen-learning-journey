import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './anecdoteReducer'

const store = createStore(
  reducer,
  composeWithDevTools()
)
store.subscribe(() => console.log(store.getState()))

export default store