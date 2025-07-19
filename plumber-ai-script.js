// Plumber AI Assistant - Advanced JavaScript
// Specialized for Plumbing Services with Your API Key

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
    phone: '',
    address: '',
    issue: '',
    urgency: 'normal',
    preferredTime: '',
    estimatedValue: 0
};

// Plumbing Services Knowledge Base
const plumbingKnowledge = {
    services: {
        'drain cleaning': { 
            price: 150, 
            duration: '1-2 hours', 
            emergency: true,
            description: 'Professional drain cleaning and unclogging' 
        },
        'pipe repair': { 
            price: 275, 
            duration: '2-3 hours', 
            emergency: true,
            description: 'Pipe leak repair and replacement' 
        },
        'water heater': { 
            price: 450, 
            duration: '3-4 hours', 
            emergency: true,
            description: 'Water heater repair or installation' 
        },
        'toilet repair': { 
            price: 125, 
            duration: '1 hour', 
            emergency: false,
            description: 'Toilet repair and replacement' 
        },
        'faucet repair': { 
            price: 95, 
            duration: '30 minutes', 
            emergency: false,
            description: 'Faucet and sink repair' 
        },
        'sewer line': { 
            price: 850, 
            duration: '4-6 hours', 
            emergency: true,
            description: 'Sewer line cleaning and repair' 
        },
        'leak detection': { 
            price: 195, 
            duration: '1-2 hours', 
            emergency: true,
            description: 'Professional leak detection service' 
        },
        'bathroom remodel': { 
            price: 3500, 
            duration: '3-5 days', 
            emergency: false,
            description: 'Complete bathroom renovation' 
        },
        'garbage disposal': { 
            price: 225, 
            duration: '1 hour', 
            emergency: false,
            description: 'Garbage disposal repair/installation' 
        },
        'pipe installation': { 
            price: 350, 
            duration: '2-4 hours', 
            emergency: false,
            description: 'New pipe installation and plumbing' 
        }
    },
    
    emergencyKeywords: [
        'burst', 'flooding', 'leak', 'emergency', 'urgent', 'water everywhere',
        'basement flooding', 'pipe burst', 'no water', 'sewage backup',
        'toilet overflowing', 'water heater leaking', 'can\'t turn off'
    ],
    
    schedule: {
        emergency: 'Available 24/7 - Emergency response within 30 minutes',
        regular: {
            monday: ['8:00 AM', '10:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'],
            tuesday: ['8:00 AM', '9:30 AM', '11:00 AM', '2:00 PM', '4:00 PM'],
            wednesday: ['8:00 AM', '10:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'],
            thursday: ['8:00 AM', '9:30 AM', '11:00 AM', '2:00 PM', '4:00 PM'],
            friday: ['8:00 AM', '10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM'],
            saturday: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM'],
            sunday: ['10:00 AM', '12:00 PM', '2:00 PM']
        }
    },
    
    businessInfo: {
        name: 'ProPlumb Solutions',
        address: '456 Water Street, Plumber City, PC 67890',
        phone: '(555) 123-PIPE',
        hours: 'Monday-Friday: 8AM-6PM, Saturday: 9AM-4PM, Sunday: 10AM-3PM',
        emergency: '24/7 Emergency Service Available',
        license: 'Licensed & Insured - License #PL123456'
    }
};

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializePlumberAI();
    initializeSpeechRecognition();
    initializeTextToSpeech();
    initializeConversationDemo();
    initializePricingCalculator();
    startWelcomeSequence();
});

// Initialize Plumber AI System
function initializePlumberAI() {
    console.log('🔧 Initializing PlumberBot AI System...');
    
    // Demo input handlers
    const demoInput = document.getElementById('demo-input-field');
    if (demoInput) {
        demoInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendDemoMessage();
            }
        });
    }

    // Full demo input handlers
    const fullInput = document.getElementById('full-input-field');
    if (fullInput) {
        fullInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendFullMessage();
            }
        });
    }

    // Voice and speaker controls
    const voiceBtn = document.getElementById('voice-demo-btn');
    const speakerBtn = document.getElementById('speaker-demo-btn');
    
    if (voiceBtn) voiceBtn.addEventListener('click', toggleVoiceDemo);
    if (speakerBtn) speakerBtn.addEventListener('click', toggleSpeakerDemo);
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
            updateVoiceIndicators(true);
        };
        
        recognition.onresult = function(event) {
            let transcript = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                transcript += event.results[i][0].transcript;
            }
            
            const activeInput = document.querySelector('#demo-input-field:focus, #full-input-field:focus') || 
                               document.getElementById('demo-input-field');
            if (activeInput) {
                activeInput.value = transcript;
            }
            
            if (event.results[event.results.length - 1].isFinal) {
                sendDemoMessage();
            }
        };
        
        recognition.onerror = function(event) {
            console.error('Speech recognition error:', event.error);
            isListening = false;
            updateVoiceIndicators(false);
        };
        
        recognition.onend = function() {
            isListening = false;
            updateVoiceIndicators(false);
        };
    }
}

// Initialize Text-to-Speech
function initializeTextToSpeech() {
    if ('speechSynthesis' in window) {
        speechSynthesis.onvoiceschanged = function() {
            const voices = speechSynthesis.getVoices();
            currentVoice = voices.find(voice => 
                voice.name.includes('Female') || 
                voice.name.includes('Google') ||
                voice.name.includes('Natural') ||
                voice.gender === 'female'
            ) || voices[0];
        };
    }
}

// Toggle Voice Recognition
function toggleVoiceDemo() {
    if (!recognition) {
        showNotification('Voice recognition not supported in your browser', 'warning');
        return;
    }
    
    if (isListening) {
        recognition.stop();
    } else {
        recognition.start();
    }
}

// Toggle Speaker
function toggleSpeakerDemo() {
    const speakerBtn = document.getElementById('speaker-demo-btn');
    const isEnabled = speakerBtn.classList.contains('enabled');
    
    if (isEnabled) {
        speakerBtn.classList.remove('enabled');
        speakerBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        speechSynthesis.cancel();
    } else {
        speakerBtn.classList.add('enabled');
        speakerBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        speak("Voice responses are now enabled. I'll speak my replies to help you hear how I interact with customers.");
    }
}

// Send Demo Message
function sendDemoMessage(message) {
    const input = document.getElementById('demo-input-field');
    const messageText = message || input.value.trim();
    
    if (!messageText) return;
    
    if (!message) input.value = '';
    
    addDemoMessage('customer', messageText);
    
    // Show typing indicator
    showTypingIndicator();
    
    // Process with AI after delay
    setTimeout(async () => {
        try {
            const response = await processPlumbingQuery(messageText);
            hideTypingIndicator();
            addDemoMessage('ai', response);
            speakIfEnabled(response);
            updateSuggestions(response);
        } catch (error) {
            hideTypingIndicator();
            const fallbackResponse = generatePlumbingFallback(messageText);
            addDemoMessage('ai', fallbackResponse);
            speakIfEnabled(fallbackResponse);
        }
    }, 1500);
}

// Send Full Demo Message
function sendFullMessage(message) {
    const input = document.getElementById('full-input-field');
    const messageText = message || input.value.trim();
    
    if (!messageText) return;
    
    if (!message) input.value = '';
    
    addFullMessage('customer', messageText);
    
    // Show AI thinking
    showAIThinking();
    
    // Process with AI
    setTimeout(async () => {
        try {
            const response = await processPlumbingQuery(messageText);
            hideAIThinking();
            addFullMessage('ai', response);
            speakIfEnabled(response);
            updateFullSuggestions(response);
        } catch (error) {
            hideAIThinking();
            const fallbackResponse = generatePlumbingFallback(messageText);
            addFullMessage('ai', fallbackResponse);
            speakIfEnabled(fallbackResponse);
        }
    }, 2000);
}

// Process Plumbing Query with AI
async function processPlumbingQuery(userMessage) {
    const context = buildPlumbingContext(userMessage);
    
    try {
        const response = await fetch(`${GOOGLE_AI_ENDPOINT}?key=${GOOGLE_AI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: context
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 512,
                },
                safetySettings: [
                    {
                        category: "HARM_CATEGORY_HARASSMENT",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    },
                    {
                        category: "HARM_CATEGORY_HATE_SPEECH",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    }
                ]
            })
        });
        
        if (!response.ok) {
            throw new Error(`AI API Error: ${response.status}`);
        }
        
        const data = await response.json();
        const aiResponse = data.candidates[0].content.parts[0].text;
        
        // Extract customer data and update
        extractPlumbingData(userMessage, aiResponse);
        
        return aiResponse;
        
    } catch (error) {
        console.error('AI Processing Error:', error);
        throw error;
    }
}

// Build Plumbing Context for AI
function buildPlumbingContext(userMessage) {
    const isEmergency = detectEmergency(userMessage);
    const detectedServices = detectServices(userMessage);
    
    const systemPrompt = `You are PlumberBot, an expert AI assistant for ${plumbingKnowledge.businessInfo.name}, a professional plumbing company. You help customers with plumbing issues, provide quotes, and book appointments.

BUSINESS INFO:
- Company: ${plumbingKnowledge.businessInfo.name}
- Address: ${plumbingKnowledge.businessInfo.address}
- Phone: ${plumbingKnowledge.businessInfo.phone}
- Hours: ${plumbingKnowledge.businessInfo.hours}
- Emergency: ${plumbingKnowledge.businessInfo.emergency}
- License: ${plumbingKnowledge.businessInfo.license}

SERVICES & PRICING:
${Object.entries(plumbingKnowledge.services).map(([service, info]) => 
    `- ${service}: $${info.price} (${info.duration}) - ${info.description}${info.emergency ? ' [EMERGENCY SERVICE]' : ''}`
).join('\n')}

EMERGENCY DETECTION: ${isEmergency ? 'THIS IS AN EMERGENCY!' : 'Regular service request'}

DETECTED SERVICES: ${detectedServices.length > 0 ? detectedServices.join(', ') : 'None identified yet'}

CUSTOMER DATA SO FAR:
${Object.entries(customerData).filter(([key, value]) => value).map(([key, value]) => 
    `${key}: ${value}`
).join('\n')}

CONVERSATION HISTORY:
${conversationHistory.slice(-3).map(conv => 
    `Customer: ${conv.user}\nPlumberBot: ${conv.ai}`
).join('\n\n')}

PERSONALITY & RESPONSE STYLE:
- Be professional but friendly and reassuring
- For emergencies: Show urgency, offer immediate help, get address quickly
- For regular service: Be helpful, provide accurate pricing, offer scheduling
- Ask follow-up questions to better understand the problem
- Always mention your license and insurance for credibility
- If they ask for pricing, provide exact amounts from the service list
- If they want to book, collect: name, phone, address, preferred time
- Keep responses concise but helpful (2-3 sentences max)

Current customer message: "${userMessage}"

Respond as PlumberBot with expertise, empathy, and efficiency.`;

    return systemPrompt;
}

// Detect Emergency Situations
function detectEmergency(message) {
    const lowerMessage = message.toLowerCase();
    return plumbingKnowledge.emergencyKeywords.some(keyword => 
        lowerMessage.includes(keyword.toLowerCase())
    );
}

// Detect Services Mentioned
function detectServices(message) {
    const lowerMessage = message.toLowerCase();
    const detectedServices = [];
    
    Object.keys(plumbingKnowledge.services).forEach(service => {
        if (lowerMessage.includes(service.toLowerCase()) || 
            lowerMessage.includes(service.replace(' ', '').toLowerCase())) {
            detectedServices.push(service);
        }
    });
    
    // Additional service detection patterns
    if (lowerMessage.includes('clog') || lowerMessage.includes('block')) {
        detectedServices.push('drain cleaning');
    }
    if (lowerMessage.includes('hot water') || lowerMessage.includes('heater')) {
        detectedServices.push('water heater');
    }
    if (lowerMessage.includes('leak') && !detectedServices.includes('pipe repair')) {
        detectedServices.push('leak detection');
    }
    
    return [...new Set(detectedServices)]; // Remove duplicates
}

// Extract Customer Data
function extractPlumbingData(userMessage, aiResponse) {
    const message = userMessage.toLowerCase();
    
    // Extract name
    const nameMatch = message.match(/my name is (\w+)|i'm (\w+)|call me (\w+)|this is (\w+)/);
    if (nameMatch) {
        customerData.name = nameMatch[1] || nameMatch[2] || nameMatch[3] || nameMatch[4];
    }
    
    // Extract phone
    const phoneMatch = message.match(/(\d{3}[-.]?\d{3}[-.]?\d{4})/);
    if (phoneMatch) {
        customerData.phone = phoneMatch[1];
    }
    
    // Extract address
    const addressMatch = message.match(/(\d+\s+[^,]+(?:street|st|avenue|ave|road|rd|drive|dr|lane|ln|way|blvd|boulevard)[^,]*)/i);
    if (addressMatch) {
        customerData.address = addressMatch[1];
    }
    
    // Detect urgency
    if (detectEmergency(message)) {
        customerData.urgency = 'emergency';
    }
    
    // Extract issue description
    const detectedServices = detectServices(message);
    if (detectedServices.length > 0) {
        customerData.issue = detectedServices.join(', ');
        
        // Calculate estimated value
        customerData.estimatedValue = detectedServices.reduce((total, service) => {
            return total + (plumbingKnowledge.services[service]?.price || 0);
        }, 0);
    }
    
    // Store conversation
    conversationHistory.push({
        user: userMessage,
        ai: aiResponse,
        timestamp: new Date(),
        customerData: { ...customerData }
    });
}

// Generate Fallback Response
function generatePlumbingFallback(message) {
    const lowerMessage = message.toLowerCase();
    
    // Emergency fallback
    if (detectEmergency(message)) {
        return "I understand this is an emergency! We provide 24/7 emergency plumbing service and can have a licensed technician to you within 30 minutes. What's your address so I can dispatch help immediately?";
    }
    
    // Service-specific fallbacks
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('quote')) {
        return "I'd be happy to provide accurate pricing! Our rates start at $95 for basic repairs up to $850 for major work. What specific plumbing service do you need help with?";
    }
    
    if (lowerMessage.includes('schedule') || lowerMessage.includes('appointment') || lowerMessage.includes('book')) {
        return "I can schedule your appointment right now! We have openings as early as today. What type of plumbing service do you need, and what's a good time for you?";
    }
    
    // General fallbacks
    const fallbacks = [
        "I'm here to help with all your plumbing needs! We're licensed, insured, and ready to solve any plumbing problem. What can I help you with today?",
        "As a professional plumbing service, we handle everything from simple repairs to complete renovations. What plumbing issue are you experiencing?",
        "I'd love to help you with that! We offer expert plumbing services with upfront pricing and guaranteed work. Could you tell me more about what you need?",
        "Our licensed plumbers are ready to help! Whether it's an emergency or routine service, we've got you covered. What's going on with your plumbing?"
    ];
    
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

// Add Demo Message
function addDemoMessage(sender, message) {
    const chatContainer = document.getElementById('demo-chat-messages');
    if (!chatContainer) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `demo-message ${sender}-message`;
    
    if (sender === 'ai') {
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <div class="message-text">${message}</div>
                <div class="message-time">${new Date().toLocaleTimeString()}</div>
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="message-content customer-content">
                <div class="message-text">${message}</div>
                <div class="message-time">${new Date().toLocaleTimeString()}</div>
            </div>
            <div class="message-avatar customer-avatar">
                <i class="fas fa-user"></i>
            </div>
        `;
    }
    
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    
    // Animate message
    messageDiv.style.opacity = '0';
    messageDiv.style.transform = 'translateY(20px)';
    setTimeout(() => {
        messageDiv.style.transition = 'all 0.3s ease';
        messageDiv.style.opacity = '1';
        messageDiv.style.transform = 'translateY(0)';
    }, 100);
}

// Add Full Demo Message
function addFullMessage(sender, message) {
    const chatContainer = document.getElementById('full-chat-messages');
    if (!chatContainer) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `${sender}-message-full`;
    
    if (sender === 'ai') {
        messageDiv.innerHTML = `
            <div class="message-avatar-full">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content-full">
                <div class="message-text-full">${message}</div>
                <div class="message-time-full">${new Date().toLocaleTimeString()}</div>
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="message-content-full customer-content-full">
                <div class="message-text-full customer-text-full">${message}</div>
                <div class="message-time-full">${new Date().toLocaleTimeString()}</div>
            </div>
            <div class="message-avatar-full customer-avatar-full">
                <i class="fas fa-user"></i>
            </div>
        `;
    }
    
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    
    // Animate message
    messageDiv.style.opacity = '0';
    messageDiv.style.transform = 'translateY(20px)';
    setTimeout(() => {
        messageDiv.style.transition = 'all 0.3s ease';
        messageDiv.style.opacity = '1';
        messageDiv.style.transform = 'translateY(0)';
    }, 100);
}

// Show/Hide Typing Indicator
function showTypingIndicator() {
    const chatContainer = document.getElementById('demo-chat-messages');
    if (!chatContainer) return;
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'demo-message ai-message typing-message';
    typingDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div class="message-content">
            <div class="message-text typing-indicator-text">
                <div class="typing-animation">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                PlumberBot is thinking...
            </div>
        </div>
    `;
    
    chatContainer.appendChild(typingDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function hideTypingIndicator() {
    const typingMessage = document.querySelector('.typing-message');
    if (typingMessage) {
        typingMessage.remove();
    }
}

// Show/Hide AI Thinking
function showAIThinking() {
    const chatContainer = document.getElementById('full-chat-messages');
    if (!chatContainer) return;
    
    const thinkingDiv = document.createElement('div');
    thinkingDiv.className = 'ai-thinking-full';
    thinkingDiv.innerHTML = `
        <div class="thinking-avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div class="thinking-content">
            <div class="thinking-text">
                PlumberBot is analyzing your plumbing issue...
                <div class="thinking-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    `;
    
    chatContainer.appendChild(thinkingDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function hideAIThinking() {
    const thinkingElement = document.querySelector('.ai-thinking-full');
    if (thinkingElement) {
        thinkingElement.remove();
    }
}

// Update Suggestions
function updateSuggestions(aiResponse) {
    const suggestionsContainer = document.querySelector('.demo-suggestions');
    if (!suggestionsContainer) return;
    
    let suggestions = [];
    
    // Dynamic suggestions based on AI response
    if (aiResponse.toLowerCase().includes('emergency') || aiResponse.toLowerCase().includes('urgent')) {
        suggestions = [
            { icon: 'fas fa-exclamation-triangle', text: 'Yes, it\'s an emergency!' },
            { icon: 'fas fa-map-marker-alt', text: 'My address is...' },
            { icon: 'fas fa-phone', text: 'Call me immediately' },
            { icon: 'fas fa-clock', text: 'How quickly can you come?' }
        ];
    } else if (aiResponse.toLowerCase().includes('price') || aiResponse.toLowerCase().includes('cost')) {
        suggestions = [
            { icon: 'fas fa-calendar', text: 'Schedule the service' },
            { icon: 'fas fa-question', text: 'What\'s included?' },
            { icon: 'fas fa-credit-card', text: 'Payment options?' },
            { icon: 'fas fa-phone', text: 'Call for more details' }
        ];
    } else if (aiResponse.toLowerCase().includes('schedule') || aiResponse.toLowerCase().includes('appointment')) {
        suggestions = [
            { icon: 'fas fa-check', text: 'Yes, book it!' },
            { icon: 'fas fa-clock', text: 'What times are available?' },
            { icon: 'fas fa-calendar', text: 'Tomorrow morning?' },
            { icon: 'fas fa-dollar-sign', text: 'How much will it cost?' }
        ];
    } else {
        suggestions = [
            { icon: 'fas fa-wrench', text: 'I have a leak' },
            { icon: 'fas fa-fire', text: 'Water heater issue' },
            { icon: 'fas fa-calendar', text: 'Schedule service' },
            { icon: 'fas fa-calculator', text: 'Get a quote' }
        ];
    }
    
    suggestionsContainer.innerHTML = suggestions.map(suggestion => `
        <div class="suggestion-pill" onclick="sendDemoMessage('${suggestion.text}')">
            <i class="${suggestion.icon}"></i>
            ${suggestion.text}
        </div>
    `).join('');
}

// Update Full Demo Suggestions
function updateFullSuggestions(aiResponse) {
    const suggestionsContainer = document.querySelector('.suggestions-full');
    if (!suggestionsContainer) return;
    
    let suggestions = [];
    
    if (aiResponse.toLowerCase().includes('emergency')) {
        suggestions = [
            { icon: 'fas fa-map-marker-alt', text: '123 Main Street, urgent leak in basement' },
            { icon: 'fas fa-phone', text: 'Call me at (555) 123-4567 immediately' },
            { icon: 'fas fa-exclamation-triangle', text: 'Water is everywhere, please hurry!' },
            { icon: 'fas fa-clock', text: 'How fast can someone get here?' }
        ];
    } else {
        suggestions = [
            { icon: 'fas fa-home', text: 'My bathroom toilet keeps running constantly' },
            { icon: 'fas fa-tint', text: 'Kitchen faucet drips all night long' },
            { icon: 'fas fa-fire', text: 'Water heater makes strange noises' },
            { icon: 'fas fa-tools', text: 'Need complete bathroom renovation quote' }
        ];
    }
    
    suggestionsContainer.innerHTML = suggestions.map(suggestion => `
        <div class="suggestion-pill-full" onclick="sendFullMessage('${suggestion.text}')">
            <i class="${suggestion.icon}"></i>
            ${suggestion.text}
        </div>
    `).join('');
}

// Speech Functions
function speak(text) {
    if (!speechSynthesis || isSpeaking) return;
    
    speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = currentVoice;
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.volume = 0.8;
    
    utterance.onstart = () => {
        isSpeaking = true;
    };
    
    utterance.onend = () => {
        isSpeaking = false;
    };
    
    speechSynthesis.speak(utterance);
}

function speakIfEnabled(text) {
    const speakerBtn = document.getElementById('speaker-demo-btn');
    if (speakerBtn && speakerBtn.classList.contains('enabled')) {
        speak(text);
    }
}

// Update Voice Indicators
function updateVoiceIndicators(isActive) {
    const voiceBtns = document.querySelectorAll('#voice-demo-btn, #voice-full-btn');
    voiceBtns.forEach(btn => {
        if (isActive) {
            btn.classList.add('listening');
            btn.style.background = '#ef4444';
        } else {
            btn.classList.remove('listening');
            btn.style.background = '';
        }
    });
}

// Initialize Conversation Demo
function initializeConversationDemo() {
    // Simulate realistic conversation in preview
    setTimeout(() => {
        const messages = document.querySelectorAll('.ai-msg.typing');
        messages.forEach((msg, index) => {
            setTimeout(() => {
                const typingIndicator = msg.querySelector('.typing-indicator');
                const aiResponse = msg.querySelector('.ai-response');
                
                if (typingIndicator && aiResponse) {
                    typingIndicator.style.display = 'none';
                    aiResponse.style.display = 'block';
                    msg.classList.remove('typing');
                }
            }, 2000 + (index * 1000));
        });
    }, 3000);
}

// Initialize Pricing Calculator
function initializePricingCalculator() {
    // ROI Calculator functionality
    calculateROI();
}

// Calculate ROI
function calculateROI() {
    const avgJobValue = parseInt(document.getElementById('avg-job-value')?.value || 275);
    const jobsPerMonth = parseInt(document.getElementById('jobs-per-month')?.value || 25);
    const missedCalls = parseInt(document.getElementById('missed-calls')?.value || 15);
    const conversionRate = parseInt(document.getElementById('conversion-rate')?.value || 45) / 100;
    
    // Calculate current monthly revenue
    const currentMonthlyRevenue = avgJobValue * jobsPerMonth;
    
    // Calculate missed opportunities
    const missedCallsPerMonth = missedCalls * 4.33; // weekly to monthly
    const missedRevenue = missedCallsPerMonth * avgJobValue * conversionRate;
    
    // With AI: 95% answer rate, 75% conversion rate
    const aiConversionRate = 0.75;
    const aiAnswerRate = 0.95;
    const recoveredCalls = missedCallsPerMonth * aiAnswerRate;
    const additionalRevenue = recoveredCalls * avgJobValue * aiConversionRate;
    
    // Improved conversion on answered calls
    const conversionImprovement = (aiConversionRate - conversionRate) * jobsPerMonth * avgJobValue;
    
    const totalAdditionalRevenue = additionalRevenue + conversionImprovement;
    const annualIncrease = totalAdditionalRevenue * 12;
    const aiCost = 197 * 12; // Professional plan
    const netROI = ((annualIncrease - aiCost) / aiCost) * 100;
    const paybackDays = Math.ceil((aiCost / 12) / (totalAdditionalRevenue / 30));
    
    // Update display
    updateROIDisplay(totalAdditionalRevenue, annualIncrease, netROI, paybackDays);
}

function updateROIDisplay(monthly, annual, roi, payback) {
    const elements = {
        'additional-revenue': `$${monthly.toLocaleString()}`,
        'annual-increase': `$${annual.toLocaleString()}`,
        'roi-percentage': `${Math.round(roi).toLocaleString()}%`,
        'payback-period': `${payback} days`
    };
    
    Object.entries(elements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) element.textContent = value;
    });
}

// Pricing Toggle
function togglePricing() {
    const toggle = document.getElementById('pricing-toggle');
    const monthlyPrices = document.querySelectorAll('.monthly-price');
    const yearlyPrices = document.querySelectorAll('.yearly-price');
    
    if (toggle.checked) {
        monthlyPrices.forEach(price => price.classList.add('hidden'));
        yearlyPrices.forEach(price => price.classList.remove('hidden'));
    } else {
        monthlyPrices.forEach(price => price.classList.remove('hidden'));
        yearlyPrices.forEach(price => price.classList.add('hidden'));
    }
}

// Modal Functions
function openAIDemo() {
    const modal = document.getElementById('ai-demo-modal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeAIDemo() {
    const modal = document.getElementById('ai-demo-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Scroll Functions
function scrollToPlans() {
    const pricingSection = document.getElementById('pricing-plans');
    if (pricingSection) {
        pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Plan Selection
function selectPlan(planName) {
    showNotification(`Starting free trial for ${planName} plan...`, 'success');
    
    // Simulate plan selection process
    setTimeout(() => {
        alert(`🎉 Congratulations! Your ${planName} plan free trial is starting now!\n\nYou'll receive:\n• Instant AI setup\n• 30-day free trial\n• Full customer support\n• Money-back guarantee\n\nCheck your email for setup instructions!`);
    }, 1500);
}

// Feature Demos
function showFeatureDemo(feature) {
    const demos = {
        calls: "🔥 CALL HANDLING DEMO:\n\nCustomer: 'Help! My basement is flooding!'\nAI: 'I understand this is urgent! Emergency service dispatched - technician arriving in 20 minutes at your location. Stay safe!'",
        booking: "📅 BOOKING DEMO:\n\nCustomer: 'Can you fix my kitchen sink tomorrow?'\nAI: 'Absolutely! I have 9 AM, 1 PM, or 3 PM available tomorrow. Sink repair is $125. Which time works best?'",
        quotes: "💰 QUOTE DEMO:\n\nCustomer: 'How much to replace my water heater?'\nAI: 'Water heater replacement is $450 including labor and standard unit. Premium models available. Would you like to schedule an inspection?'",
        emergency: "🚨 EMERGENCY DEMO:\n\nAI detects: 'EMERGENCY KEYWORDS'\nResponse: 'Emergency detected! Dispatching nearest technician immediately. ETA: 25 minutes. Stay on line for safety instructions.'",
        followup: "📞 FOLLOW-UP DEMO:\n\nAuto message 24 hours later: 'Hi! How is your plumbing repair working? We value your feedback and offer 1-year warranty on all work!'",
        analytics: "📊 ANALYTICS DEMO:\n\nLive dashboard shows:\n• 47 calls today\n• 85% conversion rate\n• $3,240 revenue generated\n• 23 appointments booked"
    };
    
    alert(demos[feature] || 'Demo not available');
}

// Start Welcome Sequence
function startWelcomeSequence() {
    // Add initial demo message after page load
    setTimeout(() => {
        addDemoMessage('ai', "Hello! I'm PlumberBot AI, your intelligent plumbing assistant. I'm here 24/7 to help customers with emergencies, quotes, and appointments. Try asking me about any plumbing situation!");
    }, 2000);
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('ai-demo-modal');
    if (event.target === modal) {
        closeAIDemo();
    }
}

// Initialize pricing calculator listeners
document.addEventListener('DOMContentLoaded', function() {
    const calculatorInputs = ['avg-job-value', 'jobs-per-month', 'missed-calls', 'conversion-rate'];
    calculatorInputs.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('input', calculateROI);
        }
    });
});