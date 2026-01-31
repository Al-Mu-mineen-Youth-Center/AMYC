// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

mobileMenuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Smooth Scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Donation amount buttons
const amountButtons = document.querySelectorAll('.amount-btn');
const donorAmountInput = document.getElementById('donor-amount');

amountButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        amountButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Set the amount in the input field
        const amount = button.getAttribute('data-amount');
        if (amount === 'custom') {
            donorAmountInput.value = '';
            donorAmountInput.focus();
        } else {
            donorAmountInput.value = amount;
        }
    });
});

// Allow custom input to deactivate preset buttons
donorAmountInput.addEventListener('input', () => {
    const currentValue = donorAmountInput.value;
    let matchFound = false;
    
    amountButtons.forEach(button => {
        const buttonAmount = button.getAttribute('data-amount');
        if (buttonAmount === currentValue) {
            button.classList.add('active');
            matchFound = true;
        } else {
            button.classList.remove('active');
        }
    });
    
    // If no match found and value exists, activate custom button
    if (!matchFound && currentValue) {
        amountButtons.forEach(button => {
            if (button.getAttribute('data-amount') === 'custom') {
                button.classList.add('active');
            }
        });
    }
});

// Contact Form Handler
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const phone = document.getElementById('contact-phone').value;
    const subject = document.getElementById('contact-subject').value;
    const message = document.getElementById('contact-message').value;
    
    // Build the email body with proper line breaks
    let body = 'Name: ' + name + '%0D%0A';
    body += 'Email: ' + email + '%0D%0A';
    if (phone) {
        body += 'Phone: ' + phone + '%0D%0A';
    }
    body += 'Subject: ' + subject + '%0D%0A';
    body += '%0D%0AMessage:%0D%0A' + encodeURIComponent(message);
    
    // Build the mailto link
    const mailtoSubject = encodeURIComponent('Contact Form: ' + subject);
    const mailtoLink = 'mailto:info@amyc.org?subject=' + mailtoSubject + '&body=' + body;
    
    // Open the user's email client
    window.location.href = mailtoLink;
    
    // Optional: Show confirmation message
    alert('Thank you for your message! Your email client will open to send your message.');
});

// Donation Form Handler
const donationForm = document.getElementById('donationForm');

donationForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('donor-name').value;
    const email = document.getElementById('donor-email').value;
    const phone = document.getElementById('donor-phone').value;
    const amount = document.getElementById('donor-amount').value;
    const message = document.getElementById('donor-message').value;
    
    // Build the email body with proper line breaks
    let body = 'DONATION REQUEST%0D%0A';
    body += '===================%0D%0A%0D%0A';
    body += 'Name: ' + name + '%0D%0A';
    body += 'Email: ' + email + '%0D%0A';
    if (phone) {
        body += 'Phone: ' + phone + '%0D%0A';
    }
    body += 'Donation Amount: $' + amount + '%0D%0A';
    if (message) {
        body += '%0D%0AMessage:%0D%0A' + encodeURIComponent(message);
    }
    
    // Build the mailto link
    const subject = encodeURIComponent('Donation Request - $' + amount);
    const mailtoLink = 'mailto:info@amyc.org?subject=' + subject + '&body=' + body;
    
    // Open the user's email client
    window.location.href = mailtoLink;
    
    // Optional: Show confirmation message
    alert('Thank you for your generous donation! Your email client will open to complete the donation process.');
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements with animation classes
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.initiative-card, .impact-item, .involvement-card, .stat-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Dynamic Copyright Year
document.querySelectorAll('.copyright-year').forEach(el => {
    el.textContent = new Date().getFullYear();
});

// Hero parallax effect (subtle)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground && scrolled < window.innerHeight) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Form validation enhancement
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

// Add real-time email validation
document.querySelectorAll('input[type="email"]').forEach(emailInput => {
    emailInput.addEventListener('blur', function() {
        if (this.value && !validateEmail(this.value)) {
            this.style.borderColor = '#E53E3E';
            
            // Create error message if it doesn't exist
            if (!this.nextElementSibling || !this.nextElementSibling.classList.contains('error-message')) {
                const errorMsg = document.createElement('span');
                errorMsg.className = 'error-message';
                errorMsg.style.color = '#E53E3E';
                errorMsg.style.fontSize = '0.85rem';
                errorMsg.style.marginTop = '5px';
                errorMsg.style.display = 'block';
                errorMsg.textContent = 'Please enter a valid email address';
                this.parentNode.insertBefore(errorMsg, this.nextSibling);
            }
        } else {
            this.style.borderColor = '';
            // Remove error message if it exists
            if (this.nextElementSibling && this.nextElementSibling.classList.contains('error-message')) {
                this.nextElementSibling.remove();
            }
        }
    });
});

// Number input validation for donation amount
if (donorAmountInput) {
    donorAmountInput.addEventListener('input', function() {
        if (this.value < 5 && this.value !== '') {
            this.style.borderColor = '#E53E3E';
        } else {
            this.style.borderColor = '';
        }
    });
}

// Registration Modal Functionality
const modal = document.getElementById('registrationModal');
const registerButtons = document.querySelectorAll('.register-btn');
const closeModal = document.querySelector('.modal-close');
const registrationForm = document.getElementById('registrationForm');
const modalProgramName = document.querySelector('.modal-program-name');

let selectedProgram = '';

// Open modal when register button is clicked
registerButtons.forEach(button => {
    button.addEventListener('click', function() {
        selectedProgram = this.getAttribute('data-program');
        modalProgramName.textContent = `Registering for: ${selectedProgram}`;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });
});

// Close modal when X is clicked
closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside of it
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Handle Registration Form Submission
registrationForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const studentName = document.getElementById('reg-student-name').value;
    const studentAge = document.getElementById('reg-student-age').value;
    const parentName = document.getElementById('reg-parent-name').value;
    const phone = document.getElementById('reg-phone').value;
    const email = document.getElementById('reg-email').value;
    const address = document.getElementById('reg-address').value;
    const grade = document.getElementById('reg-grade').value;
    const notes = document.getElementById('reg-notes').value;
    
    // Build the email body with proper line breaks
    let body = 'PROGRAM REGISTRATION REQUEST%0D%0A';
    body += '==============================%0D%0A%0D%0A';
    body += 'Program: ' + selectedProgram + '%0D%0A%0D%0A';
    body += 'STUDENT INFORMATION:%0D%0A';
    body += 'Name: ' + studentName + '%0D%0A';
    body += 'Age: ' + studentAge + '%0D%0A';
    if (grade) {
        body += 'Grade/School: ' + grade + '%0D%0A';
    }
    body += '%0D%0APARENT/GUARDIAN INFORMATION:%0D%0A';
    body += 'Name: ' + parentName + '%0D%0A';
    body += 'Phone: ' + phone + '%0D%0A';
    body += 'Email: ' + email + '%0D%0A';
    if (address) {
        body += 'Address: ' + address + '%0D%0A';
    }
    if (notes) {
        body += '%0D%0AADDITIONAL INFORMATION:%0D%0A' + encodeURIComponent(notes);
    }
    
    // Build the mailto link
    const subject = encodeURIComponent('Program Registration: ' + selectedProgram + ' - ' + studentName);
    const mailtoLink = 'mailto:info@amyc.org?subject=' + subject + '&body=' + body;
    
    // Open the user's email client
    window.location.href = mailtoLink;
    
    // Close modal and reset form
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    registrationForm.reset();
    
    // Show confirmation message
    alert('Thank you for your registration! Your email client will open to send your registration. We\'ll contact you within 24 hours to confirm enrollment.');
});

console.log('Al-Mu\'mineen Youth Center website loaded successfully!');
console.log('Programs section with calendar integration and registration system ready!');