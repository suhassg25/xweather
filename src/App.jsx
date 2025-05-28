import { useState } from 'react'
import './App.css'

function App() {

  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClick = async(e) => {
    e.preventDefault();
    setLoading(true);
     try {
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?Key=44679c4df7fa4c71b1e90551252805&q=${e.target[0].value}`);
      if (!response.ok) {
        alert('Failed to fetch weather data');
        return;
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      alert('Failed to fetch weather data');
      console.error('Error fetching weather data:', error);
    }
{weatherData.current}
   
   
  }
  

  return (
    <div className='weather-app' style={{ background: 'cyan', width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', gap:30 }} onSubmit={(e) => {handleClick(e)}}>
      <form style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: 100 }}>
        <input type="text" required style={{ height: 35, width: 290 }} value={city} onChange={(e) => setCity(e.currentTarget.value)} />
        <button style={{ background: 'green', color: 'white' }}>Search</button>
      </form>
      {loading && <p>Loading data...</p>}
    </div>
  )
}

export default App
