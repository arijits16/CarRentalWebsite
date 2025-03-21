// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Set minimum dates for date inputs to today
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('pickupDate').min = today;
  document.getElementById('returnDate').min = today;
  
  // Show/hide rental form
  const showFormBtn = document.getElementById('showFormBtn');
  const formSection = document.getElementById('formSection');
  
  if (showFormBtn && formSection) {
      showFormBtn.addEventListener('click', function() {
          formSection.classList.remove('hidden');
          formSection.scrollIntoView({ behavior: 'smooth' });
      });
  }
  
  // Price calculator functionality
  const rentalForm = document.getElementById('rentalForm');
  if (rentalForm) {
      // Elements for price calculation
      const pickupDateInput = document.getElementById('pickupDate');
      const returnDateInput = document.getElementById('returnDate');
      const carTypeSelect = document.getElementById('carType');
      const extrasCheckboxes = document.querySelectorAll('input[name="extras"]');
      const basePriceEl = document.getElementById('basePrice');
      const extrasPriceEl = document.getElementById('extrasPrice');
      const totalPriceEl = document.getElementById('totalPrice');
      
      // Car type prices per day
      const carPrices = {
          'economy': 50,
          'sedan': 65,
          'suv': 80,
          'truck': 85,
          'luxury': 120,
          'van': 90
      };
      
      // Extra services prices per day
      const extraPrices = {
          'gps': 5,
          'childSeat': 3,
          'insurance': 10
      };
      
      // Function to calculate rental price
      function calculatePrice() {
          // Get dates
          const pickupDate = new Date(pickupDateInput.value);
          const returnDate = new Date(returnDateInput.value);
          
          // Validate dates
          if (!pickupDate || !returnDate || pickupDate > returnDate) {
              return;
          }
          
          // Calculate days (including partial days)
          const timeDiff = returnDate - pickupDate;
          const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
          
          // Calculate base price
          const carType = carTypeSelect.value;
          let basePrice = 0;
          if (carType && carPrices[carType]) {
              basePrice = carPrices[carType] * days;
          }
          
          // Calculate extras price
          let extrasPrice = 0;
          extrasCheckboxes.forEach(checkbox => {
              if (checkbox.checked && extraPrices[checkbox.value]) {
                  extrasPrice += extraPrices[checkbox.value] * days;
              }
          });
          
          // Update price display
          basePriceEl.textContent = `$${basePrice}`;
          extrasPriceEl.textContent = `$${extrasPrice}`;
          totalPriceEl.textContent = `$${basePrice + extrasPrice}`;
      }
      
      // Add event listeners for price calculation
      pickupDateInput.addEventListener('change', calculatePrice);
      returnDateInput.addEventListener('change', calculatePrice);
      carTypeSelect.addEventListener('change', calculatePrice);
      extrasCheckboxes.forEach(checkbox => {
          checkbox.addEventListener('change', calculatePrice);
      });
      
      // Form submission
      rentalForm.addEventListener('submit', function(e) {
          e.preventDefault();
          alert('Your reservation has been submitted! A confirmation email will be sent shortly.');
          rentalForm.reset();
          calculatePrice();
      });
  }
  
  // Car filtering and sorting functionality
  const filterCategory = document.getElementById('filterCategory');
  const searchCars = document.getElementById('searchCars');
  const sortBy = document.getElementById('sortBy');
  const cars = document.querySelectorAll('.car');
  
  function filterAndSortCars() {
      const category = filterCategory.value;
      const searchTerm = searchCars.value.toLowerCase();
      const sortOption = sortBy.value;
      
      // Convert cars to array for sorting
      const carsArray = Array.from(cars);
      
      // Sort cars
      carsArray.sort((a, b) => {
          if (sortOption === 'name') {
              const nameA = a.getAttribute('data-name') || a.querySelector('h3').textContent;
              const nameB = b.getAttribute('data-name') || b.querySelector('h3').textContent;
              return nameA.localeCompare(nameB);
          } else if (sortOption === 'price-low') {
              const priceA = parseInt(a.getAttribute('data-price') || 0);
              const priceB = parseInt(b.getAttribute('data-price') || 0);
              return priceA - priceB;
          } else if (sortOption === 'price-high') {
              const priceA = parseInt(a.getAttribute('data-price') || 0);
              const priceB = parseInt(b.getAttribute('data-price') || 0);
              return priceB - priceA;
          }
          return 0;
      });
      
      // Filter and display cars
      carsArray.forEach(car => {
          const carCategory = car.getAttribute('data-category');
          const carName = (car.getAttribute('data-name') || car.querySelector('h3').textContent).toLowerCase();
          
          const categoryMatch = category === 'all' || !carCategory || carCategory === category;
          const searchMatch = !searchTerm || carName.includes(searchTerm);
          
          if (categoryMatch && searchMatch) {
              car.style.display = '';
          } else {
              car.style.display = 'none';
          }
      });
      
      // Reorder cars in the DOM based on sort
      const carGalleries = document.querySelectorAll('.car-gallery');
      carGalleries.forEach(gallery => {
          const galleryCars = Array.from(gallery.querySelectorAll('.car')).filter(car => car.style.display !== 'none');
          galleryCars.forEach(car => gallery.appendChild(car));
      });
  }
  
  if (filterCategory && searchCars && sortBy) {
      filterCategory.addEventListener('change', filterAndSortCars);
      searchCars.addEventListener('input', filterAndSortCars);
      sortBy.addEventListener('change', filterAndSortCars);
  }
  
  // Car details modal functionality
  const modal = document.getElementById('carDetailsModal');
  const modalImage = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  const modalPrice = document.getElementById('modalPrice');
  const modalFeatures = document.getElementById('modalFeatures');
  const modalAvailability = document.getElementById('modalAvailability');
  const modalReserveBtn = document.getElementById('modalReserveBtn');
  const closeModalBtn = document.querySelector('.close-modal');
  
  // Sample feature data for cars
  const carFeatures = {
      'Economy Sedan': ['Fuel efficient', 'Bluetooth', 'USB port', 'Air conditioning'],
      'Mid-size SUV': ['All wheel drive', 'Roof rack', 'Navigation', 'Backup camera'],
      'Pickup Truck': ['Towing package', '4-wheel drive', 'Bed liner', 'Power outlets'],
      'Compact Car': ['Great mileage', 'Easy parking', 'Bluetooth', 'USB port'],
      'Cargo Van': ['Large cargo space', 'Tie-down points', 'Sliding door', 'Backup camera'],
      'Panel Van': ['Medium cargo area', 'Roof rack', 'Power outlets', 'Bluetooth'],
      'Executive Sedan': ['Leather seats', 'Premium sound', 'Navigation', 'Heated seats'],
      'Luxury SUV': ['Panoramic roof', 'Premium audio', 'Advanced safety', 'Third row seating']
  };
  
  // Open modal with car details
  const viewDetailsBtns = document.querySelectorAll('.view-details-btn');
  viewDetailsBtns.forEach(btn => {
      btn.addEventListener('click', function() {
          const car = this.closest('.car');
          const carName = car.getAttribute('data-name') || car.querySelector('h3').textContent;
          const carPrice = car.getAttribute('data-price') || car.querySelector('p').textContent.match(/\$(\d+)/)[1];
          const carImg = car.querySelector('img').src;
          
          modalImage.src = carImg;
          modalTitle.textContent = carName;
          modalDescription.textContent = `Experience the comfort and reliability of our ${carName}. Perfect for ${getCarUseCase(carName)}.`;
          modalPrice.textContent = `Price: $${carPrice}/day`;
          
          // Clear and populate features
          modalFeatures.innerHTML = '';
          if (carFeatures[carName]) {
              carFeatures[carName].forEach(feature => {
                  const li = document.createElement('li');
                  li.textContent = feature;
                  modalFeatures.appendChild(li);
              });
          }
          
          modalAvailability.textContent = getRandomAvailability();
          
          modal.classList.add('show');
      });
  });
  
  // Helper function to get car use case
  function getCarUseCase(carName) {
      if (carName.includes('SUV')) return 'family trips and outdoor adventures';
      if (carName.includes('Sedan')) return 'business travel and city driving';
      if (carName.includes('Truck')) return 'hauling and rugged terrain';
      if (carName.includes('Compact')) return 'city driving and fuel economy';
      if (carName.includes('Van')) return 'moving goods or equipment';
      if (carName.includes('Luxury')) return 'premium travel experiences';
      return 'all your travel needs';
  }
  
  // Helper function to generate random availability
  function getRandomAvailability() {
      const options = [
          'Available now at all locations',
          'Limited availability - book soon',
          'Available at Downtown and Airport locations',
          '5 vehicles currently available'
      ];
      return options[Math.floor(Math.random() * options.length)];
  }
  
  // Close modal
  if (closeModalBtn) {
      closeModalBtn.addEventListener('click', function() {
          modal.classList.remove('show');
      });
  }
  
  // Close modal when clicking outside
  window.addEventListener('click', function(e) {
      if (e.target === modal) {
          modal.classList.remove('show');
      }
  });
  
  // Modal reserve button
  if (modalReserveBtn) {
      modalReserveBtn.addEventListener('click', function() {
          modal.classList.remove('show');
          
          // Scroll to the rental form
          formSection.classList.remove('hidden');
          formSection.scrollIntoView({ behavior: 'smooth' });
      });
  }
  
  // Special offers buttons
  const viewOfferBtns = document.querySelectorAll('.view-offer-btn');
  viewOfferBtns.forEach(btn => {
      btn.addEventListener('click', function() {
          const offerTitle = this.closest('.car').querySelector('h3').textContent;
          alert(`Special offer details for "${offerTitle}" will be sent to your email. Please fill out the contact form to receive more information.`);
          document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
      });
  });
  
  // Star rating system
  const stars = document.querySelectorAll('#reviewForm .star');
  const ratingValue = document.getElementById('ratingValue');
  
  stars.forEach(star => {
      star.addEventListener('click', function() {
          const rating = parseInt(this.getAttribute('data-rating'));
          ratingValue.value = rating;
          
          // Update visual stars
          stars.forEach(s => {
              if (parseInt(s.getAttribute('data-rating')) <= rating) {
                  s.classList.add('active');
              } else {
                  s.classList.remove('active');
              }
          });
      });
      
      star.addEventListener('mouseover', function() {
          const rating = parseInt(this.getAttribute('data-rating'));
          
          // Highlight stars on hover
          stars.forEach(s => {
              if (parseInt(s.getAttribute('data-rating')) <= rating) {
                  s.classList.add('hover');
              } else {
                  s.classList.remove('hover');
              }
          });
      });
      
      star.addEventListener('mouseout', function() {
          stars.forEach(s => s.classList.remove('hover'));
      });
  });
  
  // Review form submission
  const reviewForm = document.getElementById('reviewForm');
  if (reviewForm) {
      reviewForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          const rating = parseInt(ratingValue.value);
          const reviewText = document.getElementById('reviewText').value;
          const reviewName = document.getElementById('reviewName').value;
          
          if (rating === 0) {
              alert('Please select a rating');
              return;
          }
          
          alert('Thank you for your review! It will be published after moderation.');
          reviewForm.reset();
          stars.forEach(s => s.classList.remove('active'));
          ratingValue.value = 0;
      });
  }
  
  // Contact form submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
          e.preventDefault();
          alert('Thank you for your message! We will get back to you soon.');
          contactForm.reset();
      });
  }
  
  // Fade-in animation for sections
  const fadeInSections = document.querySelectorAll('.fade-in');
  
  function checkFadeIn() {
      fadeInSections.forEach(section => {
          const sectionTop = section.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;
          
          if (sectionTop < windowHeight * 0.8) {
              section.style.opacity = 1;
          }
      });
  }
  
  // Initialize sections as invisible
  fadeInSections.forEach(section => {
      if (!section.classList.contains('hidden')) {
          section.style.opacity = 0;
          section.style.transition = 'opacity 0.5s ease';
      }
  });
  
  // Check fade-in on load and scroll
  checkFadeIn();
  window.addEventListener('scroll', checkFadeIn);
  
  // Simple map placeholder
  // In a real implementation, you would use Google Maps or another API
  const mapContainer = document.getElementById('map');
  if (mapContainer) {
      mapContainer.innerHTML = '<img src="https://via.placeholder.com/1200x300?text=Interactive+Map+of+Our+Locations" alt="Map" style="width:100%; height:100%;">';
  }
});