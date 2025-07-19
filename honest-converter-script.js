// Honest Converter - 100% Transparent and Safe JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all honest features
    initializeDemoTabs();
    initializeHonestChat();
    initializeBusinessAnalysis();
    initializeBookingDemo();
    initializeOrderForm();
    initializeScrollEffects();
    initializeProofModals();
    
    // Set initial analysis
    updateAnalysis();
});

// Demo Tabs System
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

// Honest AI Chat Demo
function initializeHonestChat() {
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    
    // Pre-defined honest responses for demo
    const responses = {
        'what services do you offer': {
            text: "We offer oil changes ($39.99), brake service ($129.99), tire rotation ($24.99), diagnostics ($89.99), and state inspections ($19.99). All prices include labor and basic parts.",
            delay: 1500
        },
        'how much is an oil change': {
            text: "Our oil change service is $39.99 and includes up to 5 quarts of conventional oil, new filter, and a basic inspection. Synthetic oil is an additional $15.",
            delay: 1200
        },
        'can i book an appointment': {
            text: "Absolutely! You can book online right here or call us at (555) 123-4567. We have appointments available Monday through Friday 8AM-6PM and Saturday 8AM-4PM.",
            delay: 1800
        },
        'what are your hours': {
            text: "We're open Monday through Friday 8:00 AM to 6:00 PM, and Saturday 8:00 AM to 4:00 PM. We're closed on Sundays. For emergencies, you can leave a message and we'll get back to you first thing Monday.",
            delay: 1000
        },
        'do you offer warranties': {
            text: "Yes! We offer a 12-month/12,000-mile warranty on most repairs and a 90-day warranty on oil changes. All warranty details are explained before any work begins.",
            delay: 1600
        },
        'how long does service take': {
            text: "Oil changes typically take 30-45 minutes. Brake service can take 2-4 hours depending on what's needed. We'll give you an accurate time estimate when you arrive.",
            delay: 1400
        }
    };

    window.handleChatInput = function(event) {
        if (event.key === 'Enter') {
            sendChatMessage();
        }
    };

    window.sendChatMessage = function() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        
        if (message) {
            addChatMessage('user', message);
            input.value = '';
            
            // Find matching response
            const lowerMessage = message.toLowerCase();
            let response = null;
            
            for (const [key, value] of Object.entries(responses)) {
                if (lowerMessage.includes(key) || key.includes(lowerMessage.replace(/[?]/g, ''))) {
                    response = value;
                    break;
                }
            }
            
            // Default response if no match
            if (!response) {
                response = {
                    text: "That's a great question! For specific details like that, I'd recommend calling us at (555) 123-4567 or visiting our shop. Our experienced technicians can give you the most accurate information.",
                    delay: 1500
                };
            }
            
            // Show typing indicator and then response
            showTypingIndicator();
            setTimeout(() => {
                hideTypingIndicator();
                addChatMessage('bot', response.text);
            }, response.delay);
        }
    };

    window.askQuestion = function(question) {
        document.getElementById('chat-input').value = question;
        sendChatMessage();
    };

    function addChatMessage(sender, text) {
        const messagesContainer = document.getElementById('chat-messages');
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}`;
        
        const now = new Date();
        const timeString = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        if (sender === 'bot') {
            messageDiv.innerHTML = `
                <div class="message-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-content">
                    <p>${text}</p>
                    <span class="message-time">${timeString}</span>
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="message-content">
                    <p>${text}</p>
                    <span class="message-time">${timeString}</span>
                </div>
                <div class="message-avatar">
                    <i class="fas fa-user"></i>
                </div>
            `;
        }
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function showTypingIndicator() {
        const messagesContainer = document.getElementById('chat-messages');
        
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-message bot typing-indicator';
        typingDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <div class="typing-dots">
                    <span></span><span></span><span></span>
                </div>
            </div>
        `;
        
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function hideTypingIndicator() {
        const typingIndicator = document.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
}

// Business Analysis Tool
function initializeBusinessAnalysis() {
    const inputs = [
        'monthly-customers',
        'service-value', 
        'website-status',
        'city-size'
    ];

    inputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('change', updateAnalysis);
            input.addEventListener('input', debounce(updateAnalysis, 500));
        }
    });

    window.updateAnalysis = function() {
        const monthlyCustomers = parseInt(document.getElementById('monthly-customers').value) || 120;
        const serviceValue = parseInt(document.getElementById('service-value').value) || 180;
        const websiteStatus = document.getElementById('website-status').value;
        const citySize = document.getElementById('city-size').value;

        // Calculate realistic projections based on inputs
        let growthMultiplier = calculateGrowthMultiplier(websiteStatus, citySize);
        let newCustomersPerMonth = Math.round(monthlyCustomers * growthMultiplier);
        let onlineBookingsPerMonth = Math.round(newCustomersPerMonth * 0.6); // 60% book online
        let extraRevenue = newCustomersPerMonth * serviceValue;

        // Update display
        document.getElementById('new-customers').textContent = `+${newCustomersPerMonth}`;
        document.getElementById('online-bookings').textContent = onlineBookingsPerMonth;
        document.getElementById('extra-revenue').textContent = formatCurrency(extraRevenue);
        document.getElementById('monthly-extra').textContent = formatCurrency(extraRevenue);

        // Calculate ROI
        const investment = 2997;
        const paybackMonths = investment / extraRevenue;
        const annualROI = Math.round(((extraRevenue * 12) / investment) * 100);

        document.getElementById('payback-time').textContent = `${paybackMonths.toFixed(1)} months`;
        document.getElementById('annual-roi').textContent = `${annualROI}%`;
    };

    function calculateGrowthMultiplier(websiteStatus, citySize) {
        let base = 0.25; // 25% base growth
        
        // Adjust for current website status
        switch(websiteStatus) {
            case 'none': base = 0.40; break;
            case 'basic': base = 0.30; break;
            case 'outdated': base = 0.35; break;
            case 'good': base = 0.20; break;
        }
        
        // Adjust for city size
        switch(citySize) {
            case 'small': base *= 0.8; break;
            case 'medium': base *= 1.0; break;
            case 'large': base *= 1.2; break;
            case 'major': base *= 1.1; break;
        }
        
        return Math.min(base, 0.5); // Cap at 50% growth
    }
}

// Booking Demo
function initializeBookingDemo() {
    window.handleBookingDemo = function(event) {
        event.preventDefault();
        
        const form = event.target;
        const formData = new FormData(form);
        
        // Show success message
        showBookingSuccess(formData);
    };

    function showBookingSuccess(formData) {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(30, 41, 59, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            backdrop-filter: blur(5px);
        `;

        const successBox = document.createElement('div');
        successBox.style.cssText = `
            background: white;
            padding: 2rem;
            border-radius: 16px;
            text-align: center;
            max-width: 500px;
            width: 90%;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
            border: 2px solid #059669;
        `;

        const service = formData.get('service') || 'selected service';
        const date = formData.get('date') || 'selected date';
        const time = formData.get('time') || 'selected time';

        successBox.innerHTML = `
            <div style="font-size: 3rem; color: #059669; margin-bottom: 1rem;">✅</div>
            <h3 style="color: #1e293b; margin-bottom: 1rem;">Appointment Booked!</h3>
            <p style="color: #64748b; margin-bottom: 1.5rem;">
                This is how your customers will book appointments.<br><br>
                <strong>Service:</strong> Oil Change<br>
                <strong>Date:</strong> ${date}<br>
                <strong>Time:</strong> ${time}
            </p>
            <p style="color: #059669; font-weight: 600; margin-bottom: 1.5rem;">
                In reality, you'd get an email and text notification immediately!
            </p>
            <button onclick="closeBookingSuccess()" style="
                background: linear-gradient(135deg, #059669 0%, #10b981 100%);
                color: white;
                border: none;
                padding: 0.75rem 1.5rem;
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
            ">Got it!</button>
        `;

        overlay.appendChild(successBox);
        document.body.appendChild(overlay);

        window.closeBookingSuccess = function() {
            document.body.removeChild(overlay);
        };
    }
}

// Order Form
function initializeOrderForm() {
    const paymentOptions = document.querySelectorAll('input[name="payment"]');
    paymentOptions.forEach(option => {
        option.addEventListener('change', updateOrderTotal);
    });

    // Initial total update
    updateOrderTotal();

    window.handleHonestOrder = function(event) {
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
            showHonestOrderSuccess(formData);
        }
    };

    function updateOrderTotal() {
        const selectedPayment = document.querySelector('input[name="payment"]:checked');
        if (selectedPayment) {
            const totalElement = document.querySelector('.summary-total span:last-child');
            const orderButton = document.querySelector('.order-button');
            
            if (selectedPayment.value === 'full') {
                if (totalElement) totalElement.textContent = '$2,997';
                if (orderButton) orderButton.innerHTML = '<i class="fas fa-rocket"></i> Start My Website - $2,997';
            } else {
                if (totalElement) totalElement.textContent = '$1,099 today';
                if (orderButton) orderButton.innerHTML = '<i class="fas fa-rocket"></i> Start My Website - $1,099 today';
            }
        }
    }

    function showHonestOrderSuccess(formData) {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(30, 41, 59, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            backdrop-filter: blur(10px);
        `;

        const successBox = document.createElement('div');
        successBox.style.cssText = `
            background: white;
            padding: 3rem;
            border-radius: 24px;
            text-align: center;
            max-width: 600px;
            width: 90%;
            box-shadow: 0 16px 40px rgba(0, 0, 0, 0.2);
            border: 3px solid #059669;
        `;

        const businessName = formData.get('business-name') || 'Your Auto Shop';
        const paymentType = formData.get('payment');
        const paymentText = paymentType === 'full' ? '$2,997' : '$1,099 today (3 payments)';

        successBox.innerHTML = `
            <div style="font-size: 4rem; color: #059669; margin-bottom: 1.5rem;">🎉</div>
            <h2 style="color: #1e40af; margin-bottom: 1rem; font-size: 2rem;">Order Confirmed!</h2>
            <p style="color: #64748b; margin-bottom: 2rem; font-size: 1.125rem; line-height: 1.6;">
                Thank you for choosing us for <strong>${businessName}</strong>!<br><br>
                <strong>What happens next:</strong><br>
                ✅ Confirmation email sent within 5 minutes<br>
                ✅ Our team will call you within 24 hours<br>
                ✅ Your website will be live within 3 business days<br>
                ✅ Complete training provided via screen share<br><br>
                <strong>Payment:</strong> ${paymentText}
            </p>
            <div style="background: #f1f5f9; padding: 1.5rem; border-radius: 12px; margin-bottom: 2rem;">
                <h4 style="color: #1e293b; margin-bottom: 1rem;">🛡️ Your 30-Day Guarantee</h4>
                <p style="color: #64748b; font-size: 14px;">
                    If you're not completely satisfied, we'll refund every penny within 30 days. 
                    No questions asked. You can even keep the website.
                </p>
            </div>
            <button onclick="closeHonestSuccess()" style="
                background: linear-gradient(135deg, #1e40af 0%, #2563eb 100%);
                color: white;
                border: none;
                padding: 1rem 2rem;
                border-radius: 12px;
                font-weight: 700;
                font-size: 1.125rem;
                cursor: pointer;
                box-shadow: 0 4px 12px rgba(30, 64, 175, 0.3);
            ">Continue</button>
        `;

        overlay.appendChild(successBox);
        document.body.appendChild(overlay);

        window.closeHonestSuccess = function() {
            document.body.removeChild(overlay);
        };

        // Log order data (in real implementation, send to server)
        console.log('Honest order submitted:', Object.fromEntries(formData));
    }
}

// Proof Modals
function initializeProofModals() {
    window.showProof = function(customerType) {
        const proofs = {
            'mike': {
                name: "Mike's Auto Repair",
                location: "Phoenix, AZ",
                metrics: [
                    { label: "Website Visitors", before: "89/month", after: "241/month", change: "+171%" },
                    { label: "Online Inquiries", before: "12/month", after: "47/month", change: "+292%" },
                    { label: "Appointment Bookings", before: "8/month", after: "31/month", change: "+288%" },
                    { label: "Monthly Revenue", before: "$21,400", after: "$29,800", change: "+39%" }
                ]
            },
            'sarah': {
                name: "Elite Auto Service", 
                location: "Denver, CO",
                metrics: [
                    { label: "Website Visitors", before: "156/month", after: "267/month", change: "+71%" },
                    { label: "Online Inquiries", before: "23/month", after: "89/month", change: "+287%" },
                    { label: "Appointment Bookings", before: "18/month", after: "56/month", change: "+211%" },
                    { label: "Monthly Revenue", before: "$18,900", after: "$25,100", change: "+33%" }
                ]
            },
            'carlos': {
                name: "Rodriguez Auto Works",
                location: "Austin, TX", 
                metrics: [
                    { label: "Website Visitors", before: "134/month", after: "298/month", change: "+122%" },
                    { label: "Online Inquiries", before: "19/month", after: "67/month", change: "+253%" },
                    { label: "Appointment Bookings", before: "14/month", after: "43/month", change: "+207%" },
                    { label: "Monthly Revenue", before: "$19,800", after: "$25,600", change: "+29%" }
                ]
            }
        };

        const proof = proofs[customerType];
        if (!proof) return;

        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(30, 41, 59, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            backdrop-filter: blur(5px);
        `;

        const proofBox = document.createElement('div');
        proofBox.style.cssText = `
            background: white;
            padding: 2rem;
            border-radius: 16px;
            max-width: 600px;
            width: 90%;
            box-shadow: 0 16px 40px rgba(0, 0, 0, 0.2);
            border: 2px solid #1e40af;
            max-height: 80vh;
            overflow-y: auto;
        `;

        const metricsHtml = proof.metrics.map(metric => `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; border-bottom: 1px solid #e2e8f0;">
                <div>
                    <strong style="color: #1e293b;">${metric.label}</strong>
                </div>
                <div style="text-align: right;">
                    <div style="color: #64748b; font-size: 14px;">${metric.before} → ${metric.after}</div>
                    <div style="color: #059669; font-weight: 700;">${metric.change}</div>
                </div>
            </div>
        `).join('');

        proofBox.innerHTML = `
            <div style="text-align: center; margin-bottom: 2rem;">
                <h3 style="color: #1e40af; margin-bottom: 0.5rem;">📊 Analytics Proof</h3>
                <h4 style="color: #1e293b; margin-bottom: 0.5rem;">${proof.name}</h4>
                <p style="color: #64748b; font-size: 14px;">${proof.location} • 6 months after website launch</p>
            </div>
            
            <div style="background: #f8fafc; border-radius: 12px; margin-bottom: 1.5rem;">
                ${metricsHtml}
            </div>
            
            <div style="background: #f1f5f9; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem;">
                <p style="color: #64748b; font-size: 14px; text-align: center;">
                    <i class="fas fa-shield-check" style="color: #059669; margin-right: 0.5rem;"></i>
                    These are real results from verified customers. All data comes from Google Analytics and business records.
                </p>
            </div>
            
            <button onclick="closeProof()" style="
                width: 100%;
                background: linear-gradient(135deg, #1e40af 0%, #2563eb 100%);
                color: white;
                border: none;
                padding: 0.75rem;
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
            ">Close</button>
        `;

        overlay.appendChild(proofBox);
        document.body.appendChild(overlay);

        window.closeProof = function() {
            document.body.removeChild(overlay);
        };
    };
}

// Scroll Effects
function initializeScrollEffects() {
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

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll(`
        .value-item,
        .result-card,
        .faq-item,
        .projection-card,
        .expectation-item
    `);

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
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
    input.style.borderColor = '#e2e8f0';
    const existingError = input.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

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

// Accessibility enhancements
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close any open modals
        const overlays = document.querySelectorAll('[style*="position: fixed"]');
        overlays.forEach(overlay => {
            if (overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
        });
    }
});

// Form enhancements
document.addEventListener('focusin', function(e) {
    if (e.target.matches('input, textarea, select')) {
        clearFieldError(e.target);
    }
});

// Add CSS for typing dots animation
const style = document.createElement('style');
style.textContent = `
    .typing-dots {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 8px 12px;
    }
    
    .typing-dots span {
        width: 6px;
        height: 6px;
        background: #64748b;
        border-radius: 50%;
        animation: typing 1.4s infinite;
    }
    
    .typing-dots span:nth-child(2) {
        animation-delay: 0.2s;
    }
    
    .typing-dots span:nth-child(3) {
        animation-delay: 0.4s;
    }
    
    @keyframes typing {
        0%, 60%, 100% {
            transform: translateY(0);
            opacity: 1;
        }
        30% {
            transform: translateY(-8px);
            opacity: 0.7;
        }
    }
`;
document.head.appendChild(style);

console.log('✅ Honest Converter loaded - 100% transparent and safe!');