import React from 'react';

const PaymentModal = ({ isOpen, onClose, transaction }) => {
  if (!isOpen) return null;

  return (
    <div className="modal open">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Payment Successful!</h2>
          <button className="modal-close" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="modal-body">
          {/* Payment success content */}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
