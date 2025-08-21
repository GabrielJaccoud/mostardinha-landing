import { useState } from 'react';
import './App.css';

// Componentes
import LoadingScreen from './components/LoadingScreen';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import CharactersSection from './components/CharactersSection';
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
          <PlaceholderSection 
            id="historia" 
            title="Aventura pela Ilha" 
            gradient="bg-gradient-to-br from-blue-300 to-purple-300"
            emoji="🏝️"
          />
          
          <PlaceholderSection 
            id="musicas" 
            title="Rio Musical" 
            gradient="bg-gradient-to-br from-red-300 to-pink-200"
            emoji="🎵"
          />
          
          <PlaceholderSection 
            id="sabedoria" 
            title="Vale da Sabedoria" 
            gradient="bg-gradient-to-br from-purple-300 to-orange-300"
            emoji="🧙‍♂️"
          />
          
          <PlaceholderSection 
            id="vozes" 
            title="Auditório do Mostardinha" 
            gradient="bg-gradient-to-br from-pink-200 to-green-300"
            emoji="🎤"
          />
          
          <PlaceholderSection 
            id="bastidores" 
            title="Caverna dos Segredos" 
            gradient="bg-gradient-to-br from-orange-300 to-yellow-400"
            emoji="🎬"
          />
          
          <PlaceholderSection 
            id="quiz" 
            title="Escolha seu Caminho" 
            gradient="bg-gradient-to-br from-green-300 to-blue-300"
            emoji="🎯"
          />
          
          <PlaceholderSection 
            id="comprar" 
            title="Portal da Comunidade" 
            gradient="bg-gradient-to-br from-yellow-400 to-orange-300"
            emoji="📚"
          />
          
          <AudioPlayer />
          <FloatingQuotes />
        </>
      )}
    </div>
  );
}

export default App;

