import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import capaLivro from '../assets/images/CAPA.png';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animações de entrada
      gsap.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.5
      });

      gsap.from(subtitleRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.8
      });

      gsap.from(ctaRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        ease: 'back.out(1.7)',
        delay: 1
      });

      gsap.from(imageRef.current, {
        x: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 1.2
      });

      // Partículas flutuantes
      const particles = [];
      for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute w-1 h-1 bg-white/60 rounded-full mostardinha-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        heroRef.current.appendChild(particle);
        particles.push(particle);
      }

      return () => {
        particles.forEach(particle => particle.remove());
      };
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToNext = () => {
    const nextSection = document.getElementById('personagens');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="inicio" 
      ref={heroRef}
      className="min-h-screen mostardinha-gradient-hero flex items-center justify-center text-white relative overflow-hidden pt-20"
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="text-center lg:text-left">
            <h1 
              ref={titleRef}
              className="text-5xl lg:text-7xl font-bold mb-6 mostardinha-text-shadow leading-tight"
            >
              Bem-vindo à<br />
              <span className="text-yellow-300">Ilha de Temperópolis</span>
            </h1>
            
            <p 
              ref={subtitleRef}
              className="text-xl lg:text-2xl mb-8 opacity-95 leading-relaxed"
            >
              Embarque numa jornada mágica com o <strong>Mostardinha</strong>, um grão pequeno mas gigante em amor! Uma aventura afetiva que está emocionando crianças, pais, professores e terapeutas.
            </p>
            
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#comprar"
                className="mostardinha-btn bg-yellow-400 text-gray-800 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2"
              >
                📖 Quero o Livro - R$ 34,99
              </a>
              <a
                href="https://www.youtube.com/watch?v=BSzPFZICl5c&t=663s"
                target="_blank"
                rel="noopener noreferrer"
                className="mostardinha-btn bg-white/20 text-white px-8 py-4 rounded-full font-semibold text-lg border-2 border-white/30 hover:bg-white/30 inline-flex items-center justify-center gap-2"
              >
                🎧 Ouvir Audiobook
              </a>
            </div>
          </div>
          
          <div ref={imageRef} className="flex justify-center">
            <img 
              src={capaLivro} 
              alt="Capa do Livro Mostardinha"
              className="max-w-full h-auto rounded-3xl shadow-2xl mostardinha-float max-w-md"
            />
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center mostardinha-bounce">
        <div className="mb-2">Role para explorar</div>
        <button onClick={scrollToNext} className="hover:scale-110 transition-transform">
          <ChevronDown size={32} />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;

