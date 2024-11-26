import React, { useEffect, useRef, useState } from 'react'
import "./weather.css"
import searchIcon from "../assets/search.svg"
import cloudyIcon from "../assets/cloudy.svg"
import heavyIcon from "../assets/heavy-rain.svg"
import humidityIcon from "../assets/humidity.svg"
import rainIcon from "../assets/rain.svg"
import snowIcon from "../assets/snow.svg"
import windIcon from "../assets/wind.svg"
import sunIcon from "../assets/sun.svg"


function Weather() {
  let inputRef=useRef()
  let [weatherData,setWeatherData]=useState(false)
  let allIcons={
    "01d":sunIcon,
    "01n":sunIcon,
    "02d":cloudyIcon,
    "02n":cloudyIcon,
    "03d":cloudyIcon,
    "03n":cloudyIcon,
    "04d":rainIcon,
    "04n":rainIcon,
    "09d":heavyIcon,
    "09n":heavyIcon,
    "10d":heavyIcon,
    "10n":heavyIcon,
    "13d":snowIcon,
    "13n":snowIcon,
  }
  let search=async(city="london")=>{
    if(!city){
      alert("Enter the city name")
      return false
    }
    try{
      let key="88cd35009cc88ac7b7672da867b1dba6"
      let url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`
      let response=await fetch(url)
      let data=await response.json()
      console.log(data);

      if(!response.ok){
        alert(data.message)
        return false
      }

      let icon=allIcons[data.weather[0].icon]||sunIcon
      setWeatherData({
        humidity:data.main.humidity,
        WindSpeed:data.wind.speed,
        Temperature:Math.floor(data.main.temp),
        Location:data.name,
        icon:icon
      })
    }
    
    catch(err){
      console.log(err.message);
      setWeatherData(false)

    }
  
  }
  useEffect(()=>{
    search("london")
  },[])
  return (
    <div className='weather'>
        <div className='search-bar'>
            <input type='text'ref={inputRef} placeholder='Search'/>
            <img src={searchIcon} alt="" onClick={()=>search(inputRef.current.value)}/>
        </div>
        {weatherData ? <>
          <img src={weatherData.icon} alt="" className='weather-icon'/>
        <p className='temperature'>{weatherData.Temperature}°C</p>
        <p className='location'>{weatherData.Location}</p>
        <div className='weather-data'>
          <div className='col'>
            <img src={humidityIcon} alt=""/>
            <div>
              <p>{weatherData.humidity}%</p>
              <span>Humidity</span>
            </div>
          </div>
          <div className='col'>
            <img src={windIcon} alt=""/>
            <div>
              <p>{weatherData.WindSpeed}km/hr</p>
              <span>Wind Speed</span>
            </div>
          </div>

        </div>
        </>:<></>}
     
    </div>
  )
}

export default Weather