import { useState, useEffect } from 'react';

// Loading screen component
// shows a loading screen when the user enters the app to make sure that the default cities have loaded before the user is let in
function LoadingScreen() {

  // state for the dots
  const [loadingDots, setLoadingDots] = useState('');

  // interval for the dots loading
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingDots(prev => {
        if (prev.length >= 3) return '';
        return prev + '.';
      });
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loadingScreen">
      <div className="loadingContainer">
        <div className="loadingSpinner"></div>
        <p className="loadingText">Loading weather data{loadingDots}</p>
      </div>
    </div>
  );
}

export default LoadingScreen;