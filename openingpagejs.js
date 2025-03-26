document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // CTA Button interaction
    const ctaButton = document.querySelector('.cta-button');
    ctaButton.addEventListener('click', () => {
        // You can add functionality here, like opening a rental form
        alert('Redirecting to rental form...');
    });
    
    
    
});
// Logout function
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}