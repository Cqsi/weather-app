import { useState, useEffect } from 'react';

function LoadingScreen() {
  const [loadingDots, setLoadingDots] = useState('');

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