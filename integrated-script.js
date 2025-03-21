document.addEventListener("DOMContentLoaded", function () {
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  const sections = document.querySelectorAll("section");
  const buttons = document.querySelectorAll("button");

  // Add ripple effect to buttons - refactored to use a reusable function
  function createRippleEffect(element, event) {
    const ripple = document.createElement("div");
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    ripple.classList.add("ripple-effect");
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    element.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  }

  buttons.forEach((button) => {
    button.style.position = "relative";
    button.style.overflow = "hidden";
    button.addEventListener("click", function (e) {
      createRippleEffect(this, e);
    });
  });

  // Set initial opacity for car cards and add animation class
  const carCards = document.querySelectorAll(".car-card");
  carCards.forEach((card, index) => {
    // Add data-car-id attribute to each car card for booking functionality
    card.setAttribute("data-car-id", `car-${index + 1}`);
    card.style.opacity = "0";
    card.classList.add("animate-slide-in");
  });

  // Improved Intersection Observer for revealing elements on scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          // Stop observing the element after it's been revealed
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  // Observe car cards
  carCards.forEach((card) => {
    observer.observe(card);
  });

  // Throttled scroll event handling for better performance
  let lastScrollTime = 0;
  const scrollThrottle = 100; // ms

  window.addEventListener("scroll", function () {
    const now = Date.now();
    if (now - lastScrollTime < scrollThrottle) return;
    lastScrollTime = now;

    // Show/hide scroll to top button
    if (window.pageYOffset > 300) {
      scrollTopBtn.style.display = "block";
      scrollTopBtn.classList.add("visible");
    } else {
      scrollTopBtn.classList.remove("visible");
      // Use a timeout to allow the fade-out animation to complete
      setTimeout(() => {
        if (!scrollTopBtn.classList.contains("visible")) {
          scrollTopBtn.style.display = "none";
        }
      }, 300);
    }
    
    // Add fade-in animation to sections when scrolled into view
    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (sectionTop < windowHeight * 0.75) {
        section.classList.add("animate-fade-in");
      }
    });
  });

  // Scroll to top button functionality
  scrollTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll("nav a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        // Offset for fixed header if present
        const headerOffset = document.querySelector("nav")?.offsetHeight || 0;
        const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Search form submission handler with validation
  const searchForm = document.querySelector(".search-form");
  if (searchForm) {
    // Convert the div to a form if it isn't already
    if (searchForm.tagName !== "FORM") {
      searchForm.addEventListener("click", function(e) {
        if (e.target.tagName === "BUTTON") {
          e.preventDefault();
          
          // Get all inputs within the search form
          const inputs = searchForm.querySelectorAll("input");
          const formData = {};
          let hasValue = false;
          
          inputs.forEach(input => {
            formData[input.placeholder || input.type] = input.value;
            if (input.value.trim() !== "") hasValue = true;
          });
          
          if (hasValue) {
            console.log("Search submitted:", formData);
            // Process search data or redirect
          } else {
            // Show error message
            const errorMsg = document.querySelector(".search-error") || document.createElement("div");
            errorMsg.classList.add("search-error", "text-white", "bg-red-500", "p-2", "rounded", "mt-2");
            errorMsg.textContent = "Please enter at least one search criterion";
            
            if (!document.querySelector(".search-error")) {
              searchForm.appendChild(errorMsg);
              // Remove error message after 3 seconds
              setTimeout(() => errorMsg.remove(), 3000);
            }
          }
        }
      });
    } else {
      // Regular form handling
      searchForm.addEventListener("submit", function (e) {
        e.preventDefault();
        
        // Simple validation
        const formData = new FormData(e.target);
        const searchData = Object.fromEntries(formData);
        
        // Check if at least one field is filled
        const hasValue = Object.values(searchData).some(value => value.trim() !== "");
        
        if (hasValue) {
          console.log("Search submitted:", searchData);
          // Here you would typically send the data to a server or process it
        } else {
          // Show error message
          const errorMsg = document.querySelector(".search-error") || document.createElement("div");
          errorMsg.classList.add("search-error", "text-white", "bg-red-500", "p-2", "rounded", "mt-2");
          errorMsg.textContent = "Please enter at least one search criterion";
          
          if (!document.querySelector(".search-error")) {
            searchForm.appendChild(errorMsg);
            // Remove error message after 3 seconds
            setTimeout(() => errorMsg.remove(), 3000);
          }
        }
      });
    }
  }

  // Car booking button handlers
  const bookButtons = document.querySelectorAll(".car-card button");
  bookButtons.forEach((button) => {
    button.addEventListener("click", function() {
      const carCard = this.closest(".car-card");
      const carId = carCard.dataset.carId;
      const carName = carCard.querySelector("h3")?.textContent || "Selected car";
      const carPrice = carCard.querySelector(".text-primary")?.textContent || "";
      
      // Show booking modal or redirect to booking page
      showBookingModal(carId, carName, carPrice);
    });
  });

  // Function to show booking modal
  function showBookingModal(carId, carName, carPrice) {
    // Create or show a modal for booking
    const modal = document.getElementById("bookingModal") || createBookingModal();
    
    // Update modal content with car details
    const modalTitle = modal.querySelector(".modal-title");
    if (modalTitle) modalTitle.textContent = `Book ${carName}`;
    
    // Set car ID in a hidden input
    const carIdInput = modal.querySelector("#bookingCarId");
    if (carIdInput) carIdInput.value = carId;
    
    // Set price info if available
    const priceInfo = modal.querySelector(".price-info");
    if (priceInfo && carPrice) priceInfo.textContent = `Rate: ${carPrice}`;
    
    // Show the modal
    modal.classList.add("active");
    
    // Add modal styles if they don't exist
    if (!document.getElementById("modalStyles")) {
      const modalStyles = document.createElement("style");
      modalStyles.id = "modalStyles";
      modalStyles.textContent = `
        .modal {
          display: none;
          position: fixed;
          z-index: 100;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          align-items: center;
          justify-content: center;
        }
        .modal.active {
          display: flex;
        }
        .modal-content {
          background-color: white;
          padding: 2rem;
          border-radius: 8px;
          max-width: 500px;
          width: 90%;
          position: relative;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .close-modal {
          position: absolute;
          right: 1rem;
          top: 1rem;
          font-size: 1.5rem;
          cursor: pointer;
        }
        .form-group {
          margin-bottom: 1rem;
        }
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
        }
        .form-group input {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #e2e8f0;
          border-radius: 4px;
        }
        .booking-confirmation {
          text-align: center;
          color: #1a56db;
          padding: 1rem;
          font-weight: 500;
        }
        .ripple-effect {
          position: absolute;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.7);
          width: 100px;
          height: 100px;
          margin-top: -50px;
          margin-left: -50px;
          animation: ripple 0.6s linear;
          transform: scale(0);
          opacity: 1;
        }
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
        .animate-slide-in {
          transition: opacity 0.5s ease, transform 0.5s ease;
          transform: translateY(20px);
        }
        .animate-slide-in[style*="opacity: 1"] {
          transform: translateY(0);
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease forwards;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        #scrollTopBtn {
          position: fixed;
          bottom: 30px;
          right: 30px;
          z-index: 99;
          display: none;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        #scrollTopBtn.visible {
          opacity: 1;
        }
      `;
      document.head.appendChild(modalStyles);
    }
  }

  // Function to create booking modal if it doesn't exist
  function createBookingModal() {
    const modal = document.createElement("div");
    modal.id = "bookingModal";
    modal.classList.add("modal");
    
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close-modal">&times;</span>
        <h2 class="modal-title text-2xl font-bold mb-4">Book a Car</h2>
        <p class="price-info text-primary font-bold mb-4"></p>
        <form id="bookingForm">
          <input type="hidden" id="bookingCarId" name="carId">
          <div class="form-group">
            <label for="bookingPickupLocation">Pick-up Location</label>
            <input type="text" id="bookingPickupLocation" name="pickupLocation" required>
          </div>
          <div class="form-group">
            <label for="bookingDropoffLocation">Drop-off Location</label>
            <input type="text" id="bookingDropoffLocation" name="dropoffLocation" required>
          </div>
          <div class="form-group">
            <label for="bookingDate">Pick-up Date</label>
            <input type="date" id="bookingDate" name="date" required>
          </div>
          <div class="form-group">
            <label for="bookingReturnDate">Return Date</label>
            <input type="date" id="bookingReturnDate" name="returnDate" required>
          </div>
          <div class="form-group">
            <label for="bookingName">Full Name</label>
            <input type="text" id="bookingName" name="name" required>
          </div>
          <div class="form-group">
            <label for="bookingEmail">Email</label>
            <input type="email" id="bookingEmail" name="email" required>
          </div>
          <div class="form-group">
            <label for="bookingPhone">Phone</label>
            <input type="tel" id="bookingPhone" name="phone" required>
          </div>
          <button type="submit" class="w-full bg-primary text-white py-2 rounded hover:bg-primary/90 transition-colors cursor-pointer">Confirm Booking</button>
        </form>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add event listeners for modal
    const closeBtn = modal.querySelector(".close-modal");
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("active");
    });
    
    // Close modal when clicking outside
    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("active");
      }
    });
    
    // Handle booking form submission
    const bookingForm = modal.querySelector("#bookingForm");
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const bookingData = Object.fromEntries(formData);
      
      console.log("Booking submitted:", bookingData);
      // Here you would typically send the booking data to a server
      
      // Show confirmation message
      bookingForm.innerHTML = `<div class="booking-confirmation">Booking confirmed! We'll contact you shortly with the details.</div>`;
      
      // Close modal after a delay
      setTimeout(() => {
        modal.classList.remove("active");
      }, 3000);
    });
    
    return modal;
  }

  // Initialize mobile menu toggle if needed
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.md\\:flex');
  
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Add animation to main hero section
  const heroSection = document.querySelector('section.relative.h-screen');
  if (heroSection) {
    setTimeout(() => {
      heroSection.classList.add('animate-fade-in');
    }, 300);
  }
});
