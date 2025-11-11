// Client Dashboard Management
class ClientDashboard {
    constructor() {
        this.activeServices = [];
        this.completedServices = [];
        this.paymentHistory = [];
        this.userProfile = null;
        this.realTimeUpdates = null;
        this.initializeDashboard();
    }

    async initializeDashboard() {
        await this.loadUserData();
        this.setupDashboardTabs();
        this.renderDashboard();
        this.setupRealTimeUpdates();
        this.setupDashboardEvents();
    }

    async loadUserData() {
        // Load user's services and data
        try {
            const userData = await this.fetchUserData();
            this.activeServices = userData.activeServices || [];
            this.completedServices = userData.completedServices || [];
            this.paymentHistory = userData.paymentHistory || [];
            this.userProfile = userData.userProfile || null;
            
            // Update payment history from payment handler if available
            if (window.paymentHandler) {
                this.paymentHistory = window.paymentHandler.transactionHistory;
            }
        } catch (error) {
            console.error('Failed to load user data:', error);
            this.loadDemoData();
        }
    }

    async fetchUserData() {
        // In production, this would be an API call
        // For demo, we'll use stored data or generate demo data
        const savedData = localStorage.getItem('userDashboardData');
        if (savedData) {
            return JSON.parse(savedData);
        }
        
        return this.generateDemoData();
    }

    generateDemoData() {
        const demoActiveServices = [
            {
                id: 'sr-001',
                service: 'digital-marketing',
                title: 'AI Digital Marketing Campaign',
                status: 'in-progress',
                progress: 65,
                startDate: '2024-01-15',
                estimatedCompletion: '2024-02-28',
                aiAgents: [
                    'Strategic Marketing AI',
                    'Content Creation Agent', 
                    'Analytics Engine',
                    'Performance Optimizer'
                ],
                updates: [
                    {
                        id: 'up-001',
                        date: '2024-01-20',
                        message: 'Market analysis completed by Strategic AI. Identified 3 key opportunity areas.',
                        agent: 'Market Analysis Agent',
                        type: 'progress',
                        important: true
                    },
                    {
                        id: 'up-002',
                        date: '2024-01-25',
                        message: 'Content strategy approved and execution started. First campaign launched.',
                        agent: 'Content Strategy AI',
                        type: 'milestone',
                        important: true
                    },
                    {
                        id: 'up-003',
                        date: '2024-01-28',
                        message: 'Performance optimization in progress. Current CTR: 4.2%.',
                        agent: 'Analytics Engine',
                        type: 'update',
                        important: false
                    }
                ],
                metrics: {
                    leadsGenerated: 45,
                    conversionRate: '4.2%',
                    roi: '127%',
                    budgetSpent: 3200
                }
            },
            {
                id: 'sr-002',
                service: 'seo-optimization',
                title: 'Intelligent SEO Optimization',
                status: 'pending',
                progress: 0,
                startDate: '2024-01-18',
                estimatedCompletion: '2024-03-15',
                aiAgents: ['SEO Analysis Agent', 'Content Optimizer'],
                updates: [],
                metrics: {}
            }
        ];

        const demoCompletedServices = [
            {
                id: 'sr-003',
                service: 'content-creation',
                title: 'Synthetic Content Creation',
                status: 'completed',
                progress: 100,
                startDate: '2023-12-01',
                completedDate: '2023-12-20',
                aiAgents: ['Content Generation AI', 'Quality Assurance Agent'],
                rating: 5,
                feedback: 'Excellent quality and fast delivery. The AI perfectly captured our brand voice.'
            }
        ];

        const demoUserProfile = {
            name: 'Demo User',
            email: 'demo@synthcore.ai',
            company: 'Demo Company',
            joinDate: '2024-01-01',
            preferences: {
                notifications: true,
                updateFrequency: 'daily',
                communication: ['email', 'in-app']
            }
        };

        return {
            activeServices: demoActiveServices,
            completedServices: demoCompletedServices,
            paymentHistory: [],
            userProfile: demoUserProfile
        };
    }

    loadDemoData() {
        const demoData = this.generateDemoData();
        this.activeServices = demoData.activeServices;
        this.completedServices = demoData.completedServices;
        this.userProfile = demoData.userProfile;
    }

    setupDashboardTabs() {
        const tabs = document.querySelectorAll('.dashboard-tabs button');
        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                const tabName = e.target.textContent.toLowerCase().replace(' ', '');
                this.switchTab(tabName);
                
                // Update active tab
                tabs.forEach(t => t.classList.remove('tab-active'));
                e.target.classList.add('tab-active');
                
                // Track analytics
                if (window.app) {
                    window.app.trackEvent('Dashboard', 'Tab Switch', tabName);
                }
            });
        });
    }

    switchTab(tabName) {
        // Hide all tab contents
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        // Show selected tab content
        const targetTab = document.getElementById(tabName + 'Tab');
        if (targetTab) {
            targetTab.classList.add('active');
            this.renderTabContent(tabName);
        }
    }

    setupDashboardEvents() {
        // Refresh button
        const refreshBtn = document.querySelector('.dashboard-refresh');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                this.refreshDashboard();
            });
        }

        // Service action buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.view-service-details')) {
                const serviceId = e.target.closest('.view-service-details').dataset.serviceId;
                this.viewServiceDetails(serviceId);
            }
            
            if (e.target.closest('.contact-ai-agent')) {
                const serviceId = e.target.closest('.contact-ai-agent').dataset.serviceId;
                this.contactAIAgent(serviceId);
            }
            
            if (e.target.closest('.download-report')) {
                const serviceId = e.target.closest('.download-report').dataset.serviceId;
                this.downloadServiceReport(serviceId);
            }
        });

        // Export data functionality
        const exportBtn = document.querySelector('.export-data');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                this.exportDashboardData();
            });
        }
    }

    renderDashboard() {
        this.renderServicesTab();
        this.renderProgressTab();
        this.renderPaymentsTab();
        this.renderOverviewStats();
    }

    renderOverviewStats() {
        const stats = this.calculateOverviewStats();
        const statsContainer = document.querySelector('.dashboard-overview');
        
        if (statsContainer) {
            statsContainer.innerHTML = `
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-rocket"></i>
                        </div>
                        <div class="stat-content">
                            <div class="stat-value">${stats.activeProjects}</div>
                            <div class="stat-label">Active Projects</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <div class="stat-content">
                            <div class="stat-value">${stats.completedProjects}</div>
                            <div class="stat-label">Completed</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-robot"></i>
                        </div>
                        <div class="stat-content">
                            <div class="stat-value">${stats.activeAgents}</div>
                            <div class="stat-label">AI Agents</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-chart-line"></i>
                        </div>
                        <div class="stat-content">
                            <div class="stat-value">${stats.successRate}</div>
                            <div class="stat-label">Success Rate</div>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    calculateOverviewStats() {
        const activeProjects = this.activeServices.length;
        const completedProjects = this.completedServices.length;
        
        const activeAgents = this.activeServices.reduce((total, service) => {
            return total + (service.aiAgents ? service.aiAgents.length : 0);
        }, 0);
        
        const successRate = completedProjects > 0 ? 
            Math.round((completedProjects / (completedProjects + this.activeServices.filter(s => s.status === 'failed').length)) * 100) + '%' : 
            '100%';

        return {
            activeProjects,
            completedProjects,
            activeAgents,
            successRate
        };
    }

    renderServicesTab() {
        const tab = document.getElementById('servicesTab');
        if (!tab) return;

        tab.innerHTML = `
            <div class="dashboard-section">
                <div class="section-header">
                    <h3>Active Services</h3>
                    <button class="btn-secondary btn-small" onclick="dashboard.requestNewService()">
                        <i class="fas fa-plus"></i> New Service
                    </button>
                </div>
                <div class="services-list">
                    ${this.activeServices.length > 0 ? 
                        this.activeServices.map(service => this.renderServiceCard(service)).join('') :
                        this.renderEmptyState('active')
                    }
                </div>
            </div>
            
            <div class="dashboard-section">
                <div class="section-header">
                    <h3>Completed Services</h3>
                    <span class="section-badge">${this.completedServices.length}</span>
                </div>
                <div class="services-list">
                    ${this.completedServices.length > 0 ? 
                        this.completedServices.map(service => this.renderServiceCard(service)).join('') :
                        this.renderEmptyState('completed')
                    }
                </div>
            </div>
        `;
    }

    renderServiceCard(service) {
        const serviceInfo = window.app.services.find(s => s.id === service.service);
        const isActive = service.status === 'in-progress';
        const isCompleted = service.status === 'completed';

        return `
            <div class="service-dashboard-card ${isCompleted ? 'completed' : ''}" data-service="${service.id}">
                <div class="service-header">
                    <div class="service-info">
                        <h4>${service.title}</h4>
                        <div class="service-meta">
                            <span class="service-status ${service.status}">${service.status}</span>
                            <span class="service-date">Started: ${service.startDate}</span>
                            ${isCompleted ? 
                                `<span class="service-date">Completed: ${service.completedDate}</span>` :
                                `<span class="service-date">Est. Completion: ${service.estimatedCompletion}</span>`
                            }
                        </div>
                    </div>
                    <div class="service-progress">
                        <div class="progress-bar ${isCompleted ? 'completed' : ''}">
                            <div class="progress" style="width: ${service.progress}%"></div>
                        </div>
                        <span class="progress-text">${service.progress}% complete</span>
                    </div>
                </div>
                
                ${service.metrics && Object.keys(service.metrics).length > 0 ? `
                    <div class="service-metrics">
                        <h5>Current Metrics</h5>
                        <div class="metrics-grid">
                            ${Object.entries(service.metrics).map(([key, value]) => `
                                <div class="metric">
                                    <span class="metric-label">${this.formatMetricLabel(key)}</span>
                                    <span class="metric-value">${value}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
                
                <div class="service-details">
                    <div class="detail">
                        <strong>AI Agents:</strong> 
                        <div class="ai-agents-tags">
                            ${service.aiAgents.map(agent => `
                                <span class="ai-agent-tag">${agent}</span>
                            `).join('')}
                        </div>
                    </div>
                </div>
                
                ${service.updates && service.updates.length > 0 ? `
                    <div class="service-updates">
                        <h5>Recent Updates</h5>
                        ${service.updates.slice(0, 2).map(update => `
                            <div class="update ${update.important ? 'important' : ''}">
                                <div class="update-header">
                                    <span class="update-date">${update.date}</span>
                                    <span class="update-type">${update.type}</span>
                                </div>
                                <div class="update-message">${update.message}</div>
                                <div class="update-agent">by ${update.agent}</div>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
                
                <div class="service-actions">
                    <button class="btn-secondary view-service-details" data-service-id="${service.id}">
                        <i class="fas fa-eye"></i> View Details
                    </button>
                    <button class="btn-secondary contact-ai-agent" data-service-id="${service.id}">
                        <i class="fas fa-robot"></i> Contact AI Agent
                    </button>
                    ${isCompleted ? `
                        <button class="btn-primary download-report" data-service-id="${service.id}">
                            <i class="fas fa-download"></i> Download Report
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
    }

    renderEmptyState(type) {
        const messages = {
            active: {
                title: 'No Active Services',
                message: 'You don\'t have any active services right now.',
                action: 'Start your first project',
                icon: 'fas fa-rocket'
            },
            completed: {
                title: 'No Completed Services',
                message: 'Your completed services will appear here.',
                action: 'View available services',
                icon: 'fas fa-check-circle'
            }
        };

        const state = messages[type] || messages.active;

        return `
            <div class="empty-state">
                <div class="empty-icon">
                    <i class="${state.icon}"></i>
                </div>
                <h4>${state.title}</h4>
                <p>${state.message}</p>
                <button class="btn-primary" onclick="dashboard.requestNewService()">
                    ${state.action}
                </button>
            </div>
        `;
    }

    renderProgressTab() {
        const tab = document.getElementById('progressTab');
        if (!tab) return;

        const activeServices = this.activeServices.filter(s => s.status === 'in-progress');

        tab.innerHTML = `
            <div class="dashboard-section">
                <h3>Progress Timeline</h3>
                <div class="progress-timeline">
                    ${activeServices.length > 0 ? 
                        activeServices.map(service => this.renderProgressTimeline(service)).join('') :
                        '<div class="empty-state">No active projects to track</div>'
                    }
                </div>
            </div>
            
            <div class="dashboard-section">
                <h3>Performance Metrics</h3>
                <div class="performance-metrics">
                    ${this.renderPerformanceMetrics()}
                </div>
            </div>
        `;
    }

    renderProgressTimeline(service) {
        return `
            <div class="timeline-service">
                <div class="timeline-header">
                    <h4>${service.title}</h4>
                    <span class="progress-badge">${service.progress}%</span>
                </div>
                <div class="timeline-steps">
                    ${this.generateTimelineSteps(service)}
                </div>
            </div>
        `;
    }

    generateTimelineSteps(service) {
        const steps = [
            { name: 'Planning', progress: 100 },
            { name: 'Analysis', progress: service.progress >= 25 ? 100 : Math.max(0, service.progress - 0) },
            { name: 'Execution', progress: service.progress >= 50 ? 100 : Math.max(0, service.progress - 25) },
            { name: 'Optimization', progress: service.progress >= 75 ? 100 : Math.max(0, service.progress - 50) },
            { name: 'Completion', progress: service.progress >= 100 ? 100 : Math.max(0, service.progress - 75) }
        ];

        return steps.map(step => `
            <div class="timeline-step ${step.progress === 100 ? 'completed' : ''}">
                <div class="step-indicator">
                    ${step.progress === 100 ? '<i class="fas fa-check"></i>' : ''}
                </div>
                <div class="step-content">
                    <div class="step-name">${step.name}</div>
                    <div class="step-progress">
                        <div class="step-progress-bar">
                            <div class="step-progress-fill" style="width: ${step.progress}%"></div>
                        </div>
                        <span>${step.progress}%</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderPerformanceMetrics() {
        const metrics = this.calculatePerformanceMetrics();
        
        return `
            <div class="metrics-grid">
                <div class="metric-card">
                    <div class="metric-header">
                        <i class="fas fa-bolt"></i>
                        <h5>Efficiency</h5>
                    </div>
                    <div class="metric-value">${metrics.efficiency}%</div>
                    <div class="metric-description">AI agent performance</div>
                </div>
                <div class="metric-card">
                    <div class="metric-header">
                        <i class="fas fa-clock"></i>
                        <h5>On Time Delivery</h5>
                    </div>
                    <div class="metric-value">${metrics.onTimeDelivery}%</div>
                    <div class="metric-description">Projects completed on schedule</div>
                </div>
                <div class="metric-card">
                    <div class="metric-header">
                        <i class="fas fa-chart-line"></i>
                        <h5>Quality Score</h5>
                    </div>
                    <div class="metric-value">${metrics.qualityScore}%</div>
                    <div class="metric-description">Client satisfaction rating</div>
                </div>
                <div class="metric-card">
                    <div class="metric-header">
                        <i class="fas fa-robot"></i>
                        <h5>Automation Rate</h5>
                    </div>
                    <div class="metric-value">${metrics.automationRate}%</div>
                    <div class="metric-description">Tasks handled by AI</div>
                </div>
            </div>
        `;
    }

    calculatePerformanceMetrics() {
        // Calculate based on service data
        const totalServices = this.activeServices.length + this.completedServices.length;
        const completedOnTime = this.completedServices.filter(s => {
            const estDate = new Date(s.estimatedCompletion);
            const actualDate = new Date(s.completedDate);
            return actualDate <= estDate;
        }).length;

        return {
            efficiency: 92,
            onTimeDelivery: totalServices > 0 ? Math.round((completedOnTime / totalServices) * 100) : 100,
            qualityScore: 96,
            automationRate: 90
        };
    }

    renderPaymentsTab() {
        const tab = document.getElementById('paymentsTab');
        if (!tab) return;

        const stats = window.paymentHandler ? 
            window.paymentHandler.getTransactionStats() : 
            this.calculatePaymentStats();

        tab.innerHTML = `
            <div class="dashboard-section">
                <h3>Payment Overview</h3>
                <div class="payment-stats">
                    <div class="stat-card">
                        <div class="stat-icon revenue">
                            <i class="fas fa-money-bill-wave"></i>
                        </div>
                        <div class="stat-content">
                            <div class="stat-value">R ${stats.weeklyRevenue.toLocaleString()}</div>
                            <div class="stat-label">Weekly Revenue</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon payout">
                            <i class="fas fa-hand-holding-usd"></i>
                        </div>
                        <div class="stat-content">
                            <div class="stat-value">R ${stats.ownerPayout.toLocaleString()}</div>
                            <div class="stat-label">Owner Payout (50%)</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon transactions">
                            <i class="fas fa-receipt"></i>
                        </div>
                        <div class="stat-content">
                            <div class="stat-value">${stats.transactionCount}</div>
                            <div class="stat-label">Transactions</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon platform">
                            <i class="fas fa-chart-bar"></i>
                        </div>
                        <div class="stat-content">
                            <div class="stat-value">R ${stats.platformRevenue.toLocaleString()}</div>
                            <div class="stat-label">Platform Revenue</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="dashboard-section">
                <div class="section-header">
                    <h3>Recent Transactions</h3>
                    <button class="btn-secondary btn-small" onclick="dashboard.exportTransactions()">
                        <i class="fas fa-download"></i> Export
                    </button>
                </div>
                <div class="payment-list">
                    ${this.paymentHistory.length > 0 ? 
                        this.paymentHistory.slice(0, 10).map(payment => this.renderPaymentItem(payment)).join('') :
                        this.renderEmptyPaymentState()
                    }
                </div>
            </div>
            
            <div class="dashboard-section">
                <h3>Payout Schedule</h3>
                <div class="payout-schedule">
                    <div class="schedule-card">
                        <div class="schedule-header">
                            <i class="fas fa-calendar-check"></i>
                            <h4>Next Owner Payout</h4>
                        </div>
                        <div class="schedule-details">
                            <div class="schedule-date">${this.getNextPayoutDate()}</div>
                            <div class="schedule-amount">R ${stats.ownerPayout.toLocaleString()}</div>
                            <div class="schedule-status">Scheduled</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    calculatePaymentStats() {
        const weeklyRevenue = this.paymentHistory
            .filter(t => new Date(t.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
            .reduce((sum, t) => sum + t.amount, 0);

        return {
            weeklyRevenue,
            ownerPayout: weeklyRevenue * 0.5,
            transactionCount: this.paymentHistory.length,
            platformRevenue: weeklyRevenue * 0.5
        };
    }

    renderPaymentItem(payment) {
        return `
            <div class="payment-item">
                <div class="payment-info">
                    <div class="payment-amount">R ${payment.amount.toLocaleString()}</div>
                    <div class="payment-method">${payment.method}</div>
                    <div class="payment-date">${new Date(payment.createdAt).toLocaleDateString()}</div>
                    <div class="payment-service">${payment.service}</div>
                </div>
                <div class="payment-status ${payment.status}">
                    ${payment.status}
                </div>
            </div>
        `;
    }

    renderEmptyPaymentState() {
        return `
            <div class="empty-state">
                <div class="empty-icon">
                    <i class="fas fa-receipt"></i>
                </div>
                <h4>No Payment History</h4>
                <p>Your payment transactions will appear here once you start using our services.</p>
            </div>
        `;
    }

    getNextPayoutDate() {
        // Get next Friday
        const date = new Date();
        date.setDate(date.getDate() + (5 + 7 - date.getDay()) % 7);
        return date.toISOString().split('T')[0];
    }

    renderTabContent(tabName) {
        switch (tabName) {
            case 'services':
                this.renderServicesTab();
                break;
            case 'progress':
                this.renderProgressTab();
                break;
            case 'payments':
                this.renderPaymentsTab();
                break;
        }
    }

    setupRealTimeUpdates() {
        // Simulate real-time updates from AI system
        this.realTimeUpdates = setInterval(() => {
            this.simulateProgressUpdate();
        }, 30000); // Every 30 seconds

        // Listen for actual updates from the system
        document.addEventListener('serviceProgressUpdate', (event) => {
            this.handleProgressUpdate(event.detail);
        });
    }

    simulateProgressUpdate() {
        if (this.activeServices.length > 0) {
            const randomService = this.activeServices[
                Math.floor(Math.random() * this.activeServices.length)
            ];
            
            if (randomService.progress < 100 && randomService.status === 'in-progress') {
                // Simulate progress
                const progressIncrement = Math.floor(Math.random() * 5) + 1;
                randomService.progress = Math.min(randomService.progress + progressIncrement, 100);
                
                // Add simulated update
                const updates = [
                    "AI agent completed data analysis phase",
                    "Strategic optimization in progress",
                    "Quality assurance check passed",
                    "Content generation 75% complete",
                    "Performance metrics analysis underway",
                    "Automated testing completed successfully",
                    "Client feedback implemented",
                    "Next phase initiated by AI orchestrator"
                ];
                
                const newUpdate = {
                    id: 'up-' + Date.now(),
                    date: new Date().toISOString().split('T')[0],
                    message: updates[Math.floor(Math.random() * updates.length)],
                    agent: randomService.aiAgents[Math.floor(Math.random() * randomService.aiAgents.length)],
                    type: 'progress',
                    important: Math.random() > 0.8
                };
                
                randomService.updates.unshift(newUpdate);
                
                // Update metrics if applicable
                if (randomService.metrics) {
                    this.updateServiceMetrics(randomService);
                }
                
                // Refresh display if on relevant tab
                if (document.querySelector('.dashboard-tabs .tab-active').textContent.toLowerCase().includes('services')) {
                    this.renderServicesTab();
                }
                
                if (document.querySelector('.dashboard-tabs .tab-active').textContent.toLowerCase().includes('progress')) {
                    this.renderProgressTab();
                }
                
                // Show notification for important updates
                if (newUpdate.important) {
                    this.showUpdateNotification(newUpdate, randomService);
                }
            }
        }
    }

    updateServiceMetrics(service) {
        if (!service.metrics) service.metrics = {};
        
        // Simulate metric improvements
        if (service.metrics.leadsGenerated) {
            service.metrics.leadsGenerated += Math.floor(Math.random() * 5);
        }
        if (service.metrics.conversionRate) {
            const currentRate = parseFloat(service.metrics.conversionRate);
            service.metrics.conversionRate = (currentRate + Math.random() * 0.2).toFixed(1) + '%';
        }
        if (service.metrics.roi) {
            const currentRoi = parseFloat(service.metrics.roi);
            service.metrics.roi = (currentRoi + Math.random() * 5).toFixed(0) + '%';
        }
    }

    handleProgressUpdate(update) {
        const service = this.activeServices.find(s => s.id === update.serviceId);
        if (service) {
            service.progress = update.progress;
            service.updates.unshift(update);
            
            // Refresh UI
            this.renderTabContent('services');
        }
    }

    showUpdateNotification(update, service) {
        if (window.app) {
            window.app.showNotification(
                `Update on ${service.title}: ${update.message}`,
                'info'
            );
        }
    }

    viewServiceDetails(serviceId) {
        const service = this.activeServices.find(s => s.id === serviceId) || 
                       this.completedServices.find(s => s.id === serviceId);
        
        if (service) {
            this.showServiceModal(service);
        }
    }

    showServiceModal(service) {
        const serviceInfo = window.app.services.find(s => s.id === service.service);
        
        const modal = document.createElement('div');
        modal.className = 'modal open';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${service.title}</h2>
                    <button class="modal-close" onclick="this.parentElement.parentElement.parentElement.remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="service-detail-view">
                        <div class="detail-section">
                            <h3>Progress Overview</h3>
                            <div class="progress-bar large">
                                <div class="progress" style="width: ${service.progress}%"></div>
                            </div>
                            <div class="progress-stats">
                                <span>${service.progress}% Complete</span>
                                <span>Started: ${service.startDate}</span>
                                <span>Est. Completion: ${service.estimatedCompletion}</span>
                            </div>
                        </div>
                        
                        ${service.metrics && Object.keys(service.metrics).length > 0 ? `
                            <div class="detail-section">
                                <h3>Performance Metrics</h3>
                                <div class="detailed-metrics">
                                    ${Object.entries(service.metrics).map(([key, value]) => `
                                        <div class="detailed-metric">
                                            <div class="metric-name">${this.formatMetricLabel(key)}</div>
                                            <div class="metric-value">${value}</div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        ` : ''}
                        
                        <div class="detail-section">
                            <h3>AI Agents Assigned</h3>
                            <div class="ai-agents-detailed">
                                ${service.aiAgents.map(agent => `
                                    <div class="ai-agent-detailed">
                                        <i class="fas fa-robot"></i>
                                        <div class="agent-info">
                                            <div class="agent-name">${agent}</div>
                                            <div class="agent-status online">Online</div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        
                        <div class="detail-section">
                            <h3>Activity Timeline</h3>
                            <div class="activity-timeline-detailed">
                                ${service.updates.map(update => `
                                    <div class="activity-item-detailed ${update.important ? 'important' : ''}">
                                        <div class="activity-date">${update.date}</div>
                                        <div class="activity-content">
                                            <div class="activity-message">${update.message}</div>
                                            <div class="activity-meta">
                                                <span class="activity-agent">by ${update.agent}</span>
                                                <span class="activity-type">${update.type}</span>
                                            </div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    contactAIAgent(serviceId) {
        const service = this.activeServices.find(s => s.id === serviceId);
        if (!service) return;

        // Open chat and initiate conversation with AI agent
        openAIChat();
        
        setTimeout(() => {
            if (window.aiChat) {
                window.aiChat.addMessage(
                    `I'd like to discuss my ${service.title} project (${serviceId}). Can you connect me with the assigned AI agent?`,
                    'user'
                );
                
                setTimeout(() => {
                    window.aiChat.addMessage(
                        `I'm connecting you with the AI agent managing your ${service.title} project. They'll provide specific updates and answer any questions about your project.`,
                        'ai'
                    );
                    
                    // Simulate agent connection
                    setTimeout(() => {
                        const randomAgent = service.aiAgents[Math.floor(Math.random() * service.aiAgents.length)];
                        window.aiChat.addMessage(
                            `Hello! I'm ${randomAgent}, managing your ${service.title} project. The current progress is ${service.progress}%. How can I assist you today?`,
                            'ai'
                        );
                    }, 2000);
                }, 1000);
            }
        }, 500);
    }

    downloadServiceReport(serviceId) {
        const service = this.completedServices.find(s => s.id === serviceId);
        if (!service) return;

        // In a real implementation, this would generate and download a PDF report
        // For demo, we'll show a success message
        if (window.app) {
            window.app.showNotification('Service report download started', 'success');
        }
        
        // Track analytics
        if (window.app) {
            window.app.trackEvent('Dashboard', 'Download Report', serviceId);
        }
    }

    requestNewService() {
        // Close dashboard and open services section
        closeDashboard();
        scrollToServices();
        
        // Track analytics
        if (window.app) {
            window.app.trackEvent('Dashboard', 'New Service Request', 'From Dashboard');
        }
    }

    refreshDashboard() {
        this.loadUserData().then(() => {
            this.renderDashboard();
            if (window.app) {
                window.app.showNotification('Dashboard refreshed', 'success');
            }
        });
    }

    exportDashboardData() {
        const data = {
            activeServices: this.activeServices,
            completedServices: this.completedServices,
            paymentHistory: this.paymentHistory,
            exportedAt: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `synthcore-dashboard-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        // Track analytics
        if (window.app) {
            window.app.trackEvent('Dashboard', 'Export Data', 'JSON');
        }
    }

    exportTransactions() {
        if (window.paymentHandler) {
            const transactions = window.paymentHandler.transactionHistory;
            const csv = this.convertToCSV(transactions);
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `transactions-${new Date().toISOString().split('T')[0]}.csv`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    }

    convertToCSV(data) {
        const headers = ['Date', 'Amount', 'Service', 'Method', 'Status'];
        const rows = data.map(item => [
            new Date(item.createdAt).toLocaleDateString(),
            item.amount,
            item.service,
            item.method,
            item.status
        ]);
        
        return [headers, ...rows].map(row => row.join(',')).join('\n');
    }

    formatMetricLabel(key) {
        const labels = {
            leadsGenerated: 'Leads Generated',
            conversionRate: 'Conversion Rate',
            roi: 'ROI',
            budgetSpent: 'Budget Spent',
            impressions: 'Impressions',
            clicks: 'Clicks',
            engagement: 'Engagement Rate'
        };
        
        return labels[key] || key;
    }

    // Cleanup method
    destroy() {
        if (this.realTimeUpdates) {
            clearInterval(this.realTimeUpdates);
        }
    }
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', () => {
    window.dashboard = new ClientDashboard();
});

// Global tab switching function
function switchTab(tabName) {
    if (window.dashboard) {
        window.dashboard.switchTab(tabName);
    }
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (window.dashboard) {
        window.dashboard.destroy();
    }
});
