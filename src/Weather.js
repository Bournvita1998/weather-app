import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
    const [location, setLocation] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState('');

    const fetchWeather = async () => {
        setError(''); // Clear previous errors
        try {
            const response = await axios.get(`http://localhost:8080/weather?location=${location}`);
            setWeatherData(response.data);
        } catch (err) {
            if (err.response && err.response.data.error) {
                setError(err.response.data.error);
            } else {
                setError('An error occurred while fetching the weather data.');
            }
            setWeatherData(null); // Clear previous weather data on error
        }
    };

    return (
        <div>
            <h1>Current Weather</h1>
            <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location (e.g., Melbourne, AU)"
            />
            <button onClick={fetchWeather}>Get Weather</button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {weatherData && (
                <div>
                    <h2>Weather in {location}</h2>
                    <p>Temperature: {weatherData.temperature}</p>
                    <p>Description: {weatherData.description}</p>
                </div>
            )}
        </div>
    );
};

export default Weather;
