import React from 'react'
import { Button } from 'react-bootstrap';

const WeatherButton = ({ cities, selectedCity, handleCityChange }) => {

    return (
        <div>
            <Button variant={`${selectedCity == null ? "inline-warning" : "warning"}`} onClick={() => handleCityChange("current")}>Current Location</Button>

            {cities.map((city) => (
                <Button variant={`${selectedCity == city ? "inline-warning" : "warning"}`} onClick={() => handleCityChange(city)}>{city}</Button>
            ))}
        </div>
    )
}

export default WeatherButton
