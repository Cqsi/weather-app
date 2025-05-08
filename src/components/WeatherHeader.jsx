import { useState, useEffect } from 'react';

function WeatherHeader() {
  // emojis (for now?)
  const emojis = [
    { symbol: "☀️", label: "sunny" },
    { symbol: "🌧️", label: "rainy" },
    { symbol: "🌤️", label: "cloudy" },
    { symbol: "🏃", label: "running" },
    { symbol: "🧺", label: "picnic" },
    { symbol: "🚗", label: "driving" },
    { symbol: "❄️", label: "snowy" },
    { symbol: "🌈", label: "rainbow" }
  ];
  
  const [currentEmoji, setCurrentEmoji] = useState(emojis[0]);
  const [animationState, setAnimationState] = useState('visible'); // different animation states
  
  useEffect(() => {
    const interval = setInterval(() => {
      // start exit animation
      setAnimationState('leaving');
      
      // after exit animation completes, change emoji and start enter animation
      setTimeout(() => {
        setCurrentEmoji((prev) => {
          const currentIndex = emojis.findIndex(emoji => emoji.symbol === prev.symbol);
          return emojis[(currentIndex + 1) % emojis.length];
        });
        setAnimationState('entering');
        
        // after enter animation completes, set to visible
        setTimeout(() => {
          setAnimationState('visible');
        }, 300);
      }, 300);
    }, 3000); // change every 4 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  // animation classes based on the state
  const getAnimationClass = () => {
    switch (animationState) {
      case 'leaving':
        return 'emoji-leaving';
      case 'entering':
        return 'emoji-entering';
      case 'visible':
      default:
        return 'emoji-visible';
    }
  };
  
  return (
    <div className="header-container">
      <h2>
        Find out if it's 
        <span className="emoji-container">
          <span 
            className={`emoji ${getAnimationClass()}`}
            aria-label={currentEmoji.label}
          >
            {currentEmoji.symbol}
          </span>
        </span>
        weather
      </h2>
      <h3>We'll tell you what the sky is thinking</h3>
    </div>
  );
}

export default WeatherHeader;