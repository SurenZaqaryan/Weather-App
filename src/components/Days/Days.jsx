import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './style.module.css';
import { changeDay } from '../../redux/weatherSlice';

function Days() {
  const { day: currentDay } = useSelector((state) => state.weather);
  const dispatch = useDispatch();
  const days = [1, 2, 3, 4, 5];

  const handleChangeDay = (day) => {
    dispatch(changeDay({ day }));
  };

  return (
    <div className={styles.days_container}>
      <div className={styles.days_wrapper}>
        {days.map((day) => {
          return (
            <div
              key={day}
              onClick={() => handleChangeDay(day)}
              style={{
                border: currentDay === day ? '5px solid green' : '1px solid grey',
              }}
              className={styles.day}>
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Days;
