import React, { useState } from "react";
import Search from "./components/search";
import CurrentWeather from "./components/current-weather/current-weather";
import Forecast from "./components/forecast/forecast";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import "./App.css";

interface WeatherResponse {
  city: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: { description: string; icon: string }[];
  wind: {
    speed: number;
  };
}
interface Weather {
  description: string;
  icon: string;
}

interface Main {
  temp_max: number;
  temp_min: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  feels_like: number;
}

interface Clouds {
  all: number;
}

interface Wind {
  speed: number;
}
interface ForecastItem {
  weather: Weather[];
  main: Main;
  clouds: Clouds;
  wind: Wind;
}

interface ForecastResponse {
  city: string;
  list: ForecastItem[];
}

const App: React.FC = () => {
  const [currentWeather, setCurrentWeather] = useState<WeatherResponse | null>(
    null
  );
  const [forecast, setForecast] = useState<ForecastResponse | null>(null);

  const handleOnSearchChange = (searchData: {
    label: string;
    value: string;
  }) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch(console.log);
  };

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
};

export default App;
