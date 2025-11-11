import React from 'react';

const ServiceCard = ({ service, onRequestService }) => {
  return (
    <div className="service-card" data-service={service.id}>
      <div className="service-icon">
        <i className={service.icon}></i>
      </div>
      <h3 className="service-title">{service.title}</h3>
      <p className="service-description">{service.description}</p>
      
      <ul className="service-features">
        {service.features.map((feature, index) => (
          <li key={index}>
            <i className="fas fa-check"></i> {feature}
          </li>
        ))}
      </ul>
      
      <div className="service-pricing">
        <div className="price">
          R {service.price.toLocaleString()}
          <span className="price-period">/{service.period}</span>
        </div>
        <button 
          className="btn-primary" 
          onClick={() => onRequestService(service.id)}
        >
          Start Project <i className="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
