// Trust Converter - Ethical JavaScript for Better User Experience
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeROICalculator();
    initializeSmoothScrolling();
    initializeFormValidation();
    initializeAnimations();
    initializeInteractiveElements();
});

// ROI Calculator - Real calculations
function initializeROICalculator() {
    const currentCustomersInput = document.getElementById('current-customers');
    const ticketValueInput = document.getElementById('ticket-value');
    
    // Update calculations when inputs change
    if (currentCustomersInput && ticketValueInput) {
        currentCustomersInput.addEventListener('input', updateROICalculation);
        ticketValueInput.addEventListener('input', updateROICalculation);
        
        // Initial calculation
        updateROICalculation();
    }
}

function updateROICalculation() {
    const currentCustomers = parseInt(document.getElementById('current-customers').value) || 150;
    const ticketValue = parseInt(document.getElementById('ticket-value').value) || 200;
    
    // Conservative 40% increase based on real data
    const increasePercentage = 0.40;
    const additionalCustomers = Math.round(currentCustomers * increasePercentage);
    
    // Calculate values
    const currentRevenue = currentCustomers * ticketValue;
    const additionalRevenue = additionalCustomers * ticketValue;
    const annualAdditionalRevenue = additionalRevenue * 12;
    const investment = 2997;
    const roi = Math.round((annualAdditionalRevenue / investment) * 100);
    
    // Update display
    document.getElementById('current-revenue').textContent = `$${currentRevenue.toLocaleString()}`;
    document.getElementById('additional-customers').textContent = additionalCustomers.toString();
    document.getElementById('additional-revenue').textContent = `$${additionalRevenue.toLocaleString()}`;
    document.getElementById('annual-roi').textContent = `${roi}%`;
}

// Smooth Scrolling Navigation
function initializeSmoothScrolling() {
    // Smooth scroll to demo section
    window.scrollToDemo = function() {
        const demoSection = document.getElementById('demo-section');
        if (demoSection) {
            demoSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    };
    
    // Smooth scroll to order section
    window.scrollToOrder = function() {
        const orderSection = document.getElementById('order-section');
        if (orderSection) {
            orderSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    };
}

// Form Validation and Handling
function initializeFormValidation() {
    const orderForm = document.querySelector('.order-form');
    if (orderForm) {
        orderForm.addEventListener('submit', handleOrder);
        
        // Real-time validation for key fields
        const emailInput = orderForm.querySelector('input[name="email"]');
        const phoneInput = orderForm.querySelector('input[name="phone"]');
        
        if (emailInput) {
            emailInput.addEventListener('blur', validateEmail);
        }
        
        if (phoneInput) {
            phoneInput.addEventListener('blur', validatePhone);
        }
    }
}

function handleOrder(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Validate required fields
    const requiredFields = ['business-name', 'owner-name', 'email', 'phone', 'address'];
    let isValid = true;
    
    requiredFields.forEach(field => {
        const input = form.querySelector(`[name="${field}"]`);
        if (!input || !input.value.trim()) {
            showFieldError(input, 'This field is required');
            isValid = false;
        } else {
            clearFieldError(input);
        }
    });
    
    // Validate email format
    const emailInput = form.querySelector('[name="email"]');
    if (emailInput && !validateEmailFormat(emailInput.value)) {
        showFieldError(emailInput, 'Please enter a valid email address');
        isValid = false;
    }
    
    if (isValid) {
        // Show success message and process order
        showOrderSuccess(formData);
    }
}

function validateEmail(event) {
    const email = event.target.value;
    if (email && !validateEmailFormat(email)) {
        showFieldError(event.target, 'Please enter a valid email address');
    } else {
        clearFieldError(event.target);
    }
}

function validatePhone(event) {
    const phone = event.target.value;
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    
    if (phone && !phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))) {
        showFieldError(event.target, 'Please enter a valid phone number');
    } else {
        clearFieldError(event.target);
    }
}

function validateEmailFormat(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFieldError(input, message) {
    clearFieldError(input);
    
    input.style.borderColor = '#ef4444';
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.color = '#ef4444';
    errorDiv.style.fontSize = '14px';
    errorDiv.style.marginTop = '4px';
    errorDiv.textContent = message;
    
    input.parentNode.insertBefore(errorDiv, input.nextSibling);
}

function clearFieldError(input) {
    input.style.borderColor = 'transparent';
    const existingError = input.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

function showOrderSuccess(formData) {
    // Create success overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    
    const successBox = document.createElement('div');
    successBox.style.cssText = `
        background: white;
        padding: 3rem;
        border-radius: 16px;
        text-align: center;
        max-width: 500px;
        box-shadow: 0 16px 40px rgba(0, 0, 0, 0.15);
    `;
    
    successBox.innerHTML = `
        <div style="font-size: 4rem; color: #10b981; margin-bottom: 1rem;">✓</div>
        <h2 style="color: #1d4ed8; margin-bottom: 1rem;">Order Received!</h2>
        <p style="color: #64748b; margin-bottom: 2rem; line-height: 1.6;">
            Thank you for your order! We'll contact you within 2 hours to begin setting up your new website.
            <br><br>
            Check your email for order confirmation and next steps.
        </p>
        <button onclick="closeSuccessMessage()" style="
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            border: none;
            padding: 1rem 2rem;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
        ">Continue</button>
    `;
    
    overlay.appendChild(successBox);
    document.body.appendChild(overlay);
    
    // Close function
    window.closeSuccessMessage = function() {
        document.body.removeChild(overlay);
    };
    
    // Log order data (in real implementation, send to server)
    console.log('Order submitted:', Object.fromEntries(formData));
    
    // In real implementation, you would send this data to your server
    // fetch('/api/orders', {
    //     method: 'POST',
    //     body: formData
    // });
}

// Smooth Animations on Scroll
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(`
        .problem-item,
        .solution-item,
        .result-card,
        .faq-item,
        .pricing-card
    `);
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Interactive Elements Enhancement
function initializeInteractiveElements() {
    // Add hover effects to interactive cards
    const interactiveCards = document.querySelectorAll(`
        .problem-item,
        .solution-item,
        .result-card,
        .faq-item
    `);
    
    interactiveCards.forEach(card => {
        card.classList.add('interactive');
    });
    
    // Demo frame interaction
    const demoFrames = document.querySelectorAll('.demo-frame, .full-demo-frame');
    demoFrames.forEach(frame => {
        frame.addEventListener('load', function() {
            // Add loaded state styling
            this.style.opacity = '1';
            this.style.transition = 'opacity 0.3s ease';
        });
    });
    
    // Enhance CTA buttons with loading states
    const ctaButtons = document.querySelectorAll('.cta-button, .order-button, .submit-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add click animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Utility Functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

function formatNumber(number) {
    return new Intl.NumberFormat('en-US').format(number);
}

// Performance Optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Accessibility Enhancements
function initializeAccessibility() {
    // Add focus management for modal/overlay
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const overlay = document.querySelector('[style*="position: fixed"]');
            if (overlay && window.closeSuccessMessage) {
                window.closeSuccessMessage();
            }
        }
    });
    
    // Improve form accessibility
    const formInputs = document.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
        });
        
        input.addEventListener('blur', function() {
            if (!this.style.borderColor || this.style.borderColor === 'transparent') {
                this.style.boxShadow = '';
            }
        });
    });
}

// Initialize accessibility features
initializeAccessibility();

// Browser Compatibility Checks
function checkBrowserSupport() {
    // Check for modern features and provide fallbacks
    if (!window.IntersectionObserver) {
        // Fallback for older browsers
        const animatedElements = document.querySelectorAll('.fade-in-up');
        animatedElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }
    
    if (!CSS.supports('scroll-behavior', 'smooth')) {
        // Fallback for browsers without smooth scrolling
        window.scrollToDemo = function() {
            const demoSection = document.getElementById('demo-section');
            if (demoSection) {
                demoSection.scrollIntoView();
            }
        };
        
        window.scrollToOrder = function() {
            const orderSection = document.getElementById('order-section');
            if (orderSection) {
                orderSection.scrollIntoView();
            }
        };
    }
}

checkBrowserSupport();