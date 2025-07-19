// GAME CHANGER SCRIPT - THE MOST EXPLOSIVE JavaScript EVER!
// Using your Google API: AIzaSyD-0Jyl1r9q8lzkEBVW-sR5dAD6VCDdAoY

const GOOGLE_AI_API_KEY = 'AIzaSyD-0Jyl1r9q8lzkEBVW-sR5dAD6VCDdAoY';
const GOOGLE_AI_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

// Global state
let countdownTimer;
let moneyCounter = 47829;
let callsToday = 1847;
let revenueToday = 427392;

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    startCountdown();
    startMoneyCounter();
    startLiveStats();
    startLiveNotifications();
    initializeGameChanger();
});

// Start countdown timer
function startCountdown() {
    let hours = 23;
    let minutes = 47;
    let seconds = 32;
    
    countdownTimer = setInterval(() => {
        seconds--;
        
        if (seconds < 0) {
            seconds = 59;
            minutes--;
        }
        
        if (minutes < 0) {
            minutes = 59;
            hours--;
        }
        
        if (hours < 0) {
            // Reset timer to create urgency
            hours = 23;
            minutes = 47;
            seconds = 32;
        }
        
        // Update display
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        
        if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
        if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
        if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
    }, 1000);
}

// Start money counter
function startMoneyCounter() {
    setInterval(() => {
        // Increase money by random amount every second
        const increase = Math.floor(Math.random() * 50) + 10;
        moneyCounter += increase;
        
        const counterElement = document.getElementById('money-counter');
        if (counterElement) {
            counterElement.textContent = moneyCounter.toLocaleString();
        }
    }, 1000);
}

// Start live stats counter
function startLiveStats() {
    setInterval(() => {
        // Increase calls and revenue
        if (Math.random() > 0.7) {
            callsToday += 1;
            const callsElement = document.getElementById('calls-today');
            if (callsElement) {
                callsElement.textContent = callsToday.toLocaleString();
            }
        }
        
        if (Math.random() > 0.5) {
            const revenueIncrease = Math.floor(Math.random() * 500) + 100;
            revenueToday += revenueIncrease;
            const revenueElement = document.getElementById('money-today');
            if (revenueElement) {
                revenueElement.textContent = '$' + revenueToday.toLocaleString();
            }
        }
    }, 3000);
}

// Start live notifications
function startLiveNotifications() {
    const notifications = [
        "🔥 John from Florida just hired Sarah - made $3,847 today!",
        "💰 Lisa from Texas earned $12,938 this week with Sarah!",
        "⚡ Mike from California got 47 new customers today!",
        "🚀 Sarah just booked $8,500 renovation job in Chicago!",
        "💎 Dave from New York made $15,692 this month!",
        "🔥 Emergency call converted to $850 job in Miami!",
        "💰 Sarah upsold $425 repair to $1,200 renovation!",
        "⚡ 3 new plumbers just hired Sarah in the last hour!"
    ];
    
    let currentIndex = 0;
    
    setInterval(() => {
        const notificationElement = document.querySelector('.notification');
        if (notificationElement) {
            // Fade out
            notificationElement.style.opacity = '0';
            
            setTimeout(() => {
                // Change text
                notificationElement.innerHTML = `<i class="fas fa-dollar-sign"></i><span>${notifications[currentIndex]}</span>`;
                currentIndex = (currentIndex + 1) % notifications.length;
                
                // Fade in
                notificationElement.style.opacity = '1';
            }, 500);
        }
    }, 4000);
}

// Initialize Game Changer functionality
function initializeGameChanger() {
    console.log('🚀 GAME CHANGER INITIALIZED - READY TO MAKE PLUMBERS RICH!');
}

// Open Game Changer Demo Modal
function openGameChangerDemo() {
    const modal = document.getElementById('game-changer-modal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

// Close Game Changer Demo Modal
function closeGameChangerDemo() {
    const modal = document.getElementById('game-changer-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Try scenario
function tryScenario(scenario) {
    const scenarios = {
        emergency: {
            customer: "Help! I have a burst pipe and water is everywhere!",
            sarah: "Oh my goodness! Don't panic - I'm getting someone to you RIGHT NOW! Can you turn off your main water valve? Our emergency team will be there in 15 minutes. What's your address?"
        },
        quote: {
            customer: "How much would it cost for a complete bathroom renovation?",
            sarah: "Great question! For a full bathroom renovation, we typically charge between $8,500-$15,000 depending on fixtures and finishes. I can schedule our designer to come give you an exact quote this week - would Tuesday or Wednesday work better?"
        },
        appointment: {
            customer: "I need to schedule someone to fix my kitchen sink",
            sarah: "Absolutely! I can get that scheduled for you today. Kitchen sink repairs are usually $125-$275 depending on the issue. I have openings at 10 AM, 1 PM, or 3 PM today. What works best for you?"
        },
        late: {
            customer: "It's 2 AM and I have a plumbing emergency. Do you take calls this late?",
            sarah: "Of course! We're available 24/7 for emergencies. That's exactly why people love working with us - no matter what time it is, you get a real person who can help immediately. What's your emergency?"
        }
    };
    
    const selectedScenario = scenarios[scenario];
    if (selectedScenario) {
        showScenarioDemo(selectedScenario);
    }
}

// Show scenario demo
function showScenarioDemo(scenario) {
    // Close modal temporarily
    closeGameChangerDemo();
    
    // Create full-screen demo
    const demoOverlay = document.createElement('div');
    demoOverlay.className = 'scenario-demo-overlay';
    demoOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #1a1a1a, #2d1b69);
        z-index: 2000;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-family: Inter, sans-serif;
    `;
    
    demoOverlay.innerHTML = `
        <div style="max-width: 800px; padding: 2rem; text-align: center;">
            <h2 style="font-size: 2.5rem; margin-bottom: 2rem; background: linear-gradient(45deg, #00e676, #4caf50); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">🔥 WATCH SARAH IN ACTION!</h2>
            
            <div style="background: rgba(255,255,255,0.1); padding: 2rem; border-radius: 20px; margin-bottom: 2rem; backdrop-filter: blur(10px);">
                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                    <div style="width: 60px; height: 60px; background: #ff1744; border-radius: 50%; display: flex; align-items: center; justify-content: center;">👤</div>
                    <div style="text-align: left;">
                        <h4 style="color: #ff1744; margin-bottom: 0.5rem;">Customer</h4>
                        <p style="font-size: 1.125rem;">"${scenario.customer}"</p>
                    </div>
                </div>
            </div>
            
            <div style="background: linear-gradient(45deg, #00e676, #4caf50); padding: 2rem; border-radius: 20px; margin-bottom: 2rem; color: #000;">
                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                    <div style="width: 60px; height: 60px; background: rgba(0,0,0,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center;">👩‍💼</div>
                    <div style="text-align: left;">
                        <h4 style="margin-bottom: 0.5rem;">Sarah</h4>
                        <p style="font-size: 1.125rem; line-height: 1.6;">"${scenario.sarah}"</p>
                    </div>
                </div>
            </div>
            
            <div style="display: flex; gap: 1rem; justify-content: center; margin-bottom: 2rem;">
                <div style="background: rgba(255,215,0,0.2); border: 2px solid #ffd700; padding: 1rem; border-radius: 15px;">
                    <div style="font-size: 1.5rem; font-weight: 900; color: #00e676;">+$425</div>
                    <div style="font-size: 0.875rem; color: #ffd700;">Job Value</div>
                </div>
                <div style="background: rgba(255,215,0,0.2); border: 2px solid #ffd700; padding: 1rem; border-radius: 15px;">
                    <div style="font-size: 1.5rem; font-weight: 900; color: #00e676;">2.3 sec</div>
                    <div style="font-size: 0.875rem; color: #ffd700;">Response Time</div>
                </div>
                <div style="background: rgba(255,215,0,0.2); border: 2px solid #ffd700; padding: 1rem; border-radius: 15px;">
                    <div style="font-size: 1.5rem; font-weight: 900; color: #00e676;">100%</div>
                    <div style="font-size: 0.875rem; color: #ffd700;">Customer Happy</div>
                </div>
            </div>
            
            <button onclick="closeDemoOverlay()" style="background: linear-gradient(45deg, #ff1744, #ff6600); color: white; border: none; padding: 1.5rem 3rem; border-radius: 15px; font-size: 1.25rem; font-weight: 700; cursor: pointer; text-transform: uppercase;">GET SARAH NOW - $197/MONTH!</button>
        </div>
    `;
    
    document.body.appendChild(demoOverlay);
    document.body.style.overflow = 'hidden';
    
    // Auto close after 10 seconds
    setTimeout(() => {
        closeDemoOverlay();
    }, 10000);
}

// Close demo overlay
function closeDemoOverlay() {
    const overlay = document.querySelector('.scenario-demo-overlay');
    if (overlay) {
        overlay.remove();
        document.body.style.overflow = 'auto';
    }
}

// Call Sarah Now
function callSarahNow() {
    openGameChangerDemo();
}

// Get Started Now
function getStartedNow() {
    startNow();
}

// Start Now
function startNow() {
    // Create explosive signup experience
    const signupOverlay = document.createElement('div');
    signupOverlay.className = 'signup-overlay';
    signupOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #1a1a1a, #2d1b69);
        z-index: 3000;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-family: Inter, sans-serif;
    `;
    
    signupOverlay.innerHTML = `
        <div style="max-width: 600px; padding: 3rem; text-align: center; background: rgba(255,255,255,0.1); border-radius: 20px; backdrop-filter: blur(20px); border: 2px solid #ffd700;">
            <h2 style="font-size: 3rem; margin-bottom: 2rem; background: linear-gradient(45deg, #00e676, #ffd700); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">🚀 CONGRATULATIONS!</h2>
            
            <div style="margin-bottom: 2rem;">
                <div style="font-size: 1.5rem; margin-bottom: 1rem; color: #00e676;">✅ Sarah is ready to start making you money!</div>
                <div style="font-size: 1.25rem; margin-bottom: 1rem;">✅ Setup takes less than 5 minutes</div>
                <div style="font-size: 1.25rem; margin-bottom: 1rem;">✅ Start getting calls immediately</div>
                <div style="font-size: 1.25rem; margin-bottom: 2rem;">✅ 30-day money-back guarantee</div>
            </div>
            
            <div style="background: linear-gradient(45deg, #ff1744, #ff6600); padding: 2rem; border-radius: 15px; margin-bottom: 2rem;">
                <h3 style="font-size: 2rem; margin-bottom: 1rem;">🔥 SPECIAL LAUNCH PRICE</h3>
                <div style="font-size: 3rem; font-weight: 900; margin-bottom: 0.5rem;">$197/month</div>
                <div style="font-size: 1.125rem; opacity: 0.9;">Regular price $397 - Save $200/month!</div>
            </div>
            
            <button onclick="proceedToPayment()" style="background: linear-gradient(45deg, #00e676, #4caf50); color: #000; border: none; padding: 2rem 3rem; border-radius: 15px; font-size: 1.5rem; font-weight: 900; cursor: pointer; text-transform: uppercase; width: 100%; margin-bottom: 1rem;">HIRE SARAH NOW - $197/MONTH</button>
            
            <button onclick="closeSignupOverlay()" style="background: none; border: 2px solid #666; color: #666; padding: 1rem; border-radius: 10px; cursor: pointer; width: 100%;">Maybe Later</button>
        </div>
    `;
    
    document.body.appendChild(signupOverlay);
    document.body.style.overflow = 'hidden';
}

// Proceed to payment
function proceedToPayment() {
    // In real implementation, this would redirect to Stripe or payment processor
    alert('🎉 AWESOME! You\'re about to hire the best employee ever!\n\nRedirecting to secure payment...\n\n✅ Sarah will be answering your calls within 5 minutes\n✅ 30-day money-back guarantee\n✅ Cancel anytime');
    
    // For demo purposes, just close overlay
    closeSignupOverlay();
}

// Close signup overlay
function closeSignupOverlay() {
    const overlay = document.querySelector('.signup-overlay');
    if (overlay) {
        overlay.remove();
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('game-changer-modal');
    if (event.target === modal) {
        closeGameChangerDemo();
    }
}

// Make functions globally available
window.openGameChangerDemo = openGameChangerDemo;
window.closeGameChangerDemo = closeGameChangerDemo;
window.tryScenario = tryScenario;
window.callSarahNow = callSarahNow;
window.getStartedNow = getStartedNow;
window.startNow = startNow;
window.closeDemoOverlay = closeDemoOverlay;
window.proceedToPayment = proceedToPayment;
window.closeSignupOverlay = closeSignupOverlay;

console.log('🚀💰 GAME CHANGER READY TO MAKE PLUMBERS RICH! 💰🚀');