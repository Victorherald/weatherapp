'use client'

import React, { useState, useEffect } from 'react';
import CurrentWeatherComponent from './CurrentWeather';
import WeeklyForecast from './WeeklyForecast';
import SeasonalView from './SeasonalView';
import ApiKeyInput from './ApiKeyInput';
import { currentWeather as mockCurrentWeather, weeklyForecast as mockWeeklyForecast, seasonalData } from '../data/weatherData';
import { fetchCurrentWeather, fetchWeeklyForecast } from '../services/weatherApi';
import { CurrentWeather, WeatherData } from '../types/weather'


const WeatherDashboard: React.FC = () => {
  const [activeView, setActiveView] = useState<'forecast' | 'seasonal'>('forecast');
  const [apikey, setApiKey] = useState('');
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather>(mockCurrentWeather);
  const [weeklyForecast, setWeeklyForecast] = useState<WeatherData[]>(mockWeeklyForecast);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Get current season based on date
  const getCurrentSeason = () => {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return 'spring';
    if (month >= 5 && month <= 7) return 'summer';
    if (month >= 8 && month <= 10) return 'fall';
    return 'winter';
  };

  const currentSeason = getCurrentSeason();

  const loadWeatherData = async (key: string) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Fetching weather data with API key...');
      const [current, forecast] = await Promise.all([
        fetchCurrentWeather(key),
        fetchWeeklyForecast(key)
      ]);
      
      setCurrentWeather(current);
      setWeeklyForecast(forecast);
      console.log('Weather data loaded successfully');
    } catch (err) {
      console.error('Failed to fetch weather data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      // Keep using mock data on error
      setCurrentWeather(mockCurrentWeather);
      setWeeklyForecast(mockWeeklyForecast);
    } finally {
      setLoading(false);
    }
  };

  const handleApiKeyChange = (ApiKey: string) => {
    setApiKey(ApiKey);
    if (ApiKey) {
      loadWeatherData(ApiKey);
    } else {
      // Reset to mock data when API key is cleared
      setCurrentWeather(mockCurrentWeather);
      setWeeklyForecast(mockWeeklyForecast);
      setError(null);
    }
  };

  useEffect(() => {
    const savedApiKey = localStorage.getItem('rapidapi-weather-key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
      loadWeatherData(savedApiKey);
    }
  }, []);

  return (
    
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2 animate-fade-in">
              Weather Dashboard
            </h1>
            <p className="text-muted-foreground text-lg animate-slide-in">
              Stay updated with current conditions and forecasts
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm text-muted-foreground">Current Season:</span>
              <span className="text-sm font-semibold text-foreground capitalize">{currentSeason}</span>
              <button
                onClick={() => setActiveView('seasonal')}
                className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
              >
                View Season
              </button>
            </div>
          </div>
          
        </div>

        {/* API Key Input */}
        <ApiKeyInput onApiKeyChange={handleApiKeyChange} />

        {/* Loading State */}
        {loading && (
          <div className="text-center py-4 text-blue-600 dark:text-blue-400">
         
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50">
            <p className="font-medium">Error loading weather data{apikey}</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Current Weather */}
        <CurrentWeatherComponent weather={currentWeather} />


        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-6 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl animate-slide-in">
          <button
            onClick={() => setActiveView('forecast')}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
              activeView === 'forecast'
                ? 'bg-white dark:bg-gray-700 text-foreground shadow-md'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
           Today and Future Forecasts 
          </button>
          <button
            onClick={() => setActiveView('seasonal')}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
              activeView === 'seasonal'
                ? 'bg-white dark:bg-gray-700 text-foreground shadow-md'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Seasonal View
          </button>
        </div>

        {/* Content */}
        <div className="transition-all duration-500">
          {activeView === 'forecast' ? (
            <WeeklyForecast forecast={weeklyForecast} />
          ) : (
            <SeasonalView seasons={seasonalData} currentSeason={currentSeason} />
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;
