import React, { useEffect, useState } from 'react'
import axios from 'axios'


const Filter = ({term, search}) => (
  <div>Find Countries: <input value={term} onChange={search}/></div>
)

const DisplayCountries = ({showCountries}) => {

  const flagStyle = {
    width: '200px'
  }

  if (showCountries.length > 10) {
    return (
      <div>There are too many search results.</div>
    )
  }

  if (showCountries.length === 1) {
    let country = showCountries[0]
    return(
      <div>
        <div>
          <h1>{country.name}</h1>
          <p>Capital: {country.capital} </p>
          <p>Population: {country.population} </p>
        </div>    
        <hr />
        <div>
          <h3>Languages</h3>
          <ul>
            {country.languages.map(language =>
              <li key={language.name}>{language.name}</li>
            )}
          </ul> 
        </div>
        <div>
          <img style={flagStyle} src={country.flag} alt="country-flag" />
        </div>
      </div>

    )
  } 
  
  
  return(
    <div>
      {showCountries.map(country => 
        <div key={country.numericCode}>
          {country.name}
          <button  />
        </div>    
      )}
    </div>
   )
  
  

}

const App = () => {
  
  const [ countries, populateCountries ] = useState([])
  const [ searchTerm, changeTerm ] = useState('')
  const [ showCountries, filterCountries ] = useState([])


  const handleTerm = (term) => {
    changeTerm(term.target.value)
    console.log('here it is:', searchTerm)
    console.log(countries.filter(el => el.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ))
    filterCountries(countries.filter(el => el.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ))
    console.log(showCountries, showCountries.length, showCountries.length)
    
  } 

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        populateCountries(response.data)
      })
    
  }, [])



  return(
    <div>
      <Filter term={searchTerm} search={handleTerm} />
      <DisplayCountries showCountries={showCountries} />
      

    </div>
  )
}


export default App