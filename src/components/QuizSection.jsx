import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HelpCircle, CheckCircle, XCircle, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const QuizSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      question: 'Qual o nome da ilha mágica onde os alimentos ganham vida?',
      options: ['Ilha da Fantasia', 'Temperópolis', 'Saborlândia', 'Ilha do Nunca'],
      answer: 'Temperópolis',
    },
    {
      question: 'Quem é o melhor amigo de Kadu no início da história?',
      options: ['Mostardinha', 'Velho Alho', 'Alazão (o cavalo de madeira)', 'Maionese'],
      answer: 'Alazão (o cavalo de madeira)',
    },
    {
      question: 'Qual personagem ensina sobre o perdão à Dona Cigarra e Dona Formiga?',
      options: ['Mostardinha', 'Velho Alho', 'Maionese', 'Salsinha'],
      answer: 'Maionese',
    },
    {
      question: 'Qual o principal valor que o livro Mostardinha e sua Turma ensina?',
      options: ['Riqueza', 'Fama', 'Amor', 'Poder'],
      answer: 'Amor',
    },
    {
      question: 'Quem é a mãe do Mostardinha?',
      options: ['Dona Formiga', 'Senhora Mostarda', 'Dona Cigarra', 'Maionese'],
      answer: 'Senhora Mostarda',
    },
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
          start: 'top 80%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleAnswerClick = (option) => {
    setSelectedAnswer(option);
    if (option === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      setShowResults(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResults(false);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <section
      id="quiz"
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-br from-green-300 to-blue-300 text-white py-20 relative overflow-hidden flex items-center justify-center"
    >
      <div className="container mx-auto px-6 relative z-10 text-center">
        <h2
          ref={titleRef}
          className="text-5xl lg:text-6xl font-bold text-center mb-6 mostardinha-text-shadow"
        >
          🎯 Escolha seu Caminho
        </h2>

        <p className="text-xl text-center mb-12 opacity-95 max-w-4xl mx-auto">
          Teste seus conhecimentos sobre a Ilha de Temperópolis e seus habitantes! Responda às perguntas e descubra o quanto você sabe.
        </p>

        <div className="bg-white/95 rounded-3xl p-8 text-gray-800 max-w-3xl mx-auto shadow-lg">
          {!showResults ? (
            <div className="text-left">
              <p className="text-lg font-semibold mb-4">
                Questão {currentQuestionIndex + 1} de {questions.length}
              </p>
              <h3 className="text-2xl font-bold mb-6">{currentQuestion.question}</h3>
              <div className="grid grid-cols-1 gap-4">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswerClick(option)}
                    className={`w-full text-left px-6 py-3 rounded-xl font-semibold transition-all duration-200
                      ${selectedAnswer === option
                        ? option === currentQuestion.answer
                          ? 'bg-green-500 text-white shadow-md'
                          : 'bg-red-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}
                    `}
                    disabled={selectedAnswer !== null}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {selectedAnswer !== null && (
                <div className="mt-6 text-center">
                  <button
                    onClick={handleNextQuestion}
                    className="bg-blue-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-blue-600 transition-colors"
                  >
                    {currentQuestionIndex < questions.length - 1 ? 'Próxima Pergunta' : 'Ver Resultados'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
                <Award size={36} className="text-yellow-500" />
                Resultados do Quiz
              </h3>
              <p className="text-xl mb-6">
                Você acertou {score} de {questions.length} perguntas!
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleRestartQuiz}
                  className="bg-gray-200 text-gray-800 px-6 py-3 rounded-full font-semibold hover:bg-gray-300 transition-colors"
                >
                  Tentar Novamente
                </button>
              </div>
            </div>
          )}
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
              animationDelay: Math.random() * 6 + 's',
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default QuizSection;

