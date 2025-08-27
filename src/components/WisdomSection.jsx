import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, Lightbulb, Heart, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const WisdomSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const wisdomCardsRef = useRef([]);

  const wisdoms = [
    {
      id: 'courage',
      title: 'Coragem',
      description: 'Enfrentar desafios e medos, como Kadu ao ser jogado no mar e encontrar um novo mundo.',
      icon: <Sparkles size={48} className="mx-auto text-yellow-400" />,
      color: 'from-yellow-300 to-orange-300'
    },
    {
      id: 'respect',
      title: 'Respeito',
      description: 'Aprender a valorizar as diferenças, como Maionese ensina à Dona Cigarra e Dona Formiga.',
      icon: <Heart size={48} className="mx-auto text-red-400" />,
      color: 'from-red-300 to-pink-300'
    },
    {
      id: 'friendship',
      title: 'Amizade',
      description: 'A força da união e do apoio mútuo, exemplificada pela turma de Temperópolis.',
      icon: <Lightbulb size={48} className="mx-auto text-blue-400" />,
      color: 'from-blue-300 to-purple-300'
    },
    {
      id: 'love',
      title: 'Amor',
      description: 'O ponto de partida para todas as aventuras e o maior ensinamento da Ilha de Temperópolis.',
      icon: <Heart size={48} className="mx-auto text-pink-400" />,
      color: 'from-purple-300 to-orange-300'
    },
    {
      id: 'forgiveness',
      title: 'Perdão',
      description: 'A capacidade de perdoar e seguir em frente, fundamental para a harmonia e a paz interior.',
      icon: <BookOpen size={48} className="mx-auto text-green-400" />,
      color: 'from-green-300 to-blue-300'
    },
    {
      id: 'empathy',
      title: 'Empatia',
      description: 'Colocar-se no lugar do outro para entender seus sentimentos e necessidades.',
      icon: <Sparkles size={48} className="mx-auto text-purple-400" />,
      color: 'from-pink-300 to-yellow-300'
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

      gsap.from(wisdomCardsRef.current, {
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
      id="sabedoria" 
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-br from-purple-300 to-orange-300 text-white py-20 relative overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10">
        <h2 
          ref={titleRef}
          className="text-5xl lg:text-6xl font-bold text-center mb-6 mostardinha-text-shadow"
        >
          🧙‍♂️ Vale da Sabedoria
        </h2>
        
        <p className="text-xl text-center mb-12 opacity-95 max-w-4xl mx-auto">
          Em Temperópolis, cada aventura é uma lição. Descubra os valores e ensinamentos que guiam Mostardinha e seus amigos.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {wisdoms.map((wisdom, index) => (
            <div
              key={wisdom.id}
              ref={el => wisdomCardsRef.current[index] = el}
              className="bg-white/95 rounded-3xl p-6 text-gray-800 mostardinha-card-hover relative overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${wisdom.color} opacity-10`} />
              
              <div className="relative z-10">
                <div className="text-4xl mb-4 text-center">{wisdom.icon}</div>
                
                <h3 className="text-xl font-bold mb-3 text-center">{wisdom.title}</h3>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {wisdom.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 max-w-2xl mx-auto border border-white/30">
            <h3 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2">
              <BookOpen className="text-blue-300" />
              Aprenda Mais
            </h3>
            <p className="text-lg opacity-90 mb-4">
              Os ensinamentos de Temperópolis estão em cada página do livro Mostardinha e sua Turma. Adquira já o seu!
            </p>
            <a
              href="https://hotmart.com/pt-br/marketplace/produtos/mostardinha-e-sua-turma-em-temperopolis/H100940670E"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-blue-600 transition-colors inline-flex items-center justify-center gap-2"
            >
              Comprar Livro
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

export default WisdomSection;

