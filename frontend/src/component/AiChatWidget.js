import React, { useState, useRef, useEffect } from 'react';

const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { content: inputValue, sender: 'user' }]);
    setInputValue('');
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        content: "I'm processing your request...", 
        sender: 'ai' 
      }]);
    }, 1000);
  };

  return (
    <div className={`ai-chat-widget ${isOpen ? 'open' : ''}`}>
      <div className="chat-header" onClick={() => setIsOpen(!isOpen)}>
        <div className="chat-title">
          <i className="fas fa-robot"></i>
          <span>AI Consultant</span>
        </div>
      </div>
      
      {isOpen && (
        <>
          <div className="chat-body">
            {messages.map((message, index) => (
              <div key={index} className={`chat-message ${message.sender}-message`}>
                <div className="message-content">
                  <p>{message.content}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="chat-input">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask about our services..."
            />
            <button onClick={sendMessage}>
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AIChatWidget;
