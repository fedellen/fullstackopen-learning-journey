import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Filter = () => {

  const [ searchValue, newSearchValue ] = useState('')

  let typingTimer = {}

  const handleSearch = (search) => {
    clearTimeout(typingTimer)
    newSearchValue(search.target.value)
    if (searchValue) {
      typingTimer = setTimeout(console.log('hello', searchValue, typingTimer), 750)}
    
  }

  return(
    <div>Find Countries: <input value={searchValue} onChange={handleSearch} /></div>
  )
}

const App = () => {
  


  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log(response)
      })
  })

  return(
    <div>
      <Filter />
    </div>
  )
}


export default App