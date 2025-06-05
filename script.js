document.addEventListener('DOMContentLoaded', () => {
    // --- Falling Money Effect Logic ---
    const leftContainer = document.querySelector('.money-container.left');
    const rightContainer = document.querySelector('.money-container.right');

    const createMoney = (container) => {
        const moneyItem = document.createElement('div');
        moneyItem.classList.add('money-item');

        // Randomize horizontal start position within the container
        // Subtracting 50px (money item width) to keep it within bounds
        const startX = Math.random() * (container.offsetWidth - 50); 
        moneyItem.style.left = `${startX}px`;

        // Randomize animation duration for variety in falling speed
        const duration = Math.random() * 5 + 3; // Between 3 and 8 seconds
        moneyItem.style.animationDuration = `${duration}s`;
        
        // Randomize animation delay so they don't all start at once
        const delay = Math.random() * 2; // Between 0 and 2 seconds
        moneyItem.style.animationDelay = `${delay}s`;

        container.appendChild(moneyItem);

        // Remove the money item after its animation finishes to prevent memory leaks
        moneyItem.addEventListener('animationend', () => {
            moneyItem.remove();
        });
    };

    // Generate money items periodically
    setInterval(() => createMoney(leftContainer), 500); // Every 0.5 seconds on left
    setInterval(() => createMoney(rightContainer), 700); // Every 0.7 seconds on right

    // --- Modal Logic ---
    const loginBtn = document.getElementById('loginBtn'); // Navbar's GET STARTED button
    const heroSignUpBtn = document.querySelector('.hero-section .open-modal-btn'); // Hero section's Sign Up button
    const loginModal = document.getElementById('loginModal');
    const closeButton = document.querySelector('.close-button'); 
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');

    // Function to open the modal
    const openModal = () => {
        if (loginModal) {
            loginModal.style.display = 'flex'; // Use flex to center content
        }
    };

    // Open Modal when clicking the Navbar's GET STARTED button
    if (loginBtn) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault(); 
            openModal();
        });
    }

    // Open Modal when clicking the Hero section's Sign Up button
    if (heroSignUpBtn) {
        heroSignUpBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    }

    // Close Modal when clicking the close button
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            if (loginModal) {
                loginModal.style.display = 'none';
                errorMessage.textContent = '';
                successMessage.textContent = '';
                loginForm.reset(); 
            }
        });
    }

    // Close Modal when clicking outside the modal content
    if (loginModal) {
        loginModal.addEventListener('click', (e) => {
            if (e.target === loginModal) {
                loginModal.style.display = 'none';
                errorMessage.textContent = '';
                successMessage.textContent = '';
                loginForm.reset(); 
            }
        });
    }

    // Handle form submission
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); 

            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const mobile = document.getElementById('mobile').value;
            const email = document.getElementById('email').value;

            if (firstName && lastName && mobile && email) {
                console.log('Form Submitted:', { firstName, lastName, mobile, email });
                successMessage.textContent = 'Registration successful! We will contact you soon.';
                errorMessage.textContent = ''; 
                loginForm.reset(); 
            } else {
                errorMessage.textContent = 'Please fill in all fields.';
                successMessage.textContent = ''; 
            }
        });
    }

    // --- Chatbot Minimize Logic ---
    const chatbotWrapper = document.getElementById('chatbotWrapper');
    const minimizeChatbotBtn = document.getElementById('minimizeChatbotBtn');

    if (minimizeChatbotBtn && chatbotWrapper) {
        minimizeChatbotBtn.addEventListener('click', () => {
            chatbotWrapper.classList.toggle('hidden'); // Toggle visibility of the whole wrapper
            // Change button text based on visibility
            if (chatbotWrapper.classList.contains('hidden')) {
                minimizeChatbotBtn.textContent = '+'; // Show plus when minimized
            } else {
                minimizeChatbotBtn.textContent = '—'; // Show minus when maximized
            }
        });
    }
});