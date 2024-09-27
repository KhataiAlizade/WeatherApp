import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./forecast.css";

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

interface ForecastData {
  list: ForecastItem[];
}

interface ForecastProps {
  data: ForecastData | null;
}

// Weekdays array
const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const Forecast: React.FC<ForecastProps> = ({ data }) => {
  if (!data) {
    return <div>No data available</div>;
  }

  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInAWeek)
  );

  return (
    <>
      <Typography variant="h5" className="title">
        Daily Forecast
      </Typography>
      {data.list.slice(0, 7).map((item, idx) => (
        <Accordion style={{marginBottom:"15px"}} key={idx}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <div className="daily-item">
              <img
                src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                className="icon-small"
                alt="weather"
              /> 
              <label className="day">{forecastDays[idx]}</label>
              <label className="description">
                {item.weather[0].description}
              </label>
              <label className="min-max">
                {Math.round(item.main.temp_max)}°C /
                {Math.round(item.main.temp_min)}°C
              </label>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className="daily-details-grid">
              <div className="daily-details-grid-item">
                <label>Pressure:</label>
                <label>{item.main.pressure}</label>
              </div>
              <div className="daily-details-grid-item">
                <label>Humidity:</label>
                <label>{item.main.humidity}</label>
              </div>
              <div className="daily-details-grid-item">
                <label>Clouds:</label>
                <label>{item.clouds.all}%</label>
              </div>
              <div className="daily-details-grid-item">
                <label>Wind speed:</label>
                <label>{item.wind.speed} m/s</label>
              </div>
              <div className="daily-details-grid-item">
                <label>Sea level:</label>
                <label>{item.main.sea_level} m</label>
              </div>
              <div className="daily-details-grid-item">
                <label>Feels like:</label>
                <label>{item.main.feels_like}°C</label>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

export default Forecast;
