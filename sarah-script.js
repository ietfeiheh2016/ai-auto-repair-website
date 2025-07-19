// Sarah AI Script - Clean and Simple
const GOOGLE_AI_API_KEY = 'AIzaSyD-0Jyl1r9q8lzkEBVW-sR5dAD6VCDdAoY';
const GOOGLE_AI_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
});

function initializePage() {
    console.log('Sarah AI initialized');
    
    // Add enter key support for chat inputs
    const demoInput = document.getElementById('message-input');
    if (demoInput) {
        demoInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    const modalInput = document.getElementById('modal-message-input');
    if (modalInput) {
        modalInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendModalMessage();
            }
        });
    }
}

// Open demo modal
function openDemo() {
    const modal = document.getElementById('demo-modal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Focus on input
        setTimeout(() => {
            const input = document.getElementById('modal-message-input');
            if (input) input.focus();
        }, 100);
    }
}

// Close demo modal
function closeDemo() {
    const modal = document.getElementById('demo-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Send message in main demo
function sendMessage(customMessage) {
    const input = document.getElementById('message-input');
    const message = customMessage || (input ? input.value.trim() : '');
    
    if (!message) return;
    
    // Clear input
    if (input && !customMessage) {
        input.value = '';
    }
    
    // Add user message to chat
    addMessageToChat('chat-messages', 'user', message);
    
    // Generate Sarah's response
    getSarahResponse(message).then(response => {
        // Add Sarah's response after a short delay
        setTimeout(() => {
            addMessageToChat('chat-messages', 'ai', response);
        }, 500);
    });
}

// Send message in modal demo
function sendModalMessage(customMessage) {
    const input = document.getElementById('modal-message-input');
    const message = customMessage || (input ? input.value.trim() : '');
    
    if (!message) return;
    
    // Clear input
    if (input && !customMessage) {
        input.value = '';
    }
    
    // Add user message to chat
    addMessageToChat('modal-chat-messages', 'user', message);
    
    // Generate Sarah's response
    getSarahResponse(message).then(response => {
        // Add Sarah's response after a short delay
        setTimeout(() => {
            addMessageToChat('modal-chat-messages', 'ai', response);
        }, 500);
    });
}

// Add message to chat
function addMessageToChat(containerId, sender, text) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    if (sender === 'ai') {
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face" alt="Sarah">
            </div>
            <div class="message-content">
                <p>${text}</p>
                <span class="message-time">${currentTime}</span>
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${text}</p>
                <span class="message-time">${currentTime}</span>
            </div>
            <div class="message-avatar">
                <div style="width: 40px; height: 40px; background: #2563eb; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600;">You</div>
            </div>
        `;
        messageDiv.style.flexDirection = 'row-reverse';
    }
    
    container.appendChild(messageDiv);
    container.scrollTop = container.scrollHeight;
}

// Get Sarah's AI response
async function getSarahResponse(userMessage) {
    const prompt = `You are Sarah, a professional and friendly virtual receptionist for a plumbing company called ProPlumb Solutions. A customer just said: "${userMessage}"

Respond naturally and helpfully as Sarah would. Keep responses conversational and under 80 words. Always be polite and professional.

For pricing, use these rates:
- Emergency calls: $150 base + parts
- Drain cleaning: $125-200  
- Water heater repair: $200-400
- Toilet installation: $300-500
- Bathroom renovation: $8,500-15,000
- Regular service calls: $95-175

If it's an emergency, express urgency and offer to schedule immediately. If they need a quote, provide pricing and offer to schedule an estimate. Always try to be helpful and book appointments when appropriate.`;

    try {
        const response = await fetch(`${GOOGLE_AI_ENDPOINT}?key=${GOOGLE_AI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }]
            })
        });

        if (!response.ok) {
            throw new Error('API request failed');
        }

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error('Error getting AI response:', error);
        return "I'm sorry, I'm having a bit of trouble right now. For immediate assistance, please call us directly at (555) 123-PLUMB. I'll be back up and running shortly to help you!";
    }
}

// Plan selection
function selectPlan(planName) {
    // In a real application, this would redirect to a signup form
    alert(`Great choice! You've selected the ${planName.charAt(0).toUpperCase() + planName.slice(1)} plan.\n\nYou'll be redirected to our secure signup form to start your free trial.`);
    
    // For demo purposes, show that it would work
    console.log(`User selected plan: ${planName}`);
}

// Smooth scroll function
function scrollTo(target) {
    document.querySelector(target).scrollIntoView({
        behavior: 'smooth'
    });
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('demo-modal');
    if (event.target === modal) {
        closeDemo();
    }
}

// Make functions globally available
window.openDemo = openDemo;
window.closeDemo = closeDemo;
window.sendMessage = sendMessage;
window.sendModalMessage = sendModalMessage;
window.selectPlan = selectPlan;
window.scrollTo = scrollTo;

console.log('✅ Sarah AI is ready to help customers!');