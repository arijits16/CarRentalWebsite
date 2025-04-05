document.addEventListener("DOMContentLoaded", function () {
    const bookingForm = document.getElementById("bookingForm");
  
    bookingForm.addEventListener("submit", function (e) {
      e.preventDefault(); // Prevent form from submitting
  
      const name = document.getElementById("customer-name").value.trim();
      const email = document.getElementById("EMAIL").value.trim();
      const phone = document.getElementById("PHONE").value.trim(); // New
      const idProof = document.getElementById("ID-Proof").value.trim();
      const pickup = document.getElementById("pickup-location").value.trim();
      const dropoff = document.getElementById("dropoff-location").value.trim();
      const pickupDate = document.getElementById("pickup-date").value;
      const returnDate = document.getElementById("return-date").value;
      const carType = document.getElementById("car-type").value;
  
      // ✅ Phone Number Validation (10-digit numeric)
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneRegex.test(phone)) {
        alert("Please enter a valid 10-digit phone number starting with 6-9.");
        return;
      }
  
      // Basic required field check
      if (!name || !email || !idProof || !pickup || !dropoff || !pickupDate || !returnDate || !carType) {
        alert("Please fill in all the required fields.");
        return;
      }
  
      // All good!
      alert("🎉 Booking Successful! We will contact you shortly via email.");
      bookingForm.reset();
    });
  });
  