import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X } from 'lucide-react';

// Importando imagens dos personagens
import mostardinha from '../assets/images/mostardinha.png';
import maionese from '../assets/images/MAIONESE.png';
import salsinha from '../assets/images/salsinha.png';
import alho from '../assets/images/alho.png';
import donaFormiga from '../assets/images/dona_formiga.png';
import comandante from '../assets/images/comandante.png';
import senhoraMostarda from '../assets/images/senhora_mostarda.png';

gsap.registerPlugin(ScrollTrigger);

const CharactersSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const characters = [
    {
      id: 'mostardinha',
      name: 'Mostardinha',
      image: mostardinha,
      quote: '"Se você quiser ter mais sorrisos na vida, sorria mais."',
      description: 'O protagonista da nossa história! Um grão de mostarda pequeno no tamanho, mas gigante em amor, coragem e sabedoria. Mostardinha ensina que o verdadeiro poder vem do coração.',
      personality: 'Otimista, corajoso, sábio'
    },
    {
      id: 'maionese',
      name: 'Maionese',
      image: maionese,
      quote: '"Às vezes, ser diferente é o que nos torna especiais."',
      description: 'Uma personagem doce e sensível que aprende sobre autoestima e aceitação. Maionese nos ensina que nossas diferenças são nossos pontos fortes.',
      personality: 'Sensível, reflexiva, carinhosa'
    },
    {
      id: 'salsinha',
      name: 'Salsinha',
      image: salsinha,
      quote: '"A amizade é o tempero mais importante da vida."',
      description: 'Alegre e animada, Salsinha traz energia positiva para o grupo. Ela valoriza a amizade acima de tudo e sempre está pronta para ajudar.',
      personality: 'Alegre, leal, energética'
    },
    {
      id: 'velho-alho',
      name: 'Velho Alho',
      image: alho,
      quote: '"Faça o bem, que o bem volta."',
      description: 'O sábio mentor do grupo. Com sua experiência e bondade, Velho Alho orienta os outros personagens com conselhos valiosos sobre a vida.',
      personality: 'Sábio, bondoso, experiente'
    },
    {
      id: 'dona-formiga',
      name: 'Dona Formiga',
      image: donaFormiga,
      quote: '"Cantar me faz trabalhar melhor. E perdoar é o segredo."',
      description: 'Trabalhadora e musical, Dona Formiga ensina sobre o valor do trabalho e a importância do perdão. Ela sempre tem uma canção no coração.',
      personality: 'Trabalhadora, musical, perdoadora'
    },
    {
      id: 'comandante',
      name: 'Comandante Catchup',
      image: comandante,
      quote: '"A música conecta todos os corações."',
      description: 'Líder natural e amante da música, o Comandante Catchup organiza as aventuras do grupo e acredita no poder unificador da música.',
      personality: 'Líder, musical, organizador'
    },
    {
      id: 'senhora-mostarda',
      name: 'Senhora Mostarda',
      image: senhoraMostarda,
      quote: '"Cada pequeno gesto pode fazer uma grande diferença."',
      description: 'Mãe carinhosa e sábia, Senhora Mostarda representa o amor maternal e a importância dos pequenos gestos de carinho no dia a dia.',
      personality: 'Maternal, carinhosa, sábia'
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

      // Partículas para a seção
      const particles = [];
      for (let i = 0; i < 25; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute w-1 h-1 bg-white/60 rounded-full mostardinha-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        sectionRef.current.appendChild(particle);
        particles.push(particle);
      }

      return () => {
        particles.forEach(particle => particle.remove());
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const openCharacterModal = (character) => {
    setSelectedCharacter(character);
  };

  const closeCharacterModal = () => {
    setSelectedCharacter(null);
  };

  return (
    <>
      <section 
        id="personagens" 
        ref={sectionRef}
        className="min-h-screen mostardinha-gradient-characters text-white py-20 relative overflow-hidden"
      >
        <div className="container mx-auto px-6 relative z-10">
          <h2 
            ref={titleRef}
            className="text-5xl lg:text-6xl font-bold text-center mb-6 mostardinha-text-shadow"
          >
            🌳 Floresta dos Espelhos
          </h2>
          
          <p className="text-xl text-center mb-12 opacity-95 max-w-4xl mx-auto">
            Conheça os habitantes mágicos de Temperópolis! Cada personagem tem sua própria personalidade e lições valiosas para compartilhar.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {characters.map((character, index) => (
              <div
                key={character.id}
                ref={el => cardsRef.current[index] = el}
                className="bg-white/95 rounded-3xl p-6 text-center text-gray-800 mostardinha-card-hover cursor-pointer"
                onClick={() => openCharacterModal(character)}
              >
                <div 
                  className="w-32 h-32 rounded-full mx-auto mb-4 bg-cover bg-center border-4 border-yellow-400 shadow-lg"
                  style={{ backgroundImage: `url(${character.image})` }}
                />
                
                <h3 className="text-xl font-bold mb-2">{character.name}</h3>
                
                <p className="text-gray-600 italic mb-4 text-sm leading-relaxed">
                  {character.quote}
                </p>
                
                <button className="bg-yellow-400 text-gray-800 px-6 py-2 rounded-full font-semibold hover:bg-yellow-500 transition-colors">
                  Conhecer Melhor
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal do Personagem */}
      {selectedCharacter && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-bold text-gray-800">{selectedCharacter.name}</h2>
                <button 
                  onClick={closeCharacterModal}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <img 
                    src={selectedCharacter.image} 
                    alt={selectedCharacter.name}
                    className="w-48 h-48 rounded-2xl object-cover mx-auto border-4 border-yellow-400"
                  />
                </div>
                
                <div className="flex-1">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Frase Marcante:</h3>
                    <p className="text-gray-600 italic text-lg">{selectedCharacter.quote}</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Sobre:</h3>
                    <p className="text-gray-600 leading-relaxed">{selectedCharacter.description}</p>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Personalidade:</h3>
                    <p className="text-gray-600">{selectedCharacter.personality}</p>
                  </div>
                  
                  <button 
                    onClick={closeCharacterModal}
                    className="w-full bg-yellow-400 text-gray-800 py-3 rounded-full font-semibold hover:bg-yellow-500 transition-colors"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CharactersSection;

