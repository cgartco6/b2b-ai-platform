// Formatting utility functions
export const formatters = {
  formatCurrency: (amount, currency = 'ZAR') => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: currency
    }).format(amount);
  },

  formatDate: (date) => {
    return new Date(date).toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  },

  formatProgress: (progress) => {
    return `${Math.round(progress)}%`;
  },

  truncateText: (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  }
};
