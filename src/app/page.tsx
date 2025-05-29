import React from 'react';
import { ThemeProvider } from '../contexts/ThemeContext';
import WeatherDashboard from '../components/WeatherDashboard';
import WeatherTicker from '../components/WeatherTicker';
const Index = () => {

  return (

    <ThemeProvider>
      <WeatherDashboard />
    </ThemeProvider>
  );
};

export default Index;

