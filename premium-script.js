// Premium High-Conversion Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeCounters();
    initializeCountdown();
    initializeCalculator();
    initializeLiveDemo();
    initializeRevenueTicker();
});

// Initialize Live Counters
function initializeCounters() {
    // Revenue counter animation
    animateCounter('revenueCounter', 247350, 2000);
    animateCounter('todayRevenue', 8430, 1500);
    animateCounter('appointmentsToday', 47, 1000);
    animateCounter('leadsToday', 89, 1200);
    
    // Update counters every 30 seconds to show "live" activity
    setInterval(() => {
        const revenueElement = document.getElementById('todayRevenue');
        const appointmentsElement = document.getElementById('appointmentsToday');
        const leadsElement = document.getElementById('leadsToday');
        
        if (revenueElement) {
            const currentRevenue = parseInt(revenueElement.textContent);
            const newRevenue = currentRevenue + Math.floor(Math.random() * 500) + 100;
            animateCounter('todayRevenue', newRevenue, 500);
        }
        
        if (appointmentsElement) {
            const currentAppointments = parseInt(appointmentsElement.textContent);
            const newAppointments = currentAppointments + Math.floor(Math.random() * 3) + 1;
            animateCounter('appointmentsToday', newAppointments, 500);
        }
        
        if (leadsElement) {
            const currentLeads = parseInt(leadsElement.textContent);
            const newLeads = currentLeads + Math.floor(Math.random() * 5) + 2;
            animateCounter('leadsToday', newLeads, 500);
        }
    }, 30000);
}

// Animate number counters
function animateCounter(elementId, targetValue, duration) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const startValue = 0;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(startValue + (targetValue - startValue) * easeOutQuart);
        
        element.textContent = currentValue.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Initialize Countdown Timer
function initializeCountdown() {
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;
    
    // Set countdown to 24 hours from now (resets daily)
    let timeLeft = 24 * 60 * 60 - (Math.floor(Date.now() / 1000) % (24 * 60 * 60));
    
    function updateCountdown() {
        const hours = Math.floor(timeLeft / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        const seconds = timeLeft % 60;
        
        countdownElement.textContent = 
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        timeLeft--;
        
        if (timeLeft < 0) {
            timeLeft = 24 * 60 * 60; // Reset to 24 hours
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Initialize Revenue Calculator
function initializeCalculator() {
    const currentCarsSlider = document.getElementById('currentCars');
    const avgJobSlider = document.getElementById('avgJob');
    const currentCarsValue = document.getElementById('currentCarsValue');
    const avgJobValue = document.getElementById('avgJobValue');
    
    if (!currentCarsSlider || !avgJobSlider) return;
    
    function updateCalculator() {
        const currentCars = parseInt(currentCarsSlider.value);
        const avgJob = parseInt(avgJobSlider.value);
        
        // Update displayed values
        currentCarsValue.textContent = currentCars;
        avgJobValue.textContent = avgJob;
        
        // Calculate current monthly revenue
        const currentMonthlyRevenue = currentCars * 4 * avgJob; // 4 weeks per month
        
        // Calculate new revenue with AI website (2.6x increase)
        const newMonthlyRevenue = Math.floor(currentMonthlyRevenue * 2.6);
        const increase = newMonthlyRevenue - currentMonthlyRevenue;
        const yearlyProfit = increase * 12;
        
        // Update revenue displays
        document.getElementById('currentRevenue').textContent = currentMonthlyRevenue.toLocaleString();
        document.getElementById('newRevenue').textContent = newMonthlyRevenue.toLocaleString();
        document.getElementById('increase').textContent = increase.toLocaleString();
        document.getElementById('yearlyProfit').textContent = yearlyProfit.toLocaleString();
    }
    
    currentCarsSlider.addEventListener('input', updateCalculator);
    avgJobSlider.addEventListener('input', updateCalculator);
    
    // Initial calculation
    updateCalculator();
}

// Initialize Live Demo Animation
function initializeLiveDemo() {
    const liveConversation = document.querySelector('.live-conversation');
    if (!liveConversation) return;
    
    const conversations = [
        {
            customer: "My brakes are squeaking badly...",
            ai: "That's a safety issue! I can book you an emergency brake inspection today. Our certified mechanics have a 98% success rate with brake repairs. Would 2:30 PM work?",
            customerResponse: "Yes! How much will it cost?",
            aiResponse: "Brake inspection is $89, applied toward any repair costs. Most brake pad replacements are $149-249. Booking you now...",
            conversion: "$238 → Potential $1,400 brake job"
        },
        {
            customer: "Need an oil change ASAP",
            ai: "Perfect timing! We have a slot at 11 AM today. Premium oil change with 20-point inspection is $49.99. Should I reserve that for you?",
            customerResponse: "Book it!",
            aiResponse: "Excellent! Confirming your appointment for 11 AM. You'll receive a text reminder 30 minutes before...",
            conversion: "$49.99 → Potential $350 additional services"
        },
        {
            customer: "Car won't start this morning",
            ai: "Sorry to hear that! Could be battery, starter, or alternator. Our diagnostic service is $89.99 (applied to repair costs). We can also arrange towing if needed. When works best?",
            customerResponse: "Can you fit me in today?",
            aiResponse: "Absolutely! I have a slot at 3:15 PM. Booking your diagnostic now...",
            conversion: "$89.99 → Potential $800 repair job"
        }
    ];
    
    let currentIndex = 0;
    
    function updateLiveDemo() {
        const conversation = conversations[currentIndex];
        
        liveConversation.innerHTML = `
            <div class="chat-message customer">
                <strong>Customer:</strong> "${conversation.customer}"
            </div>
            <div class="chat-message ai">
                <strong>AI Assistant:</strong> "${conversation.ai}"
            </div>
            <div class="chat-message customer">
                <strong>Customer:</strong> "${conversation.customerResponse}"
            </div>
            <div class="chat-message ai">
                <strong>AI Assistant:</strong> "${conversation.aiResponse}"
            </div>
            <div class="conversion-alert">
                💰 <strong>CONVERSION COMPLETED:</strong> ${conversation.conversion}
            </div>
        `;
        
        currentIndex = (currentIndex + 1) % conversations.length;
    }
    
    // Update demo every 8 seconds
    setInterval(updateLiveDemo, 8000);
}

// Initialize Revenue Ticker
function initializeRevenueTicker() {
    const ticker = document.querySelector('.results-ticker');
    if (!ticker) return;
    
    const results = [
        "Mike's Auto: +$43K revenue",
        "Elite Motors: +89 appointments", 
        "Pro Auto: +340% website traffic",
        "Quick Fix: +67% conversion rate",
        "Speedy Service: +$28K monthly",
        "Auto Care Plus: +156 new customers",
        "Reliable Repairs: +425% online bookings",
        "Frank's Garage: +$62K in 60 days"
    ];
    
    let currentResults = results.slice(0, 4);
    
    function updateTicker() {
        // Shuffle results and show 4 random ones
        const shuffled = results.sort(() => Math.random() - 0.5);
        currentResults = shuffled.slice(0, 4);
        
        ticker.innerHTML = currentResults.map(result => 
            `<div class="result-item">${result}</div>`
        ).join('');
    }
    
    // Update ticker every 6 seconds
    setInterval(updateTicker, 6000);
}

// Modal Functions
function openClaimModal() {
    openOrderForm();
}

function openOrderForm() {
    document.getElementById('orderModal').style.display = 'block';
    
    // Track conversion attempt
    console.log('Order form opened - high intent visitor');
}

function closeOrderForm() {
    document.getElementById('orderModal').style.display = 'none';
}

// Handle order form submission
document.addEventListener('DOMContentLoaded', function() {
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simulate order processing
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = '🚀 PROCESSING YOUR ORDER...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert(`🎉 CONGRATULATIONS ${data.get('name') || 'Valued Customer'}!\n\nYour Elite AI Auto Repair Website is confirmed!\n\n💰 Investment: $3,500\n📧 Email: ${data.get('email') || 'your-email@example.com'}\n📱 Phone: ${data.get('phone') || 'your-phone'}\n\nYou'll receive:\n✅ Complete website setup within 48 hours\n✅ AI chatbot configured and trained\n✅ Booking system activated\n✅ Mobile optimization completed\n✅ 60-day money-back guarantee\n\nWelcome to the future of auto repair marketing!`);
                
                closeOrderForm();
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Log successful conversion
                console.log('HIGH VALUE CONVERSION COMPLETED:', data);
            }, 3000);
        });
    }
});

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('orderModal');
    if (event.target === modal) {
        closeOrderForm();
    }
}

// Add urgency behaviors
document.addEventListener('DOMContentLoaded', function() {
    // Flash certain elements for attention
    setTimeout(() => {
        const urgencyElements = document.querySelectorAll('.breaking, .claim-spot-btn, .mega-cta');
        urgencyElements.forEach(el => {
            el.style.animation = 'pulse 1s infinite';
        });
    }, 5000);
    
    // Show exit intent popup (simulate)
    let exitIntentShown = false;
    document.addEventListener('mouseleave', function(e) {
        if (e.clientY <= 0 && !exitIntentShown) {
            exitIntentShown = true;
            setTimeout(() => {
                if (confirm('🚨 WAIT! Don\'t miss out on this limited-time offer!\n\nGet your money-printing website for only $3,500 (save $11,500)\n\nThis offer expires at midnight tonight!\n\nClick OK to claim your spot now!')) {
                    openOrderForm();
                }
            }, 500);
        }
    });
    
    // Scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Trigger number animations when sections come into view
                if (entry.target.classList.contains('revenue-proof')) {
                    setTimeout(() => {
                        animateCounter('todayRevenue', 8430, 2000);
                        animateCounter('appointmentsToday', 47, 2000);
                        animateCounter('leadsToday', 89, 2000);
                    }, 500);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll(
        '.testimonial-card, .feature-demo, .stat-bubble, .transformation-grid, .revenue-proof'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
});

// Add dynamic social proof
function addSocialProof() {
    const proofMessages = [
        "🔥 Sarah from Dallas just claimed her spot!",
        "💰 Mike's Auto in Chicago made $8,430 today!",
        "⚡ 3 appointments booked in the last 10 minutes",
        "🚗 Tony's Garage increased revenue by 340%!",
        "📱 Someone in Miami just booked their website!"
    ];
    
    function showProofNotification() {
        const message = proofMessages[Math.floor(Math.random() * proofMessages.length)];
        
        // Create notification element
        const notification = document.createElement('div');
        notification.innerHTML = `
            <div style="
                position: fixed;
                bottom: 20px;
                left: 20px;
                background: linear-gradient(45deg, #4CAF50, #45a049);
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 50px;
                box-shadow: 0 10px 25px rgba(76, 175, 80, 0.3);
                z-index: 1000;
                font-weight: bold;
                animation: slideInLeft 0.5s ease-out;
                max-width: 300px;
                font-size: 0.9rem;
            ">
                ${message}
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Remove notification after 4 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutLeft 0.5s ease-in';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 4000);
    }
    
    // Show first notification after 10 seconds
    setTimeout(showProofNotification, 10000);
    
    // Then show notifications every 25-45 seconds
    setInterval(showProofNotification, Math.random() * 20000 + 25000);
}

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

// Initialize social proof
addSocialProof();

// Add conversion tracking
function trackConversion(action) {
    console.log(`Conversion Event: ${action}`, {
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
    });
    
    // In real implementation, this would send data to analytics
}

// Track key interactions
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('claim-spot-btn') || 
        e.target.classList.contains('mega-cta')) {
        trackConversion('CTA_Click');
    }
    
    if (e.target.closest('.testimonial-card')) {
        trackConversion('Testimonial_Read');
    }
    
    if (e.target.closest('.calculator-box')) {
        trackConversion('Calculator_Used');
    }
});

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

// Add page visibility tracking
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        trackConversion('Page_Hidden');
    } else {
        trackConversion('Page_Visible');
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