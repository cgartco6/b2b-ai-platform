// AI Chat Consultant
class AIChatConsultant {
    constructor() {
        this.messages = [];
        this.isTyping = false;
        this.conversationContext = {
            userInterests: [],
            mentionedServices: [],
            conversationStage: 'greeting'
        };
        this.initializeChat();
    }

    initializeChat() {
        this.loadConversationHistory();
        this.setupMessageHandling();
        this.setupQuickReplies();
        this.setupChatBehavior();
    }

    setupMessageHandling() {
        const chatInput = document.getElementById('chatInput');
        const chatBody = document.getElementById('chatBody');

        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });

            // Auto-resize input
            chatInput.addEventListener('input', (e) => {
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
            });
        }

        // Auto-scroll to bottom when new messages are added
        if (chatBody) {
            const observer = new MutationObserver(() => {
                chatBody.scrollTop = chatBody.scrollHeight;
            });
            observer.observe(chatBody, { childList: true, subtree: true });
        }
    }

    setupQuickReplies() {
        this.quickReplies = [
            {
                text: "Tell me about your services",
                action: () => this.handleServiceInquiry(),
                category: 'services'
            },
            {
                text: "How does the AI system work?",
                action: () => this.handleSystemExplanation(),
                category: 'technical'
            },
            {
                text: "What are your pricing options?",
                action: () => this.handlePricingInquiry(),
                category: 'pricing'
            },
            {
                text: "Start a project",
                action: () => this.handleProjectStart(),
                category: 'onboarding'
            },
            {
                text: "Show me success stories",
                action: () => this.handleSuccessStories(),
                category: 'social_proof'
            }
        ];

        // Add quick replies after initial greeting
        setTimeout(() => {
            if (this.messages.length === 1) { // Only the initial message
                this.addQuickReplies(this.quickReplies);
            }
        }, 2000);
    }

    setupChatBehavior() {
        // Track user engagement
        this.engagementStartTime = Date.now();
        this.messageCount = 0;

        // Setup inactivity timer
        this.inactivityTimer = setTimeout(() => {
            if (this.messages.length === 1) {
                this.addMessage(
                    "Is there anything specific you'd like to know about our AI services? I'm here to help!",
                    'ai'
                );
            }
        }, 30000); // 30 seconds
    }

    async sendMessage() {
        const input = document.getElementById('chatInput');
        if (!input) return;

        const message = input.value.trim();
        if (!message) return;

        // Add user message
        this.addMessage(message, 'user');
        input.value = '';
        input.style.height = 'auto';

        // Reset inactivity timer
        this.resetInactivityTimer();

        // Track engagement
        this.messageCount++;
        this.trackEngagement();

        // Show typing indicator
        this.showTypingIndicator();

        // Process message and get AI response
        try {
            const response = await this.processMessage(message);
            this.hideTypingIndicator();
            this.addMessage(response, 'ai');
            
            // Update conversation context
            this.updateContext(message, response);
            
            // Save conversation
            this.saveConversation();

            // Add relevant quick replies
            this.addContextualQuickReplies();

        } catch (error) {
            this.hideTypingIndicator();
            this.addMessage("I apologize, but I'm experiencing technical difficulties. Please try again later.", 'ai');
            console.error('Chat error:', error);
            
            // Track error
            if (window.app) {
                window.app.trackEvent('AI Chat', 'Error', error.message);
            }
        }
    }

    async processMessage(message) {
        // Analyze message intent
        const intent = await this.analyzeIntent(message);
        
        // Track intent for analytics
        if (window.app) {
            window.app.trackEvent('AI Chat', 'Intent', intent.category);
        }

        // Generate appropriate response based on intent
        switch (intent.category) {
            case 'service_inquiry':
                return await this.handleServiceInquiry(intent.entities);
            case 'pricing':
                return await this.handlePricingInquiry(intent.entities);
            case 'technical':
                return await this.handleTechnicalQuestion(intent.entities);
            case 'onboarding':
                return await this.handleOnboarding(intent.entities);
            case 'comparison':
                return await this.handleServiceComparison(intent.entities);
            case 'support':
                return await this.handleSupportRequest(intent.entities);
            default:
                return await this.generateGeneralResponse(message, intent);
        }
    }

    async analyzeIntent(message) {
        const lowerMessage = message.toLowerCase();
        
        // Service-related intents
        if (lowerMessage.includes('service') || 
            lowerMessage.includes('what do you offer') ||
            lowerMessage.includes('what can you do')) {
            return { 
                category: 'service_inquiry', 
                entities: this.extractServiceEntities(message),
                confidence: 0.9
            };
        }
        
        // Pricing intents
        if (lowerMessage.includes('price') || 
            lowerMessage.includes('cost') || 
            lowerMessage.includes('how much') ||
            lowerMessage.includes('pricing')) {
            return { 
                category: 'pricing', 
                entities: this.extractServiceEntities(message),
                confidence: 0.85
            };
        }
        
        // Technical intents
        if ((lowerMessage.includes('how') && lowerMessage.includes('work')) ||
            lowerMessage.includes('ai system') ||
            lowerMessage.includes('automation')) {
            return { 
                category: 'technical', 
                entities: {},
                confidence: 0.8
            };
        }
        
        // Onboarding intents
        if (lowerMessage.includes('start') || 
            lowerMessage.includes('begin') || 
            lowerMessage.includes('project') ||
            lowerMessage.includes('get started')) {
            return { 
                category: 'onboarding', 
                entities: this.extractServiceEntities(message),
                confidence: 0.9
            };
        }
        
        // Comparison intents
        if (lowerMessage.includes('compare') || 
            lowerMessage.includes('difference between') ||
            lowerMessage.includes('which one')) {
            return { 
                category: 'comparison', 
                entities: this.extractServiceEntities(message),
                confidence: 0.75
            };
        }
        
        // Support intents
        if (lowerMessage.includes('help') || 
            lowerMessage.includes('support') ||
            lowerMessage.includes('problem') ||
            lowerMessage.includes('issue')) {
            return { 
                category: 'support', 
                entities: {},
                confidence: 0.8
            };
        }

        // Default to general response
        return { 
            category: 'general', 
            entities: {},
            confidence: 0.6
        };
    }

    extractServiceEntities(message) {
        const services = window.app.services || [];
        const foundServices = services.filter(service => 
            message.toLowerCase().includes(service.title.toLowerCase()) ||
            message.toLowerCase().includes(service.id.replace('-', ' '))
        );
        
        return {
            services: foundServices.length > 0 ? foundServices : null,
            specificService: foundServices.length === 1 ? foundServices[0] : null
        };
    }

    async handleServiceInquiry(entities = {}) {
        const services = entities.services ? 
            entities.services : 
            window.app.services;

        let response = "I'd be happy to tell you about our AI-powered services! 🚀\n\n";

        if (entities.specificService) {
            // Detailed information about a specific service
            const service = entities.specificService;
            response += `**${service.title}**\n\n`;
            response += `${service.description}\n\n`;
            response += `**Key Features:**\n`;
            service.features.forEach(feature => {
                response += `• ${feature}\n`;
            });
            response += `\n**AI Agents Involved:** ${service.aiAgents.join(', ')}\n`;
            response += `**Delivery Time:** ${service.deliveryTime}\n`;
            response += `**Success Rate:** ${service.successRate}\n\n`;
            response += `**Investment:** R${service.price.toLocaleString()}/${service.period}\n\n`;
            response += "Would you like to start this service, or shall I explain more about how it works?";
        } else {
            // Overview of all services
            response += "Here are our core AI services:\n\n";
            
            services.forEach(service => {
                response += `**${service.title}**\n`;
                response += `${service.description.substring(0, 100)}...\n`;
                response += `R${service.price.toLocaleString()}/${service.period}\n\n`;
            });
            
            response += "Which service would you like more details about?";
        }
        
        return response;
    }

    async handlePricingInquiry(entities = {}) {
        if (entities.specificService) {
            const service = entities.specificService;
            return `The **${service.title}** service starts at **R${service.price.toLocaleString()}** ${service.period === 'project' ? 'per project' : 'per month'}.\n\nThis includes:\n${service.features.map(f => `• ${f}`).join('\n')}\n\n💡 **Pro Tip:** Most clients see ROI within 2-3 months!\n\nWould you like me to help you start this service?`;
        } else {
            let response = "Here's our transparent pricing structure:\n\n";
            
            window.app.services.forEach(service => {
                response += `• **${service.title}:** R${service.price.toLocaleString()}/${service.period}\n`;
            });
            
            response += "\n💰 **All prices are in South African Rands (ZAR)**\n";
            response += "💳 **Payment Methods:** EFT, PayFast, Credit Card\n";
            response += "📈 **ROI Guarantee:** Most services pay for themselves within 3 months\n\n";
            response += "Which service are you most interested in? I can provide detailed pricing.";
            
            return response;
        }
    }

    async handleSystemExplanation() {
        return `🤖 **Our AI Ecosystem Explained:**\n\n` +
               `**Strategic Intelligence Core** 🧠\n` +
               `- Analyzes your business needs and creates optimal workflows\n` +
               `- Continuously optimizes processes based on performance data\n` +
               `- Makes strategic decisions about resource allocation\n\n` +
               
               `**Synthetic Intelligence Network** 🔄\n` +
               `- 50+ specialized AI agents working in coordination\n` +
               `- Each agent handles specific tasks with expert precision\n` +
               `- Real-time communication between agents\n\n` +
               
               `**Deep Learning Models** 📊\n` +
               `- Continuously learn from every interaction\n` +
               `- Improve service quality over time\n` +
               `- Adapt to your specific business context\n\n` +
               
               `**Automation Engine** ⚡\n` +
               `- 90% of operations are fully automated\n` +
               `- Human supervision only for complex decisions\n` +
               `- 24/7 operation without downtime\n\n` +
               
               `**Real-time Progress Tracking** 📱\n` +
               `- Get updates through your preferred channels\n` +
               `- Monitor every step of the process\n` +
               `- Direct communication with AI project managers\n\n` +
               
               `Would you like to know more about any specific aspect of our AI system?`;
    }

    async handleOnboarding(entities = {}) {
        const suggestedService = entities.specificService || 
                               this.conversationContext.userInterests[0] ||
                               window.app.services[0];

        return `🎉 **Excellent! Let's get your project started.**\n\n` +
               `Here's our seamless onboarding process:\n\n` +
               `**1. Service Selection** ✅\n` +
               `Based on our conversation, I recommend starting with **${suggestedService.title}**.\n\n` +
               
               `**2. Requirements Gathering** 📝\n` +
               `Tell me about your specific needs and goals.\n\n` +
               
               `**3. AI Analysis** 🤖\n` +
               `Our strategic intelligence will create a custom plan.\n\n` +
               
               `**4. Instant Start** 🚀\n` +
               `We begin immediately after payment confirmation.\n\n` +
               
               `**5. Continuous Updates** 📊\n` +
               `Receive real-time progress reports and results.\n\n` +
               
               `Would you like to:\n` +
               `• **Start with ${suggestedService.title}** (R${suggestedService.price.toLocaleString()}/${suggestedService.period})\n` +
               `• **See other service options**\n` +
               `• **Discuss your specific requirements first**\n\n` +
               `What would work best for you?`;
    }

    async handleServiceComparison(entities = {}) {
        const servicesToCompare = entities.services || 
                                 window.app.services.slice(0, 2); // Default to first two services

        if (servicesToCompare.length < 2) {
            return "I'd be happy to help you compare services! Which two services would you like to compare?";
        }

        let response = `🔍 **Service Comparison:** ${servicesToCompare[0].title} vs ${servicesToCompare[1].title}\n\n`;

        // Compare features
        response += `**Pricing:**\n`;
        response += `• ${servicesToCompare[0].title}: R${servicesToCompare[0].price.toLocaleString()}/${servicesToCompare[0].period}\n`;
        response += `• ${servicesToCompare[1].title}: R${servicesToCompare[1].price.toLocaleString()}/${servicesToCompare[1].period}\n\n`;

        response += `**Best For:**\n`;
        response += `• ${servicesToCompare[0].title}: ${this.getServiceUseCase(servicesToCompare[0])}\n`;
        response += `• ${servicesToCompare[1].title}: ${this.getServiceUseCase(servicesToCompare[1])}\n\n`;

        response += `**Delivery Time:**\n`;
        response += `• ${servicesToCompare[0].title}: ${servicesToCompare[0].deliveryTime}\n`;
        response += `• ${servicesToCompare[1].title}: ${servicesToCompare[1].deliveryTime}\n\n`;

        response += `**My Recommendation:**\n`;
        response += `${this.getComparisonRecommendation(servicesToCompare[0], servicesToCompare[1])}\n\n`;

        response += `Would you like more detailed comparison or ready to choose one?`;

        return response;
    }

    async handleSupportRequest(entities = {}) {
        return `🛠️ **I'm here to help!**\n\n` +
               `For technical support or account issues, here are your options:\n\n` +
               `**Immediate Assistance:**\n` +
               `• 📧 Email: support@synthcore.ai\n` +
               `• 📞 Phone: +27 11 123 4567\n` +
               `• 💬 Live Chat: Available 24/7\n\n` +
               
               `**Self-Help Resources:**\n` +
               `• Documentation Center\n` +
               `• Video Tutorials\n` +
               `• FAQ Section\n\n` +
               
               `**AI Service Support:**\n` +
               `• Progress tracking issues\n` +
               `• Service modifications\n` +
               `• Billing questions\n\n` +
               
               `What specific issue can I help you with today?`;
    }

    async handleSuccessStories() {
        return `🌟 **Client Success Stories**\n\n` +
               `**TechGrowth SA** 📈\n` +
               `"The AI system increased our lead generation by 300% in 2 months. The automated progress updates kept us informed every step of the way."\n\n` +
               
               `**E-Commerce Solutions** 🛒\n` +
               `"Our SEO rankings improved dramatically. The AI agents worked around the clock, providing insights we never would have found manually."\n\n` +
               
               `**DataFirst Analytics** 📊\n` +
               `"The strategic data intelligence service transformed how we make business decisions. The ROI was evident within the first month."\n\n` +
               
               `**Common Results Our Clients See:**\n` +
               `• 200-400% increase in key metrics\n` +
               `• 60% reduction in operational costs\n` +
               `• 24/7 automated service delivery\n` +
               `• Real-time progress tracking\n` +
               `• Strategic AI-driven insights\n\n` +
               
               `Ready to create your own success story? 💪`;
    }

    async generateGeneralResponse(message, intent) {
        // Context-aware general responses
        if (this.conversationContext.mentionedServices.length > 0) {
            const lastService = this.conversationContext.mentionedServices[
                this.conversationContext.mentionedServices.length - 1
            ];
            
            return `Thanks for your message! Regarding ${lastService.title}, I'd be happy to provide more details or help you get started. What would you like to know specifically?`;
        }

        // Default general responses
        const responses = [
            "I'm here to help you with our AI services. Could you tell me more about what you're looking for?",
            "That's interesting! How can I assist you with our AI-powered business solutions?",
            "I'd be happy to help. Are you looking for information about our services, pricing, or would you like to start a project?",
            "Thanks for your message! I specialize in helping businesses leverage our AI platform. What would you like to know?",
            "Great question! I can tell you about our services, how the AI system works, or help you get started. What interests you most?"
        ];
        
        return responses[Math.floor(Math.random() * responses.length)];
    }

    getServiceUseCase(service) {
        const useCases = {
            'digital-marketing': 'Businesses wanting complete marketing automation',
            'seo-optimization': 'Companies looking to dominate search rankings',
            'content-creation': 'Brands needing consistent, high-quality content',
            'web-development': 'Businesses requiring intelligent web solutions',
            'data-analysis': 'Organizations wanting data-driven insights',
            'ai-strategy': 'Companies planning AI transformation'
        };
        
        return useCases[service.id] || 'General business improvement';
    }

    getComparisonRecommendation(serviceA, serviceB) {
        if (serviceA.price < serviceB.price) {
            return `**${serviceA.title}** is more budget-friendly and perfect for getting started with AI automation.`;
        } else {
            return `**${serviceB.title}** offers advanced features that provide excellent value for the investment.`;
        }
    }

    addMessage(content, sender) {
        const chatBody = document.getElementById('chatBody');
        if (!chatBody) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}-message`;
        
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-${sender === 'ai' ? 'robot' : 'user'}"></i>
            </div>
            <div class="message-content">
                <p>${this.formatMessage(content)}</p>
            </div>
        `;
        
        chatBody.appendChild(messageDiv);
        
        // Add to messages history
        this.messages.push({ 
            content, 
            sender, 
            timestamp: new Date(),
            context: { ...this.conversationContext }
        });

        // Track message for analytics
        if (window.app && sender === 'user') {
            window.app.trackEvent('AI Chat', 'User Message', content.substring(0, 50));
        }
    }

    formatMessage(content) {
        // Convert markdown-style formatting to HTML
        return content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>')
            .replace(/•/g, '•');
    }

    addQuickReplies(replies) {
        const chatBody = document.getElementById('chatBody');
        if (!chatBody) return;

        // Remove existing quick replies
        const existingReplies = chatBody.querySelector('.quick-replies');
        if (existingReplies) {
            existingReplies.remove();
        }

        const quickRepliesDiv = document.createElement('div');
        quickRepliesDiv.className = 'quick-replies';
        
        quickRepliesDiv.innerHTML = `
            <div class="quick-replies-label">Quick options:</div>
            <div class="quick-replies-buttons">
                ${replies.map(reply => `
                    <button class="quick-reply-btn" onclick="aiChat.handleQuickReply('${reply.text}')">
                        ${reply.text}
                    </button>
                `).join('')}
            </div>
        `;
        
        chatBody.appendChild(quickRepliesDiv);
    }

    addContextualQuickReplies() {
        const lastMessage = this.messages[this.messages.length - 1];
        if (!lastMessage || lastMessage.sender !== 'ai') return;

        // Determine context-appropriate quick replies
        let contextualReplies = [];

        if (this.conversationContext.conversationStage === 'service_discussion') {
            contextualReplies = this.quickReplies.filter(reply => 
                reply.category === 'pricing' || reply.category === 'onboarding'
            );
        } else if (this.conversationContext.mentionedServices.length > 0) {
            contextualReplies = this.quickReplies.filter(reply => 
                reply.category !== 'services'
            );
        } else {
            contextualReplies = this.quickReplies;
        }

        // Add quick replies after a short delay
        setTimeout(() => {
            this.addQuickReplies(contextualReplies.slice(0, 3)); // Show max 3 replies
        }, 1000);
    }

    handleQuickReply(text) {
        const input = document.getElementById('chatInput');
        if (input) {
            input.value = text;
            this.sendMessage();
        }
        
        // Remove quick replies after selection
        const quickReplies = document.querySelector('.quick-replies');
        if (quickReplies) {
            quickReplies.remove();
        }

        // Track quick reply usage
        if (window.app) {
            window.app.trackEvent('AI Chat', 'Quick Reply', text);
        }
    }

    showTypingIndicator() {
        this.isTyping = true;
        const chatBody = document.getElementById('chatBody');
        if (!chatBody) return;

        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-message ai-message typing-indicator';
        typingDiv.id = 'typingIndicator';
        
        typingDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        
        chatBody.appendChild(typingDiv);
    }

    hideTypingIndicator() {
        this.isTyping = false;
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    resetInactivityTimer() {
        clearTimeout(this.inactivityTimer);
        this.inactivityTimer = setTimeout(() => {
            if (this.messages.length > 1) {
                this.addMessage(
                    "Is there anything else I can help you with today?",
                    'ai'
                );
            }
        }, 60000); // 1 minute
    }

    trackEngagement() {
        const engagementDuration = Date.now() - this.engagementStartTime;
        
        if (window.app && this.messageCount === 3) {
            window.app.trackEvent('AI Chat', 'Engagement', `3 messages in ${Math.round(engagementDuration/1000)}s`);
        }
    }

    updateContext(userMessage, aiResponse) {
        // Extract mentioned services
        const mentionedServices = this.extractServiceEntities(userMessage).services;
        if (mentionedServices) {
            mentionedServices.forEach(service => {
                if (!this.conversationContext.mentionedServices.find(s => s.id === service.id)) {
                    this.conversationContext.mentionedServices.push(service);
                }
            });
        }

        // Update user interests based on message content
        if (userMessage.toLowerCase().includes('interested') || 
            userMessage.toLowerCase().includes('want to') ||
            userMessage.toLowerCase().includes('looking for')) {
            
            const services = this.extractServiceEntities(userMessage).services;
            if (services) {
                this.conversationContext.userInterests = [
                    ...this.conversationContext.userInterests,
                    ...services.map(s => s.id)
                ].filter((v, i, a) => a.indexOf(v) === i); // Remove duplicates
            }
        }

        // Update conversation stage
        if (userMessage.toLowerCase().includes('start') || 
            userMessage.toLowerCase().includes('begin') ||
            userMessage.toLowerCase().includes('get started')) {
            this.conversationContext.conversationStage = 'onboarding';
        } else if (this.conversationContext.mentionedServices.length > 0) {
            this.conversationContext.conversationStage = 'service_discussion';
        }

        this.conversationContext.lastInteraction = new Date().toISOString();
    }

    saveConversation() {
        const conversation = {
            messages: this.messages,
            context: this.conversationContext,
            savedAt: new Date().toISOString(),
            messageCount: this.messageCount,
            engagementDuration: Date.now() - this.engagementStartTime
        };
        
        localStorage.setItem('aiChatConversation', JSON.stringify(conversation));
    }

    loadConversationHistory() {
        const saved = localStorage.getItem('aiChatConversation');
        if (saved) {
            try {
                const conversation = JSON.parse(saved);
                this.messages = conversation.messages || [];
                this.conversationContext = conversation.context || {};
                this.messageCount = conversation.messageCount || 0;
                
                // Reload messages into UI
                this.messages.forEach(msg => {
                    this.addMessage(msg.content, msg.sender);
                });

                // Add quick replies if conversation is recent
                if (this.messages.length > 0) {
                    setTimeout(() => {
                        this.addContextualQuickReplies();
                    }, 1000);
                }
            } catch (error) {
                console.error('Error loading conversation history:', error);
                this.messages = [];
                this.conversationContext = {};
            }
        }
    }

    clearConversation() {
        this.messages = [];
        this.conversationContext = {
            userInterests: [],
            mentionedServices: [],
            conversationStage: 'greeting'
        };
        
        const chatBody = document.getElementById('chatBody');
        if (chatBody) {
            chatBody.innerHTML = '';
        }
        
        localStorage.removeItem('aiChatConversation');
        
        // Restart with greeting
        this.addMessage(
            "Hello! I'm your AI business consultant. I can help you choose the right services, provide pricing, and even start your project immediately. How can I assist you today?",
            'ai'
        );
    }

    // Method to start service onboarding directly
    startServiceOnboarding(serviceId) {
        const service = window.app.services.find(s => s.id === serviceId);
        if (!service) return;

        this.addMessage(
            `I see you're interested in ${service.title}. Let me help you get started!`,
            'ai'
        );

        setTimeout(() => {
            this.handleOnboarding({ specificService: service });
        }, 1000);
    }
}

// Global function for HTML onclick
function sendMessage() {
    if (window.aiChat) {
        window.aiChat.sendMessage();
    }
}

// Initialize AI chat when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.aiChat = new AIChatConsultant();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AIChatConsultant;
}
