import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import searchLens from './images/searchlens.png';
import cloudIcon from './images/cloud2.png';
import humidityIcon from './images/humidity1.png';
import windIcon from './images/wind.png';

function Home() {
  const [city, setCity] = useState('');
  const [error, setError] = useState('');

  const [data, setData] = useState({
    celcius: 10,
    name: 'Lahore',
    humidity: 10,
    windspeed: 2,
  });

  const handleClick = () => {
    if (city !== '') {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid={Your_API_KEY}&units=metric`;
      axios
        .get(apiUrl)
        .then((res) => {
          setData({
            celcius: res.data.main.temp,
            name: res.data.name,
            humidity: res.data.main.humidity,
            windspeed: res.data.wind.speed,
          });
          setError('');
        })
        .catch((err) => {
          if (err.response && err.response.status === 404) {
            setError('Invalid City Name🤐');
          }
          console.log(err);
        });
    }
  };

  useEffect(() => {
    const apiUrl =
      'https://api.openweathermap.org/data/2.5/weather?q=Lahore&appid={Your_API_KEY}&units=metric';
    axios
      .get(apiUrl)
      .then((res) => {
        setData({
          celcius: res.data.main.temp,
          name: res.data.name,
          humidity: res.data.main.humidity,
          windspeed: res.data.wind.speed,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container">
      <div className="weather">
        <div className="search">
          <input
            type="text"
            placeholder="Enter City Name"
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={handleClick}>
            <img src={searchLens} alt="search icon" />
          </button>
        </div>

        {error && <div className="error">{error}</div>}

        <div className="winfo">
          <img src={cloudIcon} alt="weather icon" width="200px" height="200px" />
          <h1>{Math.round(data.celcius)}°C</h1>
          <h2>{data.name}</h2>

          <div className="details">
            <div className="col">
              <img src={humidityIcon} width="50px" height="50px" alt="humidity" />
              <div className="humidity">
                <p>{Math.round(data.humidity)}%</p>
                <p>Humidity</p>
              </div>
            </div>

            <div className="col">
              <img src={windIcon} width="50px" height="50px" alt="wind" />
              <div className="wind">
                <p>{Math.round(data.windspeed)} km/h</p>
                <p>Wind</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
