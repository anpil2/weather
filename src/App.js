import './App.css';
import { useEffect, useState } from 'react';
import WeatherBox from './conponent/WeatherBox';
import WeatherButton from './conponent/WeatherButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClipLoader from "react-spinners/ClipLoader";

//1. 시작시 현재 위치기반의 날씨가 보인다.
//2. 도시, 섭씨, 화씨, 날씨상태
//3. 현재도시, 다른 도시 버튼 총 5개
//4. 도시 버튼 클릭시 도시별 날씨가 보인다.
//5. 현재 위치 버튼 클릭시 위치기반의 날씨가 나온다.
//6. 데이터를 가져오는 동안 로딩스피너가 돈다.
function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(false);
  const cities = ["paris", "new york", "tokyo", "seoul"];
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    })
  }

  const getWeatherByCurrentLocation = async (lat, lon) => {
    console.log("현재날씨", lat, lon);
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=663e6215e6f628847d49ab126e8ef31d&units=metric`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setLoading(false);
  }

  const getWeatherBycity = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=663e6215e6f628847d49ab126e8ef31d&units=metric`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setLoading(false);
  }
  useEffect(() => {
    if (city === null) {
      getCurrentLocation();
    } else {
      getWeatherBycity();
    }
  }, [city]);

  const handleCityChange = (city) => {
    console.log("city", city);
    if (city === "current") {
      setCity(null);
    } else {
      setCity(city);
    }
  };

  return (
    <div>
      {loading ? (<div className='container'><ClipLoader color="#f88c6b" loading={loading} size={150} /></div>) :
        (<div className='container'>
          <WeatherBox weather={weather} />
          <WeatherButton cities={cities} handleCityChange={handleCityChange} selectedCity={city}></WeatherButton>>
        </div>
        )
      }
    </div >
  );
}

export default App;
