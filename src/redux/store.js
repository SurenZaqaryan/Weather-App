import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './weatherSlice.js';

export default configureStore({
  reducer: {
    weather: weatherReducer,
  },
});
