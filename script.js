// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', function() {
    // Inicialização de todas as funcionalidades
    initAudioPlayer();
    initScrollAnimations();
    initParallaxEffect();
    initSmoothScrolling();
    initMobileMenu();
    initNewsletterForm();
    initButtonAnimations();
    initCharacterCards();
    initFloatingQuotes();
    initQuiz();
    initCouponSystem();
    initVoucherSystem();
});

// ===== PLAYER DE ÁUDIO FIXO =====
function initAudioPlayer() {
    const audioElement = document.getElementById('backgroundAudioFixed');
    const toggleButton = document.getElementById('audioToggleFixed');
    const volumeSlider = document.getElementById('volumeSlider');
    const audioIcon = toggleButton.querySelector('.audio-icon-btn');
    
    let isPlaying = false;
    
    // Configuração inicial do volume
    if (audioElement && volumeSlider) {
        audioElement.volume = volumeSlider.value / 100;
    }
    
    // Controle de play/pause
    if (toggleButton && audioElement) {
        toggleButton.addEventListener('click', function() {
            if (isPlaying) {
                audioElement.pause();
                audioIcon.textContent = '▶️';
                isPlaying = false;
            } else {
                audioElement.play().catch(function(error) {
                    console.log('Erro ao reproduzir áudio:', error);
                });
                audioIcon.textContent = '⏸️';
                isPlaying = true;
            }
        });
    }
    
    // Controle de volume
    if (volumeSlider && audioElement) {
        volumeSlider.addEventListener('input', function() {
            audioElement.volume = this.value / 100;
        });
    }
    
    // Eventos do áudio
    if (audioElement) {
        audioElement.addEventListener('ended', function() {
            audioIcon.textContent = '▶️';
            isPlaying = false;
        });
        
        audioElement.addEventListener('error', function() {
            console.log('Erro no carregamento do áudio');
        });
    }
}

// ===== ANIMAÇÕES DE SCROLL =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observa todos os elementos com classes de animação
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
    animatedElements.forEach(function(element) {
        observer.observe(element);
    });
}

// ===== EFEITO PARALLAX =====
function initParallaxEffect() {
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax-layer');
        
        parallaxElements.forEach(function(element) {
            const speed = element.classList.contains('parallax-clouds') ? 0.5 : 
                         element.classList.contains('parallax-mountains') ? 0.3 : 0.1;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// ===== SCROLL SUAVE =====
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Compensar altura do menu fixo
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== MENU MÓVEL =====
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
        
        // Fecha o menu ao clicar em um link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });
    }
}

// ===== FORMULÁRIO DE NEWSLETTER =====
function initNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('userName');
            const emailInput = document.getElementById('userEmail');
            const submitButton = form.querySelector('.newsletter-btn');
            
            // Validação básica
            if (!nameInput.value.trim() || !emailInput.value.trim()) {
                showNotification('Por favor, preencha todos os campos!', 'error');
                return;
            }
            
            if (!isValidEmail(emailInput.value)) {
                showNotification('Por favor, insira um e-mail válido!', 'error');
                return;
            }
            
            // Simula envio (aqui você integraria com um serviço real)
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;
            
            setTimeout(function() {
                showNotification('Obrigado! Você receberá nossas novidades em breve! 🎉', 'success');
                form.reset();
                submitButton.innerHTML = '<span class="btn-icon">✨</span> Quero receber!';
                submitButton.disabled = false;
            }, 2000);
        });
    }
}

// ===== ANIMAÇÕES DE BOTÕES =====
function initButtonAnimations() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(function(button) {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(-1px) scale(1.02)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
    });
}

// ===== CARDS DE PERSONAGENS =====
function initCharacterCards() {
    const characterCards = document.querySelectorAll('.character-card');
    
    characterCards.forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            // Adiciona efeito de brilho
            this.style.boxShadow = '0 15px 40px rgba(244, 208, 63, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
        
        card.addEventListener('click', function() {
            const characterName = this.querySelector('h3').textContent;
            const characterQuote = this.querySelector('.character-quote').textContent;
            
            // Cria um modal simples com informações do personagem
            showCharacterModal(characterName, characterQuote, this.querySelector('img').src);
        });
    });
}

// ===== BALÕES DE FALA FLUTUANTES =====
function initFloatingQuotes() {
    const quotes = document.querySelectorAll('.quote-balloon');
    let currentQuoteIndex = 0;
    
    function showNextQuote() {
        // Esconde todas as citações
        quotes.forEach(function(quote) {
            quote.classList.remove('visible');
        });
        
        // Mostra a próxima citação
        if (quotes[currentQuoteIndex]) {
            setTimeout(function() {
                quotes[currentQuoteIndex].classList.add('visible');
            }, 500);
            
            // Esconde após 4 segundos
            setTimeout(function() {
                quotes[currentQuoteIndex].classList.remove('visible');
            }, 4500);
            
            currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
        }
    }
    
    // Inicia o ciclo de citações
    if (quotes.length > 0) {
        showNextQuote();
        setInterval(showNextQuote, 6000); // Nova citação a cada 6 segundos
    }
}

// ===== QUIZ EMOCIONAL =====
function initQuiz() {
    const quizOptions = document.querySelectorAll('.quiz-option');
    const quizQuestion = document.getElementById('quizQuestion');
    const quizResult = document.getElementById('quizResult');
    
    const characters = {
        mostardinha: {
            name: 'Mostardinha',
            image: 'assets/images/Mostardinha(2).png',
            description: 'Você é como o Mostardinha! Pequeno em tamanho, mas gigante em amor e sabedoria. Você tem o dom de ouvir com o coração e transformar o mundo ao seu redor com gentileza.'
        },
        maionese: {
            name: 'Maionese',
            image: 'assets/images/MAIONESE.png',
            description: 'Você é como a Maionese! Apaixonada pela vida e sempre disposta a aprender. Você acredita no poder do amor e está sempre buscando crescer e se transformar.'
        },
        salsinha: {
            name: 'Salsinha',
            image: 'assets/images/salsinha(2).png',
            description: 'Você é como a Salsinha! Cheia de energia e otimismo. Você tem o dom de trazer alegria para qualquer situação e acredita que a vida sempre traz aquilo que precisamos.'
        },
        alho: {
            name: 'Velho Alho',
            image: 'assets/images/alho(2).png',
            description: 'Você é como o Velho Alho! Sábio e experiente, você tem sempre um conselho carinhoso para dar. Você acredita que fazer o bem é o segredo da felicidade.'
        }
    };
    
    quizOptions.forEach(function(option) {
        option.addEventListener('click', function() {
            const character = this.getAttribute('data-character');
            showQuizResult(characters[character]);
        });
    });
    
    function showQuizResult(character) {
        quizQuestion.style.display = 'none';
        quizResult.style.display = 'block';
        
        document.getElementById('resultImage').src = character.image;
        document.getElementById('resultName').textContent = character.name;
        document.getElementById('resultDescription').textContent = character.description;
    }
}

// ===== SISTEMA DE CUPONS =====
function initCouponSystem() {
    // Esta função seria integrada com um sistema real de cupons
    window.applyCoupon = function() {
        const couponInput = document.getElementById('couponInput');
        const couponCode = couponInput.value.trim().toUpperCase();
        
        // Cupons de exemplo
        const validCoupons = {
            'MOSTARDINHA10': { discount: 10, type: 'percentage' },
            'AMOR15': { discount: 15, type: 'percentage' },
            'TEMPEROPOLIS': { discount: 5, type: 'fixed' }
        };
        
        if (validCoupons[couponCode]) {
            const coupon = validCoupons[couponCode];
            let message = '';
            
            if (coupon.type === 'percentage') {
                message = `Cupom aplicado! Desconto de ${coupon.discount}% 🎉`;
            } else {
                message = `Cupom aplicado! Desconto de R$ ${coupon.discount},00 🎉`;
            }
            
            showNotification(message, 'success');
            couponInput.value = '';
        } else {
            showNotification('Cupom inválido. Verifique o código e tente novamente.', 'error');
        }
    };
}

// ===== SISTEMA DE VOUCHER =====
function initVoucherSystem() {
    const voucherInput = document.getElementById('voucherInput');
    
    if (voucherInput) {
        voucherInput.addEventListener('blur', function() {
            const voucherCode = this.value.trim();
            
            if (voucherCode) {
                // Simula validação de voucher
                setTimeout(function() {
                    showNotification('Voucher verificado! Desconto será aplicado no checkout.', 'success');
                }, 1000);
            }
        });
    }
}

// ===== QUIZ - FUNÇÕES AUXILIARES =====
window.restartQuiz = function() {
    const quizQuestion = document.getElementById('quizQuestion');
    const quizResult = document.getElementById('quizResult');
    
    quizQuestion.style.display = 'block';
    quizResult.style.display = 'none';
};

window.sendCharacterMessage = function() {
    const emailInput = document.getElementById('quizEmail');
    const email = emailInput.value.trim();
    
    if (!email) {
        showNotification('Por favor, insira seu e-mail!', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Por favor, insira um e-mail válido!', 'error');
        return;
    }
    
    // Simula envio da mensagem do personagem
    showNotification('Mensagem especial enviada! Verifique sua caixa de entrada. 💌', 'success');
    emailInput.value = '';
};

// ===== MODAL DE PERSONAGEM =====
function showCharacterModal(name, quote, imageSrc) {
    // Remove modal existente
    const existingModal = document.querySelector('.character-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Cria novo modal
    const modal = document.createElement('div');
    modal.className = 'character-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <div class="modal-character">
                    <img src="${imageSrc}" alt="${name}">
                    <h3>${name}</h3>
                    <p class="character-quote">"${quote}"</p>
                    <button class="btn btn-primary" onclick="closeCharacterModal()">
                        <span class="btn-icon">❤️</span> Obrigado, ${name}!
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Estilos do modal
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        .modal-overlay {
            background: rgba(0, 0, 0, 0.8);
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .modal-content {
            background: white;
            border-radius: 15px;
            padding: 40px;
            max-width: 500px;
            width: 100%;
            position: relative;
            text-align: center;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
        .modal-close {
            position: absolute;
            top: 15px;
            right: 20px;
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            color: #6C757D;
        }
        .modal-character img {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            margin-bottom: 20px;
            border: 4px solid #F4D03F;
        }
        .modal-character h3 {
            margin-bottom: 15px;
            color: #343A40;
            font-size: 1.5rem;
        }
        .modal-character .character-quote {
            font-style: italic;
            color: #6C757D;
            font-size: 1.1rem;
            line-height: 1.6;
            margin-bottom: 30px;
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(modal);
    
    // Eventos de fechar
    modal.querySelector('.modal-close').addEventListener('click', closeCharacterModal);
    modal.querySelector('.modal-overlay').addEventListener('click', function(e) {
        if (e.target === this) {
            closeCharacterModal();
        }
    });
}

window.closeCharacterModal = function() {
    const modal = document.querySelector('.character-modal');
    if (modal) {
        modal.remove();
    }
};

// ===== FUNÇÕES AUXILIARES =====

// Validação de e-mail
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Sistema de notificações
function showNotification(message, type = 'info') {
    // Remove notificação existente
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Cria nova notificação
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Estilos da notificação
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#82E0AA' : type === 'error' ? '#F1948A' : '#85C1E9'};
        color: #343A40;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        max-width: 300px;
        animation: slideInRight 0.3s ease;
        font-family: 'Fredoka', cursive;
        font-weight: 500;
    `;
    
    // Adiciona estilos para o conteúdo
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        .notification-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
        }
        .notification-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #343A40;
            padding: 0;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .notification-close:hover {
            opacity: 0.7;
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    // Evento de fechar
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', function() {
        notification.remove();
    });
    
    // Remove automaticamente após 5 segundos
    setTimeout(function() {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// ===== EFEITOS ESPECIAIS =====

// Efeito de digitação para títulos
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Contador animado para números
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// ===== OTIMIZAÇÕES DE PERFORMANCE =====

// Debounce para eventos de scroll
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = function() {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Lazy loading para imagens
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(function(img) {
        imageObserver.observe(img);
    });
}

// ===== ACESSIBILIDADE =====

// Navegação por teclado
document.addEventListener('keydown', function(e) {
    // ESC para fechar modais/menus
    if (e.key === 'Escape') {
        const activeMenu = document.querySelector('.nav-menu.active');
        if (activeMenu) {
            activeMenu.classList.remove('active');
            document.getElementById('mobileMenuToggle').classList.remove('active');
        }
        
        const modal = document.querySelector('.character-modal');
        if (modal) {
            closeCharacterModal();
        }
    }
    
    // Enter/Space para ativar botões
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('btn')) {
        e.preventDefault();
        e.target.click();
    }
});

// ===== ANALYTICS E TRACKING =====

// Tracking de cliques em botões importantes
function trackButtonClick(buttonText, section) {
    // Aqui você integraria com Google Analytics ou similar
    console.log(`Botão clicado: ${buttonText} na seção: ${section}`);
    
    // Exemplo de integração com Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'click', {
            'event_category': 'Button',
            'event_label': buttonText,
            'event_context': section
        });
    }
}

// Adiciona tracking aos botões principais
document.addEventListener('DOMContentLoaded', function() {
    const trackingButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    trackingButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            const section = this.closest('section')?.className || 'unknown';
            trackButtonClick(buttonText, section);
        });
    });
});

// ===== EASTER EGGS =====

// Konami Code para surpresa especial
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateEasterEgg();
        konamiCode = [];
    }
});

function activateEasterEgg() {
    // Adiciona confetes ou outro efeito especial
    showNotification('🎉 Você descobriu o segredo do Mostardinha! 🎉', 'success');
    
    // Adiciona efeito de confetes
    createConfetti();
}

function createConfetti() {
    const colors = ['#F4D03F', '#82E0AA', '#85C1E9', '#F8BBD9', '#D7BDE2'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            top: -10px;
            left: ${Math.random() * 100}%;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            z-index: 10000;
            animation: confettiFall 3s linear forwards;
            border-radius: 50%;
        `;
        
        document.body.appendChild(confetti);
        
        setTimeout(function() {
            confetti.remove();
        }, 3000);
    }
    
    // Adiciona animação de confetes
    if (!document.querySelector('#confetti-style')) {
        const style = document.createElement('style');
        style.id = 'confetti-style';
        style.textContent = `
            @keyframes confettiFall {
                to {
                    transform: translateY(100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// --- Função para o Botão Scroll-to-Top ---

/* Inicializa o botão de "Voltar ao Topo" */
function initScrollTopButton() {
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  // Verifica se o botão existe no HTML
  if (!scrollTopBtn) {
    console.warn("Botão de scroll-to-top não encontrado no HTML.");
    return;
  }

  // Função para verificar a posição da página e mostrar/esconder o botão
  function toggleScrollButton() {
    // Se a página for rolada mais de 300px para baixo
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add("show"); // Adiciona a classe 'show' -> botão aparece
    } else {
      scrollTopBtn.classList.remove("show"); // Remove a classe 'show' -> botão desaparece
    }
  }

  // Adiciona um "ouvinte de evento" para quando a página for rolada
  window.addEventListener("scroll", toggleScrollButton);

  // Adiciona um "ouvinte de evento" para quando o botão for clicado
  scrollTopBtn.addEventListener("click", function () {
    // Rola suavemente até o topo da página (body ou html)
    window.scrollTo({
      top: 0,
      behavior: "smooth" // Comportamento suave
    });
  });
}

// --- Seção "Mais do que uma História" --- 
        // --- Modal para Dicas de Leitura ---
        function initMoreThanStorySection() {
            const modal = document.getElementById('readingTipsModal');
            const btn = document.getElementById('openTipsModal');
            const span = document.getElementById('closeTipsModal');

            if (!modal || !btn || !span) {
                 console.warn("Elementos do modal não encontrados. A funcionalidade do modal não será ativada.");
                 return;
            }

            // Quando o usuário clica no botão, abre o modal
            btn.onclick = function() {
                modal.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden'; // Impede scroll da página
            }

            // Quando o usuário clica no X, fecha o modal
            span.onclick = function() {
                modal.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = ''; // Restaura scroll da página
            }

            // Quando o usuário clica em qualquer lugar fora do modal, fecha-o
            window.onclick = function(event) {
                if (event.target === modal) {
                    modal.setAttribute('aria-hidden', 'true');
                    document.body.style.overflow = ''; // Restaura scroll da página
                }
            }
        }
        // ----------------------------------

        // --- Elementos Parallax dentro da Seção "Mais do que uma História" ---
        function createMoreSectionParallaxElements() {
            const sceneContainer = document.querySelector('.reading-scene-placeholder');
            if (!sceneContainer) return;

            // Criar alguns elementos parallax simples
            const elements = [
                { char: '⭐', classes: 'parallax-star' },
                { char: '🍃', classes: 'parallax-leaf' },
                { char: '🌼', classes: 'parallax-character', style: 'color: #FF9800;' }, // Flor laranja
                { char: '🐞', classes: 'parallax-character', style: 'color: #F44336; font-size: 1.8rem;' }, // Joaninha vermelha
            ];

            elements.forEach(elData => {
                const el = document.createElement('div');
                el.classList.add(elData.classes);
                el.textContent = elData.char;
                if (elData.style) {
                    el.style.cssText = elData.style; // Aplica estilo inline se fornecido
                }
                // Posicionamento aleatório dentro do container
                el.style.left = `${Math.random() * 80 + 10}%`;
                el.style.top = `${Math.random() * 80 + 10}%`;
                sceneContainer.appendChild(el);
            });
        }

// ===== INICIALIZAÇÃO ADICIONAL =====

// Inicializa funcionalidades quando a página carrega
window.addEventListener('load', function() {
    // Inicia lazy loading
    initLazyLoading();
    
    // Adiciona efeitos especiais após carregamento completo
    setTimeout(function() {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            heroTitle.style.opacity = '0';
            setTimeout(function() {
                heroTitle.style.opacity = '1';
                heroTitle.style.animation = 'fadeInUp 1s ease';
            }, 500);
        }
    }, 1000);
});

