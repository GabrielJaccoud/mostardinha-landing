import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Book, Users, Link } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CommunitySection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  const communityLinks = [
    {
      id: 'buy-book',
      title: 'Adquira o Livro',
      description: 'Garanta sua cópia de "Mostardinha e sua Turma em: Temperópolis" e embarque nesta aventura literária.',
      icon: <Book size={48} className="mx-auto text-blue-400" />,
      link: 'https://hotmart.com/pt-br/marketplace/produtos/mostardinha-e-sua-turma-em-temperopolis/H100940670E',
      color: 'from-blue-300 to-purple-300'
    },
    {
      id: 'institute-ceu',
      title: 'Instituto CÉU',
      description: 'Conheça o Instituto CÉU, idealizado por Gabriel Jaccoud, focado em projetos sociais e educativos que transformam vidas.',
      icon: <Users size={48} className="mx-auto text-green-400" />,
      link: 'https://www.instagram.com/ceucaminhode_luz/', // Placeholder, assuming Instagram is the most active presence
      color: 'from-green-300 to-yellow-300'
    },
    {
      id: 'companhia-ninos',
      title: 'Companhia Ninos',
      description: 'Explore o trabalho da Companhia Ninos, responsável pela produção musical e audiovisual do universo Mostardinha.',
      icon: <Link size={48} className="mx-auto text-red-400" />,
      link: 'https://www.youtube.com/@CompanhiaNinos', // Placeholder, assuming YouTube is the most active presence
      color: 'from-red-300 to-pink-300'
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
      id="comprar" 
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-br from-yellow-400 to-orange-300 text-white py-20 relative overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10">
        <h2 
          ref={titleRef}
          className="text-5xl lg:text-6xl font-bold text-center mb-6 mostardinha-text-shadow"
        >
          📚 Portal da Comunidade
        </h2>
        
        <p className="text-xl text-center mb-12 opacity-95 max-w-4xl mx-auto">
          Conecte-se com o universo Mostardinha! Adquira o livro, conheça os projetos sociais e explore mais sobre a equipe por trás dessa magia.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {communityLinks.map((item, index) => (
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
                
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 transition-colors font-semibold"
                  >
                    <Link size={16} />
                    <span>Acessar</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 max-w-2xl mx-auto border border-white/30">
            <h3 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2">
              <Users className="text-orange-300" />
              Junte-se à Nossa Comunidade!
            </h3>
            <p className="text-lg opacity-90 mb-4">
              Siga as redes sociais do Mostardinha para ficar por dentro das novidades, eventos e interagir com outros fãs!
            </p>
            <a
              href="https://www.instagram.com/gabriel_jaccoud/" // Placeholder for main social media
              target="_blank"
              rel="noopener noreferrer"
              className="bg-orange-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-orange-600 transition-colors inline-flex items-center justify-center gap-2"
            >
              Siga no Instagram
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

export default CommunitySection;

