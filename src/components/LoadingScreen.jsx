import { useEffect, useState } from 'react';
import mostardinha from '../assets/images/mostardinha.png';

const LoadingScreen = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => onLoadingComplete(), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 mostardinha-gradient-loading flex flex-col items-center justify-center z-50 transition-opacity duration-500">
      <div className="w-32 h-32 rounded-full mb-8 mostardinha-float bg-cover bg-center border-4 border-white shadow-2xl"
           style={{ backgroundImage: `url(${mostardinha})` }}>
      </div>
      
      <div className="text-2xl font-semibold text-white mb-4 text-center">
        Afinando os instrumentos...
      </div>
      
      <div className="w-48 h-1 bg-white/30 rounded-full overflow-hidden">
        <div 
          className="h-full bg-white rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <div className="text-white/80 mt-2 text-sm">
        {progress}%
      </div>
    </div>
  );
};

export default LoadingScreen;

