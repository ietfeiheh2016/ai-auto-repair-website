// Ultimate Converter - Premium AI-Focused JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeHeroAnimations();
    initializeDemoTabs();
    initializePremiumROICalculator();
    initializeOrderForm();
    initializeScrollAnimations();
    initializeInteractiveElements();
    initializeAIDemoInteractions();
});

// Hero Animations
function initializeHeroAnimations() {
    // Animate chat messages
    const chatMessages = document.querySelectorAll('.chat-message');
    chatMessages.forEach((message, index) => {
        message.style.opacity = '0';
        message.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            message.style.transition = 'all 0.5s ease';
            message.style.opacity = '1';
            message.style.transform = 'translateY(0)';
        }, (index + 1) * 1000);
    });

    // Animate typing indicator
    setTimeout(() => {
        const typingIndicator = document.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.style.opacity = '1';
            typingIndicator.style.transform = 'translateY(0)';
        }
    }, 4000);

    // Animate floating cards
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.8s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 2000 + (index * 500));
    });
}

// Demo Tabs Functionality
function initializeDemoTabs() {
    const tabs = document.querySelectorAll('.demo-tab');
    const panels = document.querySelectorAll('.demo-panel');

    window.showDemo = function(demoType) {
        // Remove active class from all tabs and panels
        tabs.forEach(tab => tab.classList.remove('active'));
        panels.forEach(panel => panel.classList.remove('active'));

        // Add active class to selected tab and panel
        const selectedTab = document.querySelector(`[onclick="showDemo('${demoType}')"]`);
        const selectedPanel = document.getElementById(`${demoType}-demo`);

        if (selectedTab) selectedTab.classList.add('active');
        if (selectedPanel) selectedPanel.classList.add('active');
    };
}

// Premium ROI Calculator
function initializePremiumROICalculator() {
    const currentCustomersInput = document.getElementById('current-customers');
    const ticketValueInput = document.getElementById('ticket-value');
    const missedCallsInput = document.getElementById('missed-calls');

    if (currentCustomersInput && ticketValueInput && missedCallsInput) {
        currentCustomersInput.addEventListener('input', updatePremiumROI);
        ticketValueInput.addEventListener('input', updatePremiumROI);
        missedCallsInput.addEventListener('input', updatePremiumROI);

        // Initial calculation
        updatePremiumROI();
    }
}

function updatePremiumROI() {
    const currentCustomers = parseInt(document.getElementById('current-customers').value) || 150;
    const ticketValue = parseInt(document.getElementById('ticket-value').value) || 200;
    const missedCalls = parseInt(document.getElementById('missed-calls').value) || 15;

    // AI Impact Calculations
    const capturedCallsPerMonth = missedCalls * 4; // 4 weeks per month
    const returningCustomersPerMonth = Math.round(currentCustomers * 0.30); // 30% return rate
    const reviewCustomersPerMonth = Math.round(currentCustomers * 0.15); // 15% from reviews

    // Revenue Calculations
    const currentRevenue = currentCustomers * ticketValue;
    const additionalRevenue = (capturedCallsPerMonth + returningCustomersPerMonth + reviewCustomersPerMonth) * ticketValue;
    const newRevenue = currentRevenue + additionalRevenue;
    const annualIncrease = additionalRevenue * 12;
    const investment = 4997;
    const roiPercentage = Math.round((annualIncrease / investment) * 100);

    // Update AI Impact Display
    document.getElementById('captured-calls').textContent = `${capturedCallsPerMonth} calls/month`;
    document.getElementById('returning-customers').textContent = `${returningCustomersPerMonth} customers/month`;
    document.getElementById('review-customers').textContent = `${reviewCustomersPerMonth} new customers/month`;

    // Update Revenue Display
    document.getElementById('current-revenue').textContent = formatCurrency(currentRevenue);
    document.getElementById('new-revenue').textContent = formatCurrency(newRevenue);
    document.getElementById('additional-revenue').textContent = formatCurrency(additionalRevenue);
    document.getElementById('annual-increase').textContent = formatCurrency(annualIncrease);
    document.getElementById('roi-percentage').textContent = `${roiPercentage}%`;
}

// Order Form Functionality
function initializeOrderForm() {
    const packageOptions = document.querySelectorAll('input[name="package"]');
    packageOptions.forEach(option => {
        option.addEventListener('change', updateOrderSummary);
    });

    // Initial summary update
    updateOrderSummary();

    // Form submission
    window.handlePremiumOrder = function(event) {
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

        // Validate email
        const emailInput = form.querySelector('[name="email"]');
        if (emailInput && !validateEmailFormat(emailInput.value)) {
            showFieldError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }

        if (isValid) {
            showPremiumOrderSuccess(formData);
        }
    };
}

function updateOrderSummary() {
    const selectedPackage = document.querySelector('input[name="package"]:checked');
    if (selectedPackage) {
        const price = selectedPackage.dataset.price;
        const itemPrice = document.querySelector('.item-price');
        const totalPrice = document.querySelector('.total-price');
        const submitBtn = document.querySelector('.premium-submit-btn');

        if (itemPrice) itemPrice.textContent = formatCurrency(parseInt(price));
        if (totalPrice) totalPrice.textContent = formatCurrency(parseInt(price));
        if (submitBtn) {
            submitBtn.innerHTML = `<i class="fas fa-rocket"></i> Start My AI Transformation - ${formatCurrency(parseInt(price))}`;
        }
    }
}

function showPremiumOrderSuccess(formData) {
    // Create premium success overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(15, 23, 42, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        backdrop-filter: blur(10px);
    `;

    const successBox = document.createElement('div');
    successBox.style.cssText = `
        background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        padding: 3rem;
        border-radius: 32px;
        text-align: center;
        max-width: 600px;
        width: 90%;
        box-shadow: 0 24px 64px rgba(0, 0, 0, 0.25);
        border: 2px solid #3b82f6;
        position: relative;
        overflow: hidden;
    `;

    successBox.innerHTML = `
        <div style="position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%);"></div>
        <div style="font-size: 5rem; margin-bottom: 1.5rem;">
            <span style="background: linear-gradient(135deg, #10b981 0%, #34d399 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">🚀</span>
        </div>
        <h2 style="color: #1e40af; margin-bottom: 1rem; font-size: 2rem; font-weight: 800;">AI Transformation Started!</h2>
        <p style="color: #64748b; margin-bottom: 2rem; line-height: 1.6; font-size: 1.125rem;">
            🎉 Congratulations! Your complete AI auto shop system is now in production.
            <br><br>
            <strong style="color: #10b981;">What happens next:</strong><br>
            ✅ Our AI engineers will contact you within 2 hours<br>
            ✅ Your AI systems will be live within 48 hours<br>
            ✅ You'll start booking customers automatically<br><br>
            Check your email for setup instructions and next steps.
        </p>
        <div style="display: flex; gap: 1rem; justify-content: center; margin-bottom: 2rem;">
            <div style="background: rgba(16, 185, 129, 0.1); padding: 1rem; border-radius: 16px; border: 2px solid #10b981;">
                <i class="fas fa-phone-alt" style="color: #10b981; font-size: 1.5rem; margin-bottom: 0.5rem; display: block;"></i>
                <span style="color: #1e40af; font-weight: 600; font-size: 14px;">AI Voice Assistant</span>
            </div>
            <div style="background: rgba(59, 130, 246, 0.1); padding: 1rem; border-radius: 16px; border: 2px solid #3b82f6;">
                <i class="fas fa-envelope-open-text" style="color: #3b82f6; font-size: 1.5rem; margin-bottom: 0.5rem; display: block;"></i>
                <span style="color: #1e40af; font-weight: 600; font-size: 14px;">Follow-Up System</span>
            </div>
            <div style="background: rgba(139, 92, 246, 0.1); padding: 1rem; border-radius: 16px; border: 2px solid #8b5cf6;">
                <i class="fas fa-star" style="color: #8b5cf6; font-size: 1.5rem; margin-bottom: 0.5rem; display: block;"></i>
                <span style="color: #1e40af; font-weight: 600; font-size: 14px;">Review Manager</span>
            </div>
        </div>
        <button onclick="closePremiumSuccess()" style="
            background: linear-gradient(135deg, #10b981 0%, #34d399 100%);
            color: white;
            border: none;
            padding: 1rem 2rem;
            border-radius: 16px;
            font-weight: 700;
            font-size: 1.125rem;
            cursor: pointer;
            box-shadow: 0 8px 24px rgba(16, 185, 129, 0.3);
            transition: all 0.3s ease;
        " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
            <i class="fas fa-check-circle" style="margin-right: 0.5rem;"></i>
            Continue to Success Dashboard
        </button>
    `;

    overlay.appendChild(successBox);
    document.body.appendChild(overlay);

    // Add celebration animation
    createCelebrationAnimation();

    // Close function
    window.closePremiumSuccess = function() {
        document.body.removeChild(overlay);
    };

    // Log order data (in real implementation, send to server)
    console.log('Premium AI Order submitted:', Object.fromEntries(formData));
}

function createCelebrationAnimation() {
    // Create falling success icons
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const icon = document.createElement('div');
            icon.innerHTML = ['🚀', '⚡', '💰', '📞', '⭐', '✅'][Math.floor(Math.random() * 6)];
            icon.style.cssText = `
                position: fixed;
                top: -50px;
                left: ${Math.random() * window.innerWidth}px;
                font-size: 2rem;
                z-index: 10001;
                pointer-events: none;
                animation: fall 3s linear forwards;
            `;
            
            document.body.appendChild(icon);
            
            setTimeout(() => {
                if (document.body.contains(icon)) {
                    document.body.removeChild(icon);
                }
            }, 3000);
        }, i * 100);
    }
}

// AI Demo Interactions
function initializeAIDemoInteractions() {
    // Voice Demo
    window.playVoiceDemo = function() {
        const transcript = document.querySelector('.call-transcript');
        if (transcript) {
            // Add more conversation lines
            const newLines = [
                { speaker: 'Customer', text: '2018 Honda Civic' },
                { speaker: 'AI', text: 'Perfect! I have Tuesday at 2:00 PM or Wednesday at 10:00 AM available. Which works better?' },
                { speaker: 'Customer', text: 'Tuesday at 2 PM sounds good' },
                { speaker: 'AI', text: 'Excellent! I\'ve booked your oil change for Tuesday at 2:00 PM. You\'ll receive a confirmation text shortly.' }
            ];

            newLines.forEach((line, index) => {
                setTimeout(() => {
                    const lineElement = document.createElement('div');
                    lineElement.className = 'transcript-line';
                    lineElement.innerHTML = `<strong>${line.speaker}:</strong> "${line.text}"`;
                    lineElement.style.opacity = '0';
                    lineElement.style.transform = 'translateY(10px)';
                    transcript.appendChild(lineElement);
                    
                    setTimeout(() => {
                        lineElement.style.transition = 'all 0.3s ease';
                        lineElement.style.opacity = '1';
                        lineElement.style.transform = 'translateY(0)';
                    }, 50);
                }, index * 1500);
            });
        }
    };

    // Follow-up Demo
    window.showFollowUpDemo = function() {
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            const finalValue = parseInt(stat.textContent);
            let currentValue = 0;
            const increment = finalValue / 50;
            
            const counter = setInterval(() => {
                currentValue += increment;
                if (currentValue >= finalValue) {
                    stat.textContent = finalValue;
                    clearInterval(counter);
                } else {
                    stat.textContent = Math.floor(currentValue);
                }
            }, 30);
        });
    };

    // Reputation Demo
    window.showReputationDemo = function() {
        const ratingNumber = document.querySelector('.rating-number');
        if (ratingNumber) {
            let rating = 4.0;
            const targetRating = 4.8;
            
            const ratingCounter = setInterval(() => {
                rating += 0.1;
                if (rating >= targetRating) {
                    ratingNumber.textContent = targetRating.toFixed(1);
                    clearInterval(ratingCounter);
                } else {
                    ratingNumber.textContent = rating.toFixed(1);
                }
            }, 100);
        }
    };
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(`
        .ai-system-card,
        .result-card,
        .faq-item,
        .pricing-option,
        .ai-feature,
        .floating-card
    `);

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });

    // Add CSS for animation
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
            transition: all 0.6s ease !important;
        }
        
        @keyframes fall {
            to {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Interactive Elements
function initializeInteractiveElements() {
    // Smooth scrolling functions
    window.scrollToDemo = function() {
        const demoSection = document.getElementById('demo-section');
        if (demoSection) {
            demoSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    window.scrollToOrder = function() {
        const orderSection = document.getElementById('order-section');
        if (orderSection) {
            orderSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    // Add hover effects to interactive cards
    const interactiveCards = document.querySelectorAll(`
        .ai-system-card,
        .result-card,
        .faq-item,
        .pricing-option,
        .ai-feature
    `);

    interactiveCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Enhanced button interactions
    const buttons = document.querySelectorAll(`
        .premium-cta-button,
        .demo-button,
        .voice-demo-btn,
        .premium-btn,
        .premium-submit-btn
    `);

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('div');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease;
                pointer-events: none;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => {
                if (this.contains(ripple)) {
                    this.removeChild(ripple);
                }
            }, 600);
        });
    });

    // Add ripple animation CSS
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
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

function validateEmailFormat(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFieldError(input, message) {
    clearFieldError(input);
    
    input.style.borderColor = '#ef4444';
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.cssText = `
        color: #ef4444;
        font-size: 14px;
        margin-top: 4px;
        display: flex;
        align-items: center;
        gap: 4px;
    `;
    errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i>${message}`;
    
    input.parentNode.insertBefore(errorDiv, input.nextSibling);
}

function clearFieldError(input) {
    input.style.borderColor = '#f1f5f9';
    const existingError = input.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

// Advanced Interactions
function initializeAdvancedInteractions() {
    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.style.transform = `translate3d(0, ${rate}px, 0)`;
        }
    });

    // Dynamic counter animations
    const counters = document.querySelectorAll('.stat-number, .rating-number, .revenue-amount');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element) {
    const text = element.textContent;
    const hasPrefix = text.includes('$') || text.includes('+');
    const hasSuffix = text.includes('%') || text.includes('★');
    
    let numericValue = parseFloat(text.replace(/[^0-9.]/g, ''));
    if (isNaN(numericValue)) return;

    let currentValue = 0;
    const increment = numericValue / 60; // 60 frames for smooth animation
    
    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= numericValue) {
            currentValue = numericValue;
            clearInterval(timer);
        }
        
        let displayValue = Math.floor(currentValue * 10) / 10;
        let formattedValue = displayValue.toLocaleString();
        
        if (hasPrefix && text.includes('$')) {
            formattedValue = '$' + formattedValue;
        }
        if (hasPrefix && text.includes('+')) {
            formattedValue = '+' + formattedValue;
        }
        if (hasSuffix && text.includes('%')) {
            formattedValue = formattedValue + '%';
        }
        if (hasSuffix && text.includes('★')) {
            formattedValue = formattedValue + '★';
        }
        
        element.textContent = formattedValue;
    }, 16); // ~60fps
}

// Initialize advanced interactions
initializeAdvancedInteractions();

// Performance optimization
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

// Throttle scroll events for performance
const throttledScroll = debounce(() => {
    // Any scroll-based animations here
}, 16);

window.addEventListener('scroll', throttledScroll);

// Accessibility enhancements
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const overlay = document.querySelector('[style*="position: fixed"]');
        if (overlay && window.closePremiumSuccess) {
            window.closePremiumSuccess();
        }
    }
});

// Initialize everything
console.log('🚀 Ultimate Converter AI System Loaded Successfully!');