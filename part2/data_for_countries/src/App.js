import {useEffect, useState} from "react";
import axios from "axios";
// require('dotenv').config()


const Country = ({country}) => {
  const languages = Object.keys(country.languages).map(index => country.languages[index])
  const population = country.population
  const capital = country.capital === undefined ? "NOT_FOUND" : country.capital[0]
  const name = country.name.common
  const img = country.flags.png

  const [valid, setValid] = useState(false)
  const [weather, setWeather] = useState({})

  const hook = () => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${process.env.REACT_APP_API_KEY}`)
      .then(response => {
        if (response.data.cod === "404") setValid(false)
        else {
          setValid(true)
          setWeather({
            temperature: response.data.main.temp,
            wind_speed: response.data.wind.speed,
            wind_direction: response.data.wind.deg,
            icon: response.data.weather[0].icon})
        }
      }).catch(error => {
      console.log("catch error")
    })
  }

  useEffect(hook, [])

  return (
    <div>
      <h2>{name}</h2>
      <div>capital {capital}</div>
      <div>population {population}</div>
      <h3>languages</h3>
      <ul>
        {languages.map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={img}/>
      <h3>Weather in {capital}</h3>
      {valid === true ?
        <div>
          <div>temperature: {weather.temperature} Kelvin</div>
          <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}/>
          <div>wind: {weather.wind_speed} meter/sec  direction {weather.wind_direction} degree</div>
        </div>
        :
        <div>NOT FOUND</div>
      }
    </div>
  )
}

const Countries = ({countries}) => {
  const [show, setShow] = useState(countries.map(country => false))
  if (countries.length > 10)
    return (
      <div>Too many countries, specify another filter</div>
    )
  else if (countries.length === 1) {
    return (
      <Country country={countries[0]}/>
    )
  }
  else {
    const handler = (index) => {
      const copy = [...show]
      copy[index] = !copy[index]
      setShow(copy)
    }

    return (
      <div>
          {countries.map((country, index) =>
          <div key={index}>
            {show[index] === true ?
              <div>
                <Country country={country}/>
                <button onClick={() => handler(index)}>
                  hide
                </button>
              </div>
               :
              <div>{country.name.common}
                <button onClick={() => handler(index)}>
                  show
                </button>
              </div>}
            </div>)}
      </div>
    )
  }

}

const App = () => {
  const [filter, setFilter] = useState("")
  const [countries, setCountries] = useState([])

  console.log(process.env.REACT_APP_API_KEY)

  const hook = () => {
    axios.get(`https://restcountries.com/v3.1/name/${filter}`)
      .then(response => {
        setCountries(response.data)
      }).catch(error => {
        console.log("catch error")
    })
    console.log("get countries, length is ", countries.length)
  }

  const filterHandler = (event) => {
    setFilter(event.target.value)
  }

  useEffect(hook, [filter])

  return (
    <div>
      <div>
        find countries <input value={filter} onChange={filterHandler}/>
      </div>
    <Countries countries={countries}/>
    </div>
  );
}

export default App;
