// API utility functions
export class API {
  static async request(endpoint, options = {}) {
    const baseURL = process.env.REACT_APP_API_URL || 'https://api.synthcore.ai';
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
      console.error('API request failed:', error);
      throw error;
    }
  }

  static async getServices() {
    return this.request('/api/services');
  }

  static async createServiceRequest(serviceData) {
    return this.request('/api/services/request', {
      method: 'POST',
      body: serviceData
    });
  }

  static async getServiceProgress(serviceId) {
    return this.request(`/api/services/${serviceId}/progress`);
  }
}
