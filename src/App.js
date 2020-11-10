import React, { useState, useEffect } from 'react'
import axios from 'axios'
require('dotenv').config()
const api_key = process.env.REACT_APP_API_KEY_WEATHER

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  console.log('Hello useCountry')
  const test = 'nepal'
  console.log(name)

  useEffect(() => {
    console.log('Hello useEffect')
    if (name) {
      axios
        .get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
        .then((res) => {
          console.log(res.data)
          setCountry(res.data[0])
        })
        .catch((err) => setCountry(null))
    }
  }, [name])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return <div>not found...</div>
  }

  console.log('Country data from Country:', country)

  return (
    <div>
      <h3>{country.name} </h3>
      <div>capital {country.capital} </div>
      <div>population {country.population}</div>
      <img src={country.flag} height='100' alt={`flag of ${country.name}`} />
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  console.log('name from App', name)

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
