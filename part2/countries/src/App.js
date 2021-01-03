import React, { useEffect, useState } from 'react'
import axios from 'axios'

require('dotenv').config()

// The weather request is a bit buggy still


const weather_api_key = process.env.REACT_APP_API_KEY_WEATHER

const Filter = ({term, search}) => (
  <div>Find Countries: <input value={term} onChange={search}/></div>
)

const Weather = ({weatherResults}) => {

  console.log(weatherResults)

  return(

    <div>
      <h3>Current Weather in {weatherResults.country}</h3>
      <p>Temperature: {weatherResults.temp}</p>
      <img src={weatherResults.icon} alt={"weather-icon"} />

      <p>Wind Speed: {weatherResults.windSpeed} </p>
      <p>Wind Direction: {weatherResults.windDir} </p>
    </div>
  )

}

const DisplayCountries = ({newFilter, setSoloCountry, soloCountry, setWeather}) => {

  console.log(newFilter)

 
  const flagStyle = {
    width: '200px'
  }

    // If search result is One Country
    // Or Show Country was Clicked
  if (newFilter.length === 1 || soloCountry !== '') {
    let country = newFilter[0]

    setWeather(country)
  

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

    // If too many results
  if (newFilter.length > 10) {
    return (
      <div>There are too many search results.</div>
    )
  }

    // If no results
  if (newFilter.length === 0) (<div>There are no results.</div>)
  
    // Otherwise display list of related Countries
  return(
    <div>
      {newFilter.map(country => 
        <div key={country.numericCode}>
          {country.name}
          <button name={country.name} onClick={(name) => {
            setSoloCountry(country)
            setWeather(country) }} >Show This Country</button>
        </div>    
      )}
    </div>
   )
  
  

}

const App = () => {
  
  const [ countries, populateCountries ] = useState([])
  const [ searchTerm, changeTerm ] = useState('')
  // const [ showCountries, filterCountries ] = useState([])
  const [ currentWeather, populateWeather ] = useState({
    icon: 'no',
    temp: 'no',
    windSpeed: 'no',
    windDir: 'no'
  })
  const [ showSoloCountry, setSoloCountry ] = useState('')

    // App is running one event behind, but functional.

  const doFilter = (filterValue) => (
    countries.filter(el => el.name.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1)
  )

  let showCountries = doFilter(searchTerm)

  const handleTerm = (term) => {
    populateWeather({temp: "no"})
    setSoloCountry('')
    showCountries = doFilter(term.target.value)
    changeTerm(term.target.value)
    console.log(searchTerm, showCountries);
  } 

  const handleWeather = (country) =>  {
    console.log(currentWeather.temp)
    if (currentWeather.temp === 'no' && country.capital) {
      let params = {
        access_key: weather_api_key,
        query: country.capital
      }
      console.log(params);
      axios
        .get('http://api.weatherstack.com/current', {params})
        .then(response => {
          console.log(response.data.current, response)
          let results = response.data.current
          populateWeather({
            temp: results.temperature,
            icon: results.weather_icons[0],
            windSpeed: results.wind_speed,
            windDir: results.wind_dir,
            country: country.capital

          })
        }).catch(error => {
          console.log('An error has occurred...', error)
          populateWeather({temp: 'no'})
        })
    }    
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
      <DisplayCountries setWeather={handleWeather}
      newFilter={showCountries} setSoloCountry={setSoloCountry} soloCountry={showSoloCountry} />
      { currentWeather.temp !== 'no'
        ? <Weather weatherResults={currentWeather} />
        : <div></div>
      }
    </div>
  )
}


export default App