import React, { useState } from 'react';
import styles from './style.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeCelsiusOrFahrenheit,
  getCurrentWeather,
  getForecast,
} from '../../redux/weatherSlice';

function Header() {
  const dispatch = useDispatch();
  const [city, setCity] = useState('');

  const handleChangeIsCelsius = (e) => {
    const isCelsius = e.target.id === 'celsius' ? true : false;
    dispatch(changeCelsiusOrFahrenheit({ isCelsius }));
  };

  const { isCelsius } = useSelector((state) => state.weather);

  const handleSearchCity = (e) => {
    e.preventDefault();
    dispatch(getCurrentWeather({ city }));
    dispatch(getForecast({ city }));
  };

  return (
    <header className={styles.header}>
      <div className={styles.header_container}>
        <form className={styles.header_left_block} onSubmit={handleSearchCity}>
          <input
            type="text"
            className={styles.radio_input}
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button disabled={!city} className={styles.search_btn}>
            Search City
          </button>
        </form>
        <div className={styles.header_right_block}>
          <label htmlFor="celsius" className={styles.radio_input_label}>
            <input
              id="celsius"
              type="radio"
              checked={isCelsius}
              name="weather"
              onChange={handleChangeIsCelsius}
            />
            <span>C</span>
          </label>
          <label htmlFor="fahrenheit" className={styles.radio_input_label}>
            <input
              id="fahrenheit"
              type="radio"
              checked={!isCelsius}
              name="weather"
              onChange={handleChangeIsCelsius}
            />
            <span>F</span>
          </label>
        </div>
      </div>
    </header>
  );
}

export default Header;
