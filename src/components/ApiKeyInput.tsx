import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Key } from 'lucide-react';

interface ApiKeyInputProps {
  onApiKeyChange: (apiKey: string) => void;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ onApiKeyChange }) => {
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const savedApiKey = localStorage.getItem('rapidapi-weather-key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
      setIsValid(true);
      onApiKeyChange(savedApiKey);
    }
  }, [onApiKeyChange]);

  const handleApiKeySubmit = () => {
    if (apiKey.trim()) {
      localStorage.setItem('rapidapi-weather-key', apiKey.trim());
      setIsValid(true);
      onApiKeyChange(apiKey.trim());
    }
  };

  const handleClearApiKey = () => {
    localStorage.removeItem('rapidapi-weather-key');
    setApiKey('');
    setIsValid(false);
    onApiKeyChange('');
  };

  return (
    <div className="weather-card rounded-2xl p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Key className="text-blue-500" size={20} />
        <h3 className="text-lg font-semibold text-foreground">RapidAPI Weather Key</h3>
      </div>
      
      {!isValid ? (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Enter your RapidAPI key for WeatherAPI.com to get real weather data.
            Get your free API key at{' '}
            <a 
              href="https://rapidapi.com/weatherapi/api/weatherapi-com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              RapidAPI
            </a>
          </p>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type={showApiKey ? 'text' : 'password'}
                placeholder="Enter your RapidAPI key..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && handleApiKeySubmit()}
              />
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <button
              onClick={handleApiKeySubmit}
              disabled={!apiKey.trim()}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-muted-foreground">API key configured</span>
          </div>
          <button
            onClick={handleClearApiKey}
            className="text-sm text-red-500 hover:text-red-600"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default ApiKeyInput;