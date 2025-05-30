import { WeatherData, CurrentWeather, SeasonalData } from '@/types/weather';

export const currentWeather: CurrentWeather = {
  location: "New York, NY",
  temperature: 22,
  condition: "sunny",
  humidity: 65,
  windSpeed: 8,
  pressure: 1013,
  visibility: 16,
  uvIndex: 6,
  description: "Partly sunny with comfortable temperatures",
  localtime: '',
  timezone: '',
  sunrise: '',
  sunset: ''
};

export const weeklyForecast: WeatherData[] = [
  {
    id: 1,
    day: "Today",
    date: "Dec 23",
    temperature: 22,
    condition: "sunny",
    humidity: 65,
    windSpeed: 8,
    precipitation: 0
  },
  {
    id: 2,
    day: "Tomorrow",
    date: "Dec 24",
    temperature: 18,
    condition: "cloudy",
    humidity: 72,
    windSpeed: 12,
    precipitation: 20
  },
  {
    id: 3,
    day: "Wednesday",
    date: "Dec 25",
    temperature: 15,
    condition: "rainy",
    humidity: 85,
    windSpeed: 15,
    precipitation: 75
  },
  {
    id: 4,
    day: "Thursday",
    date: "Dec 26",
    temperature: 8,
    condition: "snowy",
    humidity: 90,
    windSpeed: 10,
    precipitation: 85
  },
  {
    id: 5,
    day: "Friday",
    date: "Dec 27",
    temperature: 5,
    condition: "snowy",
    humidity: 88,
    windSpeed: 14,
    precipitation: 70
  },
  {
    id: 6,
    day: "Saturday",
    date: "Dec 28",
    temperature: 12,
    condition: "cloudy",
    humidity: 70,
    windSpeed: 9,
    precipitation: 30
  },
  {
    id: 7,
    day: "Sunday",
    date: "Dec 29",
    temperature: 20,
    condition: "clear",
    humidity: 60,
    windSpeed: 6,
    precipitation: 5
  }
];

export const seasonalData: SeasonalData[] = [
  {
    season: "spring",
    avgTemperature: 15,
    avgPrecipitation: 65,
    commonConditions: ["Mild", "Rainy", "Sunny"],
    description: "Mild temperatures with frequent rain showers and blooming flowers."
  },
  {
    season: "summer",
    avgTemperature: 28,
    avgPrecipitation: 30,
    commonConditions: ["Hot", "Sunny", "Clear"],
    description: "Hot and dry with plenty of sunshine and minimal precipitation."
  },
  {
    season: "fall",
    avgTemperature: 12,
    avgPrecipitation: 55,
    commonConditions: ["Cool", "Windy", "Cloudy"],
    description: "Cool temperatures with increasing cloudiness and moderate rainfall."
  },
  {
    season: "winter",
    avgTemperature: 2,
    avgPrecipitation: 80,
    commonConditions: ["Cold", "Snowy", "Cloudy"],
    description: "Cold temperatures with frequent snow and overcast skies."
  }
];
