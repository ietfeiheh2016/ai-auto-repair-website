// Client Website JavaScript - Clean and Professional

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeChat();
    initializeForms();
    initializeAnimations();
    setMinimumDate();
});

// Navigation Functions
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
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
    }
}

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

// Service booking function
function bookService(serviceName) {
    openBookingModal();
    const serviceSelect = document.getElementById('bookingService');
    if (serviceSelect) {
        const serviceValue = serviceName.toLowerCase().replace(/\s+/g, '-');
        serviceSelect.value = serviceValue;
    }
}

// Scroll to contact function
function scrollToContact() {
    document.getElementById('contact').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

// Set minimum date for booking
function setMinimumDate() {
    const today = new Date().toISOString().split('T')[0];
    const bookingDate = document.getElementById('bookingDate');
    if (bookingDate) {
        bookingDate.setAttribute('min', today);
    }
}

// Form Handling
function initializeForms() {
    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactForm(this);
        });
    }
    
    // Booking Form
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleBookingForm(this);
        });
    }
}

function handleContactForm(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        alert(`Thank you ${data.name}! We've received your request for ${data.service}. We'll contact you within 2 hours with your free quote.`);
        
        // Reset form
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // In real implementation, send data to server
        console.log('Contact form submitted:', data);
    }, 1500);
}

function handleBookingForm(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Validate appointment date
    const selectedDate = new Date(data.date);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    
    if (selectedDate < now) {
        alert('Please select a future date for your appointment.');
        return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Booking...';
    submitBtn.disabled = true;
    
    // Simulate booking confirmation
    setTimeout(() => {
        alert(`Appointment Confirmed!\n\nService: ${data.service}\nDate: ${data.date}\nTime: ${data.time}\n\nWe'll send a confirmation email to ${data.email} shortly. See you then!`);
        
        // Close modal and reset form
        closeBookingModal();
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // In real implementation, send data to server
        console.log('Appointment booked:', data);
    }, 2000);
}

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
    // Auto-suggest chat after user scrolls
    let hasScrolled = false;
    window.addEventListener('scroll', function() {
        if (!hasScrolled && window.scrollY > 1000) {
            hasScrolled = true;
            setTimeout(() => {
                if (!chatOpen) {
                    const chatHeader = document.querySelector('.chat-header');
                    if (chatHeader) {
                        chatHeader.style.animation = 'pulse 2s infinite';
                    }
                }
            }, 3000);
        }
    });
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (message === '') return;
    
    // Add user message
    addChatMessage(message, 'user');
    input.value = '';
    
    // Show typing indicator
    setTimeout(() => {
        const response = generateResponse(message);
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

function generateResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Service inquiries
    if (message.includes('oil change')) {
        return "Our oil changes start at $39.99 and include a comprehensive multi-point inspection. We use premium oil and filters. Would you like to schedule an appointment?";
    }
    
    if (message.includes('brake') || message.includes('brakes')) {
        return "We provide complete brake services starting at $149.99, including brake pad replacement and safety inspection. For your safety, we recommend brake checks every 12,000 miles.";
    }
    
    if (message.includes('price') || message.includes('cost') || message.includes('how much')) {
        return "Our pricing: Oil changes from $39.99, Brake service from $149.99, Engine diagnostics $89.99. Would you like a specific quote for your vehicle?";
    }
    
    if (message.includes('appointment') || message.includes('book') || message.includes('schedule')) {
        return "I'd be happy to help you schedule! You can book online using our booking form or call us at (555) 123-4567. What service do you need?";
    }
    
    if (message.includes('hours') || message.includes('open') || message.includes('closed')) {
        return "We're open Monday-Friday 8:00 AM to 6:00 PM, Saturday 9:00 AM to 4:00 PM. Closed Sundays. Need emergency service?";
    }
    
    if (message.includes('location') || message.includes('address') || message.includes('where')) {
        return "We're located at 123 Main Street, Your City, ST 12345. Easy to find with plenty of parking available!";
    }
    
    if (message.includes('emergency') || message.includes('urgent') || message.includes('help')) {
        return "For emergencies, please call us immediately at (555) 123-4567. We can also help arrange towing if needed.";
    }
    
    if (message.includes('warranty') || message.includes('guarantee')) {
        return "All our work comes with a satisfaction guarantee. We stand behind our repairs and will make it right if you're not completely satisfied.";
    }
    
    if (message.includes('diagnostic') || message.includes('check engine')) {
        return "Our computer diagnostic service is $89.99 and will identify exactly what's wrong. This fee is applied toward repair costs if you proceed.";
    }
    
    if (message.includes('tire') || message.includes('tires')) {
        return "We offer tire services starting at $25.99 including installation, rotation, and repair. We work with all major brands.";
    }
    
    if (message.includes('ac') || message.includes('air conditioning')) {
        return "Our AC repair starts at $119.99. We can diagnose problems, recharge refrigerant, and repair leaks. Stay cool!";
    }
    
    // General inquiries
    if (message.includes('experience') || message.includes('how long')) {
        return "We've been serving the community for over 15 years with honest, reliable service. Our ASE-certified technicians have decades of combined experience.";
    }
    
    if (message.includes('payment') || message.includes('card')) {
        return "We accept cash, all major credit cards, and debit cards. We also offer financing options for larger repairs.";
    }
    
    if (message.includes('estimate') || message.includes('quote')) {
        return "We provide free estimates! Just fill out our contact form or give us a call. We'll need basic info about your vehicle and the issue.";
    }
    
    // Greetings
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
        return "Hello! Welcome to Elite Auto Repair. I'm here to help with service questions, pricing, or booking appointments. How can I assist you?";
    }
    
    if (message.includes('thank') || message.includes('thanks')) {
        return "You're very welcome! Is there anything else I can help you with today? We're here to keep your car running great!";
    }
    
    // Default response
    return "Thanks for your question! For detailed information, I recommend calling us at (555) 123-4567 or filling out our contact form. Our team can provide personalized assistance. Anything else I can help with?";
}

// Allow Enter key to send messages
document.addEventListener('DOMContentLoaded', function() {
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
});

// Smooth scrolling for navigation links
function initializeAnimations() {
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
    
    // Intersection Observer for scroll animations
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
    const animatedElements = document.querySelectorAll('.service-card, .testimonial-card, .feature');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Form validation enhancement
document.addEventListener('DOMContentLoaded', function() {
    const formInputs = document.querySelectorAll('input[required], select[required], textarea[required]');
    
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                this.style.borderColor = '#f44336';
            } else {
                this.style.borderColor = '#4CAF50';
            }
        });
        
        input.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                this.style.borderColor = '#4CAF50';
            }
        });
    });
});

// Add click tracking for analytics
function trackInteraction(action, element) {
    console.log(`User interaction: ${action}`, {
        element: element,
        timestamp: new Date().toISOString(),
        url: window.location.href
    });
    
    // In real implementation, send to analytics service
}

// Track important interactions
document.addEventListener('click', function(e) {
    if (e.target.closest('.cta-btn')) {
        trackInteraction('CTA_Click', 'Header CTA');
    }
    
    if (e.target.closest('.btn-primary')) {
        trackInteraction('Primary_Button_Click', e.target.textContent);
    }
    
    if (e.target.closest('.service-btn')) {
        trackInteraction('Service_Book_Click', e.target.closest('.service-card').querySelector('h3').textContent);
    }
    
    if (e.target.closest('.chat-header')) {
        trackInteraction('Chat_Toggle', 'Chat Widget');
    }
});

// Track scroll depth
let maxScrollDepth = 0;
window.addEventListener('scroll', function() {
    const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    
    if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth;
        
        if (scrollDepth >= 25 && scrollDepth < 50) {
            trackInteraction('Scroll_Depth', '25%');
        } else if (scrollDepth >= 50 && scrollDepth < 75) {
            trackInteraction('Scroll_Depth', '50%');
        } else if (scrollDepth >= 75) {
            trackInteraction('Scroll_Depth', '75%');
        }
    }
});

// Add CSS animation for pulse effect
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
`;
document.head.appendChild(style);