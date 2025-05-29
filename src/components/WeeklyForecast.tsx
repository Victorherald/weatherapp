import React from 'react';
import { WeatherData } from '@/types/weather';
import WeatherIcon from './WeatherIcon';

interface WeeklyForecastProps {
  forecast: WeatherData[];
}

const WeeklyForecast: React.FC<WeeklyForecastProps> = ({ forecast }) => {
  return (
    <div className="weather-card rounded-2xl p-6 mb-8 animate-slide-in">
      <h3 className="text-2xl font-bold mb-6 text-foreground">7-Day Forecast</h3>
      <div className="space-y-4">
        {forecast.map((day, index) => (
          <div 
            key={day.id} 
            className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 hover:shadow-md transition-all duration-300 hover:scale-[1.02]"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center space-x-4">
              <WeatherIcon condition={day.condition} size={32} />
              <div>
                <p className="font-semibold text-foreground">{day.day}</p>
                <p className="text-sm text-muted-foreground">{day.date}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Temp</p>
                <p className="font-bold text-lg text-foreground">{day.temperature}°</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Rain</p>
                <p className="font-semibold text-blue-600">{day.precipitation}%</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Wind</p>
                <p className="font-semibold text-gray-600">{day.windSpeed} km/h</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyForecast;