import { useState, useEffect } from 'react';

const FloatingQuotes = () => {
  const [activeQuotes, setActiveQuotes] = useState([]);

  const quotes = [
    { text: "Se você quiser ter mais sorrisos na vida, sorria mais.", author: "Mostardinha" },
    { text: "Às vezes, ser diferente é o que nos torna especiais.", author: "Maionese" },
    { text: "A amizade é o tempero mais importante da vida.", author: "Salsinha" },
    { text: "Faça o bem, que o bem volta.", author: "Velho Alho" },
    { text: "Cantar me faz trabalhar melhor. E perdoar é o segredo.", author: "Dona Formiga" },
    { text: "A música conecta todos os corações.", author: "Comandante Catchup" },
    { text: "Cada pequeno gesto pode fazer uma grande diferença.", author: "Senhora Mostarda" }
  ];

  useEffect(() => {
    const showQuote = () => {
      const quote = quotes[Math.floor(Math.random() * quotes.length)];
      const id = Date.now();
      const position = {
        top: Math.random() * (window.innerHeight - 200) + 100,
        left: Math.random() * (window.innerWidth - 300) + 50
      };

      const newQuote = { ...quote, id, position };
      
      setActiveQuotes(prev => [...prev, newQuote]);

      // Remove a citação após 5 segundos
      setTimeout(() => {
        setActiveQuotes(prev => prev.filter(q => q.id !== id));
      }, 5000);
    };

    // Primeira citação após 5 segundos
    const firstTimeout = setTimeout(showQuote, 5000);
    
    // Citações subsequentes a cada 8 segundos
    const interval = setInterval(showQuote, 8000);

    return () => {
      clearTimeout(firstTimeout);
      clearInterval(interval);
    };
  }, []);

  const removeQuote = (id) => {
    setActiveQuotes(prev => prev.filter(q => q.id !== id));
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-20">
      {activeQuotes.map((quote) => (
        <div
          key={quote.id}
          className="absolute bg-white/95 backdrop-blur-md rounded-2xl p-4 max-w-xs shadow-xl border border-white/20 mostardinha-float-in pointer-events-auto cursor-pointer"
          style={{ 
            top: `${quote.position.top}px`, 
            left: `${quote.position.left}px`,
            maxWidth: Math.min(300, window.innerWidth - 100) + 'px'
          }}
          onClick={() => removeQuote(quote.id)}
        >
          <p className="text-gray-700 italic mb-2 text-sm leading-relaxed">
            "{quote.text}"
          </p>
          <p className="text-yellow-600 font-semibold text-xs">
            - {quote.author}
          </p>
          
          {/* Seta do balão */}
          <div className="absolute -bottom-2 left-8 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white/95" />
        </div>
      ))}
    </div>
  );
};

export default FloatingQuotes;

