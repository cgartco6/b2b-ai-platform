:root {
    --primary: #667eea;
    --primary-dark: #5a6fd8;
    --secondary: #764ba2;
    --accent: #f093fb;
    --text: #2d3748;
    --text-light: #718096;
    --background: #ffffff;
    --background-alt: #f7fafc;
    --border: #e2e8f0;
    --success: #48bb78;
    --warning: #ed8936;
    --error: #f56565;
    --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
    --border-radius: 12px;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    line-height: 1.6;
    color: var(--text);
    background: var(--background);
    overflow-x: hidden;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Navigation */
.navbar {
    position: fixed;
    top: 0;
    width: 100%;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    z-index: 1000;
    padding: 1rem 0;
    border-bottom: 1px solid var(--border);
    transition: all 0.3s ease;
}

.nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.nav-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--primary);
    text-decoration: none;
}

.nav-logo i {
    font-size: 2rem;
}

.nav-menu {
    display: flex;
    align-items: center;
    gap: 2rem;
}

.nav-link {
    text-decoration: none;
    color: var(--text);
    font-weight: 500;
    transition: color 0.3s;
    position: relative;
}

.nav-link:hover {
    color: var(--primary);
}

.nav-link::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--primary);
    transition: width 0.3s;
}

.nav-link:hover::after {
    width: 100%;
}

.nav-toggle {
    display: none;
    flex-direction: column;
    cursor: pointer;
    padding: 5px;
}

.nav-toggle span {
    width: 25px;
    height: 3px;
    background: var(--text);
    margin: 3px 0;
    transition: 0.3s;
    border-radius: 2px;
}

/* Buttons */
.btn-primary {
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: var(--border-radius);
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    text-decoration: none;
    display: inline-block;
    position: relative;
    overflow: hidden;
}

.btn-primary::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
}

.btn-primary:hover::before {
    left: 100%;
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
}

.btn-secondary {
    background: transparent;
    color: var(--primary);
    border: 2px solid var(--primary);
    padding: 12px 24px;
    border-radius: var(--border-radius);
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    position: relative;
    overflow: hidden;
}

.btn-secondary:hover {
    background: var(--primary);
    color: white;
    transform: translateY(-2px);
    box-shadow: var(--shadow);
}

.btn-large {
    padding: 15px 30px;
    font-size: 1.1rem;
}

.btn-full {
    width: 100%;
    text-align: center;
}

/* Hero Section */
.hero {
    padding: 140px 0 80px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    position: relative;
    overflow: hidden;
}

.hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><polygon fill="rgba(255,255,255,0.05)" points="0,1000 1000,0 1000,1000"/></svg>');
    background-size: cover;
}

.hero-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
    position: relative;
    z-index: 2;
}

.hero-title {
    font-size: 3.5rem;
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 1.5rem;
}

.gradient-text {
    background: linear-gradient(45deg, #f093fb, #f5576c);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.hero-description {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    opacity: 0.9;
    line-height: 1.6;
}

.hero-stats {
    display: flex;
    gap: 2rem;
    margin-bottom: 2rem;
}

.stat {
    text-align: center;
}

.stat h3 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
}

.stat p {
    opacity: 0.8;
    font-size: 0.9rem;
}

.hero-buttons {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}

/* AI Network Animation */
.ai-network {
    position: relative;
    width: 400px;
    height: 400px;
    margin: 0 auto;
}

.node {
    position: absolute;
    width: 80px;
    height: 80px;
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    animation: float 3s ease-in-out infinite;
    backdrop-filter: blur(10px);
}

.main-node {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
    font-size: 2rem;
    background: rgba(255, 255, 255, 0.2);
}

.agent-node {
    animation-delay: calc(var(--delay, 0) * 0.5s);
}

.agent-node:nth-child(2) { --delay: 1; }
.agent-node:nth-child(3) { --delay: 2; }
.agent-node:nth-child(4) { --delay: 3; }
.agent-node:nth-child(5) { --delay: 4; }

@keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(5deg); }
}

/* Services Section */
.services {
    padding: 100px 0;
    background: var(--background-alt);
}

.section-title {
    text-align: center;
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: var(--text);
}

.section-subtitle {
    text-align: center;
    font-size: 1.2rem;
    color: var(--text-light);
    margin-bottom: 3rem;
}

.category-filters {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 3rem;
    flex-wrap: wrap;
}

.filter-btn {
    background: white;
    border: 2px solid var(--border);
    padding: 10px 20px;
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: all 0.3s;
    font-weight: 500;
}

.filter-btn.active,
.filter-btn:hover {
    background: var(--primary);
    color: white;
    border-color: var(--primary);
}

.services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
}

.service-card {
    background: white;
    border-radius: var(--border-radius);
    padding: 2rem;
    box-shadow: var(--shadow);
    transition: all 0.3s;
    border: 1px solid var(--border);
    position: relative;
    overflow: hidden;
}

.service-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(135deg, var(--primary), var(--secondary));
}

.service-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
}

.service-icon {
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    border-radius: var(--border-radius);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
    color: white;
    font-size: 1.5rem;
}

.service-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--text);
}

.service-description {
    color: var(--text-light);
    margin-bottom: 1.5rem;
    line-height: 1.6;
}

.service-features {
    list-style: none;
    margin-bottom: 2rem;
}

.service-features li {
    padding: 0.5rem 0;
    color: var(--text);
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.service-features li i {
    color: var(--success);
    font-size: 0.9rem;
}

.service-ai-agents {
    background: var(--background-alt);
    padding: 1rem;
    border-radius: var(--border-radius);
    margin-bottom: 1.5rem;
    font-size: 0.9rem;
}

.service-ai-agents strong {
    color: var(--primary);
}

.service-pricing {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid var(--border);
}

.price {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--primary);
}

.price-period {
    font-size: 0.9rem;
    color: var(--text-light);
}

/* Process Section */
.process {
    padding: 100px 0;
    background: white;
}

.process-steps {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
}

.step {
    text-align: center;
    padding: 2rem 1rem;
    position: relative;
}

.step::before {
    content: '';
    position: absolute;
    top: 40px;
    left: 50%;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, var(--primary), var(--secondary));
    z-index: 1;
}

.step:last-child::before {
    display: none;
}

.step-icon {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;
    color: white;
    font-size: 1.5rem;
    position: relative;
    z-index: 2;
}

.step h3 {
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--text);
}

.step p {
    color: var(--text-light);
    line-height: 1.6;
}

/* Payments Section */
.payments {
    padding: 100px 0;
    background: var(--background-alt);
}

.payment-methods {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
}

.payment-method {
    background: white;
    padding: 2rem;
    border-radius: var(--border-radius);
    text-align: center;
    box-shadow: var(--shadow);
    transition: all 0.3s;
    border: 2px solid transparent;
}

.payment-method:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
    border-color: var(--primary);
}

.payment-icon {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;
    color: white;
    font-size: 1.5rem;
}

.payment-method h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--text);
}

.payment-method p {
    color: var(--text-light);
    margin-bottom: 1.5rem;
}

.bank-details, .supported-banks {
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--border);
}

.bank-details p {
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
}

.supported-banks {
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
}

.bank-logo {
    background: var(--background-alt);
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--text);
}

.coming-soon {
    margin-top: 1rem;
}

.coming-soon span {
    background: var(--primary);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 600;
}

/* Testimonials */
.testimonials {
    padding: 100px 0;
    background: white;
}

.testimonial-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
}

.testimonial-card {
    background: white;
    padding: 2rem;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
    border: 1px solid var(--border);
}

.testimonial-content {
    font-style: italic;
    color: var(--text);
    margin-bottom: 1.5rem;
    line-height: 1.6;
}

.testimonial-author {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.author-avatar {
    width: 50px;
    height: 50px;
    background: var(--background-alt);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--primary);
}

.author-info h4 {
    font-weight: 600;
    margin-bottom: 0.25rem;
}

.author-info p {
    color: var(--text-light);
    font-size: 0.9rem;
}

/* Footer */
.footer {
    background: var(--text);
    color: white;
    padding: 60px 0 20px;
}

.footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 3rem;
    margin-bottom: 2rem;
}

.footer-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
}

.footer-logo i {
    color: var(--primary);
}

.footer-section h3 {
    margin-bottom: 1.5rem;
    color: white;
}

.footer-section ul {
    list-style: none;
}

.footer-section ul li {
    margin-bottom: 0.5rem;
}

.footer-section ul li a {
    color: #cbd5e0;
    text-decoration: none;
    transition: color 0.3s;
}

.footer-section ul li a:hover {
    color: white;
}

.contact-info p {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    color: #cbd5e0;
}

.footer-bottom {
    text-align: center;
    padding-top: 2rem;
    border-top: 1px solid #4a5568;
    color: #cbd5e0;
    font-size: 0.9rem;
}

/* AI Chat Widget */
.ai-chat-widget {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 350px;
    background: white;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-lg);
    z-index: 1000;
    display: none;
    border: 1px solid var(--border);
}

.ai-chat-widget.open {
    display: block;
    animation: slideInUp 0.3s ease;
}

.chat-header {
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    color: white;
    padding: 1rem;
    border-radius: var(--border-radius) var(--border-radius) 0 0;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.chat-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 600;
}

.chat-actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.chat-status {
    width: 8px;
    height: 8px;
    background: var(--success);
    border-radius: 50%;
    display: inline-block;
}

.chat-body {
    height: 300px;
    overflow-y: auto;
    padding: 1rem;
    background: var(--background-alt);
}

.chat-message {
    display: flex;
    margin-bottom: 1rem;
    gap: 0.5rem;
}

.ai-message {
    flex-direction: row;
}

.user-message {
    flex-direction: row-reverse;
}

.message-avatar {
    width: 30px;
    height: 30px;
    background: var(--primary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 0.8rem;
    flex-shrink: 0;
}

.user-message .message-avatar {
    background: var(--secondary);
}

.message-content {
    background: white;
    padding: 0.75rem 1rem;
    border-radius: 12px;
    max-width: 80%;
    box-shadow: var(--shadow);
    line-height: 1.4;
}

.user-message .message-content {
    background: var(--primary);
    color: white;
}

.quick-replies {
    margin-top: 1rem;
}

.quick-replies-label {
    font-size: 0.8rem;
    color: var(--text-light);
    margin-bottom: 0.5rem;
}

.quick-replies-buttons {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.quick-reply-btn {
    background: white;
    border: 1px solid var(--border);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.3s;
    text-align: left;
}

.quick-reply-btn:hover {
    background: var(--primary);
    color: white;
    border-color: var(--primary);
}

.typing-indicator .message-content {
    background: transparent;
    box-shadow: none;
    padding: 0.5rem 1rem;
}

.typing-dots {
    display: flex;
    gap: 4px;
}

.typing-dots span {
    width: 8px;
    height: 8px;
    background: var(--text-light);
    border-radius: 50%;
    animation: typing 1.4s infinite ease-in-out;
}

.typing-dots span:nth-child(1) { animation-delay: -0.32s; }
.typing-dots span:nth-child(2) { animation-delay: -0.16s; }

@keyframes typing {
    0%, 80%, 100% { transform: scale(0); }
    40% { transform: scale(1); }
}

.chat-input {
    display: flex;
    padding: 1rem;
    border-top: 1px solid var(--border);
    background: white;
    border-radius: 0 0 var(--border-radius) var(--border-radius);
}

.chat-input input {
    flex: 1;
    padding: 0.75rem;
    border: 1px solid var(--border);
    border-radius: 8px;
    outline: none;
    font-family: inherit;
}

.chat-input input:focus {
    border-color: var(--primary);
}

.chat-input button {
    background: var(--primary);
    color: white;
    border: none;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    margin-left: 0.5rem;
    cursor: pointer;
    transition: background 0.3s;
}

.chat-input button:hover {
    background: var(--primary-dark);
}

/* Modal */
.modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 2000;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

.modal.open {
    display: flex;
    animation: fadeIn 0.3s ease;
}

.modal-content {
    background: white;
    border-radius: var(--border-radius);
    width: 90%;
    max-width: 800px;
    max-height: 90vh;
    overflow: hidden;
    box-shadow: var(--shadow-lg);
    animation: slideInUp 0.3s ease;
}

.modal-header {
    padding: 1.5rem 2rem;
    border-bottom: 1px solid var(--border);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-header h2 {
    margin: 0;
    color: var(--text);
}

.modal-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--text-light);
    padding: 5px;
    border-radius: 4px;
    transition: background 0.3s;
}

.modal-close:hover {
    background: var(--background-alt);
}

.modal-body {
    padding: 2rem;
    max-height: calc(90vh - 100px);
    overflow-y: auto;
}

/* Auth Forms */
.auth-form {
    max-width: 400px;
    margin: 0 auto;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: var(--text);
}

.form-group input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--border);
    border-radius: var(--border-radius);
    font-family: inherit;
    transition: border-color 0.3s;
}

.form-group input:focus {
    outline: none;
    border-color: var(--primary);
}

.auth-switch {
    text-align: center;
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--border);
}

.auth-switch a {
    color: var(--primary);
    text-decoration: none;
    font-weight: 500;
}

.auth-switch a:hover {
    text-decoration: underline;
}

/* Dashboard */
.dashboard-tabs {
    display: flex;
    border-bottom: 1px solid var(--border);
    margin-bottom: 2rem;
    flex-wrap: wrap;
}

.dashboard-tabs button {
    background: none;
    border: none;
    padding: 1rem 2rem;
    cursor: pointer;
    border-bottom: 3px solid transparent;
    font-weight: 500;
    color: var(--text-light);
    transition: all 0.3s;
    white-space: nowrap;
}

.dashboard-tabs button.tab-active {
    color: var(--primary);
    border-bottom-color: var(--primary);
}

.tab-content {
    display: none;
}

.tab-content.active {
    display: block;
    animation: fadeIn 0.3s ease;
}

.dashboard-section {
    margin-bottom: 3rem;
}

.dashboard-section h3 {
    margin-bottom: 1.5rem;
    color: var(--text);
}

.services-list {
    display: grid;
    gap: 1.5rem;
}

.service-dashboard-card {
    background: white;
    border: 1px solid var(--border);
    border-radius: var(--border-radius);
    padding: 1.5rem;
    box-shadow: var(--shadow);
}

.service-header {
    display: flex;
    justify-content: space-between;
    align-items: start;
    margin-bottom: 1rem;
    flex-wrap: wrap;
    gap: 1rem;
}

.service-info h4 {
    margin-bottom: 0.5rem;
    color: var(--text);
}

.service-status {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
}

.service-status.pending { background: #fed7d7; color: #c53030; }
.service-status.in-progress { background: #feebc8; color: #dd6b20; }
.service-status.completed { background: #c6f6d5; color: #276749; }

.service-progress {
    flex: 1;
    min-width: 200px;
}

.progress-bar {
    background: var(--background-alt);
    border-radius: 10px;
    height: 8px;
    margin-bottom: 0.5rem;
    overflow: hidden;
}

.progress-bar.large {
    height: 12px;
}

.progress {
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    height: 100%;
    border-radius: 10px;
    transition: width 0.3s ease;
}

.service-details {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 1.5rem;
}

.detail {
    font-size: 0.9rem;
}

.detail strong {
    color: var(--text);
}

.service-updates {
    margin-bottom: 1.5rem;
}

.service-updates h5 {
    margin-bottom: 1rem;
    color: var(--text);
}

.update {
    background: var(--background-alt);
    padding: 1rem;
    border-radius: var(--border-radius);
    margin-bottom: 0.5rem;
}

.update-date {
    font-size: 0.8rem;
    color: var(--text-light);
    margin-bottom: 0.25rem;
}

.update-message {
    margin-bottom: 0.25rem;
}

.update-agent {
    font-size: 0.8rem;
    color: var(--primary);
    font-style: italic;
}

.service-actions {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}

/* Payment Stats */
.payment-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.stat-card {
    background: white;
    border: 1px solid var(--border);
    border-radius: var(--border-radius);
    padding: 1.5rem;
    text-align: center;
    box-shadow: var(--shadow);
}

.stat-value {
    font-size: 2rem;
    font-weight: 700;
    color: var(--primary);
    margin-bottom: 0.5rem;
}

.stat-label {
    color: var(--text-light);
    font-size: 0.9rem;
}

.payment-list {
    background: white;
    border: 1px solid var(--border);
    border-radius: var(--border-radius);
    overflow: hidden;
}

.payment-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--border);
}

.payment-item:last-child {
    border-bottom: none;
}

.payment-info {
    display: grid;
    grid-template-columns: auto auto auto;
    gap: 2rem;
    align-items: center;
}

.payment-amount {
    font-weight: 600;
    color: var(--text);
}

.payment-method {
    color: var(--text-light);
    font-size: 0.9rem;
}

.payment-date {
    color: var(--text-light);
    font-size: 0.9rem;
}

.payment-status {
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
}

.payment-status.completed {
    background: #c6f6d5;
    color: #276749;
}

/* Service Detail View */
.service-detail-view {
    display: grid;
    gap: 2rem;
}

.detail-section h3 {
    margin-bottom: 1rem;
    color: var(--text);
}

.progress-stats {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
    color: var(--text-light);
    font-size: 0.9rem;
}

.ai-agents-list {
    display: grid;
    gap: 1rem;
}

.ai-agent {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: var(--background-alt);
    border-radius: var(--border-radius);
}

.ai-agent i {
    color: var(--primary);
    font-size: 1.2rem;
}

.activity-timeline {
    display: grid;
    gap: 1rem;
}

.activity-item {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    background: var(--background-alt);
    border-radius: var(--border-radius);
}

.activity-date {
    min-width: 80px;
    font-size: 0.8rem;
    color: var(--text-light);
}

.activity-content {
    flex: 1;
}

.activity-message {
    margin-bottom: 0.25rem;
}

.activity-agent {
    font-size: 0.8rem;
    color: var(--primary);
    font-style: italic;
}

/* Error Message */
.error-message {
    text-align: center;
    padding: 3rem;
    color: var(--text-light);
}

.error-message i {
    font-size: 3rem;
    color: var(--error);
    margin-bottom: 1rem;
}

/* Payment Error */
.payment-error {
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--error);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: var(--border-radius);
    display: flex;
    align-items: center;
    gap: 1rem;
    box-shadow: var(--shadow-lg);
    z-index: 3000;
    animation: slideInRight 0.3s ease;
}

.payment-error button {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 5px;
    border-radius: 4px;
}

.payment-error button:hover {
    background: rgba(255,255,255,0.2);
}

/* Service Request Options */
.service-request-options {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
}

.service-option {
    background: white;
    border: 1px solid var(--border);
    border-radius: var(--border-radius);
    padding: 1.5rem;
    text-align: center;
    box-shadow: var(--shadow);
    transition: all 0.3s;
}

.service-option:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
}

.service-option h4 {
    margin-bottom: 1rem;
    color: var(--text);
}

.service-option p {
    color: var(--text-light);
    margin-bottom: 1.5rem;
    font-size: 0.9rem;
}

/* Animations */
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideInRight {
    from {
        opacity: 0;
        transform: translateX(30px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes pulse {
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: 0.5;
    }
}

.loading {
    animation: pulse 2s infinite;
}

/* Scroll Animations */
.service-card, .step, .payment-method, .testimonial-card {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease;
}

.service-card.visible, .step.visible, .payment-method.visible, .testimonial-card.visible {
    opacity: 1;
    transform: translateY(0);
}
