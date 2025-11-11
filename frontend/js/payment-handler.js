// Payment Handling System
class PaymentHandler {
    constructor() {
        this.selectedPaymentMethod = 'payfast';
        this.pendingTransactions = new Map();
        this.transactionHistory = this.loadTransactionHistory();
        this.initialize();
    }

    initialize() {
        this.setupPaymentMethods();
        this.setupPaymentListeners();
        this.updatePaymentDisplay();
    }

    setupPaymentMethods() {
        // Setup payment method selection
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('select-payment')) {
                this.selectPaymentMethod(e.target.dataset.method);
            }
        });

        // Setup EFT payment details
        this.setupEFTPayment();
    }

    setupPaymentListeners() {
        // Listen for payment-related events
        document.addEventListener('paymentRequest', this.handlePaymentRequest.bind(this));
        document.addEventListener('paymentSuccess', this.handlePaymentSuccess.bind(this));
        document.addEventListener('paymentError', this.handlePaymentError.bind(this));
    }

    setupEFTPayment() {
        // EFT payment details
        this.eftDetails = {
            bank: 'First National Bank (FNB)',
            accountNumber: '62845678901', // Example account number
            accountHolder: 'SynthCore AI (Pty) Ltd',
            branchCode: '250655',
            accountType: 'Business Cheque',
            referenceFormat: 'SYNTH[InvoiceNumber]'
        };
    }

    selectPaymentMethod(method) {
        this.selectedPaymentMethod = method;
        
        // Update UI
        this.updatePaymentDisplay();
        
        // Track analytics
        if (window.app) {
            window.app.trackEvent('Payment', 'Method Selected', method);
        }
    }

    updatePaymentDisplay() {
        // Update payment method selection UI
        document.querySelectorAll('.payment-method').forEach(el => {
            el.classList.remove('selected');
        });
        
        const selectedElement = document.querySelector(`[data-method="${this.selectedPaymentMethod}"]`);
        if (selectedElement) {
            selectedElement.classList.add('selected');
        }

        // Show/hide payment details based on selection
        this.showPaymentDetails();
    }

    showPaymentDetails() {
        // Hide all detail sections first
        document.querySelectorAll('.payment-details').forEach(el => {
            el.style.display = 'none';
        });

        // Show details for selected method
        const detailsId = `${this.selectedPaymentMethod}-details`;
        const detailsElement = document.getElementById(detailsId);
        if (detailsElement) {
            detailsElement.style.display = 'block';
        } else {
            this.createPaymentDetails();
        }
    }

    createPaymentDetails() {
        const container = document.querySelector('.payments .container');
        if (!container) return;

        let detailsContainer = document.getElementById('payment-details-container');
        if (!detailsContainer) {
            detailsContainer = document.createElement('div');
            detailsContainer.id = 'payment-details-container';
            container.appendChild(detailsContainer);
        }

        detailsContainer.innerHTML = this.generatePaymentDetailsHTML();
    }

    generatePaymentDetailsHTML() {
        switch (this.selectedPaymentMethod) {
            case 'eft':
                return this.generateEFTDetailsHTML();
            case 'payfast':
                return this.generatePayFastDetailsHTML();
            case 'stripe':
                return this.generateStripeDetailsHTML();
            default:
                return '';
        }
    }

    generateEFTDetailsHTML() {
        return `
            <div class="payment-details" id="eft-details" style="display: block;">
                <div class="payment-instructions">
                    <h3>EFT Payment Instructions</h3>
                    <div class="bank-details-card">
                        <div class="bank-detail">
                            <strong>Bank:</strong> ${this.eftDetails.bank}
                        </div>
                        <div class="bank-detail">
                            <strong>Account Number:</strong> ${this.eftDetails.accountNumber}
                        </div>
                        <div class="bank-detail">
                            <strong>Account Holder:</strong> ${this.eftDetails.accountHolder}
                        </div>
                        <div class="bank-detail">
                            <strong>Branch Code:</strong> ${this.eftDetails.branchCode}
                        </div>
                        <div class="bank-detail">
                            <strong>Account Type:</strong> ${this.eftDetails.accountType}
                        </div>
                        <div class="bank-detail">
                            <strong>Reference:</strong> Use your invoice number as reference
                        </div>
                    </div>
                    <div class="payout-info">
                        <h4>Owner Payout Information</h4>
                        <p>50% of all revenue is automatically paid out to the platform owner weekly via FNB EFT.</p>
                        <div class="payout-schedule">
                            <strong>Payout Schedule:</strong> Every Friday
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    generatePayFastDetailsHTML() {
        return `
            <div class="payment-details" id="payfast-details" style="display: block;">
                <div class="payment-instructions">
                    <h3>PayFast Payment</h3>
                    <p>Secure instant payments through PayFast. You'll be redirected to PayFast to complete your payment.</p>
                    <div class="supported-features">
                        <h4>Supported Features:</h4>
                        <ul>
                            <li>Instant payment processing</li>
                            <li>All major South African banks</li>
                            <li>Credit card payments</li>
                            <li>Debit order facilities</li>
                            <li>Secure SSL encryption</li>
                        </ul>
                    </div>
                    <div class="security-info">
                        <i class="fas fa-shield-alt"></i>
                        <span>256-bit SSL Secured</span>
                    </div>
                </div>
            </div>
        `;
    }

    generateStripeDetailsHTML() {
        return `
            <div class="payment-details" id="stripe-details" style="display: block;">
                <div class="payment-instructions">
                    <h3>Stripe Global Payments (Coming Soon)</h3>
                    <p>International payment processing for global clients.</p>
                    <div class="coming-soon-features">
                        <h4>Planned Features:</h4>
                        <ul>
                            <li>Global credit card processing</li>
                            <li>Multi-currency support</li>
                            <li>Apple Pay & Google Pay</li>
                            <li>International bank transfers</li>
                            <li>Advanced fraud protection</li>
                        </ul>
                    </div>
                    <div class="launch-timeline">
                        <strong>Expected Launch:</strong> Q2 2024
                    </div>
                </div>
            </div>
        `;
    }

    async processPayment(amount, service, customer, customizations = {}) {
        const paymentData = {
            amount: amount,
            service: service.id,
            customer: customer,
            method: this.selectedPaymentMethod,
            currency: 'ZAR',
            customizations: customizations,
            timestamp: new Date().toISOString()
        };

        // Create pending transaction
        const transactionId = this.generateTransactionId();
        const pendingTransaction = {
            id: transactionId,
            ...paymentData,
            status: 'pending',
            createdAt: new Date().toISOString()
        };

        this.pendingTransactions.set(transactionId, pendingTransaction);
        
        // Track analytics
        if (window.app) {
            window.app.trackEvent('Payment', 'Initiated', `${service.id} - ${amount}`);
        }

        try {
            let result;
            
            switch (this.selectedPaymentMethod) {
                case 'eft':
                    result = await this.processEFT(paymentData);
                    break;
                case 'payfast':
                    result = await this.processPayFast(paymentData);
                    break;
                default:
                    throw new Error('Unsupported payment method');
            }

            if (result.success) {
                await this.handleSuccessfulPayment(transactionId, result);
                return result;
            } else {
                throw new Error(result.error || 'Payment failed');
            }
        } catch (error) {
            await this.handleFailedPayment(transactionId, error);
            this.showPaymentError(error.message);
            throw error;
        }
    }

    async processEFT(paymentData) {
        // Generate EFT payment reference and instructions
        const reference = this.generatePaymentReference();
        
        return {
            success: true,
            method: 'eft',
            transactionId: reference,
            reference: reference,
            instructions: {
                ...this.eftDetails,
                reference: reference,
                amount: paymentData.amount,
                dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
            },
            status: 'pending_approval'
        };
    }

    async processPayFast(paymentData) {
        // In a real implementation, this would integrate with PayFast API
        // For demo purposes, we'll simulate the process
        
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    success: true,
                    method: 'payfast',
                    transactionId: this.generateTransactionId(),
                    paymentUrl: '#', // In real implementation, this would be PayFast URL
                    status: 'redirect_required'
                });
            }, 1000);
        });
    }

    async handleSuccessfulPayment(transactionId, result) {
        const transaction = this.pendingTransactions.get(transactionId);
        if (!transaction) return;

        // Update transaction status
        transaction.status = 'completed';
        transaction.completedAt = new Date().toISOString();
        transaction.result = result;

        // Add to transaction history
        this.transactionHistory.unshift(transaction);
        this.saveTransactionHistory();

        // Remove from pending
        this.pendingTransactions.delete(transactionId);

        // Schedule owner payout
        await this.scheduleOwnerPayout(transaction);

        // Notify AI system to start service
        await this.notifyAISystem(transaction);

        // Show success message
        this.showPaymentSuccess(transaction);

        // Track analytics
        if (window.app) {
            window.app.trackEvent('Payment', 'Completed', `${transaction.service} - ${transaction.amount}`);
        }

        // Dispatch event
        document.dispatchEvent(new CustomEvent('paymentSuccess', {
            detail: transaction
        }));
    }

    async handleFailedPayment(transactionId, error) {
        const transaction = this.pendingTransactions.get(transactionId);
        if (!transaction) return;

        // Update transaction status
        transaction.status = 'failed';
        transaction.error = error.message;
        transaction.failedAt = new Date().toISOString();

        // Add to transaction history
        this.transactionHistory.unshift(transaction);
        this.saveTransactionHistory();

        // Remove from pending
        this.pendingTransactions.delete(transactionId);

        // Track analytics
        if (window.app) {
            window.app.trackEvent('Payment', 'Failed', `${transaction.service} - ${error.message}`);
        }

        // Dispatch event
        document.dispatchEvent(new CustomEvent('paymentError', {
            detail: { transaction, error }
        }));
    }

    async scheduleOwnerPayout(transaction) {
        const ownerShare = transaction.amount * 0.5; // 50% to owner
        
        const payout = {
            transactionId: transaction.id,
            amount: ownerShare,
            recipient: this.eftDetails.accountNumber, // Owner's FNB account
            schedule: 'weekly',
            status: 'scheduled',
            scheduledFor: this.getNextPayoutDate()
        };

        // In real implementation, this would be sent to backend
        console.log('Scheduled owner payout:', payout);
        
        // Store locally for demo
        this.saveScheduledPayout(payout);
    }

    getNextPayoutDate() {
        // Get next Friday
        const date = new Date();
        date.setDate(date.getDate() + (5 + 7 - date.getDay()) % 7);
        return date.toISOString().split('T')[0];
    }

    async notifyAISystem(transaction) {
        // Notify AI system to start service delivery
        const event = new CustomEvent('servicePaymentCompleted', {
            detail: {
                service: transaction.service,
                customer: transaction.customer,
                transaction: transaction,
                timestamp: new Date().toISOString()
            }
        });
        
        document.dispatchEvent(event);

        // In real implementation, this would be an API call
        console.log('Notifying AI system to start service:', transaction.service);
    }

    generateTransactionId() {
        return 'TXN_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9).toUpperCase();
    }

    generatePaymentReference() {
        return 'SYNTH' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();
    }

    loadTransactionHistory() {
        const stored = localStorage.getItem('paymentTransactions');
        return stored ? JSON.parse(stored) : [];
    }

    saveTransactionHistory() {
        localStorage.setItem('paymentTransactions', JSON.stringify(this.transactionHistory));
    }

    saveScheduledPayout(payout) {
        const payouts = this.loadScheduledPayouts();
        payouts.push(payout);
        localStorage.setItem('scheduledPayouts', JSON.stringify(payouts));
    }

    loadScheduledPayouts() {
        const stored = localStorage.getItem('scheduledPayouts');
        return stored ? JSON.parse(stored) : [];
    }

    getWeeklyRevenue() {
        const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        
        return this.transactionHistory
            .filter(t => new Date(t.createdAt) > oneWeekAgo && t.status === 'completed')
            .reduce((sum, t) => sum + t.amount, 0);
    }

    getOwnerPayoutAmount() {
        const weeklyRevenue = this.getWeeklyRevenue();
        return weeklyRevenue * 0.5; // 50% to owner
    }

    showPaymentSuccess(transaction) {
        if (window.app) {
            window.app.showNotification(
                `Payment successful! Your ${transaction.service} project has been started.`,
                'success'
            );
        }

        // Show success details
        this.showSuccessModal(transaction);
    }

    showSuccessModal(transaction) {
        const modal = document.createElement('div');
        modal.className = 'modal open';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Payment Successful!</h2>
                    <button class="modal-close" onclick="this.parentElement.parentElement.parentElement.remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="payment-success">
                        <div class="success-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <h3>Thank you for your payment</h3>
                        <p>Your ${transaction.service} project has been initiated and our AI agents are getting started.</p>
                        
                        <div class="transaction-details">
                            <h4>Transaction Details</h4>
                            <div class="detail-row">
                                <span>Transaction ID:</span>
                                <span>${transaction.transactionId}</span>
                            </div>
                            <div class="detail-row">
                                <span>Amount:</span>
                                <span>R ${transaction.amount.toLocaleString()}</span>
                            </div>
                            <div class="detail-row">
                                <span>Service:</span>
                                <span>${transaction.service}</span>
                            </div>
                            <div class="detail-row">
                                <span>Date:</span>
                                <span>${new Date(transaction.createdAt).toLocaleString()}</span>
                            </div>
                        </div>
                        
                        <div class="next-steps">
                            <h4>What happens next?</h4>
                            <ul>
                                <li>AI agents are being assigned to your project</li>
                                <li>You'll receive a welcome message shortly</li>
                                <li>Progress updates will be sent to your email</li>
                                <li>Access your dashboard to track progress</li>
                            </ul>
                        </div>
                        
                        <div class="success-actions">
                            <button class="btn-primary" onclick="openDashboard()">
                                Go to Dashboard
                            </button>
                            <button class="btn-secondary" onclick="this.parentElement.parentElement.parentElement.parentElement.remove()">
                                Continue Browsing
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    showPaymentError(message) {
        if (window.app) {
            window.app.showNotification(message, 'error');
        }

        // Show detailed error modal for certain errors
        if (message.includes('insufficient funds') || message.includes('declined')) {
            this.showErrorModal(message);
        }
    }

    showErrorModal(message) {
        const modal = document.createElement('div');
        modal.className = 'modal open';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Payment Failed</h2>
                    <button class="modal-close" onclick="this.parentElement.parentElement.parentElement.remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="payment-error">
                        <div class="error-icon">
                            <i class="fas fa-exclamation-circle"></i>
                        </div>
                        <h3>We couldn't process your payment</h3>
                        <p>${message}</p>
                        
                        <div class="error-suggestions">
                            <h4>Suggestions:</h4>
                            <ul>
                                <li>Check your account balance</li>
                                <li>Verify your payment details</li>
                                <li>Try a different payment method</li>
                                <li>Contact your bank if issues persist</li>
                            </ul>
                        </div>
                        
                        <div class="error-actions">
                            <button class="btn-primary" onclick="this.parentElement.parentElement.parentElement.parentElement.remove()">
                                Try Again
                            </button>
                            <button class="btn-secondary" onclick="window.paymentHandler.selectPaymentMethod('eft')">
                                Use EFT Instead
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    handlePaymentRequest(event) {
        const { service, amount, customer } = event.detail;
        this.processPayment(amount, service, customer);
    }

    handlePaymentSuccess(event) {
        console.log('Payment successful:', event.detail);
    }

    handlePaymentError(event) {
        console.error('Payment error:', event.detail);
    }

    // Utility methods for dashboard
    getTransactionStats() {
        const weeklyRevenue = this.getWeeklyRevenue();
        const ownerPayout = this.getOwnerPayoutAmount();
        const transactionCount = this.transactionHistory.filter(t => 
            t.status === 'completed' && 
            new Date(t.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        ).length;

        return {
            weeklyRevenue,
            ownerPayout,
            transactionCount,
            platformRevenue: weeklyRevenue - ownerPayout
        };
    }

    getRecentTransactions(limit = 5) {
        return this.transactionHistory
            .filter(t => t.status === 'completed')
            .slice(0, limit);
    }
}

// Initialize payment handler
document.addEventListener('DOMContentLoaded', () => {
    window.paymentHandler = new PaymentHandler();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PaymentHandler;
}
