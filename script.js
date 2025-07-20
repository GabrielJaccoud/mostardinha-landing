// Funcionalidades da Landing Page do Mostardinha

document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const audioToggle = document.getElementById('audioToggle');
    const backgroundAudio = document.getElementById('backgroundAudio');
    const audioIcon = document.querySelector('.audio-icon');
    const audioText = document.querySelector('.audio-text');
    
    // Estado do áudio
    let isPlaying = false;
    
    // Controle do áudio de fundo
    audioToggle.addEventListener('click', function() {
        if (isPlaying) {
            backgroundAudio.pause();
            audioIcon.textContent = '🎵';
            audioText.textContent = 'Ouça a trilha do Mostardinha';
            audioToggle.classList.remove('playing');
            isPlaying = false;
        } else {
            backgroundAudio.play().then(() => {
                audioIcon.textContent = '🔊';
                audioText.textContent = 'Pausar trilha';
                audioToggle.classList.add('playing');
                isPlaying = true;
            }).catch(error => {
                console.log('Erro ao reproduzir áudio:', error);
                // Fallback para navegadores que bloqueiam autoplay
                audioIcon.textContent = '🎵';
                audioText.textContent = 'Clique para ouvir';
            });
        }
    });
    
    // Configurar volume do áudio
    backgroundAudio.volume = 0.3;
    
    // Scroll suave para seções
    window.scrollToSection = function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = section.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    };
    
    // Animações de scroll reveal
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.reveal');
        
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
    
    // Adicionar classe reveal aos elementos que devem ser animados
    function addRevealClasses() {
        const elementsToReveal = [
            '.section-header',
            '.book-content',
            '.gallery-item',
            '.testimonial-card',
            '.author-content',
            '.final-cta-content'
        ];
        
        elementsToReveal.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                element.classList.add('reveal');
            });
        });
    }
    
    // Inicializar animações
    addRevealClasses();
    revealOnScroll();
    
    // Event listener para scroll
    window.addEventListener('scroll', revealOnScroll);
    
    // Parallax effect para elementos flutuantes
    function parallaxEffect() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-elements > *');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
    
    // Event listener para parallax
    window.addEventListener('scroll', parallaxEffect);
    
    // Carrossel de depoimentos (auto-scroll)
    function initTestimonialsCarousel() {
        const carousel = document.querySelector('.testimonials-carousel');
        const cards = document.querySelectorAll('.testimonial-card');
        
        if (cards.length > 0) {
            let currentIndex = 0;
            
            // Adicionar indicadores visuais
            cards.forEach((card, index) => {
                card.style.opacity = index === 0 ? '1' : '0.7';
                card.style.transform = index === 0 ? 'scale(1)' : 'scale(0.95)';
            });
            
            // Auto-rotate depoimentos (opcional)
            setInterval(() => {
                cards[currentIndex].style.opacity = '0.7';
                cards[currentIndex].style.transform = 'scale(0.95)';
                
                currentIndex = (currentIndex + 1) % cards.length;
                
                cards[currentIndex].style.opacity = '1';
                cards[currentIndex].style.transform = 'scale(1)';
            }, 5000);
        }
    }
    
    // Inicializar carrossel
    initTestimonialsCarousel();
    
    // Efeitos de hover para botões
    function addButtonEffects() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px) scale(1.02)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    // Inicializar efeitos de botão
    addButtonEffects();
    
    // Animação de entrada para o Mostardinha hero
    function animateHeroMostardinha() {
        const heroImage = document.querySelector('.mostardinha-hero');
        if (heroImage) {
            heroImage.style.opacity = '0';
            heroImage.style.transform = 'translateY(50px) scale(0.8)';
            
            setTimeout(() => {
                heroImage.style.transition = 'all 1s ease-out';
                heroImage.style.opacity = '1';
                heroImage.style.transform = 'translateY(0) scale(1)';
            }, 500);
        }
    }
    
    // Inicializar animação do hero
    animateHeroMostardinha();
    
    // Contador animado para preços (opcional)
    function animateNumbers() {
        const priceElements = document.querySelectorAll('.price');
        
        priceElements.forEach(element => {
            const finalValue = element.textContent;
            element.textContent = 'R$ 0,00';
            
            setTimeout(() => {
                element.style.transition = 'all 0.5s ease';
                element.textContent = finalValue;
            }, 1000);
        });
    }
    
    // Inicializar animação de números
    animateNumbers();
    
    // Efeito de partículas flutuantes (opcional)
    function createFloatingParticles() {
        const hero = document.querySelector('.hero');
        const particleCount = 20;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(255, 255, 255, 0.6);
                border-radius: 50%;
                pointer-events: none;
                animation: floatParticle ${5 + Math.random() * 5}s linear infinite;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 5}s;
            `;
            
            hero.appendChild(particle);
        }
    }
    
    // Adicionar CSS para partículas
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes floatParticle {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(particleStyle);
    
    // Inicializar partículas
    createFloatingParticles();
    
    // Lazy loading para imagens
    function lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Inicializar lazy loading
    lazyLoadImages();
    
    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Feedback visual para formulários (se houver)
    function addFormFeedback() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Adicionar feedback visual
                const submitBtn = form.querySelector('button[type="submit"]');
                if (submitBtn) {
                    const originalText = submitBtn.textContent;
                    submitBtn.textContent = 'Enviando...';
                    submitBtn.disabled = true;
                    
                    // Simular envio
                    setTimeout(() => {
                        submitBtn.textContent = 'Enviado! ✅';
                        setTimeout(() => {
                            submitBtn.textContent = originalText;
                            submitBtn.disabled = false;
                        }, 2000);
                    }, 1500);
                }
            });
        });
    }
    
    // Inicializar feedback de formulários
    addFormFeedback();
    
    // Performance: Debounce para eventos de scroll
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Aplicar debounce aos eventos de scroll
    const debouncedReveal = debounce(revealOnScroll, 10);
    const debouncedParallax = debounce(parallaxEffect, 10);
    
    window.removeEventListener('scroll', revealOnScroll);
    window.removeEventListener('scroll', parallaxEffect);
    window.addEventListener('scroll', debouncedReveal);
    window.addEventListener('scroll', debouncedParallax);
    
    // Adicionar classe de carregamento completo
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    console.log('🎉 Landing page do Mostardinha carregada com sucesso!');
});

