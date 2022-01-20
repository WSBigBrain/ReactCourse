import React from 'react';
import moment from 'moment';
import '../styles.css';

const date  = new Date();
console.log(date);

const MeteoCard = ({weatherData}) => (

  <div className="main">

      <div className="top">
        <p className="header">{weatherData.name}</p>
        <p className="day"><span>{moment().format('DD/MM/YYYY')}</span></p>
      </div>
      <div className="flex">
        <p className="description">{weatherData.weather[0].description[0].toUpperCase() + weatherData.weather[0].description.substring(1)}</p>
        <p className="time"><span>Heure: {new Date().toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'})}</span></p>      
      </div>

      <div className="flex">
        <p className="temp">Température: {weatherData.main.temp} &deg;C</p>
        <p className="temp">Humidité: {weatherData.main.humidity} %</p>
      </div>

      <div className="flex">
        <p className="sunrise-sunset">Lever de Soleil: {new Date((weatherData.sys.sunrise) * 1000).toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'})}</p>
        <p className="sunrise-sunset">Coucher de Soleil: {new Date((weatherData.sys.sunset) * 1000).toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'})}</p>
      </div>
    
  </div>

)

export default MeteoCard;