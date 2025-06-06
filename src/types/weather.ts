export interface WeatherData {
    id: number;
    day: string;
    date: string;
    temperature: number;
    condition: 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'clear' | 'storm';
    humidity: number;
    windSpeed: number;
    precipitation: number;
  }
  
  export interface CurrentWeather {
    location: string;
    temperature: number;
    condition: 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'clear' | 'storm';
    humidity: number;
    windSpeed: number;
    pressure: number;
    visibility: number;
    uvIndex: number;
    description: string;
    localtime: string;  
  timezone: string;
  sunrise: string;
  sunset: string;   
  }
  
  export interface SeasonalData {
    season: 'spring' | 'summer' | 'fall' | 'winter' | 'dry' | 'wet';
    avgTemperature: number;
    avgPrecipitation: number;
    commonConditions: string[];
    description: string;
  }
  