import { useEffect, useState } from 'react'
import axios from 'axios'

const api_key = import.meta.env.VITE_SOME_KEY

const CountryInformation = ({ countries, setSearch }) => {
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    if (countries.length === 1) {
      const country = countries[0]
      const [lat, lon] = country.capitalInfo.latlng
      axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)
      .then(response => {
        setWeatherData(response.data)
        console.log(response.data)
      })
    }
    else {
      setWeatherData(null)
    }
  }, [countries])

  if (countries.length > 10) {
    return (
      <div>Too many matches, specify another filter.</div>
    )
  }

  else if (countries.length > 1) {
    return (
      <div>
        {countries.map(country => (
          <div key={country.name.common}>
            {`${country.name.common} `}
            <button onClick={() => setSearch(country.name.common)}>show</button>
          </div>
        ))}
      </div>
    )
  }

  else if (countries.length === 1) {
    const country = countries[0]

    return (
      <div>
        <h1>{country.name.official}</h1>
        <div>Capital: {country.capital[0]}</div>
        <div>Area: {country.area}</div>
        <h2>Languages</h2>
        <ul>
          {Object.values(country.languages).map(language => <li key={language}>{language}</li> )}
        </ul>
        <img src={country.flags.png} alt="" />
        
        {
          weatherData ? (
            <div>
              Temperature {(weatherData.main.temp - 273.15).toFixed(2)} Celsius
              <br />
              <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="" />
              <br />
              Wind {weatherData.wind.speed} m/s
            </div>
          )
          : (<div>ss</div>)
        }

      </div>
    )
  }

  else {
    return null
  }
}

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
    .get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => {
      if (search) {
        setCountries(response.data.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase())))
      }
      else setCountries([])    
    })
  }, [search])

  const onSearch = event => {
    setSearch(event.target.value)
  }

  return (
    <div>
      find countries
      <input value={search} onChange={onSearch}></input>
      <CountryInformation countries={countries} setSearch={setSearch} />
    </div>
  )
}

export default App
