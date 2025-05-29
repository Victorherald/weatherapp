import React from 'react';
import { Sun, Cloud, CloudRain, CloudSnow } from 'lucide-react';

interface WeatherIconProps {
  condition: 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'clear' | 'storm';
  size?: number;
  className?: string;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ condition, size = 24, className = "" }) => {
  const iconProps = { size, className: `${className} transition-all duration-300` };

  switch (condition) {
    case 'sunny':
      return <Sun {...iconProps} className={`${iconProps.className} text-yellow-500 animate-bounce-gentle`} />;
    case 'clear':
      return <Sun {...iconProps} className={`${iconProps.className} text-blue-400`} />;
    case 'cloudy':
      return <Cloud {...iconProps} className={`${iconProps.className} text-gray-500`} />;
    case 'rainy':
      return <CloudRain {...iconProps} className={`${iconProps.className} text-blue-600`} />;
    case 'snowy':
      return <CloudSnow {...iconProps} className={`${iconProps.className} text-blue-200`} />;
    case 'storm':
      return <CloudRain {...iconProps} className={`${iconProps.className} text-gray-700`} />;
    default:
      return <Sun {...iconProps} />;
  }
};

export default WeatherIcon;