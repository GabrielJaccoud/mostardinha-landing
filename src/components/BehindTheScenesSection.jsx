import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Film, Sparkles, Lightbulb, PenTool } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const BehindTheScenesSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  const insights = [
    {
      id: 'inspiration',
      title: 'A Inspiração',
      description: 'Descubra como a ideia de Temperópolis e seus personagens ganhou vida, inspirada em valores e experiências do dia a dia.',
      icon: <Lightbulb size={48} className="mx-auto text-yellow-400" />,
      color: 'from-yellow-300 to-orange-300'
    },
    {
      id: 'creation-process',
      title: 'O Processo Criativo',
      description: 'Uma jornada desde os primeiros rascunhos dos personagens até a escrita das histórias e a composição das músicas.',
      icon: <PenTool size={48} className="mx-auto text-blue-400" />,
      color: 'from-blue-300 to-purple-300'
    },
    {
      id: 'challenges',
      title: 'Desafios e Superações',
      description: 'Conheça os obstáculos enfrentados durante a produção e como a equipe transformou desafios em oportunidades.',
      icon: <Sparkles size={48} className="mx-auto text-pink-400" />,
      color: 'from-pink-300 to-red-300'
    },
    {
      id: 'magic-behind',
      title: 'A Magia por Trás',
      description: 'Explore os segredos da animação, da dublagem e da produção musical que dão vida ao universo Mostardinha.',
      icon: <Film size={48} className="mx-auto text-green-400" />,
      color: 'from-green-300 to-blue-300'
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

      gsap.from(cardsRef.current, {
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
      id="bastidores" 
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-br from-orange-300 to-yellow-400 text-white py-20 relative overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10">
        <h2 
          ref={titleRef}
          className="text-5xl lg:text-6xl font-bold text-center mb-6 mostardinha-text-shadow"
        >
          🎬 Caverna dos Segredos
        </h2>
        
        <p className="text-xl text-center mb-12 opacity-95 max-w-4xl mx-auto">
          Desvende os mistérios e a magia por trás da criação do universo Mostardinha e seus amigos.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {insights.map((item, index) => (
            <div
              key={item.id}
              ref={el => cardsRef.current[index] = el}
              className="bg-white/95 rounded-3xl p-6 text-gray-800 mostardinha-card-hover relative overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-10`} />
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="text-4xl mb-4 text-center">{item.icon}</div>
                
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 max-w-2xl mx-auto border border-white/30">
            <h3 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2">
              <Sparkles className="text-yellow-300" />
              Compartilhe sua História!
            </h3>
            <p className="text-lg opacity-90 mb-4">
              Você tem alguma curiosidade ou bastidor sobre o Mostardinha que gostaria de ver aqui? Envie sua sugestão!
            </p>
            <a
              href="mailto:contato@mostardinha.com.br" // Placeholder email
              className="bg-yellow-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-yellow-600 transition-colors inline-flex items-center justify-center gap-2"
            >
              Enviar Sugestão
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

export default BehindTheScenesSection;

