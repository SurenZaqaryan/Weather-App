import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getCurrentWeather = createAsyncThunk(
  'weather/getCurrentWeather',
  async ({ city }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cfeb06fec4697eff5307bad375036886`,
      );

      if (!response.ok) {
        return rejectWithValue({ message: response.message });
      }
      console.log(100);
      const data = await response.json();
      return data;
    } catch (err) {
      alert(err.message);
      console.log(err);
    }
  },
);

export const getForecast = createAsyncThunk(
  'weather/getForecast',
  async ({ city }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=cfeb06fec4697eff5307bad375036886`,
      );

      if (!response.ok) {
        return rejectWithValue({ message: response.message });
      }

      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  },
);

const initialState = {
  currentWeather: null,
  day: 1,
  forecast: null,
  isCelsius: true,
  isLoading: false,
  error: null,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    changeCelsiusOrFahrenheit(state, action) {
      state.isCelsius = action.payload.isCelsius;
    },
    changeDay(state, action) {
      state.day = action.payload.day;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentWeather.fulfilled, (state, action) => {
        state.currentWeather = action.payload;
        state.isLoading = false;
      })
      .addCase(getCurrentWeather.rejected, (state) => {
        alert('There is no such city.');
        state.isLoading = false;
      })
      .addCase(getForecast.fulfilled, (state, action) => {
        state.forecast = action.payload;
        state.isLoading = false;
      });
  },
});

export default weatherSlice.reducer;
export const { changeCelsiusOrFahrenheit, changeDay } = weatherSlice.actions;
