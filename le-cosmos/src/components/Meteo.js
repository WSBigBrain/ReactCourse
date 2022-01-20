import { useState, useEffect } from "react";
import { Input } from "antd";
import MeteoCard from "./MeteoCard";


const Meteo = () => {

    const [lat, setLat] = useState([]);
    const [long, setLong] = useState([]);
    const [data, setData] = useState([]);
    const [state, setState] = useState([]);
    

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function(position) {
          setLat(position.coords.latitude);
          setLong(position.coords.longitude);
          setState(1);
        })
    }, []);
  
    useEffect(() => {
      const fetchData = async () => {
      await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&lang=fr&APPID=8cb6f41a2822bd9a2ac3dbff84e1d5ca`)
      .then(res => res.json())
      .then(result => {
        setData(result)
        console.log(result);
        });
      }
      fetchData();
    }, [state]);

const { Search } = Input;

const onSearch = value => { 
  console.log(value);
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${value}&units=metric&lang=fr&APPID=8cb6f41a2822bd9a2ac3dbff84e1d5ca`)
    .then(res => res.json())
    .then(result => {
      setLat(result.coord.lat);
      setLong(result.coord.lon);
      setData(result);
      console.log(lat);
      console.log(long);
      console.log(data);
    });
}

    return (
      <div className="App">
        <header>
          <h1>Météo</h1>
        </header>
        <Search placeholder="Où souhaitez-vous voir la météo" onSearch={onSearch} style={{ width: 700 }} />
        <br/><br/>
        {(typeof data.main != 'undefined') ? (
          <MeteoCard weatherData={data}/>
        ): (
          <div></div>
        )}
      </div>
    );

};

export default Meteo;