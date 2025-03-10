import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentWeather, getForecast } from '../../redux/weatherSlice';
import styles from './style.module.css';

function CurrentWeatherSection() {
  const dispatch = useDispatch();
  const { currentWeather, isCelsius, forecast, day } = useSelector((state) => state.weather);

  useEffect(() => {
    dispatch(getCurrentWeather({ city: 'Yerevan' }));
    dispatch(getForecast({ city: 'Yerevan' }));
  }, [dispatch]);

  const getCelsiusOrFahrenheit = (temp, isCelsius) => {
    if (isCelsius) {
      return (temp - 273.15).toFixed() + ' C';
    } else {
      return ((temp - 273.15) * 1.8 + 32).toFixed() + ' F';
    }
  };

  const forecastList = forecast?.list?.map((item) => {
    const day = item.dt_txt?.slice(8, 10);
    return { ...item, day };
  });

  const keys = forecastList?.map((item) => item.day);
  const uniqKeys = [...new Set(keys)];

  return (
    <div className={styles.current_weather_section_container}>
      <div className={styles.current_weather_section_wrapper}>
        <div className={styles.current_weather_section_left_block}>
          <div>
            <h2>{currentWeather?.name || ''}</h2>
            <h1>{getCelsiusOrFahrenheit(currentWeather?.main?.temp, isCelsius)}</h1>
          </div>
          <div className={styles.current_weather_main}>
            {currentWeather?.weather[0]?.main || ''}
          </div>
        </div>
        <div className={styles.current_weather_section_right_block}>
          {forecastList
            ?.filter((item) => item.day === uniqKeys[day - 1])
            ?.map((item) => {
              return (
                <div key={item?.dt} className={styles.hourly_static_row}>
                  <h2>{item?.dt_txt}</h2>
                  <h3>{getCelsiusOrFahrenheit(item?.main?.temp, isCelsius)}</h3>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default CurrentWeatherSection;
