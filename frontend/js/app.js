// Main Application JavaScript
class SynthCoreApp {
    constructor() {
        this.currentUser = null;
        this.services = [];
        this.isInitialized = false;
        this.init();
    }

    async init() {
        await this.setupEventListeners();
        await this.loadServices();
        this.setupScrollAnimations();
        await this.checkAuthStatus();
        this.setupServiceWorker();
        this.isInitialized = true;
        
        console.log('SynthCore AI Platform initialized');
    }

    async setupEventListeners() {
        // Mobile navigation toggle
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });

            // Close mobile menu when clicking on links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                });
            });
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu && navToggle && !navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Navbar background on scroll
        window.addEventListener('scroll', this.handleScroll.bind(this));

        // Handle page visibility changes
        document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));

        // Handle online/offline status
        window.addEventListener('online', this.handleOnlineStatus.bind(this));
        window.addEventListener('offline', this.handleOfflineStatus.bind(this));

        // Login form handling
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', this.handleLogin.bind(this));
        }
    }

    handleScroll() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = 'var(--shadow)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }

    handleVisibilityChange() {
        if (document.hidden) {
            document.title = '👋 Come back to SynthCore AI';
        } else {
            document.title = 'SynthCore AI - Advanced B2B AI Services Platform';
        }
    }

    handleOnlineStatus() {
        this.showNotification('Connection restored', 'success');
        // Reload services if needed
        if (this.services.length === 0) {
            this.loadServices();
        }
    }

    handleOfflineStatus() {
        this.showNotification('You are currently offline', 'warning');
    }

    async handleLogin(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');

        try {
            // Simulate API call
            await this.simulateAPICall(1000);
            
            this.currentUser = {
                email: email,
                name: email.split('@')[0],
                company: 'Demo Company'
            };
            
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            this.showNotification('Successfully signed in!', 'success');
            this.closeLoginModal();
            
            // Update UI for logged in state
            this.updateAuthUI();
            
        } catch (error) {
            this.showNotification('Login failed. Please try again.', 'error');
        }
    }

    async simulateAPICall(delay) {
        return new Promise(resolve => setTimeout(resolve, delay));
    }

    async loadServices() {
        try {
            // Show loading state
            this.showLoadingState();
            
            // In a real app, this would be an API call
            this.services = await this.fetchServices();
            this.renderServices();
            
            // Hide loading state
            this.hideLoadingState();
            
        } catch (error) {
            console.error('Failed to load services:', error);
            this.renderError('Failed to load services. Please try again later.');
            this.hideLoadingState();
        }
    }

    async fetchServices() {
        // Mock data - in production, this would come from your API
        return [
            {
                id: 'digital-marketing',
                title: 'AI Digital Marketing',
                description: 'Complete digital marketing campaigns powered by AI. Our synthetic intelligence analyzes market trends, creates targeted content, and optimizes campaigns in real-time.',
                icon: 'fas fa-bullseye',
                features: [
                    'AI-powered market analysis',
                    'Automated content creation',
                    'Real-time campaign optimization',
                    'Multi-channel strategy execution',
                    'Performance analytics and reporting'
                ],
                price: 4999,
                period: 'month',
                aiAgents: ['Strategic Marketing AI', 'Content Creation Agent', 'Analytics Engine'],
                category: 'marketing',
                deliveryTime: '2-4 weeks',
                successRate: '95%'
            },
            {
                id: 'seo-optimization',
                title: 'Intelligent SEO Optimization',
                description: 'Advanced SEO services using deep learning algorithms to analyze search patterns, optimize content, and improve rankings automatically.',
                icon: 'fas fa-search',
                features: [
                    'Deep learning keyword analysis',
                    'Automated technical SEO audits',
                    'Content optimization algorithms',
                    'Competitor intelligence tracking',
                    'Continuous ranking monitoring'
                ],
                price: 3499,
                period: 'month',
                aiAgents: ['SEO Analysis Agent', 'Content Optimizer', 'Ranking Monitor'],
                category: 'marketing',
                deliveryTime: '3-6 weeks',
                successRate: '92%'
            },
            {
                id: 'content-creation',
                title: 'Synthetic Content Creation',
                description: 'AI-generated content that matches your brand voice. Our deep learning models create engaging, original content across all platforms.',
                icon: 'fas fa-pen-fancy',
                features: [
                    'Brand voice learning and replication',
                    'Multi-format content generation',
                    'SEO-optimized writing',
                    'Visual content creation',
                    'Content calendar management'
                ],
                price: 2999,
                period: 'month',
                aiAgents: ['Content Generation AI', 'Brand Voice Analyzer', 'Quality Assurance Agent'],
                category: 'marketing',
                deliveryTime: '1-2 weeks',
                successRate: '98%'
            },
            {
                id: 'web-development',
                title: 'AI-Assisted Web Development',
                description: 'Intelligent web development with AI code generation, automated testing, and continuous optimization based on user behavior analysis.',
                icon: 'fas fa-code',
                features: [
                    'AI code generation and review',
                    'Automated testing and deployment',
                    'User experience optimization',
                    'Performance monitoring',
                    'Security vulnerability detection'
                ],
                price: 7999,
                period: 'project',
                aiAgents: ['Code Generation AI', 'Testing Automation', 'UX Optimization Engine'],
                category: 'development',
                deliveryTime: '4-8 weeks',
                successRate: '96%'
            },
            {
                id: 'data-analysis',
                title: 'Strategic Data Intelligence',
                description: 'Transform your data into actionable insights with our advanced AI analytics platform. Predictive modeling and strategic recommendations included.',
                icon: 'fas fa-chart-bar',
                features: [
                    'Predictive analytics modeling',
                    'Automated data cleaning',
                    'Real-time dashboard creation',
                    'Strategic insight generation',
                    'Custom reporting automation'
                ],
                price: 5999,
                period: 'month',
                aiAgents: ['Data Analysis Engine', 'Predictive Modeler', 'Insight Generator'],
                category: 'analytics',
                deliveryTime: '2-3 weeks',
                successRate: '94%'
            },
            {
                id: 'ai-strategy',
                title: 'AI Business Transformation',
                description: 'Complete AI integration strategy for your business. Our strategic intelligence designs and implements AI solutions tailored to your needs.',
                icon: 'fas fa-chess-queen',
                features: [
                    'Business process analysis',
                    'AI solution architecture',
                    'Implementation roadmap',
                    'ROI optimization',
                    'Continuous improvement cycle'
                ],
                price: 12999,
                period: 'consultation',
                aiAgents: ['Strategic Intelligence Core', 'Business Analysis AI', 'Implementation Orchestrator'],
                category: 'strategy',
                deliveryTime: 'Custom',
                successRate: '99%'
            }
        ];
    }

    showLoadingState() {
        const grid = document.getElementById('servicesGrid');
        if (grid) {
            grid.innerHTML = `
                <div class="loading-state">
                    <div class="spinner"></div>
                    <p>Loading AI services...</p>
                </div>
            `;
        }
    }

    hideLoadingState() {
        // Loading state is replaced when services are rendered
    }

    renderServices() {
        const grid = document.getElementById('servicesGrid');
        if (!grid) return;

        grid.innerHTML = this.services.map(service => `
            <div class="service-card scroll-trigger" data-service="${service.id}" data-category="${service.category}">
                <div class="service-icon">
                    <i class="${service.icon}"></i>
                </div>
                <h3 class="service-title">${service.title}</h3>
                <p class="service-description">${service.description}</p>
                
                <div class="service-meta">
                    <span class="service-delivery">
                        <i class="fas fa-clock"></i> ${service.deliveryTime}
                    </span>
                    <span class="service-success">
                        <i class="fas fa-chart-line"></i> ${service.successRate} success rate
                    </span>
                </div>
                
                <ul class="service-features">
                    ${service.features.map(feature => `
                        <li><i class="fas fa-check"></i> ${feature}</li>
                    `).join('')}
                </ul>
                
                <div class="service-ai-agents">
                    <strong>AI Agents:</strong> ${service.aiAgents.join(', ')}
                </div>
                
                <div class="service-pricing">
                    <div class="price">
                        R ${service.price.toLocaleString()}
                        <span class="price-period">/${service.period}</span>
                    </div>
                    <button class="btn-primary" onclick="app.requestService('${service.id}')">
                        Start Project <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        `).join('');

        // Add animation triggers
        this.setupServiceCardAnimations();
        
        // Setup filter functionality
        this.setupServiceFilters();
    }

    setupServiceCardAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        document.querySelectorAll('.service-card').forEach(card => {
            observer.observe(card);
        });
    }

    setupServiceFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.dataset.category;
                
                // Update active state
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter services
                this.filterServices(category);
            });
        });
    }

    filterServices(category) {
        const services = document.querySelectorAll('.service-card');
        
        services.forEach(card => {
            if (category === 'all') {
                card.style.display = 'block';
            } else {
                const serviceCategory = card.dataset.category;
                if (serviceCategory === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            }
        });

        // Re-trigger animations for visible cards
        setTimeout(() => {
            services.forEach(card => {
                if (card.style.display !== 'none') {
                    card.classList.add('visible');
                }
            });
        }, 50);
    }

    setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe all animate-able elements
        document.querySelectorAll('.step, .payment-method, .testimonial-card').forEach(el => {
            observer.observe(el);
        });
    }

    async requestService(serviceId) {
        const service = this.services.find(s => s.id === serviceId);
        if (!service) return;

        if (!this.currentUser) {
            this.showLoginModal(service);
        } else {
            this.showServiceRequestModal(service);
        }
    }

    showLoginModal(service) {
        const modal = document.getElementById('loginModal');
        if (modal) {
            modal.classList.add('open');
            // Store service context for after login
            modal.dataset.serviceId = service.id;
        }
    }

    closeLoginModal() {
        const modal = document.getElementById('loginModal');
        if (modal) {
            modal.classList.remove('open');
        }
    }

    showSignupForm() {
        // Switch to signup form - implementation would go here
        console.log('Switch to signup form');
    }

    showServiceRequestModal(service) {
        // Implementation for service request modal
        this.showNotification(`Starting ${service.title} project...`, 'success');
        
        // Simulate AI consultation
        setTimeout(() => {
            if (window.aiChat) {
                window.aiChat.addMessage(
                    `I see you're interested in ${service.title}. I can help you get started immediately! What specific requirements do you have?`,
                    'ai'
                );
                openAIChat();
            }
        }, 1000);
    }

    renderError(message) {
        const grid = document.getElementById('servicesGrid');
        if (grid) {
            grid.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h3>Service Unavailable</h3>
                    <p>${message}</p>
                    <button class="btn-primary" onclick="app.loadServices()">
                        <i class="fas fa-redo"></i> Try Again
                    </button>
                </div>
            `;
        }
    }

    async checkAuthStatus() {
        // Check if user is logged in
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            try {
                this.currentUser = JSON.parse(savedUser);
                this.updateAuthUI();
            } catch (error) {
                localStorage.removeItem('currentUser');
            }
        }
    }

    updateAuthUI() {
        // Update UI elements based on auth status
        const dashboardBtn = document.querySelector('.nav-menu .btn-primary');
        if (dashboardBtn && this.currentUser) {
            dashboardBtn.innerHTML = `<i class="fas fa-user"></i> ${this.currentUser.name}`;
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type} notification-pop`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;

        // Add styles for notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            padding: 1rem 1.5rem;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-lg);
            display: flex;
            align-items: center;
            gap: 1rem;
            z-index: 3000;
            border-left: 4px solid ${this.getNotificationColor(type)};
            max-width: 400px;
        `;

        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }

    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    getNotificationColor(type) {
        const colors = {
            success: 'var(--success)',
            error: 'var(--error)',
            warning: 'var(--warning)',
            info: 'var(--primary)'
        };
        return colors[type] || 'var(--primary)';
    }

    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                // In production, you would register your service worker here
                // navigator.serviceWorker.register('/sw.js');
            });
        }
    }

    // Utility method for API calls
    async apiCall(endpoint, options = {}) {
        const baseURL = 'https://api.synthcore.ai'; // Replace with your API URL
        const url = `${baseURL}${endpoint}`;
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        };

        if (config.body && typeof config.body === 'object') {
            config.body = JSON.stringify(config.body);
        }

        try {
            const response = await fetch(url, config);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('API call failed:', error);
            throw error;
        }
    }

    // Performance monitoring
    trackEvent(category, action, label) {
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                event_category: category,
                event_label: label
            });
        }
        
        // Custom analytics
        console.log(`Track: ${category} - ${action} - ${label}`);
    }
}

// Global functions for HTML onclick handlers
function scrollToServices() {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
        const offsetTop = servicesSection.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        // Track analytics
        if (window.app) {
            window.app.trackEvent('Navigation', 'Scroll to Services', 'Hero Button');
        }
    }
}

function openAIChat() {
    const chatWidget = document.getElementById('aiChatWidget');
    if (chatWidget) {
        chatWidget.classList.add('open');
        
        // Track analytics
        if (window.app) {
            window.app.trackEvent('AI Chat', 'Open', 'Header Button');
        }
    }
}

function toggleChat() {
    const chatWidget = document.getElementById('aiChatWidget');
    const toggleIcon = document.getElementById('chatToggleIcon');
    
    if (chatWidget) {
        chatWidget.classList.toggle('open');
        
        if (toggleIcon) {
            if (chatWidget.classList.contains('open')) {
                toggleIcon.className = 'fas fa-chevron-down';
            } else {
                toggleIcon.className = 'fas fa-chevron-up';
            }
        }
    }
}

function openDashboard() {
    const modal = document.getElementById('dashboardModal');
    if (modal) {
        modal.classList.add('open');
        
        // Initialize dashboard if needed
        if (window.dashboard) {
            window.dashboard.initializeDashboard();
        }
        
        // Track analytics
        if (window.app) {
            window.app.trackEvent('Dashboard', 'Open', 'Navigation');
        }
    }
}

function closeDashboard() {
    const modal = document.getElementById('dashboardModal');
    if (modal) {
        modal.classList.remove('open');
    }
}

function closeLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.classList.remove('open');
    }
}

function showSignupForm() {
    // Implementation for showing signup form
    console.log('Show signup form');
}

function switchTab(tabName) {
    if (window.dashboard) {
        window.dashboard.switchTab(tabName);
    }
}

function sendMessage() {
    if (window.aiChat) {
        window.aiChat.sendMessage();
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new SynthCoreApp();
});

// Handle page unload
window.addEventListener('beforeunload', () => {
    // Cleanup or save state if needed
    if (window.app && window.app.currentUser) {
        localStorage.setItem('currentUser', JSON.stringify(window.app.currentUser));
    }
});

// Export for module usage if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SynthCoreApp;
}
