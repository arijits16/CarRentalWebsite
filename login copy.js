// Improved loginscript.js
const container = document.querySelector('.container');
const registerBtns = document.querySelectorAll('.register-btn');
const loginBtns = document.querySelectorAll('.login-btn');

// Toggle between login and signup
registerBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        container.classList.add('active');
    });
});

loginBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        container.classList.remove('active');
    });
});

// Improved user database with local storage persistence
function getUsersFromStorage() {
    const storedUsers = localStorage.getItem('registeredUsers');
    return storedUsers ? JSON.parse(storedUsers) : [];
}

function saveUsersToStorage(users) {
    localStorage.setItem('registeredUsers', JSON.stringify(users));
}

// Retrieve existing users or initialize
let users = getUsersFromStorage();

// Registration Form
document.getElementById('registerForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('regUsername').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value;
    
    // Enhanced validation
    if (!username || !email || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    // More robust email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Password strength check
    if (password.length < 8) {
        alert('Password must be at least 8 characters long');
        return;
    }
    
    // Check if username already exists
    const userExists = users.some(user => 
        user.username.toLowerCase() === username.toLowerCase()
    );
    
    if (userExists) {
        alert('Username already exists. Please choose another.');
        return;
    }
    
    // Create new user
    const newUser = { 
        username, 
        email, 
        password,
        registeredAt: new Date().toISOString(),
        isVerified: false  // Add a verification flag
    };
    
    // Add user and save to storage
    users.push(newUser);
    saveUsersToStorage(users);
    
    // Clear registration form
    this.reset();
    
    // Show success message and switch to login
    alert('Registration successful! Please log in.');
    container.classList.remove('active');
});

// Login Form
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;
    const loginError = document.getElementById('loginError');
    
    // Check credentials (case-insensitive username)
    const user = users.find(u => 
        u.username.toLowerCase() === username.toLowerCase() && 
        u.password === password
    );
    
    if (user) {
        // Store the current user in local storage
        localStorage.setItem('currentUser', user.username);
        
        // Successful login - redirect to homepage
        window.location.href = 'Opening page.html';
    } else {
        // Show error message
        if (loginError) {
            loginError.textContent = 'Invalid username or password';
            loginError.style.display = 'block';
            setTimeout(() => {
                loginError.style.display = 'none';
            }, 3000);
        } else {
            alert('Invalid username or password');
        }
    }
});

// User greeting on homepage
document.addEventListener('DOMContentLoaded', () => {
    const currentUser = localStorage.getItem('currentUser');
    const userGreetingElement = document.querySelector('.user-greeting');
    
    if (currentUser && userGreetingElement) {
        userGreetingElement.textContent = `Welcome, ${currentUser}!`;
    }
});
