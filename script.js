// Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Set minimum date for booking to today
    const today = new Date().toISOString().split('T')[0];
    const bookingDate = document.getElementById('bookingDate');
    if (bookingDate) {
        bookingDate.setAttribute('min', today);
    }
    
    // Initialize chat widget
    initializeChat();
});

// Modal Functions
function openBookingModal() {
    document.getElementById('bookingModal').style.display = 'block';
}

function closeBookingModal() {
    document.getElementById('bookingModal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('bookingModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Book Service Function
function bookService(serviceName) {
    openBookingModal();
    document.getElementById('bookingService').value = serviceName.toLowerCase().replace(' ', '-');
}

// Start Quote Function
function startQuote() {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
        document.getElementById('name').focus();
    }, 500);
}

// Form Submissions
document.getElementById('quoteForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    alert(`Thank you ${data.name}! We'll contact you within 2 hours with your free quote for ${data.service}.`);
    
    // Reset form
    this.reset();
    
    // In a real implementation, you would send this data to your server
    console.log('Quote request:', data);
});

document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Validate appointment time
    const selectedDate = new Date(data.date);
    const selectedTime = data.time;
    const now = new Date();
    
    if (selectedDate < now) {
        alert('Please select a future date for your appointment.');
        return;
    }
    
    // Simulate booking confirmation
    alert(`Appointment booked! We'll see you on ${data.date} at ${data.time} for ${data.service}. Confirmation details will be sent to ${data.email}.`);
    
    // Close modal and reset form
    closeBookingModal();
    this.reset();
    
    // In a real implementation, you would send this data to your server
    console.log('Appointment booking:', data);
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Chat Widget Functions
let chatOpen = false;

function toggleChat() {
    const chatBody = document.getElementById('chatBody');
    chatOpen = !chatOpen;
    
    if (chatOpen) {
        chatBody.classList.add('active');
        chatBody.style.display = 'flex';
    } else {
        chatBody.classList.remove('active');
        chatBody.style.display = 'none';
    }
}

function initializeChat() {
    // Auto-open chat after 10 seconds if user hasn't interacted
    setTimeout(() => {
        if (!chatOpen) {
            const chatHeader = document.querySelector('.chat-header');
            chatHeader.style.animation = 'pulse 2s infinite';
        }
    }, 10000);
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (message === '') return;
    
    // Add user message
    addChatMessage(message, 'user');
    input.value = '';
    
    // Simulate AI response
    setTimeout(() => {
        const response = generateAIResponse(message);
        addChatMessage(response, 'bot');
    }, 1000);
}

function addChatMessage(message, sender) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = sender === 'user' ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';
    
    const content = document.createElement('div');
    content.className = 'message-content';
    content.innerHTML = `<p>${message}</p>`;
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);
    messagesContainer.appendChild(messageDiv);
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function generateAIResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Service inquiries
    if (message.includes('oil change')) {
        return "Our oil changes start at $39.99 and include a multi-point inspection. We use high-quality oil and filters. Would you like to book an appointment?";
    }
    
    if (message.includes('brake') || message.includes('brakes')) {
        return "We offer complete brake services starting at $149.99. This includes brake pad replacement and inspection. For safety, we recommend getting brakes checked every 12,000 miles.";
    }
    
    if (message.includes('price') || message.includes('cost') || message.includes('how much')) {
        return "Our pricing varies by service. Oil changes start at $39.99, brake service at $149.99, and diagnostics at $89.99. Would you like a specific quote for your vehicle?";
    }
    
    if (message.includes('appointment') || message.includes('book') || message.includes('schedule')) {
        return "I'd be happy to help you schedule an appointment! You can book online using our booking form, or call us at (123) 456-7890. What service do you need?";
    }
    
    if (message.includes('hours') || message.includes('open') || message.includes('closed')) {
        return "We're open Monday through Friday from 8:00 AM to 6:00 PM, and Saturday from 9:00 AM to 4:00 PM. We're closed on Sundays.";
    }
    
    if (message.includes('location') || message.includes('address') || message.includes('where')) {
        return "We're located at 123 Main Street, Chicago, IL 60614. We're easy to find and have plenty of parking available.";
    }
    
    if (message.includes('emergency') || message.includes('urgent') || message.includes('asap')) {
        return "For emergency repairs, please call us immediately at (123) 456-7890. If it's after hours, we can recommend 24-hour towing services.";
    }
    
    if (message.includes('warranty') || message.includes('guarantee')) {
        return "All our work comes with a satisfaction guarantee. We stand behind our repairs and will make it right if you're not completely satisfied.";
    }
    
    if (message.includes('diagnostic') || message.includes('check engine')) {
        return "Our computer diagnostic service is $89.99 and will identify exactly what's wrong with your vehicle. This fee is applied toward repair costs if you proceed with the work.";
    }
    
    if (message.includes('tire') || message.includes('tires')) {
        return "We offer tire installation, rotation, and repair services starting at $25.99. We work with all major tire brands and can help you find the right tires for your vehicle and budget.";
    }
    
    if (message.includes('ac') || message.includes('air conditioning') || message.includes('cooling')) {
        return "Our AC repair service starts at $119.99. We can diagnose AC problems, recharge refrigerant, and repair leaks. Perfect timing with summer coming up!";
    }
    
    // General inquiries
    if (message.includes('experience') || message.includes('how long')) {
        return "Mike has been fixing cars for over 25 years! Our shop has built a reputation for honest, reliable service in the community.";
    }
    
    if (message.includes('payment') || message.includes('card') || message.includes('cash')) {
        return "We accept cash, all major credit cards, and debit cards. We also offer financing options for larger repairs through our partners.";
    }
    
    if (message.includes('estimate') || message.includes('quote')) {
        return "We provide free estimates for all repairs! Just fill out our quote form or give us a call. We'll need some basic information about your vehicle and the issue.";
    }
    
    // Greeting responses
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
        return "Hello! Welcome to Mike's Auto Repair. I'm here to help answer questions about our services, pricing, or to help you book an appointment. What can I help you with?";
    }
    
    if (message.includes('thank') || message.includes('thanks')) {
        return "You're very welcome! Is there anything else I can help you with today? We're always here to help keep your car running smoothly.";
    }
    
    // Default response
    return "Thanks for your question! For specific issues or detailed information, I'd recommend calling our shop at (123) 456-7890 or booking an appointment. Mike and the team can give you personalized advice for your vehicle. Is there anything else I can help you with?";
}

// Allow Enter key to send chat messages
document.getElementById('chatInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.service-card, .review-card, .gallery-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add some interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add click-to-call functionality
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Track phone calls in analytics (placeholder)
            console.log('Phone call initiated:', this.href);
        });
    });
    
    // Add form validation feedback
    const formInputs = document.querySelectorAll('input[required], select[required], textarea[required]');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                this.style.borderColor = '#ff6b35';
            } else {
                this.style.borderColor = '#4CAF50';
            }
        });
    });
    
    // Service card hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 10px 25px rgba(255, 107, 53, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
    });
});

// Add loading animation for form submissions
function showLoadingState(button) {
    const originalText = button.textContent;
    button.textContent = 'Processing...';
    button.disabled = true;
    
    setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
    }, 2000);
}

// Enhanced form submission with loading states
document.getElementById('quoteForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const submitBtn = this.querySelector('button[type="submit"]');
    showLoadingState(submitBtn);
    
    setTimeout(() => {
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        alert(`Thank you ${data.name}! We'll contact you within 2 hours with your free quote.`);
        this.reset();
    }, 2000);
});

document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const submitBtn = this.querySelector('button[type="submit"]');
    showLoadingState(submitBtn);
    
    setTimeout(() => {
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        alert(`Appointment confirmed for ${data.date} at ${data.time}!`);
        closeBookingModal();
        this.reset();
    }, 2000);
});