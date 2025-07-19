// GAME CHANGER - Ultimate Conversion Machine JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeCountdown();
    initializeLiveFeed();
    initializeROICalculator();
    initializeOrderTracking();
    initializeUrgencyElements();
    startConversionEngine();
});

// Countdown Timer - Creates Massive Urgency
function initializeCountdown() {
    // Set to 24 hours from now
    let timeLeft = 24 * 60 * 60;
    
    function updateCountdown() {
        const hours = Math.floor(timeLeft / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        const seconds = timeLeft % 60;
        
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        
        // Update time left displays
        const timeLeftElements = document.querySelectorAll('#timeLeft');
        timeLeftElements.forEach(el => {
            el.textContent = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        });
        
        timeLeft--;
        
        if (timeLeft < 0) {
            timeLeft = 24 * 60 * 60; // Reset to 24 hours
        }
        
        // Add urgency when time is low
        if (timeLeft < 3600) { // Less than 1 hour
            document.querySelector('.countdown').style.animation = 'shake 0.5s infinite';
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Live Feed - Shows Fake Real-Time Activity
function initializeLiveFeed() {
    const shops = [
        'Elite Motors', 'Quick Fix Auto', 'Pro Repair', 'Mike\'s Garage', 'Speed Shop',
        'Auto Care Plus', 'Express Service', 'Reliable Motors', 'City Auto', 'Premier Repair',
        'Fast Lane Auto', 'Superior Service', 'Ultimate Motors', 'Precision Auto', 'Metro Repair'
    ];
    
    const cities = [
        'Chicago', 'Dallas', 'Miami', 'Phoenix', 'Denver', 'Atlanta', 'Seattle', 'Portland',
        'Austin', 'Nashville', 'Orlando', 'Tampa', 'Las Vegas', 'San Antonio', 'Charlotte'
    ];
    
    let totalRevenue = 247839;
    
    function addNewFeedItem() {
        const shop = shops[Math.floor(Math.random() * shops.length)];
        const city = cities[Math.floor(Math.random() * cities.length)];
        const amount = Math.floor(Math.random() * 2000) + 500; // $500-$2500
        const timeAgo = Math.floor(Math.random() * 10) + 1; // 1-10 minutes
        
        const feedContainer = document.getElementById('liveFeed');
        const newItem = document.createElement('div');
        newItem.className = 'feed-item';
        newItem.innerHTML = `
            <span class="time">${timeAgo} min ago</span>
            <span class="shop">${shop} (${city})</span>
            <span class="amount">+$${amount.toLocaleString()} today</span>
        `;
        
        // Add to top of feed
        feedContainer.insertBefore(newItem, feedContainer.firstChild);
        
        // Remove oldest item if more than 5
        if (feedContainer.children.length > 5) {
            feedContainer.removeChild(feedContainer.lastChild);
        }
        
        // Update total revenue
        totalRevenue += amount;
        document.getElementById('totalToday').textContent = totalRevenue.toLocaleString();
        
        // Update order count
        const orderCount = document.getElementById('orderCount');
        if (orderCount) {
            const current = parseInt(orderCount.textContent);
            orderCount.textContent = current + Math.floor(Math.random() * 3) + 1;
        }
    }
    
    // Add new item every 15-45 seconds
    setInterval(addNewFeedItem, Math.random() * 30000 + 15000);
}

// ROI Calculator - Shows Massive Profit Potential
function calculateROI() {
    const weeklyCars = parseInt(document.getElementById('weeklyCars').value);
    const avgValue = parseInt(document.getElementById('avgValue').value);
    
    // Update display values
    document.getElementById('weeklyValue').textContent = weeklyCars;
    document.getElementById('jobValue').textContent = avgValue;
    
    // Calculate current monthly revenue (4 weeks)
    const currentMonthly = weeklyCars * 4 * avgValue;
    
    // Calculate new revenue with AI (3.47x multiplier for shock value)
    const newMonthly = Math.round(currentMonthly * 3.47);
    const extraProfit = newMonthly - currentMonthly;
    const yearlyProfit = extraProfit * 12;
    
    // Calculate payback time
    const investment = 1997;
    const dailyExtra = extraProfit / 30;
    const paybackDays = Math.round((investment / dailyExtra) * 10) / 10;
    
    // Update displays with animation
    animateValue('currentRevenue', currentMonthly);
    animateValue('newRevenue', newMonthly);
    animateValue('extraProfit', extraProfit);
    animateValue('yearlyProfit', yearlyProfit);
    
    document.getElementById('paybackTime').textContent = paybackDays + ' days';
}

function animateValue(elementId, targetValue) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const startValue = 0;
    const duration = 2000;
    const startTime = performance.now();
    
    function updateValue(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(startValue + (targetValue - startValue) * easeOutQuart);
        
        element.textContent = currentValue.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateValue);
        }
    }
    
    requestAnimationFrame(updateValue);
}

// Order Tracking - Shows Social Proof
function initializeOrderTracking() {
    // Update spots left randomly
    function updateSpotsLeft() {
        const spotsElement = document.getElementById('spotsLeft');
        if (spotsElement) {
            let current = parseInt(spotsElement.textContent);
            if (current > 3) {
                current = Math.max(3, current - 1);
                spotsElement.textContent = current;
                
                if (current <= 5) {
                    spotsElement.style.color = '#ff0000';
                    spotsElement.style.animation = 'blink 1s infinite';
                }
            }
        }
    }
    
    // Update people viewing
    function updateViewers() {
        const viewersElement = document.getElementById('peopleViewing');
        if (viewersElement) {
            const current = parseInt(viewersElement.textContent);
            const change = Math.floor(Math.random() * 7) - 3; // -3 to +3
            const newCount = Math.max(15, Math.min(50, current + change));
            viewersElement.textContent = newCount;
        }
    }
    
    // Update spots every 3-8 minutes
    setInterval(updateSpotsLeft, Math.random() * 300000 + 180000);
    
    // Update viewers every 10-30 seconds
    setInterval(updateViewers, Math.random() * 20000 + 10000);
}

// Urgency Elements - Creates FOMO
function initializeUrgencyElements() {
    // Flash urgency indicators
    setTimeout(() => {
        const indicators = document.querySelectorAll('.urgency-indicators .indicator');
        indicators.forEach(indicator => {
            indicator.style.animation = 'pulse 1s infinite';
        });
    }, 10000);
    
    // Add exit intent popup
    let exitIntentShown = false;
    document.addEventListener('mouseleave', function(e) {
        if (e.clientY <= 0 && !exitIntentShown) {
            exitIntentShown = true;
            setTimeout(() => {
                if (confirm('🚨 WAIT! This 67% discount expires in hours!\n\nDon\'t let your competitors get the unfair advantage.\n\nClaim your AutoDominator AI system now for just $1,997\n(Regular price: $5,997)\n\nClick OK to secure your spot before it\'s too late!')) {
                    claimNow();
                }
            }, 1000);
        }
    });
}

// Conversion Engine - Tracks Everything
function startConversionEngine() {
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
                showUrgencyNotification('⚠️ Don\'t miss out! Only 7 spots left in your area!');
            } else if (scrollDepth >= 75) {
                trackConversion('Scroll_75%');
                showUrgencyNotification('🔥 Offer expires soon! Claim your spot now!');
            }
        }
    });
    
    // Track time on page
    let timeOnPage = 0;
    setInterval(() => {
        timeOnPage += 1;
        
        if (timeOnPage === 60) {
            trackConversion('Time_1_Minute');
            showUrgencyNotification('💰 Calculate your profit potential below!');
        } else if (timeOnPage === 180) {
            trackConversion('Time_3_Minutes');
            showUrgencyNotification('🚨 Limited time: Save $25,503 today only!');
        } else if (timeOnPage === 300) {
            trackConversion('Time_5_Minutes');
            showUrgencyNotification('⏰ Don\'t wait! This offer expires at midnight!');
        }
    }, 1000);
    
    // Track button interactions
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('mega-button') || 
            e.target.classList.contains('nuclear-button')) {
            trackConversion('CTA_Click', e.target.textContent);
        }
        
        if (e.target.closest('.fake-video')) {
            trackConversion('Video_Click');
        }
        
        if (e.target.closest('.roi-explosion')) {
            trackConversion('ROI_Calculator_Used');
        }
    });
}

// Action Functions
function startDemo() {
    document.getElementById('demoModal').style.display = 'block';
    trackConversion('Demo_Opened');
}

function closeDemo() {
    document.getElementById('demoModal').style.display = 'none';
}

function claimNow() {
    document.getElementById('orderModal').style.display = 'block';
    trackConversion('Order_Form_Opened');
}

function orderNow() {
    claimNow();
}

function closeOrder() {
    document.getElementById('orderModal').style.display = 'none';
}

// Order Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const orderForm = document.getElementById('orderForm');
    
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleExplosiveOrder(this);
        });
    }
});

function handleExplosiveOrder(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Show explosive loading state
    const submitBtn = form.querySelector('.order-button');
    const originalText = submitBtn.textContent;
    
    submitBtn.innerHTML = '🚀 ACTIVATING YOUR MONEY MACHINE...<br><span style="font-size: 1rem;">Setting up your AI dominance system</span>';
    submitBtn.disabled = true;
    submitBtn.style.animation = 'megaGlow 0.5s infinite';
    
    // Simulate processing with progress updates
    setTimeout(() => {
        submitBtn.innerHTML = '⚡ INSTALLING AI BRAIN...<br><span style="font-size: 1rem;">Training your profit algorithms</span>';
    }, 2000);
    
    setTimeout(() => {
        submitBtn.innerHTML = '🎯 TARGETING YOUR COMPETITORS...<br><span style="font-size: 1rem;">Preparing to steal their customers</span>';
    }, 4000);
    
    setTimeout(() => {
        submitBtn.innerHTML = '💰 ACTIVATING MONEY PRINTER...<br><span style="font-size: 1rem;">Your unfair advantage is ready!</span>';
    }, 6000);
    
    setTimeout(() => {
        const paymentType = data.payment === 'full' ? '$1,997 (Full Payment - Best Deal)' : '3 payments of $699';
        
        alert(`🎉 CONGRATULATIONS ${data.ownerName.toUpperCase()}!\n\nYour AutoDominator AI System is ACTIVATED!\n\n🏢 Shop: ${data.shopName}\n💰 Investment: ${paymentType}\n📧 Email: ${data.email}\n📱 Phone: ${data.phone}\n\n🚀 WHAT HAPPENS NEXT:\n✅ Setup begins within 2 HOURS\n✅ Your AI starts learning your business\n✅ Money-printing website goes live in 48 hours\n✅ First customers start booking within 72 hours\n✅ $10,000 revenue guarantee kicks in\n\n🔥 Welcome to your UNFAIR ADVANTAGE!\n\nYour competitors won't know what hit them!`);
        
        // Track explosive conversion
        trackConversion('EXPLOSIVE_CONVERSION_COMPLETED', {
            shopName: data.shopName,
            paymentType: data.payment,
            city: data.city,
            investment: data.payment === 'full' ? 1997 : 2097
        });
        
        // Close and reset
        closeOrder();
        form.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        submitBtn.style.animation = 'glow 2s infinite';
        
        console.log('GAME CHANGER CONVERSION:', data);
        
    }, 8000);
}

// Urgency Notifications
function showUrgencyNotification(message) {
    const notification = document.createElement('div');
    notification.innerHTML = `
        <div style="
            position: fixed;
            top: 120px;
            right: 20px;
            background: linear-gradient(45deg, #ff0000, #ff6600);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 25px;
            box-shadow: 0 15px 35px rgba(255, 102, 0, 0.5);
            z-index: 2500;
            font-weight: 700;
            font-size: 0.95rem;
            animation: slideInRight 0.5s ease-out;
            max-width: 300px;
            border: 2px solid #ffd700;
        ">
            ${message}
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease-in';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 500);
    }, 5000);
}

// Conversion Tracking
function trackConversion(action, data = null) {
    console.log(`🔥 GAME CHANGER EVENT: ${action}`, {
        action: action,
        data: data,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        scrollDepth: Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100),
        timeOnPage: Math.floor(performance.now() / 1000)
    });
    
    // In real implementation, send to analytics with higher priority
}

// Close modals when clicking outside
window.onclick = function(event) {
    const orderModal = document.getElementById('orderModal');
    const demoModal = document.getElementById('demoModal');
    
    if (event.target === orderModal) {
        closeOrder();
    }
    
    if (event.target === demoModal) {
        closeDemo();
    }
}

// Add explosion effects CSS
const explosiveStyle = document.createElement('style');
explosiveStyle.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes explosiveShake {
        0%, 100% { transform: translateX(0) scale(1); }
        25% { transform: translateX(-10px) scale(1.05); }
        75% { transform: translateX(10px) scale(0.95); }
    }
    
    @keyframes explosiveGlow {
        0%, 100% { 
            box-shadow: 0 0 30px rgba(255, 102, 0, 0.5);
            transform: scale(1);
        }
        50% { 
            box-shadow: 0 0 60px rgba(255, 102, 0, 1);
            transform: scale(1.02);
        }
    }
`;
document.head.appendChild(explosiveStyle);

// Initialize ROI calculator
calculateROI();

// Add aggressive remarketing
function startAggressiveRemarketing() {
    // Detect when user is about to leave
    let mouseLeft = false;
    
    document.addEventListener('mouseout', function(e) {
        if (e.toElement === null && e.relatedTarget === null && !mouseLeft) {
            mouseLeft = true;
            setTimeout(() => {
                showUrgencyNotification('🚨 FINAL WARNING: Offer expires soon!');
            }, 2000);
        }
    });
    
    // Show urgency based on page visibility
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            // User switched tabs - high exit intent
            setTimeout(() => {
                if (!document.hidden) {
                    showUrgencyNotification('💰 Welcome back! Secure your spot now!');
                }
            }, 1000);
        }
    });
}

// Initialize aggressive remarketing
startAggressiveRemarketing();

// Add productivity killer mode
function addProductivityKiller() {
    // Subtle background sounds (if enabled)
    const urgencySounds = {
        tick: () => console.log('⏰ Tick...'),
        alert: () => console.log('🚨 Alert!'),
        success: () => console.log('💰 Cha-ching!')
    };
    
    // Countdown sound effects
    setInterval(() => {
        const timeLeft = parseInt(document.getElementById('hours').textContent) * 3600 +
                        parseInt(document.getElementById('minutes').textContent) * 60 +
                        parseInt(document.getElementById('seconds').textContent);
        
        if (timeLeft < 3600) { // Last hour
            urgencySounds.tick();
        }
    }, 10000);
}

// Initialize productivity killer
addProductivityKiller();

// Add competitor stalking mode
function addCompetitorStalking() {
    const competitors = [
        'AutoPro Solutions',
        'Repair Genius',
        'QuickFix Pro',
        'MechanicMaster',
        'CarCare Elite'
    ];
    
    function showCompetitorAlert() {
        const competitor = competitors[Math.floor(Math.random() * competitors.length)];
        showUrgencyNotification(`⚠️ ${competitor} just signed up in your area!`);
    }
    
    // Show competitor alerts randomly
    setInterval(showCompetitorAlert, Math.random() * 180000 + 120000); // 2-5 minutes
}

// Initialize competitor stalking
addCompetitorStalking();

console.log('🔥 GAME CHANGER LOADED - Conversion engine active!');
console.log('💰 Target: 100% conversion rate');
console.log('🎯 Mission: Make them buy NOW');
console.log('⚡ Status: AGGRESSIVE MODE ACTIVATED');