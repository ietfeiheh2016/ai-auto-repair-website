// Shiny AI Converter - The Most Amazing AI Chat Experience
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all magical AI features
    initializeFloatingAI();
    initializeAIChat();
    initializeShowcaseTabs();
    initializeAIFeatures();
    initializeVoiceFeatures();
    initializeAnimations();
    initializeAIPersonality();
    startAIStats();
    
    console.log('🤖✨ Shiny AI Converter loaded - prepare to be amazed!');
});

// AI Personality and Advanced Responses
let aiPersonality = {
    name: "Alex",
    traits: ["helpful", "friendly", "knowledgeable", "enthusiastic"],
    memory: {},
    currentConversation: [],
    learningData: {
        customerPreferences: {},
        commonQuestions: {},
        bookingPatterns: {}
    }
};

// Advanced AI Response System
const aiResponses = {
    greetings: [
        "Hi there! I'm Alex, your AI assistant. I'm excited to help you with your auto repair needs! 🚗",
        "Welcome! I'm Alex, and I love helping customers find the perfect auto services. What can I do for you today?",
        "Hello! I'm your friendly AI assistant Alex. I'm here 24/7 to make your auto repair experience amazing!"
    ],
    
    services: {
        "oil change": {
            price: "$39.99",
            duration: "30-45 minutes",
            description: "Full synthetic oil change with filter replacement and multi-point inspection",
            upsells: ["tire rotation", "brake inspection"],
            response: "Our oil change service is $39.99 and includes up to 5 quarts of premium oil, new filter, and a complimentary 21-point inspection. It typically takes 30-45 minutes. Would you like me to check our availability?"
        },
        "brake": {
            price: "Starting at $129.99",
            duration: "2-4 hours",
            description: "Complete brake system inspection and repair",
            upsells: ["brake fluid flush", "rotor resurfacing"],
            response: "Brake service is crucial for safety! Our brake inspection is FREE, and repairs start at $129.99. We check pads, rotors, fluid, and the entire system. I can schedule you for a free inspection - what works best for your schedule?"
        },
        "diagnostic": {
            price: "$89.99",
            duration: "1-2 hours", 
            description: "Computer diagnostic with detailed report",
            upsells: ["repair estimate", "maintenance plan"],
            response: "Our advanced diagnostic service is $89.99 and includes a comprehensive computer scan plus a detailed report of any issues found. Most diagnostics take 1-2 hours. If we find the problem, the diagnostic fee applies toward repairs!"
        },
        "tire": {
            price: "From $24.99",
            duration: "30-60 minutes",
            description: "Tire rotation, balancing, and installation services",
            upsells: ["wheel alignment", "tire protection plan"],
            response: "Tire services start at just $24.99 for rotation! We also do balancing, new tire installation, and alignment. Regular tire maintenance can extend tire life by up to 30%. What type of tire service do you need?"
        }
    },
    
    booking: {
        availability: "I can check our real-time availability for you! We typically have openings Monday through Friday 8AM-6PM and Saturday 8AM-4PM.",
        confirmation: "Perfect! I'll get that appointment scheduled for you right away. You'll receive a confirmation text and email with all the details.",
        modification: "No problem! I can easily reschedule or modify your appointment. What time would work better for you?"
    },
    
    personality_responses: [
        "I love helping customers save money on auto repairs! 💰",
        "That's a great question! I'm always learning new things about cars. 🧠",
        "Safety first! I always recommend addressing brake and tire issues promptly. 🛡️",
        "Fun fact: Regular maintenance can prevent 80% of major car problems! 📊",
        "I remember you mentioning you drive a Honda - they're fantastic cars! 🚗"
    ]
};

// Initialize Floating AI
function initializeFloatingAI() {
    const floatingAI = document.getElementById('floating-ai');
    
    if (floatingAI) {
        floatingAI.addEventListener('click', function() {
            // Animate to main chat
            this.style.transform = 'scale(0) rotate(360deg)';
            this.style.opacity = '0';
            
            setTimeout(() => {
                scrollToMainChat();
                this.style.transform = 'scale(1) rotate(0deg)';
                this.style.opacity = '1';
            }, 500);
        });
        
        // Random personality animations
        setInterval(() => {
            if (Math.random() > 0.7) {
                floatingAI.style.animation = 'floatBounce 1s ease-in-out';
                setTimeout(() => {
                    floatingAI.style.animation = 'floatBounce 3s ease-in-out infinite';
                }, 1000);
            }
        }, 5000);
    }
}

// Advanced AI Chat System
function initializeAIChat() {
    const chatInput = document.getElementById('ai-chat-input');
    const messagesContainer = document.getElementById('ai-chat-messages');
    
    // Advanced input handling
    window.handleAIInput = function(event) {
        if (event.key === 'Enter') {
            sendAIMessage();
        } else {
            // Show typing indicator to AI
            showAITypingAwareness();
        }
    };
    
    window.sendAIMessage = function() {
        const input = document.getElementById('ai-chat-input');
        const message = input.value.trim();
        
        if (message) {
            addAIMessage('user', message);
            input.value = '';
            
            // Show AI thinking
            showAIThinking();
            
            // Process with AI intelligence
            setTimeout(() => {
                const response = processAIMessage(message);
                hideAIThinking();
                addAIMessage('ai', response.text, response.type);
                
                // Update AI learning
                updateAILearning(message, response);
                
                // Update stats
                updateAIStats();
            }, getAIThinkingTime(message));
        }
    };
    
    window.sendQuickMessage = function(message) {
        document.getElementById('ai-chat-input').value = message;
        sendAIMessage();
    };
    
    // Auto-suggestions based on typing
    if (chatInput) {
        chatInput.addEventListener('input', function() {
            updateQuickSuggestions(this.value);
        });
    }
    
    // Initialize with personality message
    setTimeout(() => {
        const welcomeMessage = aiResponses.greetings[Math.floor(Math.random() * aiResponses.greetings.length)];
        addAIMessage('ai', welcomeMessage, 'greeting');
    }, 1000);
}

// Advanced AI Message Processing
function processAIMessage(userMessage) {
    const message = userMessage.toLowerCase();
    aiPersonality.currentConversation.push({
        user: userMessage,
        timestamp: Date.now()
    });
    
    // Intent recognition
    let intent = detectIntent(message);
    let response = generateIntelligentResponse(message, intent);
    
    return {
        text: response,
        type: intent,
        confidence: calculateConfidence(message, intent)
    };
}

function detectIntent(message) {
    // Service requests
    if (message.includes('oil change') || message.includes('oil')) return 'oil_change';
    if (message.includes('brake') || message.includes('brakes')) return 'brake_service';
    if (message.includes('tire') || message.includes('tires')) return 'tire_service';
    if (message.includes('diagnostic') || message.includes('check engine')) return 'diagnostic';
    
    // Booking intents
    if (message.includes('book') || message.includes('appointment') || message.includes('schedule')) return 'booking';
    if (message.includes('available') || message.includes('when') || message.includes('time')) return 'availability';
    
    // Information requests
    if (message.includes('price') || message.includes('cost') || message.includes('how much')) return 'pricing';
    if (message.includes('hours') || message.includes('open') || message.includes('closed')) return 'hours';
    if (message.includes('location') || message.includes('address') || message.includes('where')) return 'location';
    
    // Emotional/personality
    if (message.includes('thank') || message.includes('awesome') || message.includes('great')) return 'appreciation';
    if (message.includes('help') || message.includes('question')) return 'general_help';
    
    return 'general';
}

function generateIntelligentResponse(message, intent) {
    let response = '';
    
    switch(intent) {
        case 'oil_change':
            response = aiResponses.services['oil change'].response;
            if (Math.random() > 0.5) {
                response += ` \n\n💡 Pro tip: We also offer tire rotation for just $24.99 when combined with an oil change!`;
            }
            break;
            
        case 'brake_service':
            response = aiResponses.services.brake.response;
            response += `\n\n🛡️ Safety first! I always recommend addressing brake concerns immediately.`;
            break;
            
        case 'tire_service':
            response = aiResponses.services.tire.response;
            break;
            
        case 'diagnostic':
            response = aiResponses.services.diagnostic.response;
            break;
            
        case 'booking':
            response = `I'd love to help you book an appointment! ${aiResponses.booking.availability}\n\n📅 What service do you need and what day works best for you?`;
            break;
            
        case 'pricing':
            response = `Here's our current pricing:\n\n🔧 Oil Change: $39.99\n🛞 Tire Rotation: $24.99\n🚗 Brake Inspection: FREE\n🔍 Diagnostic: $89.99\n\nWhat specific service are you interested in? I can give you more details!`;
            break;
            
        case 'hours':
            response = `We're open:\n\n📅 Monday - Friday: 8:00 AM - 6:00 PM\n📅 Saturday: 8:00 AM - 4:00 PM\n📅 Sunday: Closed\n\n⚡ Emergency services available by appointment!`;
            break;
            
        case 'appreciation':
            response = `Aww, thank you! 😊 I absolutely love helping customers like you. Is there anything else I can help you with today?`;
            break;
            
        default:
            response = generatePersonalityResponse(message);
    }
    
    // Add personality touch
    if (Math.random() > 0.7) {
        response += '\n\n' + aiResponses.personality_responses[Math.floor(Math.random() * aiResponses.personality_responses.length)];
    }
    
    return response;
}

function generatePersonalityResponse(message) {
    const responses = [
        `That's a great question! I'm always here to help with any auto repair needs. What specific information are you looking for?`,
        `I love talking about cars! 🚗 Could you tell me more about what you're looking for?`,
        `Absolutely! I'm here to make your auto repair experience as smooth as possible. What can I help you with?`,
        `I'm your friendly AI assistant, and I'm excited to help! What auto services are you interested in?`,
        `Perfect timing! I'm here 24/7 to answer all your auto repair questions. What's on your mind?`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
}

function addAIMessage(sender, text, type = 'general') {
    const messagesContainer = document.getElementById('ai-chat-messages');
    if (!messagesContainer) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `ai-message ${sender}-message`;
    
    const timestamp = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    if (sender === 'ai') {
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <div class="avatar-mini">
                    <div class="mini-glow"></div>
                </div>
            </div>
            <div class="message-content">
                <div class="message-bubble ai-bubble">
                    <div class="message-text">${formatAIMessage(text)}</div>
                    ${type === 'booking' ? createBookingButtons() : ''}
                    ${type.includes('service') ? createServiceButtons() : ''}
                </div>
                <div class="message-time">${timestamp}</div>
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="message-content user-content">
                <div class="message-bubble user-bubble">
                    <div class="message-text">${text}</div>
                </div>
                <div class="message-time">${timestamp}</div>
            </div>
            <div class="message-avatar user-avatar">
                <div class="user-avatar-mini">
                    <i class="fas fa-user"></i>
                </div>
            </div>
        `;
    }
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Animate in
    messageDiv.style.opacity = '0';
    messageDiv.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        messageDiv.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        messageDiv.style.opacity = '1';
        messageDiv.style.transform = 'translateY(0)';
    }, 100);
    
    // Add sparkle effect for AI messages
    if (sender === 'ai') {
        createSparkleEffect(messageDiv);
    }
}

function formatAIMessage(text) {
    // Convert line breaks to HTML
    text = text.replace(/\n/g, '<br>');
    
    // Style pricing
    text = text.replace(/\$[\d,]+\.?\d*/g, '<span class="price-highlight">$&</span>');
    
    // Style emojis bigger
    text = text.replace(/([\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}])/gu, '<span class="emoji-large">$1</span>');
    
    return text;
}

function createSparkleEffect(element) {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.innerHTML = '✨';
            sparkle.style.cssText = `
                position: absolute;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                font-size: 12px;
                pointer-events: none;
                animation: sparkleFloat 2s ease-out forwards;
                z-index: 10;
            `;
            
            element.style.position = 'relative';
            element.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 2000);
        }, i * 200);
    }
}

// AI Thinking and Awareness
function showAIThinking() {
    const typingIndicator = document.getElementById('ai-typing');
    if (typingIndicator) {
        typingIndicator.style.display = 'flex';
        
        // Animate thinking text
        const thinkingText = typingIndicator.querySelector('span');
        const phrases = [
            'AI is thinking',
            'Processing your request',
            'Analyzing options',
            'Preparing response',
            'Almost ready'
        ];
        
        let phraseIndex = 0;
        const thinkingInterval = setInterval(() => {
            thinkingText.textContent = phrases[phraseIndex];
            phraseIndex = (phraseIndex + 1) % phrases.length;
        }, 800);
        
        typingIndicator.dataset.interval = thinkingInterval;
    }
}

function hideAIThinking() {
    const typingIndicator = document.getElementById('ai-typing');
    if (typingIndicator) {
        const interval = typingIndicator.dataset.interval;
        if (interval) clearInterval(interval);
        
        typingIndicator.style.display = 'none';
    }
}

function getAIThinkingTime(message) {
    // Simulate realistic thinking time based on complexity
    const baseTime = 1000;
    const complexity = Math.min(message.length / 10, 5);
    return baseTime + (complexity * 300) + (Math.random() * 500);
}

function showAITypingAwareness() {
    // Show subtle indication that AI is aware user is typing
    const avatar = document.querySelector('.ai-avatar-header .avatar-image');
    if (avatar && Math.random() > 0.8) {
        avatar.style.animation = 'attentionBlink 0.5s ease-in-out';
        setTimeout(() => {
            avatar.style.animation = '';
        }, 500);
    }
}

// Voice Features
function initializeVoiceFeatures() {
    window.startVoiceInput = function() {
        const voiceBtn = document.getElementById('voice-btn');
        
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'en-US';
            
            recognition.onstart = function() {
                voiceBtn.classList.add('recording');
                voiceBtn.innerHTML = '<i class="fas fa-stop"></i><div class="voice-animation active"></div>';
                addAIMessage('ai', '🎤 I\'m listening... speak now!', 'system');
            };
            
            recognition.onresult = function(event) {
                const transcript = event.results[0][0].transcript;
                document.getElementById('ai-chat-input').value = transcript;
                addAIMessage('ai', `I heard: "${transcript}" - let me help you with that!`, 'system');
                setTimeout(() => sendAIMessage(), 500);
            };
            
            recognition.onerror = function(event) {
                addAIMessage('ai', 'Sorry, I didn\'t catch that. Could you type your message instead?', 'system');
            };
            
            recognition.onend = function() {
                voiceBtn.classList.remove('recording');
                voiceBtn.innerHTML = '<i class="fas fa-microphone"></i><div class="voice-animation"></div>';
            };
            
            recognition.start();
        } else {
            addAIMessage('ai', 'Voice input not supported on this browser, but I love your typing! 😊', 'system');
        }
    };
    
    window.toggleVoice = function() {
        addAIMessage('ai', '🎤 Voice recognition is ready! Click the microphone button next to the input to speak.', 'system');
    };
    
    window.toggleSpeaker = function() {
        const text = "Hi! I'm your AI assistant. I can speak your responses out loud for better accessibility!";
        
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.9;
            utterance.pitch = 1.1;
            utterance.volume = 0.8;
            
            // Try to get a female voice
            const voices = speechSynthesis.getVoices();
            const femaleVoice = voices.find(voice => voice.name.includes('Female') || voice.name.includes('Samantha') || voice.name.includes('Victoria'));
            if (femaleVoice) utterance.voice = femaleVoice;
            
            speechSynthesis.speak(utterance);
            addAIMessage('ai', '🔊 Text-to-speech is working! I can read my responses aloud.', 'system');
        } else {
            addAIMessage('ai', 'Text-to-speech not supported, but I love chatting with you anyway! 😊', 'system');
        }
    };
}

// AI Stats and Analytics
function startAIStats() {
    let messageCount = 127;
    let bookingCount = 23;
    let leadCount = 18;
    
    // Update stats every few seconds
    setInterval(() => {
        if (Math.random() > 0.7) {
            messageCount += Math.floor(Math.random() * 3);
            document.getElementById('messages-count').textContent = messageCount;
            animateStatNumber('messages-count');
        }
        
        if (Math.random() > 0.8) {
            bookingCount += 1;
            document.getElementById('bookings-count').textContent = bookingCount;
            animateStatNumber('bookings-count');
        }
        
        if (Math.random() > 0.9) {
            leadCount += 1;
            document.getElementById('leads-count').textContent = leadCount;
            animateStatNumber('leads-count');
        }
    }, 3000);
}

function animateStatNumber(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.animation = 'numberPulse 0.5s ease-in-out';
        setTimeout(() => {
            element.style.animation = '';
        }, 500);
    }
}

function updateAIStats() {
    // Update live stats when user interacts
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        if (Math.random() > 0.6) {
            stat.style.animation = 'statGlow 1s ease-in-out';
            setTimeout(() => {
                stat.style.animation = '';
            }, 1000);
        }
    });
}

// Showcase Tabs
function initializeShowcaseTabs() {
    window.showShowcase = function(type) {
        // Update tabs
        document.querySelectorAll('.showcase-tab').forEach(tab => tab.classList.remove('active'));
        document.querySelector(`[onclick="showShowcase('${type}')"]`).classList.add('active');
        
        // Update panels
        document.querySelectorAll('.showcase-panel').forEach(panel => panel.classList.remove('active'));
        document.getElementById(`${type}-showcase`).classList.add('active');
        
        // Special animations for each type
        setTimeout(() => {
            switch(type) {
                case 'conversation':
                    animateConversation();
                    break;
                case 'learning':
                    animateLearning();
                    break;
                case 'analytics':
                    animateAnalytics();
                    break;
            }
        }, 300);
    };
}

// Demo Functions
window.startAIDemo = function() {
    scrollToMainChat();
    setTimeout(() => {
        addAIMessage('ai', '🎉 Welcome to the live demo! Ask me anything about auto repair services, pricing, or booking appointments. I\'m here to show you how amazing AI customer service can be!', 'demo');
    }, 1000);
};

window.playConversation = function() {
    const playBtn = document.querySelector('.play-btn');
    const pauseBtn = document.querySelector('.pause-btn');
    
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'inline-flex';
    
    simulateConversation();
};

window.pauseConversation = function() {
    const playBtn = document.querySelector('.play-btn');
    const pauseBtn = document.querySelector('.pause-btn');
    
    playBtn.style.display = 'inline-flex';
    pauseBtn.style.display = 'none';
};

function simulateConversation() {
    const messages = [
        { sender: 'customer', text: 'Hi, I need an oil change for my car' },
        { sender: 'ai', text: 'Hi there! I\'d be happy to help you with an oil change. What type of vehicle do you have?' },
        { sender: 'customer', text: '2019 Honda Civic' },
        { sender: 'ai', text: 'Perfect! For your 2019 Civic, I recommend our full synthetic oil change at $39.99. When would you like to schedule this?' },
        { sender: 'customer', text: 'Tomorrow morning if possible' },
        { sender: 'ai', text: 'Great choice! I have 9:00 AM or 10:30 AM available tomorrow. Which works better for you?' },
        { sender: 'customer', text: '10:30 AM sounds perfect' },
        { sender: 'ai', text: '✅ Excellent! I\'ve booked your oil change for tomorrow at 10:30 AM. You\'ll receive a confirmation text shortly. Anything else I can help with?' }
    ];
    
    const container = document.getElementById('conversation-messages');
    container.innerHTML = '';
    
    messages.forEach((msg, index) => {
        setTimeout(() => {
            const msgDiv = document.createElement('div');
            msgDiv.className = `conversation-msg ${msg.sender}`;
            msgDiv.innerHTML = `
                <div class="msg-bubble">
                    <strong>${msg.sender === 'ai' ? '🤖 AI Assistant' : '👤 Customer'}:</strong>
                    <p>${msg.text}</p>
                </div>
            `;
            container.appendChild(msgDiv);
            container.scrollTop = container.scrollHeight;
            
            // Update progress bar
            const progress = ((index + 1) / messages.length) * 100;
            document.querySelector('.progress-bar').style.width = `${progress}%`;
            
        }, index * 2000);
    });
    
    // Auto-pause at end
    setTimeout(() => {
        pauseConversation();
    }, messages.length * 2000);
}

// Feature Demos
window.demoVoiceRecognition = function() {
    showDemoModal('Voice Recognition Demo', `
        <div class="voice-demo-content">
            <div class="demo-microphone">
                <i class="fas fa-microphone"></i>
                <div class="voice-waves">
                    <div class="wave"></div>
                    <div class="wave"></div>
                    <div class="wave"></div>
                </div>
            </div>
            <p>🎤 "I need an oil change for my Toyota Camry"</p>
            <div class="processing-text">
                <span>Processing speech...</span>
                <div class="dots"><span>.</span><span>.</span><span>.</span></div>
            </div>
            <div class="result-text">
                ✅ Recognized: "I need an oil change for my Toyota Camry"<br>
                🤖 AI Response: "I can help you with that oil change! Let me check our availability for Toyota Camry service..."
            </div>
        </div>
    `);
};

window.demoTextToSpeech = function() {
    const text = "Hello! I'm your AI assistant. I can speak all my responses out loud for better accessibility and convenience!";
    
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.pitch = 1.1;
        speechSynthesis.speak(utterance);
    }
    
    showDemoModal('Text-to-Speech Demo', `
        <div class="tts-demo-content">
            <div class="speaker-animation">
                <i class="fas fa-volume-up"></i>
                <div class="sound-waves">
                    <div class="sound-wave"></div>
                    <div class="sound-wave"></div>
                    <div class="sound-wave"></div>
                </div>
            </div>
            <p>🔊 Listen to the AI speaking!</p>
            <div class="speech-text">
                "${text}"
            </div>
        </div>
    `);
};

function showDemoModal(title, content) {
    const modal = document.createElement('div');
    modal.className = 'demo-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>${title}</h3>
                <button onclick="closeDemoModal()" class="close-btn">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
    
    window.closeDemoModal = function() {
        modal.classList.remove('active');
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    };
}

// Utility Functions
function scrollToMainChat() {
    const chatSection = document.querySelector('.ai-hero-section');
    if (chatSection) {
        chatSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function updateQuickSuggestions(inputValue) {
    const suggestions = document.getElementById('quick-suggestions');
    if (!suggestions || !inputValue) return;
    
    const smartSuggestions = [
        'Book an appointment',
        'Check pricing',
        'What services do you offer?',
        'When are you open?'
    ];
    
    // Update suggestions based on input
    if (inputValue.toLowerCase().includes('oil')) {
        suggestions.innerHTML = `
            <button class="suggestion-pill" onclick="sendQuickMessage('How much is an oil change?')">
                <i class="fas fa-oil-can"></i>
                How much is an oil change?
            </button>
            <button class="suggestion-pill" onclick="sendQuickMessage('Book oil change appointment')">
                <i class="fas fa-calendar"></i>
                Book oil change appointment
            </button>
        `;
    }
}

function updateAILearning(userMessage, aiResponse) {
    // Simulate AI learning
    aiPersonality.memory[Date.now()] = {
        userInput: userMessage,
        aiResponse: aiResponse.text,
        intent: aiResponse.type,
        confidence: aiResponse.confidence
    };
    
    // Update learning metrics
    const learningBars = document.querySelectorAll('.metric-bar .fill');
    learningBars.forEach(bar => {
        let currentWidth = parseInt(bar.style.width) || 85;
        if (currentWidth < 99) {
            bar.style.width = `${Math.min(currentWidth + 0.1, 99)}%`;
        }
    });
}

function calculateConfidence(message, intent) {
    // Simple confidence calculation
    const keywordMatch = intent !== 'general' ? 0.8 : 0.4;
    const lengthFactor = Math.min(message.length / 50, 0.2);
    return Math.min(keywordMatch + lengthFactor, 1.0);
}

// Initialize AI Features
function initializeAIFeatures() {
    // Feature item interactions
    document.querySelectorAll('.feature-item').forEach(item => {
        item.addEventListener('click', function() {
            document.querySelectorAll('.feature-item').forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            
            const feature = this.dataset.feature;
            showFeatureDemo(feature);
        });
    });
}

function showFeatureDemo(feature) {
    const demos = {
        'chat': 'Smart chat with natural language processing',
        'booking': 'Automatic appointment scheduling system',
        'voice': 'Voice recognition and text-to-speech',
        'analytics': 'Real-time customer analytics and insights',
        'learning': 'Machine learning and customer memory'
    };
    
    addAIMessage('ai', `🎯 You selected: ${demos[feature] || 'Unknown feature'}\n\nThis is just a preview of how advanced our AI system is! Want to see it in action?`, 'feature_demo');
}

// Animation Helpers
function initializeAnimations() {
    // Add custom CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes sparkleFloat {
            0% { opacity: 0; transform: translateY(0) scale(0); }
            50% { opacity: 1; transform: translateY(-20px) scale(1); }
            100% { opacity: 0; transform: translateY(-40px) scale(0); }
        }
        
        @keyframes attentionBlink {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
        
        @keyframes numberPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.2); color: #6366f1; }
        }
        
        @keyframes statGlow {
            0%, 100% { box-shadow: none; }
            50% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.5); }
        }
        
        .demo-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .demo-modal.active {
            opacity: 1;
        }
        
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(30, 27, 75, 0.8);
            backdrop-filter: blur(5px);
        }
        
        .modal-content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            border-radius: 20px;
            padding: 2rem;
            max-width: 500px;
            width: 90%;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid #e2e8f0;
        }
        
        .close-btn {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #64748b;
        }
        
        .voice-waves .wave {
            width: 4px;
            height: 20px;
            background: #6366f1;
            margin: 0 2px;
            border-radius: 2px;
            animation: voiceWave 1s ease-in-out infinite;
        }
        
        .voice-waves .wave:nth-child(2) { animation-delay: 0.2s; }
        .voice-waves .wave:nth-child(3) { animation-delay: 0.4s; }
        
        @keyframes voiceWave {
            0%, 100% { height: 10px; }
            50% { height: 30px; }
        }
        
        .sound-waves .sound-wave {
            width: 30px;
            height: 30px;
            border: 2px solid #6366f1;
            border-radius: 50%;
            opacity: 0;
            animation: soundRipple 1.5s ease-out infinite;
        }
        
        .sound-waves .sound-wave:nth-child(2) { animation-delay: 0.3s; }
        .sound-waves .sound-wave:nth-child(3) { animation-delay: 0.6s; }
        
        @keyframes soundRipple {
            0% { opacity: 1; transform: scale(0); }
            100% { opacity: 0; transform: scale(2); }
        }
        
        .price-highlight {
            color: #10b981;
            font-weight: 700;
            background: rgba(16, 185, 129, 0.1);
            padding: 2px 4px;
            border-radius: 4px;
        }
        
        .emoji-large {
            font-size: 1.2em;
        }
        
        .user-content {
            margin-left: auto;
            text-align: right;
        }
        
        .user-bubble {
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            color: white;
        }
        
        .user-avatar-mini {
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, #10b981 0%, #34d399 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
        }
    `;
    document.head.appendChild(style);
}

// Order AI System
window.orderAISystem = function() {
    showDemoModal('🤖 Order Your AI Assistant', `
        <div class="order-ai-content">
            <div class="ai-order-header">
                <div class="ai-avatar-large">
                    <div class="ai-face-large">
                        <div class="eyes-large">
                            <div class="eye-large"></div>
                            <div class="eye-large"></div>
                        </div>
                        <div class="mouth-large"></div>
                    </div>
                    <div class="avatar-glow-large"></div>
                </div>
                <h3>🎉 Get Your AI Assistant</h3>
                <p>Transform your auto shop with revolutionary AI technology!</p>
            </div>
            
            <div class="package-summary">
                <h4>Complete AI Package Includes:</h4>
                <ul>
                    <li>✅ Smart AI Chat Assistant</li>
                    <li>✅ Voice Recognition & Text-to-Speech</li>
                    <li>✅ Automatic Appointment Booking</li>
                    <li>✅ Customer Learning & Memory</li>
                    <li>✅ Professional Website</li>
                    <li>✅ Mobile Optimization</li>
                    <li>✅ Setup & Training</li>
                    <li>✅ 60-Day Guarantee</li>
                </ul>
            </div>
            
            <div class="price-display">
                <div class="original-price">$20,500 Value</div>
                <div class="sale-price">$3,997 Today</div>
                <div class="savings">Save $16,503 (80% OFF!)</div>
            </div>
            
            <button class="order-now-btn" onclick="processAIOrder()">
                🤖 Get My AI Assistant Now
            </button>
            
            <div class="guarantee-text">
                🛡️ 60-Day Money-Back Guarantee<br>
                ⚡ Setup in 48 Hours<br>
                📞 Full Support Included
            </div>
        </div>
    `);
};

window.processAIOrder = function() {
    // Simulate order processing
    addAIMessage('ai', '🎉 Thank you for your order! Your AI assistant will be ready in 48 hours. You\'ll receive setup instructions via email shortly.\n\n✨ Welcome to the future of auto repair customer service!', 'order_confirmation');
    closeDemoModal();
};

// Reset Chat
window.resetChat = function() {
    const messagesContainer = document.getElementById('ai-chat-messages');
    if (messagesContainer) {
        messagesContainer.innerHTML = `
            <div class="ai-message">
                <div class="message-avatar">
                    <div class="avatar-mini">
                        <div class="mini-glow"></div>
                    </div>
                </div>
                <div class="message-content">
                    <div class="message-bubble ai-bubble">
                        <p>👋 Hi! I'm your AI assistant. I can help you with:</p>
                        <ul class="ai-services">
                            <li>✅ Booking appointments</li>
                            <li>✅ Service information & pricing</li>
                            <li>✅ Availability checking</li>
                            <li>✅ Customer support</li>
                        </ul>
                        <p>What would you like to know about our auto repair services?</p>
                    </div>
                    <div class="message-time">Just now</div>
                </div>
            </div>
        `;
    }
    
    addAIMessage('ai', '🔄 Chat reset! I\'m ready to help you again. What can I do for you?', 'system');
};

console.log('🚀✨ Shiny AI Converter fully loaded - The future of auto repair is here!');