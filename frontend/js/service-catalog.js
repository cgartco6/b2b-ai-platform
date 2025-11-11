// Service Catalog Management
class ServiceCatalog {
    constructor() {
        this.categories = new Map();
        this.featuredServices = [];
        this.userPreferences = this.loadUserPreferences();
    }

    async initialize() {
        await this.loadCategories();
        await this.loadFeaturedServices();
        this.setupCategoryFilters();
        this.setupSearchFunctionality();
        this.setupRecommendationEngine();
    }

    async loadCategories() {
        // Load service categories
        this.categories.set('marketing', {
            name: 'Digital Marketing',
            services: ['digital-marketing', 'seo-optimization', 'content-creation'],
            icon: 'fas fa-bullhorn',
            description: 'AI-powered marketing solutions'
        });
        
        this.categories.set('development', {
            name: 'Web Development',
            services: ['web-development'],
            icon: 'fas fa-laptop-code',
            description: 'Intelligent web solutions'
        });
        
        this.categories.set('analytics', {
            name: 'Data & Analytics',
            services: ['data-analysis'],
            icon: 'fas fa-chart-bar',
            description: 'Data-driven insights'
        });
        
        this.categories.set('strategy', {
            name: 'AI Strategy',
            services: ['ai-strategy'],
            icon: 'fas fa-chess-queen',
            description: 'Strategic AI implementation'
        });
    }

    async loadFeaturedServices() {
        // Load featured services based on user behavior or popularity
        if (this.userPreferences.preferredCategories.length > 0) {
            this.featuredServices = window.app.services.filter(service => 
                this.userPreferences.preferredCategories.includes(service.category)
            );
        } else {
            // Default featured services
            this.featuredServices = window.app.services.filter(service => 
                ['digital-marketing', 'ai-strategy'].includes(service.id)
            );
        }
    }

    setupCategoryFilters() {
        const filterContainer = document.querySelector('.category-filters');
        if (!filterContainer) return;

        // Filters are already in HTML, just add click handlers
        const filterButtons = filterContainer.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const category = e.target.dataset.category;
                this.filterServices(category);
                
                // Update active state
                filterButtons.forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                
                // Track analytics
                if (window.app) {
                    window.app.trackEvent('Services', 'Filter', category);
                }
            });
        });
    }

    setupSearchFunctionality() {
        // Create search input if it doesn't exist
        const servicesSection = document.querySelector('.services');
        if (!servicesSection) return;

        let searchContainer = servicesSection.querySelector('.search-container');
        if (!searchContainer) {
            searchContainer = document.createElement('div');
            searchContainer.className = 'search-container';
            searchContainer.innerHTML = `
                <div class="search-box">
                    <i class="fas fa-search"></i>
                    <input type="text" id="serviceSearch" placeholder="Search services...">
                    <button class="search-clear" id="searchClear">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
            
            const categoryFilters = servicesSection.querySelector('.category-filters');
            if (categoryFilters) {
                servicesSection.insertBefore(searchContainer, categoryFilters.nextSibling);
            } else {
                servicesSection.querySelector('.container').insertBefore(
                    searchContainer, 
                    servicesSection.querySelector('#servicesGrid')
                );
            }
        }

        // Setup search functionality
        const searchInput = document.getElementById('serviceSearch');
        const searchClear = document.getElementById('searchClear');

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchServices(e.target.value);
                
                // Show/hide clear button
                if (searchClear) {
                    searchClear.style.display = e.target.value ? 'block' : 'none';
                }
            });

            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.performSearch(e.target.value);
                }
            });
        }

        if (searchClear) {
            searchClear.addEventListener('click', () => {
                if (searchInput) {
                    searchInput.value = '';
                    searchClear.style.display = 'none';
                    this.clearSearch();
                }
            });
        }
    }

    searchServices(query) {
        if (!query.trim()) {
            this.clearSearch();
            return;
        }

        const services = document.querySelectorAll('.service-card');
        const searchTerm = query.toLowerCase().trim();

        services.forEach(card => {
            const serviceId = card.dataset.service;
            const service = window.app.services.find(s => s.id === serviceId);
            
            if (service) {
                const searchableText = `
                    ${service.title} 
                    ${service.description} 
                    ${service.features.join(' ')} 
                    ${service.aiAgents.join(' ')}
                `.toLowerCase();

                if (searchableText.includes(searchTerm)) {
                    card.style.display = 'block';
                    card.classList.add('search-match');
                } else {
                    card.style.display = 'none';
                    card.classList.remove('search-match');
                }
            }
        });

        // Update results count
        this.updateSearchResultsCount(query);
    }

    performSearch(query) {
        this.searchServices(query);
        
        // Track analytics
        if (window.app) {
            window.app.trackEvent('Services', 'Search', query);
        }
    }

    clearSearch() {
        const services = document.querySelectorAll('.service-card');
        services.forEach(card => {
            card.style.display = 'block';
            card.classList.remove('search-match');
        });

        // Clear active filter
        const activeFilter = document.querySelector('.filter-btn.active');
        if (activeFilter && activeFilter.dataset.category !== 'all') {
            this.filterServices(activeFilter.dataset.category);
        }

        // Hide results count
        this.hideSearchResultsCount();
    }

    updateSearchResultsCount(query) {
        const visibleServices = document.querySelectorAll('.service-card[style="display: block"]').length;
        const totalServices = window.app.services.length;

        let resultsCount = document.querySelector('.search-results-count');
        if (!resultsCount) {
            resultsCount = document.createElement('div');
            resultsCount.className = 'search-results-count';
            const searchContainer = document.querySelector('.search-container');
            if (searchContainer) {
                searchContainer.appendChild(resultsCount);
            }
        }

        resultsCount.innerHTML = `
            Found ${visibleServices} of ${totalServices} services for "${query}"
        `;
        resultsCount.style.display = 'block';
    }

    hideSearchResultsCount() {
        const resultsCount = document.querySelector('.search-results-count');
        if (resultsCount) {
            resultsCount.style.display = 'none';
        }
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

        // Update user preferences
        this.updateUserPreferences(category);
    }

    setupRecommendationEngine() {
        // Analyze user behavior and recommend services
        this.analyzeUserBehavior();
    }

    analyzeUserBehavior() {
        // Simple recommendation based on viewed services
        const viewedServices = this.getViewedServices();
        
        if (viewedServices.length > 0) {
            this.generateRecommendations(viewedServices);
        }
    }

    getViewedServices() {
        // Get services user has viewed (from localStorage or session)
        const viewed = localStorage.getItem('viewedServices');
        return viewed ? JSON.parse(viewed) : [];
    }

    trackServiceView(serviceId) {
        const viewedServices = this.getViewedServices();
        
        if (!viewedServices.includes(serviceId)) {
            viewedServices.push(serviceId);
            localStorage.setItem('viewedServices', JSON.stringify(viewedServices));
            
            // Update recommendations
            this.generateRecommendations(viewedServices);
        }
    }

    generateRecommendations(viewedServices) {
        // Generate recommendations based on viewed services
        const recommendations = new Set();
        
        viewedServices.forEach(serviceId => {
            const service = window.app.services.find(s => s.id === serviceId);
            if (service) {
                // Find similar services
                const similarServices = window.app.services.filter(s => 
                    s.category === service.category && s.id !== serviceId
                );
                similarServices.forEach(s => recommendations.add(s.id));
            }
        });

        this.userPreferences.recommendedServices = Array.from(recommendations);
        this.saveUserPreferences();
    }

    getServiceById(serviceId) {
        return window.app.services.find(service => service.id === serviceId);
    }

    calculatePrice(serviceId, customizations = {}) {
        const service = this.getServiceById(serviceId);
        if (!service) return 0;

        let basePrice = service.price;
        
        // Apply customizations
        if (customizations.urgency === 'express') {
            basePrice *= 1.5; // 50% premium for express
        }
        
        if (customizations.scope === 'enterprise') {
            basePrice *= 2; // 100% premium for enterprise
        }

        if (customizations.duration === 'extended') {
            basePrice *= 1.2; // 20% premium for extended support
        }

        return Math.round(basePrice);
    }

    getServiceComparison(serviceIds) {
        return serviceIds.map(id => this.getServiceById(id)).filter(Boolean);
    }

    loadUserPreferences() {
        const saved = localStorage.getItem('serviceCatalogPreferences');
        if (saved) {
            return JSON.parse(saved);
        }
        
        return {
            preferredCategories: [],
            recommendedServices: [],
            searchHistory: [],
            viewedServices: []
        };
    }

    saveUserPreferences() {
        localStorage.setItem('serviceCatalogPreferences', JSON.stringify(this.userPreferences));
    }

    updateUserPreferences(category) {
        if (!this.userPreferences.preferredCategories.includes(category)) {
            this.userPreferences.preferredCategories.push(category);
            this.saveUserPreferences();
        }
    }

    // Service bundle creation
    createServiceBundle(serviceIds, bundleName) {
        const services = serviceIds.map(id => this.getServiceById(id)).filter(Boolean);
        
        if (services.length === 0) return null;

        const totalPrice = services.reduce((sum, service) => sum + service.price, 0);
        const bundlePrice = totalPrice * 0.8; // 20% discount for bundles

        return {
            name: bundleName,
            services: services,
            originalPrice: totalPrice,
            bundlePrice: Math.round(bundlePrice),
            savings: totalPrice - bundlePrice,
            features: this.extractBundleFeatures(services),
            aiAgents: this.extractBundleAgents(services)
        };
    }

    extractBundleFeatures(services) {
        const allFeatures = services.flatMap(service => service.features);
        return [...new Set(allFeatures)]; // Remove duplicates
    }

    extractBundleAgents(services) {
        const allAgents = services.flatMap(service => service.aiAgents);
        return [...new Set(allAgents)]; // Remove duplicates
    }

    // Service popularity tracking
    trackServicePopularity(serviceId, action) {
        const stats = this.getServiceStats();
        
        if (!stats[serviceId]) {
            stats[serviceId] = { views: 0, clicks: 0, requests: 0 };
        }
        
        stats[serviceId][action]++;
        this.saveServiceStats(stats);
    }

    getServiceStats() {
        const saved = localStorage.getItem('serviceStats');
        return saved ? JSON.parse(saved) : {};
    }

    saveServiceStats(stats) {
        localStorage.setItem('serviceStats', JSON.stringify(stats));
    }

    getPopularServices(limit = 3) {
        const stats = this.getServiceStats();
        const services = window.app.services.map(service => ({
            ...service,
            popularity: (stats[service.id]?.views || 0) + 
                       (stats[service.id]?.clicks || 0) * 2 + 
                       (stats[service.id]?.requests || 0) * 3
        }));

        return services
            .sort((a, b) => b.popularity - a.popularity)
            .slice(0, limit);
    }
}

// Initialize service catalog
document.addEventListener('DOMContentLoaded', () => {
    window.serviceCatalog = new ServiceCatalog();
    
    // Wait for main app to initialize
    setTimeout(() => {
        window.serviceCatalog.initialize();
    }, 100);
});

// Track service views when they become visible
const serviceViewObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && window.serviceCatalog) {
            const serviceId = entry.target.dataset.service;
            if (serviceId) {
                window.serviceCatalog.trackServiceView(serviceId);
                window.serviceCatalog.trackServicePopularity(serviceId, 'views');
            }
        }
    });
}, { threshold: 0.5 });

// Observe service cards for view tracking
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelectorAll('.service-card').forEach(card => {
            serviceViewObserver.observe(card);
        });
    }, 2000);
});
