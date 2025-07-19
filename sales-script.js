// Sales Landing Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeROICalculator();
    initializeFAQs();
    initializeScrollAnimations();
    initializeConversionTracking();
});

// ROI Calculator Functions
function initializeROICalculator() {
    const carsSlider = document.getElementById('carsPerWeek');
    const jobSlider = document.getElementById('avgJobValue');
    
    if (carsSlider && jobSlider) {
        carsSlider.addEventListener('input', updateROICalculation);
        jobSlider.addEventListener('input', updateROICalculation);
        
        // Initial calculation
        updateROICalculation();
    }
}

function updateROICalculation() {
    const carsPerWeek = parseInt(document.getElementById('carsPerWeek').value);
    const avgJobValue = parseInt(document.getElementById('avgJobValue').value);
    
    // Update display values
    document.getElementById('carsValue').textContent = carsPerWeek;
    document.getElementById('jobValue').textContent = avgJobValue;
    
    // Calculate current monthly revenue (4 weeks)
    const currentMonthly = carsPerWeek * 4 * avgJobValue;
    
    // Calculate projected revenue with 2.5x multiplier (150% increase)
    const projectedMonthly = Math.round(currentMonthly * 2.5);
    const monthlyIncrease = projectedMonthly - currentMonthly;
    const yearlyProfit = monthlyIncrease * 12;
    
    // Calculate payback time in days
    const websiteInvestment = 2999;
    const dailyIncrease = monthlyIncrease / 30;
    const paybackDays = Math.round(websiteInvestment / dailyIncrease * 10) / 10;
    
    // Update display
    document.getElementById('currentRevenue').textContent = '$' + currentMonthly.toLocaleString();
    document.getElementById('projectedRevenue').textContent = '$' + projectedMonthly.toLocaleString();
    document.getElementById('monthlyIncrease').textContent = '+$' + monthlyIncrease.toLocaleString() + '/month';
    document.getElementById('paybackTime').textContent = paybackDays + ' days';
    document.getElementById('yearlyProfit').textContent = '$' + yearlyProfit.toLocaleString();
}

// FAQ Functions
function initializeFAQs() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            toggleFAQ(this);
        });
    });
}

function toggleFAQ(questionElement) {
    const answer = questionElement.nextElementSibling;
    const isActive = questionElement.classList.contains('active');
    
    // Close all other FAQs
    document.querySelectorAll('.faq-question').forEach(q => {
        q.classList.remove('active');
        q.nextElementSibling.classList.remove('active');
    });
    
    // Toggle current FAQ
    if (!isActive) {
        questionElement.classList.add('active');
        answer.classList.add('active');
    }
    
    // Track FAQ interaction
    trackConversion('FAQ_Click', questionElement.textContent.trim());
}

// Modal Functions
function openDemo() {
    document.getElementById('demoModal').style.display = 'block';
    trackConversion('Demo_Opened');
}

function closeDemoModal() {
    document.getElementById('demoModal').style.display = 'none';
}

function closeDemo() {
    closeDemoModal();
    scrollToOrder();
    trackConversion('Demo_to_Order');
}

function openOrderForm() {
    document.getElementById('orderModal').style.display = 'block';
    trackConversion('Order_Form_Opened');
}

function closeOrderForm() {
    document.getElementById('orderModal').style.display = 'none';
}

// Navigation Functions
function scrollToOrder() {
    document.getElementById('order').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
    trackConversion('Scroll_to_Order');
}

// Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const orderForm = document.getElementById('orderForm');
    
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleOrderSubmission(this);
        });
    }
});

function handleOrderSubmission(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Get selected services
    const services = [];
    const serviceCheckboxes = form.querySelectorAll('input[name="services"]:checked');
    serviceCheckboxes.forEach(checkbox => {
        services.push(checkbox.value);
    });
    data.services = services;
    
    // Show loading state
    const submitBtn = form.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '🚀 Processing Your Order...';
    submitBtn.disabled = true;
    
    // Simulate order processing
    setTimeout(() => {
        const paymentType = data.payment === 'full' ? '$2,999 (Full Payment)' : '3 payments of $999';
        
        alert(`🎉 ORDER CONFIRMED!\n\nThank you ${data.ownerName}!\n\nYour AI-Powered Website Package:\n✅ Business: ${data.businessName}\n💳 Payment: ${paymentType}\n📧 Email: ${data.email}\n📱 Phone: ${data.phone}\n\nWhat happens next:\n🚀 Setup begins within 24 hours\n📱 You'll receive setup confirmation via email\n🌐 Your website will be live in 72 hours\n📞 Our team will call you for final details\n\nWelcome to the future of auto repair marketing!`);
        
        // Track successful conversion
        trackConversion('Order_Completed', {
            businessName: data.businessName,
            paymentType: data.payment,
            services: services
        });
        
        // Reset form
        closeOrderForm();
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Show success page or redirect
        console.log('Order completed:', data);
        
    }, 3000);
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
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Trigger number animations for stats
                if (entry.target.classList.contains('hero-stats')) {
                    animateStats();
                }
                
                if (entry.target.classList.contains('problem-stats')) {
                    animateProblemStats();
                }
                
                if (entry.target.classList.contains('results-grid')) {
                    animateResultsGrid();
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.feature-card, .testimonial, .result-card, .comparison-column, .package-feature, .hero-stats, .problem-stats, .results-grid'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

// Number Animations
function animateStats() {
    animateNumber('247', 2000);
}

function animateProblemStats() {
    const stats = document.querySelectorAll('.big-number');
    stats.forEach((stat, index) => {
        setTimeout(() => {
            const target = stat.textContent.replace(/[^0-9]/g, '');
            if (target) {
                animateNumberElement(stat, parseInt(target), 1500);
            }
        }, index * 300);
    });
}

function animateResultsGrid() {
    const results = document.querySelectorAll('.result-number');
    results.forEach((result, index) => {
        setTimeout(() => {
            const target = result.textContent.replace(/[^0-9]/g, '');
            if (target) {
                animateNumberElement(result, parseInt(target), 1200);
            }
        }, index * 200);
    });
}

function animateNumber(targetText, duration) {
    // This function can be customized for specific number animations
    console.log(`Animating number: ${targetText}`);
}

function animateNumberElement(element, target, duration) {
    const startTime = performance.now();
    const startValue = 0;
    const originalText = element.textContent;
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(startValue + (target - startValue) * easeOutQuart);
        
        // Preserve any non-numeric characters
        element.textContent = originalText.replace(/\d+/, currentValue);
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Conversion Tracking
function initializeConversionTracking() {
    // Track scroll depth
    let maxScrollDepth = 0;
    window.addEventListener('scroll', function() {
        const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        
        if (scrollDepth > maxScrollDepth) {
            maxScrollDepth = scrollDepth;
            
            if (scrollDepth >= 25 && scrollDepth < 50) {
                trackConversion('Scroll_25%');
            } else if (scrollDepth >= 50 && scrollDepth < 75) {
                trackConversion('Scroll_50%');
            } else if (scrollDepth >= 75 && scrollDepth < 90) {
                trackConversion('Scroll_75%');
            } else if (scrollDepth >= 90) {
                trackConversion('Scroll_90%');
            }
        }
    });
    
    // Track time on page
    let timeOnPage = 0;
    setInterval(() => {
        timeOnPage += 1;
        
        if (timeOnPage === 30) {
            trackConversion('Time_30_Seconds');
        } else if (timeOnPage === 60) {
            trackConversion('Time_1_Minute');
        } else if (timeOnPage === 120) {
            trackConversion('Time_2_Minutes');
        } else if (timeOnPage === 300) {
            trackConversion('Time_5_Minutes');
        }
    }, 1000);
    
    // Track button clicks
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-primary')) {
            trackConversion('Header_CTA_Click');
        }
        
        if (e.target.classList.contains('btn-large')) {
            trackConversion('Hero_Demo_Click');
        }
        
        if (e.target.classList.contains('btn-secondary')) {
            trackConversion('Hero_CTA_Click');
        }
        
        if (e.target.classList.contains('btn-order')) {
            trackConversion('Package_Order_Click');
        }
        
        if (e.target.classList.contains('btn-final')) {
            trackConversion('Final_CTA_Click');
        }
        
        // Track ROI calculator interactions
        if (e.target.closest('.roi-calculator')) {
            trackConversion('ROI_Calculator_Used');
        }
    });
}

function trackConversion(action, data = null) {
    console.log(`Conversion Event: ${action}`, {
        action: action,
        data: data,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent
    });
    
    // In real implementation, send to analytics service
    // Example: Google Analytics, Facebook Pixel, etc.
}

// Close modals when clicking outside
window.onclick = function(event) {
    const orderModal = document.getElementById('orderModal');
    const demoModal = document.getElementById('demoModal');
    
    if (event.target === orderModal) {
        closeOrderForm();
    }
    
    if (event.target === demoModal) {
        closeDemoModal();
    }
}

// Add urgency and social proof notifications
function showSocialProof() {
    const proofMessages = [
        "🔥 Mike from Chicago just ordered his website!",
        "💰 Sarah's Auto Shop increased revenue by 280%!",
        "⚡ 3 auto shops ordered in the last hour",
        "🚗 Tony saved $15,000 vs hiring a web designer",
        "📱 Someone in Dallas just completed their order!"
    ];
    
    function showNotification() {
        const message = proofMessages[Math.floor(Math.random() * proofMessages.length)];
        
        const notification = document.createElement('div');
        notification.innerHTML = `
            <div style="
                position: fixed;
                bottom: 20px;
                left: 20px;
                background: linear-gradient(135deg, #48bb78, #38a169);
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 50px;
                box-shadow: 0 10px 30px rgba(72, 187, 120, 0.3);
                z-index: 1500;
                font-weight: 600;
                animation: slideInLeft 0.5s ease-out;
                max-width: 320px;
                font-size: 0.9rem;
            ">
                ${message}
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutLeft 0.5s ease-in';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 500);
        }, 4000);
    }
    
    // Show first notification after 15 seconds
    setTimeout(showNotification, 15000);
    
    // Then show notifications every 30-60 seconds
    setInterval(showNotification, Math.random() * 30000 + 30000);
}

// Add exit intent detection
function addExitIntent() {
    let exitIntentShown = false;
    
    document.addEventListener('mouseleave', function(e) {
        if (e.clientY <= 0 && !exitIntentShown) {
            exitIntentShown = true;
            
            setTimeout(() => {
                if (confirm('🚨 WAIT! Don\'t miss out!\n\nGet your AI-powered website for only $2,999\n(Save $5,501 vs. regular price)\n\n✅ 24/7 AI assistant\n✅ Online booking system\n✅ Mobile optimized\n✅ 60-day guarantee\n\nClick OK to claim this limited-time offer!')) {
                    openOrderForm();
                    trackConversion('Exit_Intent_Converted');
                } else {
                    trackConversion('Exit_Intent_Declined');
                }
            }, 500);
        }
    });
}

// Initialize social proof and exit intent
document.addEventListener('DOMContentLoaded', function() {
    showSocialProof();
    addExitIntent();
});

// Add CSS for social proof animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInLeft {
        from {
            transform: translateX(-100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutLeft {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(-100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add floating action button for mobile
function addFloatingCTA() {
    const floatingCTA = document.createElement('div');
    floatingCTA.innerHTML = `
        <button onclick="openOrderForm()" style="
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(135deg, #e53e3e, #c53030);
            color: white;
            border: none;
            padding: 1rem 1.5rem;
            border-radius: 50px;
            font-weight: 700;
            cursor: pointer;
            box-shadow: 0 10px 30px rgba(229, 62, 62, 0.3);
            z-index: 1400;
            font-size: 0.9rem;
            animation: pulse 2s infinite;
            display: none;
        " id="floatingCTA">
            Get Website - $2,999
        </button>
    `;
    
    document.body.appendChild(floatingCTA);
    
    // Show floating CTA when user scrolls past hero
    window.addEventListener('scroll', function() {
        const heroHeight = document.querySelector('.hero').offsetHeight;
        const floatingBtn = document.getElementById('floatingCTA');
        
        if (window.scrollY > heroHeight) {
            floatingBtn.style.display = 'block';
        } else {
            floatingBtn.style.display = 'none';
        }
    });
}

// Initialize floating CTA
if (window.innerWidth <= 768) {
    addFloatingCTA();
}

// Add live visitor counter
function addVisitorCounter() {
    const visitorCount = Math.floor(Math.random() * 50) + 150; // Random between 150-200
    
    const counter = document.createElement('div');
    counter.innerHTML = `
        <div style="
            position: fixed;
            top: 80px;
            right: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 0.8rem 1rem;
            border-radius: 20px;
            font-size: 0.85rem;
            z-index: 1300;
            backdrop-filter: blur(10px);
        ">
            🔴 <span id="visitorCount">${visitorCount}</span> people viewing this page
        </div>
    `;
    
    document.body.appendChild(counter);
    
    // Update counter occasionally
    setInterval(() => {
        const currentCount = parseInt(document.getElementById('visitorCount').textContent);
        const change = Math.floor(Math.random() * 7) - 3; // -3 to +3
        const newCount = Math.max(100, currentCount + change);
        document.getElementById('visitorCount').textContent = newCount;
    }, 15000);
}

// Initialize visitor counter
addVisitorCounter();