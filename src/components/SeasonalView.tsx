import React from 'react';
import { SeasonalData } from '../types/weather';

interface SeasonalViewProps {
  seasons: SeasonalData[];
  currentSeason?: string;
}

const SeasonalView: React.FC<SeasonalViewProps> = ({ seasons, currentSeason }) => {
  const getSeasonColor = (season: string) => {
    const colors = {
      spring: 'from-green-400 to-blue-500',
      summer: 'from-yellow-400 to-orange-500',
      fall: 'from-orange-400 to-red-500',
      winter: 'from-blue-400 to-purple-500'
    };
    return colors[season as keyof typeof colors] || 'from-gray-400 to-gray-600';
  };

  const getSeasonEmoji = (season: string) => {
    const emojis = {
      spring: '🌸',
      summer: '☀️',
      fall: '🍂',
      winter: '❄️'
    };
    return emojis[season as keyof typeof emojis] || '🌤️';
  };

  return (
    <div className="weather-card rounded-2xl p-6 animate-fade-in">
      <h3 className="text-2xl font-bold mb-6 text-foreground">Seasonal Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {seasons.map((season, index) => (
          <div 
            key={season.season}
            className={`relative p-6 rounded-xl bg-gradient-to-br ${getSeasonColor(season.season)} text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in ${
              currentSeason === season.season ? 'ring-4 ring-white/50' : ''
            }`}
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            {currentSeason === season.season && (
              <div className="absolute -top-2 -right-2 bg-white text-gray-800 text-xs font-bold px-2 py-1 rounded-full">
                Current
              </div>
            )}
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-2xl font-bold capitalize">{season.season}</h4>
              <span className="text-4xl">{getSeasonEmoji(season.season)}</span>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-white/80">Avg Temperature:</span>
                <span className="font-semibold">{season.avgTemperature}°C</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/80">Precipitation:</span>
                <span className="font-semibold">{season.avgPrecipitation}%</span>
              </div>
              <div className="mt-4">
                <p className="text-white/80 text-sm mb-2">Common Conditions:</p>
                <div className="flex flex-wrap gap-2">
                  {season.commonConditions.map((condition) => (
                    <span 
                      key={condition}
                      className="px-2 py-1 bg-white/20 rounded-full text-xs font-medium"
                    >
                      {condition}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-white/90 text-sm mt-4">{season.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeasonalView;