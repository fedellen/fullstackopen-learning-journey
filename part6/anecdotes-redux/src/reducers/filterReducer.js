const filterReducer = (state = '', action) => {
  if (action.type === 'FILTER') {
    return action.text
  }
  return state
}

export const updateFilter = text => {
  return {
    type: 'FILTER',
    text
  }
}

export default filterReducer