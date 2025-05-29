// utils/getWeatherMessage.ts
export function getWeatherMessage(condition: string, sunrise?: string, sunset?: string): string {
    switch (condition.toLowerCase()) {
      case 'rainy':
      case 'rain':
        return "☔ It's rainy — don't forget your umbrella!";
      case 'sunny':
        return `☀️ It's sunny — wear sunscreen!`;
      case 'cloudy':
        return "☁️ Cloudy skies today — great for a walk!";
      case 'clear':
        return "🌟 Clear skies — enjoy the view!";
      case 'snowy':
      case 'snow':
        return "❄️ Snowfall expected — dress warmly!";
      case 'storm':
        return "⛈️ Stormy weather — best to stay indoors.";
      default:
        return `🌤️ Weather is calm today. Sunrise at ${sunrise}, sunset at ${sunset}`;
    }
  }
  