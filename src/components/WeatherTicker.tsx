'use client';

import React, { useEffect, useRef } from 'react';
import { CurrentWeather } from '../types/weather';
import { getWeatherMessage } from '../utils/getWeatherMessage';

interface WeatherTickerProps {
  weather: CurrentWeather;
}

const WeatherTicker: React.FC<WeatherTickerProps> = ({ weather }) => {
  const tickerRef = useRef<HTMLDivElement>(null);

  const message = getWeatherMessage(weather.condition, weather.sunrise, weather.sunset);

  useEffect(() => {
    if (tickerRef.current) {
      tickerRef.current.scrollLeft = 0;
    }
  }, [message]);

  return (
    <div className="overflow-hidden whitespace-nowrap bg-black text-white p-3 rounded-xl shadow-md cursor-pointer">
      <div
        ref={tickerRef}
        className="inline-block animate-marquee"
        onClick={() => tickerRef.current?.scrollTo({ left: 0, behavior: 'smooth' })}
      >
        {message}
      </div>
    </div>
  );
};

export default WeatherTicker;
