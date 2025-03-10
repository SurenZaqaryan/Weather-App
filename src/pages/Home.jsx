import React from 'react';
import Header from '../components/Header/Header';
import CurrentWeatherSection from '../components/CurrentWeatherSection/CurrentWeatherSection';
import Days from '../components/Days/Days';

function Home() {
  return (
    <>
      <Header />
      <CurrentWeatherSection />
      <Days />
    </>
  );
}

export default Home;
