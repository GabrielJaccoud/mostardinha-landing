import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Music, Youtube, PlayCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const MusicSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const musicCardsRef = useRef([]);

  const musicTracks = [
    {
      id: 'mostardinha',
      title: 'Mostardinha',
      description: 'A canção tema que apresenta o Mostardinha e o universo de Temperópolis. Cheia de ritmo e alegria, ensina sobre a importância de sorrir e amar.',
      youtubeLink: 'https://www.youtube.com/watch?v=LYHhga03kWI',
      color: 'from-yellow-400 to-orange-400'
    },
    {
      id: 'tesouros',
      title: 'Tesouros',
      description: 'Uma melodia que fala sobre os verdadeiros tesouros da vida: amizade, amor e as lições aprendidas na jornada. Perfeita para refletir e se emocionar.',
      youtubeLink: 'https://m.youtube.com/watch?v=E-uAaX073J0',
      color: 'from-purple-400 to-pink-400'
    },
    {
      id: 'cigarra-formiga',
      title: 'A Cigarra e a Formiga',
      description: 'Baseada na clássica fábula, esta música traz uma nova perspectiva sobre o trabalho e a diversão, com a sabedoria de Temperópolis sobre perdão e harmonia.',
      youtubeLink: 'https://m.youtube.com/watch?v=o0sJ-iMjzqg',
      color: 'from-green-400 to-blue-400'
    },
    {
      id: 'audiobook-tema',
      title: 'Tema do Audiobook',
      description: 'A trilha sonora que acompanha a jornada de Kadu e Mostardinha, criando uma atmosfera mágica e envolvente para a história.',
      youtubeLink: 'https://www.youtube.com/watch?v=BSzPFZICl5c',
      color: 'from-blue-400 to-gray-600'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%'
        }
      });

      gsap.from(musicCardsRef.current, {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%'
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="musicas" 
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-br from-red-300 to-pink-200 text-white py-20 relative overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10">
        <h2 
          ref={titleRef}
          className="text-5xl lg:text-6xl font-bold text-center mb-6 mostardinha-text-shadow"
        >
          🎵 Rio Musical
        </h2>
        
        <p className="text-xl text-center mb-12 opacity-95 max-w-4xl mx-auto">
          Deixe-se levar pelas melodias que embalam as aventuras em Temperópolis. Cada canção é uma lição, uma emoção e um convite para cantar junto!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {musicTracks.map((track, index) => (
            <div
              key={track.id}
              ref={el => musicCardsRef.current[index] = el}
              className="bg-white/95 rounded-3xl p-6 text-gray-800 mostardinha-card-hover relative overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${track.color} opacity-10`} />
              
              <div className="relative z-10">
                <div className="text-4xl mb-4 text-center"><Music size={48} className="mx-auto text-red-500" /></div>
                
                <h3 className="text-xl font-bold mb-3 text-center">{track.title}</h3>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {track.description}
                </p>
                
                {track.youtubeLink && (
                  <a
                    href={track.youtubeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 text-red-600 hover:text-red-700 transition-colors font-semibold"
                  >
                    <Youtube size={20} />
                    <span>Ouvir no YouTube</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 max-w-2xl mx-auto border border-white/30">
            <h3 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2">
              <PlayCircle className="text-red-300" />
              Mais Músicas e Histórias
            </h3>
            <p className="text-lg opacity-90 mb-4">
              Explore o canal do Gabriel Jaccoud no YouTube para descobrir mais canções e aventuras do Mostardinha!
            </p>
            <a
              href="https://www.youtube.com/@GabrielJaccoud"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-red-600 transition-colors inline-flex items-center justify-center gap-2"
            >
              Ir para o Canal
            </a>
          </div>
        </div>
      </div>

      {/* Partículas de fundo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full mostardinha-particle"
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 6 + 's'
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default MusicSection;

