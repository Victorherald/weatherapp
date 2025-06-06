'use client';

import React, { useState, useEffect } from 'react';
import CurrentWeatherComponent from './CurrentWeather';
import WeeklyForecast from './WeeklyForecast';
import SeasonalView from './SeasonalView';
import ApiKeyInput from './ApiKeyInput';
import {
  currentWeather as mockCurrentWeather,
  weeklyForecast as mockWeeklyForecast,
} from '../data/weatherData';
import { fetchCurrentWeather, fetchWeeklyForecast } from '../services/weatherApi';
import { CurrentWeather, WeatherData, SeasonalData } from '../types/weather';

/* ──────────────── tropical helper ──────────────── */
const tropicalCountries = [
  'Nigeria','Ghana','Kenya','Brazil','Indonesia','Philippines','Thailand','India','Malaysia',
  'Colombia','Vietnam','Peru','Congo','Uganda','Tanzania','Sri Lanka','Ecuador','Myanmar',
  'Cambodia','Laos','Panama','Costa Rica','Honduras','El Salvador','Guatemala','Paraguay',
  'Venezuela','Bangladesh','Nepal','Papua New Guinea','Madagascar','Zambia','Mozambique',
  'Nicaragua','Haiti','Dominican Republic','Cameroon','Senegal','Ivory Coast',
];

/* Build seasons dynamically */
const buildSeasonData = (isTropical: boolean): SeasonalData[] =>
  isTropical
    ? [
        {
          season: 'dry',
          avgTemperature: 32,
          avgPrecipitation: 20,
          commonConditions: ['sunny', 'clear skies'],
          description: 'Hot and sunny with minimal rainfall.',
        },
        {
          season: 'wet',
          avgTemperature: 28,
          avgPrecipitation: 80,
          commonConditions: ['rain', 'thunderstorms', 'humid'],
          description: 'Frequent rain and high humidity.',
        },
      ]
    : [
        {
          season: 'spring',
          avgTemperature: 15,
          avgPrecipitation: 40,
          commonConditions: ['flowers', 'mild breeze'],
          description: 'Mild temps and blossoming nature.',
        },
        {
          season: 'summer',
          avgTemperature: 28,
          avgPrecipitation: 30,
          commonConditions: ['hot', 'sunny'],
          description: 'Hot and vibrant, perfect for outdoors.',
        },
        {
          season: 'fall',
          avgTemperature: 18,
          avgPrecipitation: 35,
          commonConditions: ['cool', 'windy'],
          description: 'Cooling air and colourful leaves.',
        },
        {
          season: 'winter',
          avgTemperature: 5,
          avgPrecipitation: 20,
          commonConditions: ['cold', 'snow'],
          description: 'Cold season with shorter days.',
        },
      ];

const WeatherDashboard: React.FC = () => {
  const [activeView, setActiveView] = useState<'forecast' | 'seasonal'>('forecast');
  const [apiKey, setApiKey] = useState('');
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather>(mockCurrentWeather);
  const [weeklyForecast, setWeeklyForecast] = useState<WeatherData[]>(mockWeeklyForecast);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* ─── helpers ─── */
  const computeCurrentSeason = (isTropical: boolean): string => {
    const m = new Date().getMonth(); // 0‑Jan … 11‑Dec
    if (isTropical) return [4,5,6,7,8,9].includes(m) ? 'wet' : 'dry';
    if (m >= 2 && m <= 4) return 'spring';
    if (m >= 5 && m <= 7) return 'summer';
    if (m >= 8 && m <= 10) return 'fall';
    return 'winter';
  };

  /* ─── data fetch ─── */
  const loadWeatherData = async (key: string) => {
    setLoading(true);
    setError(null);
    try {
      const [curr, forecast] = await Promise.all([
        fetchCurrentWeather(key),
        fetchWeeklyForecast(key),
      ]);
      setCurrentWeather(curr);
      setWeeklyForecast(forecast);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      setCurrentWeather(mockCurrentWeather);
      setWeeklyForecast(mockWeeklyForecast);
    } finally {
      setLoading(false);
    }
  };

  const handleApiKeyChange = (key: string) => {
    setApiKey(key);
    key ? loadWeatherData(key) : setError(null);
  };

  useEffect(() => {
    const saved = localStorage.getItem('rapidapi-weather-key');
    if (saved) {
      setApiKey(saved);
      loadWeatherData(saved);
    }
  }, []);

  /* ─── derive season info ─── */
  const country = currentWeather.location.split(', ').at(-1) ?? '';
  const isTropical = tropicalCountries.includes(country);
  const seasonalData = buildSeasonData(isTropical);
  const currentSeason = computeCurrentSeason(isTropical);

  /* ─── UI ─── */
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">Weathermax Dashboard</h1>
            <p className="text-muted-foreground text-lg">Stay updated with current conditions and forecasts</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm text-muted-foreground">Current Season:</span>
              <span className="text-sm font-semibold capitalize">{currentSeason}</span>
              <button
                onClick={() => setActiveView('seasonal')}
                className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
              >
                View Season
              </button>
            </div>
          </div>
        </div>

        {/* api key input */}
        <ApiKeyInput onApiKeyChange={handleApiKeyChange} />

        {/* errors */}
        {error && (
          <div className="bg-red-50 p-4 rounded text-red-700 mb-4">
            <p className="font-medium">Error: {error}</p>
          </div>
        )}

        {/* current weather */}
        <CurrentWeatherComponent weather={currentWeather} />

        {/* tabs */}
        <div className="flex space-x-1 mb-6 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
          {(['forecast', 'seasonal'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveView(tab)}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition ${
                activeView === tab
                  ? 'bg-white dark:bg-gray-700 text-foreground shadow'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab === 'forecast' ? 'Today & Future Forecasts' : 'Seasonal View'}
            </button>
          ))}
        </div>

        {/* content */}
        {activeView === 'forecast' ? (
          <WeeklyForecast forecast={weeklyForecast} />
        ) : (
          <SeasonalView seasons={seasonalData} currentSeason={currentSeason} />
        )}
      </div>
    </div>
  );
};

export default WeatherDashboard;
