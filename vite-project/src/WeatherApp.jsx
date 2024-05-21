import { useState } from "react"
import "./WeatherApp.css"

export const WeatherApp = () => {

  const [city, setCity] = useState("")
  const [weatherData, setWeatherData] = useState(null)

  const urlBase = "https://api.openweathermap.org/data/2.5/weather"
  const apiKey = "YOUR_API_KEY"
  const difKelvin = 273.15 //Para pasar de Kelvin a Celsius

  const fetchWeatherData = async () => {
    try {
      const res = await fetch(`${urlBase}?q=${city}&appid=${apiKey}&lang=es`)
      const data = await res.json()
      setWeatherData(data)

    } catch (error) {
      console.error("Ha habido un error: " + error);
    }
  }

  const handleCityChange = (event) => {
    setCity(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    fetchWeatherData()
    setCity("")
  }

  return (
    <div className="container">
      <h1>SKY WATCH</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Ingrese una ciudad" value={city} onChange={handleCityChange}/>
        <button type="submit">Buscar</button>
      </form>

      {weatherData && (
        <div>
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p>La temperatura es de {Math.round(weatherData.main.temp)  - Math.round(difKelvin)}°C.</p>
          <p>Actualmente se encuentra con {weatherData.weather[0].description}</p>
          <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={weatherData.weather[0].description} />
        </div>
      )}
    </div>
  )
}

