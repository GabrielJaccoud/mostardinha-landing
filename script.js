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
    const colors = ['#F4D03F', '#85C1E9', '#F1948A', '#82E0AA', '#D7BDE2'];
    
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

