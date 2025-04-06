document.addEventListener('DOMContentLoaded', () => {
    const checkLogin=JSON.parse(localStorage.getItem('isLoggedIn'));
    if (checkLogin){
        document.querySelectorAll(".login").forEach(item=>item.style.display="none");
        document.querySelectorAll(".logout").forEach(item=>item.style.display="block");
    }
    else{
        document.querySelectorAll(".login").forEach(item=>item.style.display="block");
        document.querySelectorAll(".logout").forEach(item=>item.style.display="none");
    }
    document.querySelector(".log-out").addEventListener('click',()=>{
        localStorage.setItem('isLoggedIn',false);
        localStorage.removeItem('currentUser');
        window.location.href="home.html";
    })
    
    
    
    
    
    
    
    
    
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

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.car-card');

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target); // Animate only once
        }
      });
    }, {
      threshold: 0.2 // 20% visible
    });

    cards.forEach(card => {
      observer.observe(card);
    });
  });

  document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.car-card');
    const features = document.querySelectorAll('.choose-item');
  
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2
    });
  
    cards.forEach(card => observer.observe(card));
    features.forEach(item => observer.observe(item));
  });
  