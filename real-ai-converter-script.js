// Real AI Converter - Google AI Integration
// Your API Key: AIzaSyD-0Jyl1r9q8lzkEBVW-sR5dAD6VCDdAoY

const GOOGLE_AI_API_KEY = 'AIzaSyD-0Jyl1r9q8lzkEBVW-sR5dAD6VCDdAoY';
const GOOGLE_AI_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

// Global variables
let isListening = false;
let isSpeaking = false;
let recognition = null;
let speechSynthesis = window.speechSynthesis;
let currentVoice = null;
let conversationHistory = [];
let customerData = {
    name: '',
    vehicle: '',
    phoneNumber: '',
    preferredTime: '',
    services: []
};

// Auto Repair Knowledge Base
const autoRepairKnowledge = {
    services: {
        'oil change': { price: 35, duration: '30 minutes', description: 'Complete oil and filter change' },
        'brake service': { price: 150, duration: '1-2 hours', description: 'Brake inspection and pad replacement' },
        'tire rotation': { price: 25, duration: '20 minutes', description: 'Rotate tires for even wear' },
        'battery test': { price: 15, duration: '15 minutes', description: 'Battery and charging system test' },
        'ac repair': { price: 120, duration: '2-3 hours', description: 'AC system diagnosis and repair' },
        'transmission service': { price: 200, duration: '3-4 hours', description: 'Transmission fluid and filter change' },
        'engine diagnostic': { price: 95, duration: '1 hour', description: 'Computer diagnostic scan' },
        'alignment': { price: 80, duration: '1 hour', description: 'Wheel alignment service' },
        'tune up': { price: 180, duration: '2-3 hours', description: 'Complete engine tune-up' },
        'inspection': { price: 20, duration: '30 minutes', description: 'State safety inspection' }
    },
    schedule: {
        monday: ['8:00 AM', '10:00 AM', '1:00 PM', '3:00 PM'],
        tuesday: ['8:00 AM', '9:30 AM', '11:00 AM', '2:00 PM', '4:00 PM'],
        wednesday: ['8:00 AM', '10:00 AM', '1:00 PM', '3:00 PM'],
        thursday: ['8:00 AM', '9:30 AM', '11:00 AM', '2:00 PM', '4:00 PM'],
        friday: ['8:00 AM', '10:00 AM', '12:00 PM', '2:00 PM'],
        saturday: ['9:00 AM', '11:00 AM', '1:00 PM'],
        sunday: 'Closed'
    },
    location: '123 Main Street, Auto City, AC 12345',
    phone: '(555) 123-AUTO',
    hours: 'Monday-Friday: 8AM-6PM, Saturday: 9AM-3PM, Sunday: Closed'
};

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeRealAI();
    initializeSpeechRecognition();
    initializeTextToSpeech();
    initializeSystemMessage();
    initializeSmartSuggestions();
    initializeFeatures();
    startAIPersonality();
});

// Initialize Real AI System
function initializeRealAI() {
    console.log('🤖 Initializing Real Google AI System...');
    
    // Add event listeners
    document.getElementById('real-ai-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    document.getElementById('send-button-real').addEventListener('click', sendMessage);
    document.getElementById('mic-button').addEventListener('click', toggleVoiceRecognition);
    document.getElementById('tts-toggle').addEventListener('click', toggleTextToSpeech);

    // Show system ready message
    setTimeout(() => {
        showSystemMessage('🤖 Google AI Assistant is now online and ready to help your customers!', 'success');
        activateFeature('realtime');
    }, 1500);
}

// Initialize Speech Recognition
function initializeSpeechRecognition() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-US';
        
        recognition.onstart = function() {
            isListening = true;
            document.getElementById('mic-button').classList.add('listening');
            showVoiceIndicator(true);
        };
        
        recognition.onresult = function(event) {
            let transcript = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                transcript += event.results[i][0].transcript;
            }
            
            document.getElementById('real-ai-input').value = transcript;
            
            if (event.results[event.results.length - 1].isFinal) {
                sendMessage();
            }
        };
        
        recognition.onerror = function(event) {
            console.error('Speech recognition error:', event.error);
            isListening = false;
            document.getElementById('mic-button').classList.remove('listening');
            showVoiceIndicator(false);
        };
        
        recognition.onend = function() {
            isListening = false;
            document.getElementById('mic-button').classList.remove('listening');
            showVoiceIndicator(false);
        };
        
        activateFeature('voice');
    } else {
        console.warn('Speech recognition not supported');
    }
}

// Initialize Text-to-Speech
function initializeTextToSpeech() {
    if ('speechSynthesis' in window) {
        // Wait for voices to load
        speechSynthesis.onvoiceschanged = function() {
            const voices = speechSynthesis.getVoices();
            // Prefer female voices for friendlier experience
            currentVoice = voices.find(voice => 
                voice.name.includes('Female') || 
                voice.name.includes('Samantha') ||
                voice.name.includes('Karen') ||
                voice.gender === 'female'
            ) || voices[0];
        };
        
        activateFeature('tts');
    } else {
        console.warn('Text-to-speech not supported');
    }
}

// Toggle Voice Recognition
function toggleVoiceRecognition() {
    if (!recognition) {
        alert('Voice recognition not supported in your browser');
        return;
    }
    
    if (isListening) {
        recognition.stop();
    } else {
        recognition.start();
    }
}

// Toggle Text-to-Speech
function toggleTextToSpeech() {
    const ttsButton = document.getElementById('tts-toggle');
    const isEnabled = ttsButton.classList.contains('enabled');
    
    if (isEnabled) {
        ttsButton.classList.remove('enabled');
        ttsButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
        speechSynthesis.cancel();
    } else {
        ttsButton.classList.add('enabled');
        ttsButton.innerHTML = '<i class="fas fa-volume-up"></i>';
        speak("Text-to-speech is now enabled. I'll speak my responses to help your customers.");
    }
}

// Send Message to Google AI
async function sendMessage() {
    const input = document.getElementById('real-ai-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Clear input and show user message
    input.value = '';
    addMessageToChat('user', message);
    
    // Show AI thinking
    showAIThinking(true);
    
    try {
        // Prepare conversation context
        const context = buildConversationContext(message);
        
        // Call Google AI API
        const response = await callGoogleAI(context);
        
        // Hide AI thinking
        showAIThinking(false);
        
        // Process and display response
        processAIResponse(response, message);
        
        // Update conversation history
        conversationHistory.push({
            user: message,
            ai: response,
            timestamp: new Date()
        });
        
    } catch (error) {
        console.error('AI Error:', error);
        showAIThinking(false);
        
        const fallbackResponse = generateFallbackResponse(message);
        addMessageToChat('ai', fallbackResponse);
        speakIfEnabled(fallbackResponse);
    }
    
    // Update metrics
    updateMetrics();
}

// Call Google AI API
async function callGoogleAI(prompt) {
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
            }],
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 1024,
            },
            safetySettings: [
                {
                    category: "HARM_CATEGORY_HARASSMENT",
                    threshold: "BLOCK_MEDIUM_AND_ABOVE"
                },
                {
                    category: "HARM_CATEGORY_HATE_SPEECH",
                    threshold: "BLOCK_MEDIUM_AND_ABOVE"
                },
                {
                    category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                    threshold: "BLOCK_MEDIUM_AND_ABOVE"
                },
                {
                    category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                    threshold: "BLOCK_MEDIUM_AND_ABOVE"
                }
            ]
        })
    });
    
    if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
}

// Build Conversation Context
function buildConversationContext(userMessage) {
    const systemPrompt = `You are Alex, a friendly and helpful AI assistant for Mike's Auto Repair Shop. You're designed to help customers with:

BUSINESS INFORMATION:
- Location: ${autoRepairKnowledge.location}
- Phone: ${autoRepairKnowledge.phone}
- Hours: ${autoRepairKnowledge.hours}

SERVICES & PRICING:
${Object.entries(autoRepairKnowledge.services).map(([service, info]) => 
    `- ${service}: $${info.price} (${info.duration}) - ${info.description}`
).join('\n')}

PERSONALITY:
- Be warm, friendly, and professional
- Use the customer's name if they provide it
- Ask helpful follow-up questions
- Offer to book appointments
- Provide accurate pricing and timing
- Show enthusiasm about helping with their vehicle

CONVERSATION HISTORY:
${conversationHistory.slice(-3).map(conv => 
    `Customer: ${conv.user}\nAlex: ${conv.ai}`
).join('\n\n')}

CUSTOMER DATA COLLECTED:
${Object.entries(customerData).filter(([key, value]) => value).map(([key, value]) => 
    `${key}: ${Array.isArray(value) ? value.join(', ') : value}`
).join('\n')}

Current customer message: "${userMessage}"

Respond as Alex in a natural, conversational way. If they're asking about services, mention pricing. If they want to book, ask for their details. Keep responses concise but helpful.`;

    return systemPrompt;
}

// Process AI Response
function processAIResponse(response, userMessage) {
    // Extract customer information
    extractCustomerData(userMessage, response);
    
    // Add message to chat
    addMessageToChat('ai', response);
    
    // Speak if enabled
    speakIfEnabled(response);
    
    // Update smart suggestions based on response
    updateSmartSuggestions(response);
    
    // Check if booking intent
    if (detectBookingIntent(response)) {
        highlightBookingFeature();
    }
}

// Extract Customer Data
function extractCustomerData(userMessage, aiResponse) {
    const message = userMessage.toLowerCase();
    
    // Extract name
    const nameMatch = message.match(/my name is (\w+)|i'm (\w+)|call me (\w+)/);
    if (nameMatch) {
        customerData.name = nameMatch[1] || nameMatch[2] || nameMatch[3];
    }
    
    // Extract phone
    const phoneMatch = message.match(/(\d{3}[-.]?\d{3}[-.]?\d{4})/);
    if (phoneMatch) {
        customerData.phoneNumber = phoneMatch[1];
    }
    
    // Extract vehicle info
    const vehicleMatch = message.match(/(honda|toyota|ford|chevy|nissan|bmw|mercedes|audi)\s+(\w+)/i);
    if (vehicleMatch) {
        customerData.vehicle = `${vehicleMatch[1]} ${vehicleMatch[2]}`;
    }
    
    // Extract services
    Object.keys(autoRepairKnowledge.services).forEach(service => {
        if (message.includes(service) || message.includes(service.replace(' ', ''))) {
            if (!customerData.services.includes(service)) {
                customerData.services.push(service);
            }
        }
    });
    
    // Update customer info display
    updateCustomerInfo();
}

// Generate Fallback Response
function generateFallbackResponse(message) {
    const fallbacks = [
        "I'm here to help! Could you tell me more about what you need for your vehicle?",
        "Let me help you with that. What kind of service are you looking for today?",
        "I'd be happy to assist you! Are you looking for a specific auto repair service?",
        "Great question! What can I help you with regarding your vehicle today?",
        "I'm Alex from Mike's Auto Repair. How can I help you with your car today?"
    ];
    
    // Try to match with services
    const lowerMessage = message.toLowerCase();
    for (let service in autoRepairKnowledge.services) {
        if (lowerMessage.includes(service) || lowerMessage.includes(service.replace(' ', ''))) {
            const serviceInfo = autoRepairKnowledge.services[service];
            return `Great! I can help you with ${service}. We charge $${serviceInfo.price} and it typically takes ${serviceInfo.duration}. ${serviceInfo.description}. Would you like to schedule an appointment?`;
        }
    }
    
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

// Add Message to Chat
function addMessageToChat(sender, message) {
    const chatMessages = document.getElementById('real-chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}-message`;
    
    if (sender === 'ai') {
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <div class="google-icon">
                    <i class="fas fa-robot"></i>
                </div>
            </div>
            <div class="message-content">
                <div class="message-header">
                    <span class="sender-name">Alex (AI Assistant)</span>
                    <span class="message-time">${new Date().toLocaleTimeString()}</span>
                </div>
                <div class="message-text">${message}</div>
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="message-content user-content">
                <div class="message-header">
                    <span class="sender-name">Customer</span>
                    <span class="message-time">${new Date().toLocaleTimeString()}</span>
                </div>
                <div class="message-text">${message}</div>
            </div>
            <div class="message-avatar user-avatar">
                <i class="fas fa-user"></i>
            </div>
        `;
    }
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Add animation
    messageDiv.style.opacity = '0';
    messageDiv.style.transform = 'translateY(20px)';
    setTimeout(() => {
        messageDiv.style.opacity = '1';
        messageDiv.style.transform = 'translateY(0)';
        messageDiv.style.transition = 'all 0.3s ease';
    }, 100);
}

// Show AI Thinking
function showAIThinking(show) {
    const existingThinking = document.querySelector('.ai-thinking');
    
    if (show && !existingThinking) {
        const chatMessages = document.getElementById('real-chat-messages');
        const thinkingDiv = document.createElement('div');
        thinkingDiv.className = 'ai-thinking';
        thinkingDiv.innerHTML = `
            <div class="google-spinner">
                <div class="spinner-ring"></div>
                <i class="fab fa-google"></i>
            </div>
            <div class="thinking-text">
                Alex is thinking
                <div class="thinking-animation">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        
        chatMessages.appendChild(thinkingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    } else if (!show && existingThinking) {
        existingThinking.remove();
    }
}

// Speak Text
function speak(text) {
    if (!speechSynthesis || isSpeaking) return;
    
    speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = currentVoice;
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    utterance.volume = 0.8;
    
    utterance.onstart = () => {
        isSpeaking = true;
        showVoiceIndicator(true, 'speaking');
    };
    
    utterance.onend = () => {
        isSpeaking = false;
        showVoiceIndicator(false);
    };
    
    speechSynthesis.speak(utterance);
}

// Speak if TTS is enabled
function speakIfEnabled(text) {
    const ttsButton = document.getElementById('tts-toggle');
    if (ttsButton.classList.contains('enabled')) {
        speak(text);
    }
}

// Show Voice Indicator
function showVoiceIndicator(show, type = 'listening') {
    const indicator = document.querySelector('.voice-indicator');
    if (indicator) {
        indicator.style.opacity = show ? '1' : '0';
        indicator.style.background = type === 'speaking' ? '#f59e0b' : '#10b981';
    }
}

// Initialize System Message
function initializeSystemMessage() {
    const steps = [
        'Connecting to Google AI services...',
        'Loading natural language processing...',
        'Initializing speech recognition...',
        'Setting up text-to-speech...',
        'Ready to assist customers!'
    ];
    
    let currentStep = 0;
    const stepElements = document.querySelectorAll('.step');
    
    const interval = setInterval(() => {
        if (currentStep < steps.length) {
            stepElements[currentStep].classList.add('active');
            currentStep++;
        } else {
            clearInterval(interval);
        }
    }, 800);
}

// Initialize Smart Suggestions
function initializeSmartSuggestions() {
    const suggestions = document.querySelectorAll('.smart-pill');
    suggestions.forEach(pill => {
        pill.addEventListener('click', function() {
            const text = this.textContent.trim();
            document.getElementById('real-ai-input').value = text;
            sendMessage();
        });
    });
}

// Update Smart Suggestions
function updateSmartSuggestions(aiResponse) {
    const suggestionsContainer = document.querySelector('.smart-suggestions');
    const suggestions = [
        { icon: 'fas fa-calendar', text: 'Schedule appointment' },
        { icon: 'fas fa-phone', text: 'Call the shop' },
        { icon: 'fas fa-map', text: 'Get directions' },
        { icon: 'fas fa-dollar-sign', text: 'Check pricing' }
    ];
    
    // Add dynamic suggestions based on AI response
    if (aiResponse.toLowerCase().includes('appointment') || aiResponse.toLowerCase().includes('schedule')) {
        suggestions.unshift({ icon: 'fas fa-check', text: 'Yes, book it!' });
    }
    
    if (aiResponse.toLowerCase().includes('service') || aiResponse.toLowerCase().includes('repair')) {
        suggestions.unshift({ icon: 'fas fa-wrench', text: 'Tell me more' });
    }
    
    suggestionsContainer.innerHTML = suggestions.slice(0, 4).map(suggestion => `
        <div class="smart-pill">
            <i class="${suggestion.icon}"></i>
            ${suggestion.text}
        </div>
    `).join('');
    
    // Re-add event listeners
    initializeSmartSuggestions();
}

// Initialize Features
function initializeFeatures() {
    // Simulate features coming online
    setTimeout(() => activateFeature('nlp'), 2000);
    setTimeout(() => activateFeature('learning'), 3000);
    setTimeout(() => activateFeature('booking'), 4000);
}

// Activate Feature
function activateFeature(featureId) {
    const feature = document.querySelector(`[data-feature="${featureId}"]`);
    if (feature) {
        feature.classList.add('active');
        const status = feature.querySelector('.feature-status');
        if (status) {
            status.classList.add('online');
        }
    }
}

// Detect Booking Intent
function detectBookingIntent(response) {
    const bookingKeywords = ['appointment', 'schedule', 'book', 'when', 'available', 'time'];
    return bookingKeywords.some(keyword => response.toLowerCase().includes(keyword));
}

// Highlight Booking Feature
function highlightBookingFeature() {
    const bookingFeature = document.querySelector('[data-feature="booking"]');
    if (bookingFeature) {
        bookingFeature.style.background = 'linear-gradient(135deg, #dbeafe, #eff6ff)';
        bookingFeature.style.borderColor = '#3b82f6';
        
        setTimeout(() => {
            bookingFeature.style.background = '';
            bookingFeature.style.borderColor = '';
        }, 3000);
    }
}

// Update Customer Info
function updateCustomerInfo() {
    // This would update a customer info panel if present
    console.log('Customer Data Updated:', customerData);
}

// Update Metrics
function updateMetrics() {
    // Update conversation count
    const conversationCount = document.querySelector('[data-metric="conversations"] .metric-number');
    if (conversationCount) {
        conversationCount.textContent = conversationHistory.length;
    }
    
    // Update response time (simulated)
    const responseTime = document.querySelector('[data-metric="response"] .metric-number');
    if (responseTime) {
        responseTime.textContent = '1.2s';
    }
    
    // Update satisfaction (simulated)
    const satisfaction = document.querySelector('[data-metric="satisfaction"] .metric-number');
    if (satisfaction) {
        satisfaction.textContent = '96%';
    }
    
    // Update leads (simulated)
    const leads = document.querySelector('[data-metric="leads"] .metric-number');
    if (leads) {
        leads.textContent = Math.floor(conversationHistory.length * 0.7);
    }
}

// Start AI Personality
function startAIPersonality() {
    // Show welcome message after initialization
    setTimeout(() => {
        const welcomeMessage = `Hi! I'm Alex, your AI assistant from Mike's Auto Repair. I'm powered by Google AI and I'm here to help you 24/7! 

I can help you with:
• Service information and pricing
• Scheduling appointments
• Answering questions about your vehicle
• Providing directions to our shop

What can I help you with today? You can type or click the microphone to speak!`;
        
        addMessageToChat('ai', welcomeMessage);
        speakIfEnabled("Hi! I'm Alex, your AI assistant from Mike's Auto Repair. How can I help you today?");
    }, 3000);
}

// Show System Message
function showSystemMessage(message, type = 'info') {
    console.log(`🤖 System: ${message}`);
    
    // Could add visual system messages here
    const colors = {
        info: '#3b82f6',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444'
    };
}