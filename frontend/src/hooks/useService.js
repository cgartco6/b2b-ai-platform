import { useState, useEffect } from 'react';

export const useServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      setLoading(true);
      try {
        // Load services from app
        const appServices = window.app?.services || [];
        setServices(appServices);
      } catch (error) {
        console.error('Failed to load services:', error);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  return { services, loading };
};
