import React, { useState, useEffect } from 'react';

const ServiceDashboard = () => {
  const [activeTab, setActiveTab] = useState('services');
  const [services, setServices] = useState([]);

  useEffect(() => {
    // Load services data
    loadServices();
  }, []);

  const loadServices = async () => {
    // Implementation would load from API
  };

  return (
    <div className="dashboard">
      <div className="dashboard-tabs">
        <button 
          className={activeTab === 'services' ? 'tab-active' : ''}
          onClick={() => setActiveTab('services')}
        >
          My Services
        </button>
        <button 
          className={activeTab === 'progress' ? 'tab-active' : ''}
          onClick={() => setActiveTab('progress')}
        >
          Progress Tracking
        </button>
        <button 
          className={activeTab === 'payments' ? 'tab-active' : ''}
          onClick={() => setActiveTab('payments')}
        >
          Payments
        </button>
      </div>
      
      <div className="tab-content">
        {activeTab === 'services' && <ServicesTab services={services} />}
        {activeTab === 'progress' && <ProgressTab />}
        {activeTab === 'payments' && <PaymentsTab />}
      </div>
    </div>
  );
};

export default ServiceDashboard;
