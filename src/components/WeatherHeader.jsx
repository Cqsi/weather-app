import { useState, useEffect } from 'react';

function WeatherHeader() {
  // Weather emojis using image files from public/emojis folder
  const emojis = [
    { image: "./emojis/sunny.png", label: "sunny" },
    { image: "./emojis/rain_cloud.png", label: "rainy" },
    { image: "./emojis/partly_sunny.png", label: "cloudy" },
    { image: "./emojis/running.png", label: "running" },
    { image: "./emojis/beach.png", label: "beach" },
    { image: "./emojis/car.png", label: "driving" },
    { image: "./emojis/snowflake.png", label: "snowy" },
    { image: "./emojis/rainbow.png", label: "rainbow" },
    { image: "./emojis/lightning.png", label: "stormy" },
    { image: "./emojis/tornado.png", label: "tornado" }
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
          const currentIndex = emojis.findIndex(emoji => emoji.image === prev.image);
          return emojis[(currentIndex + 1) % emojis.length];
        });
        setAnimationState('entering');
        
        // after enter animation completes, set to visible
        setTimeout(() => {
          setAnimationState('visible');
        }, 300);
      }, 300);
    }, 2000); // change every 3 seconds
    
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
          <img 
            src={currentEmoji.image}
            alt={currentEmoji.label}
            className={`emoji ${getAnimationClass()}`}
          />
        </span>
        weather
      </h2>
      <h3>We'll tell you what the sky is thinking</h3>
    </div>
  );
}

export default WeatherHeader;