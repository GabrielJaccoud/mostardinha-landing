import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mic, User, Headphones, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const VoiceSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const voiceCardsRef = useRef([]);

  const voiceActors = [
    {
      id: 'gabriel-jaccoud',
      name: 'Gabriel Jaccoud',
      role: 'Autor, Compositor e Voz Principal',
      description: 'A mente criativa por trás do universo Mostardinha, Gabriel Jaccoud não apenas escreve e compõe, mas também empresta sua voz para dar vida aos personagens e narrar as emocionantes aventuras de Temperópolis.',
      image: '/src/assets/images/gabriel_jaccoud.png', // Placeholder, ideally a real image
      link: 'https://www.youtube.com/@GabrielJaccoud',
      color: 'from-blue-400 to-purple-400'
    },
    {
      id: 'helena-hespanhol',
      name: 'Helena Hespanhol',
      role: 'Voz em Videoaulas e Músicas',
      description: 'Com sua voz cativante, Helena Hespanhol contribui para a experiência musical e educativa do Mostardinha, participando de videoaulas e canções que encantam crianças e adultos.',
      image: '/src/assets/images/helena_hespanhol.png', // Placeholder, ideally a real image
      link: 'https://m.youtube.com/watch?v=vCq3oWnQD1A', // Link para a videoaula mencionada
      color: 'from-pink-400 to-red-400'
    },
    {
      id: 'future-voices',
      name: 'E muitas outras vozes! (Em breve)',
      role: 'Participações Especiais',
      description: 'O universo Mostardinha está sempre crescendo! Em breve, novas vozes se juntarão a essa jornada musical e narrativa, trazendo ainda mais magia e diversidade para Temperópolis.',
      icon: <Headphones size={48} className="mx-auto text-gray-500" />,
      color: 'from-gray-300 to-gray-500'
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

      gsap.from(voiceCardsRef.current, {
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
      id="vozes" 
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-br from-pink-200 to-green-300 text-white py-20 relative overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10">
        <h2 
          ref={titleRef}
          className="text-5xl lg:text-6xl font-bold text-center mb-6 mostardinha-text-shadow"
        >
          🎤 Auditório do Mostardinha
        </h2>
        
        <p className="text-xl text-center mb-12 opacity-95 max-w-4xl mx-auto">
          Conheça as vozes talentosas que dão vida aos personagens e às canções que fazem de Temperópolis um lugar ainda mais mágico.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {voiceActors.map((actor, index) => (
            <div
              key={actor.id}
              ref={el => voiceCardsRef.current[index] = el}
              className="bg-white/95 rounded-3xl p-6 text-gray-800 mostardinha-card-hover relative overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${actor.color} opacity-10`} />
              
              <div className="relative z-10 flex flex-col items-center text-center">
                {actor.image ? (
                  <img 
                    src={actor.image} 
                    alt={actor.name} 
                    className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-white shadow-lg"
                  />
                ) : (
                  <div className="w-32 h-32 flex items-center justify-center bg-gray-200 rounded-full mb-4">
                    {actor.icon || <User size={64} className="text-gray-500" />}
                  </div>
                )}
                
                <h3 className="text-xl font-bold mb-1">{actor.name}</h3>
                <p className="text-sm font-semibold text-gray-600 mb-3">{actor.role}</p>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  {actor.description}
                </p>
                
                {actor.link && (
                  <a
                    href={actor.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 transition-colors font-semibold"
                  >
                    <Star size={16} />
                    <span>Saiba Mais</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 max-w-2xl mx-auto border border-white/30">
            <h3 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2">
              <Mic className="text-green-300" />
              Quer fazer parte?
            </h3>
            <p className="text-lg opacity-90 mb-4">
              Se você é um dublador, músico ou artista e se identifica com o universo Mostardinha, entre em contato conosco!
            </p>
            <a
              href="mailto:contato@mostardinha.com.br" // Placeholder email
              className="bg-green-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-green-600 transition-colors inline-flex items-center justify-center gap-2"
            >
              Envie seu Portfólio
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

export default VoiceSection;

