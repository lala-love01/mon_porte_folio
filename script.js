// Animation des formes interactives
function animateShape(element) {
    element.style.animation = 'none';
    element.style.transform = 'scale(1.5) rotate(360deg)';
    element.style.transition = 'all 0.6s ease';
    
    setTimeout(() => {
        element.style.transform = 'scale(1) rotate(0deg)';
    }, 600);
}

// Animation des barres de progression au scroll
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const targetWidth = progressBar.getAttribute('data-width');
                progressBar.style.width = targetWidth + '%';
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Effet de parallaxe pour les formes d'arrière-plan
function createParallaxEffect() {
    const shapes = document.querySelectorAll('.background-shapes .shape');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.3;
            shape.style.transform = `translateY(${rate * speed}px)`;
        });
    });
}

// Changement de couleur de la navbar au scroll
function handleNavbarScroll() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Génération dynamique de formes aléatoires
function generateRandomShapes() {
    const shapesContainer = document.querySelector('.background-shapes');
    const shapeTypes = ['circle', 'triangle', 'square', 'hexagon'];
    
    setInterval(() => {
        const shape = document.createElement('div');
        const randomType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
        
        shape.className = `shape ${randomType}`;
        shape.style.top = Math.random() * 100 + '%';
        shape.style.left = Math.random() * 100 + '%';
        shape.style.animationDelay = Math.random() * 2 + 's';
        shape.style.opacity = Math.random() * 0.1 + 0.05;
        
        shapesContainer.appendChild(shape);
        
        // Supprimer la forme après l'animation
        setTimeout(() => {
            if (shape.parentNode) {
                shape.parentNode.removeChild(shape);
            }
        }, 6000);
    }, 3000);
}

// Animation de typing pour le titre
function typeWriter() {
    const titleElement = document.querySelector('.hero-content h1');
    const text = titleElement.textContent;
    titleElement.textContent = '';
    titleElement.style.opacity = '1';
    
    let i = 0;
    function type() {
        if (i < text.length) {
            titleElement.textContent += text.charAt(i);
            i++;
            setTimeout(type, 100);
        }
    }
    setTimeout(type, 1000);
}

// Gestion du formulaire de contact
function handleContactForm() {
    const form = document.getElementById('contact-form');
    const messageDiv = document.getElementById('form-message');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Animation de soumission
        const submitBtn = form.querySelector('button');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Envoi en cours... ⏳';
        submitBtn.disabled = true;
        
        // Simulation d'envoi
        setTimeout(() => {
            messageDiv.innerHTML = '<p style="color: #4ecdc4; text-align: center; font-weight: bold;">✅ Message envoyé avec succès ! Je vous répondrai rapidement.</p>';
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            form.reset();
            
            // Effet de confettis virtuel
            createConfetti();
        }, 2000);
    });
}

// Effet de confettis
function createConfetti() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#feca57', '#ff9ff3'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-10px';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.zIndex = '9999';
        confetti.style.pointerEvents = 'none';
        confetti.style.animation = `confetti-fall ${Math.random() * 2 + 2}s linear forwards`;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 4000);
    }
}

// Smooth scrolling pour les liens de navigation
function enableSmoothScrolling() {
    const links = document.querySelectorAll('nav a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Effet de cursor personnalisé qui suit la souris
function createCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, #4ecdc4, #45b7d1);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.1s ease;
        opacity: 0.7;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    // Agrandir le cursor sur les éléments interactifs
    const interactiveElements = document.querySelectorAll('a, button, .interactive-shape');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            cursor.style.opacity = '0.5';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.opacity = '0.7';
        });
    });
}

// Animation des cartes au survol avec effet 3D
function addCard3DEffect() {
    const cards = document.querySelectorAll('.skill-card, .project-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

// Détection du thème système et adaptation
function adaptToSystemTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    function updateTheme(e) {
        if (e.matches) {
            // Mode sombre détecté
            document.body.style.filter = 'hue-rotate(180deg) invert(1)';
            document.querySelector('.background-shapes').style.filter = 'hue-rotate(180deg) invert(1)';
        } else {
            // Mode clair
            document.body.style.filter = 'none';
            document.querySelector('.background-shapes').style.filter = 'none';
        }
    }
    
    prefersDark.addListener(updateTheme);
    updateTheme(prefersDark);
}

// Fonction pour créer des particules qui suivent la souris
function createMouseTrailParticles() {
    let particles = [];
    
    document.addEventListener('mousemove', (e) => {
        // Créer une particule
        const particle = {
            x: e.clientX,
            y: e.clientY,
            size: Math.random() * 5 + 2,
            speedX: (Math.random() - 0.5) * 2,
            speedY: (Math.random() - 0.5) * 2,
            opacity: 1,
            color: `hsl(${Math.random() * 360}, 70%, 50%)`
        };
        
        particles.push(particle);
        
        // Limiter le nombre de particules
        if (particles.length > 20) {
            particles.shift();
        }
    });
    
    // Animation des particules
    function animateParticles() {
        particles.forEach((particle, index) => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            particle.opacity -= 0.02;
            particle.size *= 0.98;
            
            if (particle.opacity <= 0) {
                particles.splice(index, 1);
            }
        });
        
        requestAnimationFrame(animateParticles);
    }
    animateParticles();
}

// Système de notifications toast
function createToastNotification(message, type = 'success') {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4ecdc4' : '#ff6b6b'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        z-index: 10000;
        transform: translateX(100%);
        transition: all 0.3s ease;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    `;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Initialisation de toutes les fonctionnalités
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Portfolio interactif initialisé !');
    
    // Initialiser toutes les fonctionnalités
    animateProgressBars();
    createParallaxEffect();
    handleNavbarScroll();
    handleContactForm();
    enableSmoothScrolling();
    addCard3DEffect();
    setupContactLinks(); // Nouvelle fonction pour les contacts
    
    // Fonctionnalités optionnelles (décommenter selon les besoins)
    // typeWriter(); // Animation d'écriture du titre
    // generateRandomShapes(); // Génération de formes aléatoires
    // createCustomCursor(); // Curseur personnalisé
    // adaptToSystemTheme(); // Adaptation au thème système
    // createMouseTrailParticles(); // Particules qui suivent la souris
    
    // Message de bienvenue
    setTimeout(() => {
        createToastNotification('Bienvenue sur mon portfolio interactif ! ✨');
    }, 1000);
});

// Fonctions utilitaires pour les interactions
const Utils = {
    // Créer une explosion de formes
    createShapeExplosion: function(x, y) {
        const shapes = ['●', '▲', '■', '⬟'];
        for (let i = 0; i < 10; i++) {
            const shape = document.createElement('div');
            shape.textContent = shapes[Math.floor(Math.random() * shapes.length)];
            shape.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                color: hsl(${Math.random() * 360}, 70%, 50%);
                font-size: 20px;
                pointer-events: none;
                z-index: 9999;
                animation: explode 1s ease-out forwards;
            `;
            
            document.body.appendChild(shape);
            
            setTimeout(() => shape.remove(), 1000);
        }
    },
    
    // Ajouter un style pour l'animation d'explosion
    addExplosionStyle: function() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes explode {
                0% {
                    transform: scale(0) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: scale(1) rotate(720deg) translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
};

// Initialiser les styles utilitaires
Utils.addExplosionStyle();

// Ajouter des événements de clic pour les explosions
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('interactive-shape')) {
        Utils.createShapeExplosion(e.clientX, e.clientY);
    }
});