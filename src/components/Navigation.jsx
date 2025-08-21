import { useState, useEffect } from 'react';
import mostardinha from '../assets/images/mostardinha.png';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'inicio', label: 'Início', color: 'bg-yellow-400 text-gray-800' },
    { id: 'historia', label: 'História', color: 'bg-blue-300 text-white' },
    { id: 'personagens', label: 'Personagens', color: 'bg-green-300 text-white' },
    { id: 'musicas', label: 'Músicas', color: 'bg-red-300 text-white' },
    { id: 'sabedoria', label: 'Sabedoria', color: 'bg-purple-300 text-white' },
    { id: 'vozes', label: 'Vozes', color: 'bg-pink-200 text-gray-800' },
    { id: 'bastidores', label: 'Bastidores', color: 'bg-orange-300 text-white' },
    { id: 'quiz', label: 'Quiz', color: 'bg-red-300 text-white' },
    { id: 'comprar', label: '📖 Comprar Livro', color: 'bg-green-400 text-white font-bold' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled ? 'bg-white/98 backdrop-blur-md shadow-lg' : 'bg-white/95 backdrop-blur-sm'
    }`}>
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => scrollToSection('inicio')}
            className="flex items-center gap-2 text-lg font-bold text-gray-800 hover:scale-105 transition-transform"
          >
            <img src={mostardinha} alt="Mostardinha" className="w-10 h-10 rounded-full" />
            <span>Mostardinha 3D</span>
          </button>
          
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${item.color}`}
              >
                {item.label}
              </button>
            ))}
          </div>
          
          {/* Mobile menu button */}
          <button className="md:hidden p-2 rounded-lg bg-yellow-400 text-gray-800">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

