import { useEffect, useState } from 'react';

const LoadingScreen = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  useEffect(() => {
    // Preload critical assets
    const preloadAssets = async () => {
      try {
        const imagesToLoad = [
          '/images/mostardinha.png',
          '/images/CAPA.png',
          '/images/salsinha.png',
          '/images/MAIONESE.png',
          '/images/alho.png',
          '/images/dona_formiga.png',
          '/images/comandante.png'
        ];

        const imagePromises = imagesToLoad.map(src => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = () => {
              console.warn(`Failed to load image: ${src}`);
              resolve(); // Continue even if some images fail
            };
            img.src = src;
          });
        });

        await Promise.all(imagePromises);
        setAssetsLoaded(true);
      } catch (error) {
        console.warn('Some assets failed to load:', error);
        setAssetsLoaded(true); // Continue anyway
      }
    };

    preloadAssets();
  }, []);

  useEffect(() => {
    if (!assetsLoaded) return;

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => onLoadingComplete(), 500);
          return 100;
        }
        return prev + 5; // Faster progress once assets are loaded
      });
    }, 50);

    return () => clearInterval(timer);
  }, [assetsLoaded, onLoadingComplete]);

  return (
    <div className="fixed inset-0 mostardinha-gradient-loading flex flex-col items-center justify-center z-50 transition-opacity duration-500">
      <div className="w-32 h-32 rounded-full mb-8 mostardinha-float bg-cover bg-center border-4 border-white shadow-2xl"
           style={{ backgroundImage: `url(/images/mostardinha.png)` }}>
      </div>
      
      <div className="text-2xl font-semibold text-white mb-4 text-center">
        {assetsLoaded ? 'Afinando os instrumentos...' : 'Carregando assets...'}
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

