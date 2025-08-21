import { useState, useRef } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';
import temaMostardinha from '../assets/temamostardinha.wav';

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className="fixed bottom-6 right-6 bg-white/95 backdrop-blur-md rounded-full px-6 py-4 flex items-center gap-4 shadow-xl z-30 border border-white/20">
      <button
        onClick={togglePlay}
        className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center text-gray-800 hover:scale-110 transition-transform shadow-lg"
      >
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </button>
      
      <div className="flex items-center gap-2 text-gray-800">
        <Volume2 size={16} />
        <span className="text-sm font-medium">🎵 Trilha do Mostardinha</span>
      </div>
      
      <div className="hidden sm:flex items-center gap-2">
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
          className="w-20 h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
        />
      </div>
      
      <audio
        ref={audioRef}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src={temaMostardinha} type="audio/wav" />
        Seu navegador não suporta o elemento de áudio.
      </audio>
    </div>
  );
};

export default AudioPlayer;

