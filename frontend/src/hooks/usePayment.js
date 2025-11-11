import { useState } from 'react';

export const usePayment = () => {
  const [processing, setProcessing] = useState(false);

  const processPayment = async (amount, service, method) => {
    setProcessing(true);
    try {
      // Payment processing logic
      const result = await window.paymentHandler.processPayment(amount, service, method);
      return result;
    } finally {
      setProcessing(false);
    }
  };

  return { processPayment, processing };
};
