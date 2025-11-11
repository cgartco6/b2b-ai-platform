import React from 'react';

const ProgressTracker = ({ service }) => {
  return (
    <div className="progress-tracker">
      <div className="progress-bar large">
        <div 
          className="progress" 
          style={{ width: `${service.progress}%` }}
        ></div>
      </div>
      <div className="progress-stats">
        <span>{service.progress}% Complete</span>
      </div>
    </div>
  );
};

export default ProgressTracker;
