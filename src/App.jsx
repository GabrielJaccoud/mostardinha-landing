import { useState, lazy, Suspense } from 'react';
import './App.css';

// Componentes essenciais (carregamento imediato)
import LoadingScreen from './components/LoadingScreen';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import CharactersSection from './components/CharactersSection';

// Componentes com lazy loading
const HistorySection = lazy(() => import('./components/HistorySection'));
const MusicSection = lazy(() => import('./components/MusicSection'));
const WisdomSection = lazy(() => import('./components/WisdomSection'));
const VoiceSection = lazy(() => import('./components/VoiceSection'));
const BehindTheScenesSection = lazy(() => import('./components/BehindTheScenesSection'));
const QuizSection = lazy(() => import('./components/QuizSection'));
const CommunitySection = lazy(() => import('./components/CommunitySection'));
const AudioPlayer = lazy(() => import('./components/AudioPlayer'));
const FloatingQuotes = lazy(() => import('./components/FloatingQuotes'));

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Seções placeholder para desenvolvimento futuro
  const PlaceholderSection = ({ id, title, gradient, emoji }) => (
    <section 
      id={id} 
      className={`min-h-screen ${gradient} text-white flex items-center justify-center`}
    >
      <div className="text-center">
        <h2 className="text-5xl lg:text-6xl font-bold mb-4 mostardinha-text-shadow">
          {emoji} {title}
        </h2>
        <p className="text-xl opacity-90">Em desenvolvimento...</p>
      </div>
    </section>
  );

  return (
    <div className="App">
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      
      {!isLoading && (
        <>
          <Navigation />
          <HeroSection />
          <CharactersSection />
          
          {/* Seções com lazy loading */}
          <Suspense fallback={<div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="text-xl">Carregando seção...</div>
          </div>}>
            <HistorySection />
          </Suspense>
          
          <Suspense fallback={<div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="text-xl">Carregando seção...</div>
          </div>}>
            <MusicSection />
          </Suspense>
          
          <Suspense fallback={<div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="text-xl">Carregando seção...</div>
          </div>}>
            <WisdomSection />
          </Suspense>
          
          <Suspense fallback={<div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="text-xl">Carregando seção...</div>
          </div>}>
            <VoiceSection />
          </Suspense>
          
          <Suspense fallback={<div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="text-xl">Carregando seção...</div>
          </div>}>
            <BehindTheScenesSection />
          </Suspense>
          
          <Suspense fallback={<div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="text-xl">Carregando seção...</div>
          </div>}>
            <QuizSection />
          </Suspense>
          
          <Suspense fallback={<div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="text-xl">Carregando seção...</div>
          </div>}>
            <CommunitySection />
          </Suspense>
          
          <Suspense fallback={<div>Carregando player...</div>}>
            <AudioPlayer />
          </Suspense>
          
          <Suspense fallback={<div>Carregando quotes...</div>}>
            <FloatingQuotes />
          </Suspense>
        </>
      )}
    </div>
  );
}

export default App;

