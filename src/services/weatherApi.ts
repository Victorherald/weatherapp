import { WeatherData, CurrentWeather, SeasonalData } from '@/types/weather';

const RAPIDAPI_HOST = 'weatherapi-com.p.rapidapi.com';

interface WeatherApiResponse {
  location: {
    name: string;
    region: string;
    country: string;
    localtime: string;
    tz_id: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    humidity: number;
    wind_kph: number;
    pressure_mb: number;
    vis_km: number;
    uv: number;
  };
  forecast?: {
    forecastday: Array<{
      date: string;
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        avgtemp_c: number;
        condition: {
          text: string;
        };
        totalprecip_mm: number;
        avghumidity: number;
        maxwind_kph: number;
      };
    }>;
  };
}


  

const mapConditionToLocal = (condition: string): 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'clear' | 'storm' => {
  const lowerCondition = condition.toLowerCase();
  if (lowerCondition.includes('sunny') || lowerCondition.includes('clear')) return 'sunny';
  if (lowerCondition.includes('cloudy') || lowerCondition.includes('overcast')) return 'cloudy';
  if (lowerCondition.includes('rain') || lowerCondition.includes('drizzle')) return 'rainy';
  if (lowerCondition.includes('snow') || lowerCondition.includes('blizzard')) return 'snowy';
  if (lowerCondition.includes('storm') || lowerCondition.includes('thunder')) return 'storm';
  return 'clear';
};

export const fetchCurrentWeather = async (apiKey: string, location: string = 'Jos'): Promise<CurrentWeather> => {
  const response = await fetch(
    `https://${RAPIDAPI_HOST}/current.json?q=${encodeURIComponent(location)}`,
    {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': RAPIDAPI_HOST,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Weather API error: ${response.status}`);
  }

  const data: WeatherApiResponse = await response.json();

  return {
    location: `${data.location.name}, ${data.location.country}`,
    temperature: Math.round(data.current.temp_c),
    condition: mapConditionToLocal(data.current.condition.text),
    humidity: data.current.humidity,
    windSpeed: Math.round(data.current.wind_kph),
    pressure: data.current.pressure_mb,
    visibility: data.current.vis_km,
    uvIndex: data.current.uv,
    description: data.current.condition.text,
    localtime: data.location.localtime,     
    timezone: data.location.tz_id,  
    sunrise: `` ,
    sunset: ``        
  };
};

export const fetchWeeklyForecast = async (apiKey: string, location: string = 'Jos'): Promise<WeatherData[]> => {
  const response = await fetch(
    `https://${RAPIDAPI_HOST}/forecast.json?q=${encodeURIComponent(location)}&days=7`,
    {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': RAPIDAPI_HOST,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Weather API error: ${response.status}`);
  }

  const data: WeatherApiResponse = await response.json();

  const days = ['Today', 'Tomorrow', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  return data.forecast?.forecastday.map((day, index) => ({
    id: index + 1,
    day: index < 2 ? days[index] : new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' }),
    date: new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    temperature: Math.round(day.day.avgtemp_c),
    condition: mapConditionToLocal(day.day.condition.text),
    humidity: day.day.avghumidity,
    windSpeed: Math.round(day.day.maxwind_kph),
    precipitation: Math.round((day.day.totalprecip_mm / 10) * 100), // Convert to percentage
  })) || [];
};