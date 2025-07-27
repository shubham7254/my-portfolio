import React, { useState, useRef, useEffect } from 'react';
import ragApiService from '../../../services/ragApi';
import './ChatWidget.css';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: "Hi! I'm an AI assistant that knows all about Shubham's professional background. Ask me anything about his projects, skills, or experience!",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sampleQuestions, setSampleQuestions] = useState([]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    loadSampleQuestions();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const loadSampleQuestions = async () => {
    try {
      const questions = await ragApiService.getSampleQuestions();
      setSampleQuestions(questions.slice(0, 3)); // Show only first 3
    } catch (error) {
      console.error('Failed to load sample questions:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (message = inputMessage) => {
    if (!message.trim()) return;

    const userMessage = {
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await ragApiService.chat(message);
      
      const botMessage = {
        type: 'bot',
        content: response.answer,
        sources: response.sources,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        type: 'bot',
        content: "Sorry, I'm having trouble connecting right now. Please try again later or contact Shubham directly through the contact form.",
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chat-widget">
      {/* Floating Chat Button */}
      <button 
        className={`chat-button ${isOpen ? 'chat-button-open' : ''}`}
        onClick={toggleChat}
        aria-label="Chat with AI about Shubham"
      >
        {isOpen ? (
          <i className="fas fa-times"></i>
        ) : (
          <>
            <i className="fas fa-comments"></i>
            <span className="chat-button-text">Ask about Shubham</span>
          </>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-header-content">
              <i className="fas fa-robot"></i>
              <div>
                <h4>Ask about Shubham</h4>
                <span>AI-powered assistant</span>
              </div>
            </div>
            <button 
              className="chat-close-btn"
              onClick={toggleChat}
              aria-label="Close chat"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`message ${message.type} ${message.isError ? 'error' : ''}`}
              >
                <div className="message-content">
                  {message.content}
                  {message.sources && message.sources.length > 0 && (
                    <div className="message-sources">
                      <small>Sources: {message.sources.join(', ')}</small>
                    </div>
                  )}
                </div>
                <small className="message-time">
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </small>
              </div>
            ))}
            
            {isLoading && (
              <div className="message bot loading">
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Sample Questions */}
          {messages.length === 1 && sampleQuestions.length > 0 && (
            <div className="sample-questions">
              <p>Try asking:</p>
              {sampleQuestions.map((question, index) => (
                <button
                  key={index}
                  className="sample-question-btn"
                  onClick={() => handleSendMessage(question)}
                >
                  {question}
                </button>
              ))}
            </div>
          )}

          <div className="chat-input-container">
            <textarea
              ref={inputRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about Shubham's experience, projects, or skills..."
              rows="1"
              disabled={isLoading}
            />
            <button 
              onClick={() => handleSendMessage()}
              disabled={isLoading || !inputMessage.trim()}
              className="send-button"
              aria-label="Send message"
            >
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
