import { useState } from 'react';
import './App.css';

// Componentes
import LoadingScreen from './components/LoadingScreen';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import CharactersSection from './components/CharactersSection';
import HistorySection from './components/HistorySection';
import MusicSection from './components/MusicSection';
import WisdomSection from './components/WisdomSection';
import VoiceSection from './components/VoiceSection';
import BehindTheScenesSection from './components/BehindTheScenesSection';
import QuizSection from './components/QuizSection';
import CommunitySection from './components/CommunitySection';
import AudioPlayer from './components/AudioPlayer';
import FloatingQuotes from './components/FloatingQuotes';

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
          
          {/* Seções placeholder */}
          <HistorySection />
          
          <MusicSection />
          
          <WisdomSection />
          
          <VoiceSection />
          
          <BehindTheScenesSection />
          
          <QuizSection />
          
          <CommunitySection />
          
          <AudioPlayer />
          <FloatingQuotes />
        </>
      )}
    </div>
  );
}

export default App;

