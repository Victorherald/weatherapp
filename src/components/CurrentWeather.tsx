import React from 'react';
import { CurrentWeather as CurrentWeatherType } from '../types/weather';
import WeatherIcon from './WeatherIcon';
import WeatherTicker from './WeatherTicker';



interface CurrentWeatherProps {
  weather: CurrentWeatherType;
}

const CurrentWeatherComponent: React.FC<CurrentWeatherProps> = ({ weather }) => {
  const getWeatherGradient = (condition: string) => {
    const gradients = {
      sunny: 'bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400',
      cloudy: 'bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500',
      rainy: 'bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600',
      snowy: 'bg-gradient-to-r from-blue-100 via-white to-blue-200',
      clear: 'bg-gradient-to-r from-sky-300 via-sky-400 to-blue-500',
      storm: 'bg-gradient-to-r from-gray-700 via-gray-900 to-black'
    };
    return gradients[condition as keyof typeof gradients] || 'bg-clear-gradient';
  };

  return (
    <div className={`weather-card rounded-3xl p-8 mb-8 animate-fade-in ${getWeatherGradient(weather.condition)}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">{weather.location}</h2>
          <p className="text-white/80 text-lg">{weather.description}</p>
          <p className="text-sm font-medium text-white-400">
  🕒 Local Time: {new Date(weather.localtime).toLocaleString('en-US', {
    timeZone: weather.timezone,
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })}
</p>
        </div>
        <WeatherIcon condition={weather.condition} size={80} className="text-white" />
      </div>
      
      <div className="flex items-center mb-6">
        <span className="text-6xl font-bold text-white mr-4">{weather.temperature}°</span>
        <div className="text-white/80">
          <p className="capitalize text-xl">{weather.condition}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-white/60 text-sm uppercase tracking-wide">Humidity</p>
          <p className="text-white text-2xl font-semibold">{weather.humidity}%</p>
        </div>
        <div className="text-center">
          <p className="text-white/60 text-sm uppercase tracking-wide">Wind</p>
          <p className="text-white text-2xl font-semibold">{weather.windSpeed} km/h</p>
        </div>
        <div className="text-center">
          <p className="text-white/60 text-sm uppercase tracking-wide">UV Index</p>
          <p className="text-white text-2xl font-semibold">{weather.uvIndex}</p>
        </div>
        <WeatherTicker weather={weather} />
      </div>
    
      

    </div>
  );
};

export default CurrentWeatherComponent;