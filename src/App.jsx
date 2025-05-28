import { useState } from 'react'
import './App.css'
import Cards from "./Cards.jsx";

function App() {

  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    setWeatherData(null);
    setLoading(true);
    try {
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?Key=44679c4df7fa4c71b1e90551252805&q=${e.target[0].value}`);
      if (!response.ok) {
        alert('Failed to fetch weather data');
        return;
      }
      const data = await response.json();
      console.log(data);
      const { temp_c, humidity, condition, wind_kph } = data.current;
      let weatherObject = {
        Temparature: `${temp_c}°C`,
        Humidity: `${humidity}%`,
        Condition: condition.text,
        'Wind Speed': `${wind_kph} kph`
      }
      setWeatherData(weatherObject);
    } catch (error) {
      alert('Failed to fetch weather data');
      console.error('Error fetching weather data:', error);
    }
    setLoading(false);
  }


  return (
    <div className='weather-app' style={{ background: 'cyan', width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30 }} onSubmit={(e) => { handleClick(e) }}>
      <form style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: 100 }}>
        <input type="text" required style={{ height: 35, width: 290 }} value={city} onChange={(e) => setCity(e.currentTarget.value)} />
        <button style={{ background: 'green', color: 'white' }}>Search</button>
      </form>
      {loading && <p>Loading data...</p>}
      {weatherData && (
        <div className='weather-cards' style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap: '30px'}}>
          {Object.entries(weatherData).map(([key, value])=>(
            <Cards key={key} title={key} data={value}/>
          ))}

        </div>
      )}
    </div>
  )
}

export default App
