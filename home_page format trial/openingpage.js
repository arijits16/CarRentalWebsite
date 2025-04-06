document.addEventListener('DOMContentLoaded', () => {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if(this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if(targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // CTA Button interaction with ripple effect
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', (e) => {
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ctaButton.appendChild(ripple);
            
            const rect = ctaButton.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height) * 2;
            
            ripple.style.width = ripple.style.height = ${size}px;
            ripple.style.left = ${e.clientX - rect.left - size/2}px;
            ripple.style.top = ${e.clientY - rect.top - size/2}px;
            
            ripple.classList.add('active');
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // You can add functionality here, like opening a rental form
            // alert('Redirecting to rental form...');
        });
    }
    
    // IMPROVED ANIMATION ENHANCEMENTS
    
    // Add fade-in animation to the navbar
    const navbar = document.querySelector('nav');
    navbar.classList.add('fadeIn');
    
    // Enhanced typewriter effect for hero heading
    const heroHeading = document.querySelector('.hero-content h1');
    if (heroHeading) {
        const text = heroHeading.textContent;
        heroHeading.innerHTML = '';
        
        const words = text.split(' ');
        
        let wordIndex = 0;
        let charIndex = 0;
        let currentWord = '';
        let isDeleting = false;
        
        const typeEffect = () => {
            if (wordIndex < words.length) {
                // Current word being processed
                const word = words[wordIndex];
                
                // Check if deleting or typing
                if (!isDeleting) {
                    // If typing, add next character to current word
                    currentWord = word.substring(0, charIndex + 1);
                    charIndex++;
                    
                    // Update heading
                    heroHeading.innerHTML = ${words.slice(0, wordIndex).join(' ')} <span class="typing-word">${currentWord}</span>;
                    
                    // If word is complete
                    if (charIndex === word.length) {
                        // Add small delay before moving to next word
                        setTimeout(() => {
                            // Move to next word
                            wordIndex++;
                            charIndex = 0;
                            
                            // Update heading to include completed word
                            if (wordIndex < words.length) {
                                heroHeading.innerHTML = ${words.slice(0, wordIndex).join(' ')} <span class="typing-word"></span>;
                            } else {
                                // All words complete
                                heroHeading.innerHTML = words.join(' ');
                                heroHeading.classList.add('text-gradient');
                                return;
                            }
                        }, 200);
                    }
                }
                
                // Speed of typing (adjust as needed)
                const typingSpeed = 80;
                
                setTimeout(typeEffect, typingSpeed);
            }
        };
        
        // Start the typewriter effect after a short delay
        setTimeout(typeEffect, 500);
    }
    
    // Enhanced scroll animation detection
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.car-display, .about-us-section, .choose-us, .animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight * 0.85;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
                
                // Animate children with sequential delay if applicable
                const children = element.querySelectorAll('.animate-child');
                if (children.length) {
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('animate');
                        }, 150 * index);
                    });
                }
            }
        });
    };

    // Initial check and add scroll event listener
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    // Enhanced car card animations
    const carCards = document.querySelectorAll('.car-card');
    carCards.forEach((card, index) => {
        // Add staggered animation on page load
        setTimeout(() => {
            card.classList.add('fadeInScale');
        }, 100 * index);
        
        // Add hover animations
        card.addEventListener('mouseenter', () => {
            card.classList.add('card-hover');
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('card-hover');
        });
        
        // Add click effect to rent buttons
        const rentButton = card.querySelector('.rent-button');
        if (rentButton) {
            rentButton.addEventListener('click', (e) => {
                // Create ripple effect
                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                rentButton.appendChild(ripple);
                
                const rect = rentButton.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height) * 2;
                
                ripple.style.width = ripple.style.height = ${size}px;
                ripple.style.left = ${e.clientX - rect.left - size/2}px;
                ripple.style.top = ${e.clientY - rect.top - size/2}px;
                
                ripple.classList.add('active');
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
                
                // Add button animation
                rentButton.classList.add('button-pulse');
                setTimeout(() => {
                    rentButton.classList.remove('button-pulse');
                }, 500);
            });
        }
    });
    
    // Add hover animations for rent buttons (from second script)
    const rentButtons = document.querySelectorAll('.rent-button');
    rentButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.classList.add('button-pulse');
        });
        
        button.addEventListener('mouseleave', () => {
            button.classList.remove('button-pulse');
        });
    });
    
    // Enhanced "Why Choose Us" animations with intersection observer
    const animateChooseUs = () => {
        const chooseItems = document.querySelectorAll('.choose-item');
        
        chooseItems.forEach((item, index) => {
            // Add staggered animation
            setTimeout(() => {
                item.classList.add('bounceIn');
                
                // Animate icon after item appears
                setTimeout(() => {
                    const icon = item.querySelector('.icon-container');
                    if (icon) {
                        icon.classList.add('rotateIn');
                    }
                }, 300);
            }, index * 150);
        });
    };
    
    // Animate the "Why Choose Us" icons (from second script)
    const animateIcons = () => {
        const icons = document.querySelectorAll('.icon-container');
        
        icons.forEach((icon, index) => {
            setTimeout(() => {
                icon.classList.add('icon-animate');
            }, index * 200); // Staggered animation
        });
    };
    
    // Use Intersection Observer for better animation triggers
    const observeElements = (elements, callback) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    callback(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        elements.forEach(element => {
            observer.observe(element);
        });
    };
    
    // Observe "Why Choose Us" section
    const chooseUsSection = document.querySelector('.choose-us');
    if (chooseUsSection) {
        observeElements([chooseUsSection], () => {
            animateChooseUs();
            animateIcons(); // Added from second script
        });
    }
    
    // Observe and animate About Us section
    const aboutUsSection = document.querySelector('.about-us-section');
    if (aboutUsSection) {
        observeElements([aboutUsSection], () => {
            const aboutText = aboutUsSection.querySelector('.about-text');
            const aboutImg = aboutUsSection.querySelector('.Pic3 img');
            
            if (aboutText) aboutText.classList.add('slideInLeft');
            if (aboutImg) {
                setTimeout(() => {
                    aboutImg.classList.add('slideInRight');
                }, 300);
            }
        });
    }
    
    // Add counter animation to statistics if they exist
    const animateCounters = () => {
        const counters = document.querySelectorAll('.counter');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // ms
            const step = target / (duration / 16); // 60fps
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.round(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    };
    
    // Call counter animation if counters exist
    if (document.querySelector('.counter')) {
        observeElements(document.querySelectorAll('.counter'), animateCounters);
    }
    
    // Add parallax effect to hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            heroSection.style.backgroundPositionY = scrollPosition * 0.05 + 'px';
        });
    }
    
    // Add animation to logo
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.classList.add('fadeIn');
        
        // Add subtle animation to logo on hover
        logo.addEventListener('mouseenter', () => {
            const img = logo.querySelector('img');
            if (img) {
                img.style.transform = 'rotate(10deg) scale(1.1)';
                setTimeout(() => {
                    img.style.transform = '';
                }, 300);
            }
        });
    }
    
    // Add user greeting animation if it exists
    const userGreeting = document.querySelector('.user-greeting');
    if (userGreeting && localStorage.getItem('currentUser')) {
        const username = JSON.parse(localStorage.getItem('currentUser')).username;
        userGreeting.textContent = Welcome, ${username}!;
        userGreeting.classList.add('fadeInScale');
    }
    
    // Add smooth reveal for car grid
    const carGrid = document.querySelector('.car-grid');
    if (carGrid) {
        observeElements([carGrid], () => {
            carGrid.style.opacity = '1';
        });
    }
    
    // Initialize AOS for scroll animations if available (from second script)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    }
});

// Enhanced logout function
function logout() {
    // Add animation before logout
    const loginLink = document.querySelector('a[href="./login copy.html"]');
    if (loginLink) {
        loginLink.classList.add('pulse');
        
        setTimeout(() => {
            localStorage.removeItem('currentUser');
            window.location.href = 'login.html';
        }, 300);
    } else {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    }
}

// Add this function to handle CSS animations for completed page load
window.addEventListener('load', () => {
    document.body.classList.add('page-loaded');
    
    // Animate logo on page load
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.classList.add('bounceIn');
    }
});