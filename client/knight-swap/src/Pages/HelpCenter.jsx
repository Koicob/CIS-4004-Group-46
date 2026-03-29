import { Link } from 'react-router-dom';
import logo from "../assets/logo.png";
import '../CSS/Login.css';
import React, { useState, useRef, useEffect } from 'react';
import '../CSS/HelpCenter.css';

const faqs = [
  {
    id: 'safety',
    question: 'How do I meet safely with other students?',
    answer: (
      <>
        <p>Your safety is our top priority! Here are our recommended guidelines:</p>
        <ul>
          <li><strong>Meet on campus:</strong> Use designated safe zones like the Student Union, library lobbies, or near the UCF Police Department.</li>
          <li><strong>Daytime meetings:</strong> Schedule exchanges during daylight hours when more people are around.</li>
          <li><strong>Tell a friend:</strong> Always let someone know where you're going and who you're meeting.</li>
          <li><strong>Public spaces only:</strong> Never go to private residences for initial meetings.</li>
          <li><strong>Trust your instincts:</strong> If something feels off, don't hesitate to cancel.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'account',
    question: 'Is my @knights.ucf.edu email required?',
    answer: (
      <>
        <p><strong>Yes, a valid @knights.ucf.edu email is required</strong> to use UCF Student Swap. Here's why:</p>
        <ul>
          <li><strong>Verification:</strong> It confirms you're a current UCF student, faculty, or staff member.</li>
          <li><strong>Trust:</strong> Our community stays safe because everyone is verified through UCF.</li>
          <li><strong>Accountability:</strong> It helps maintain a trustworthy marketplace.</li>
        </ul>
        <p className="note">Note: Your email is never shared publicly. Other users only see your display name.</p>
      </>
    ),
  },
  {
    id: 'listings',
    question: 'How do I create a listing?',
    answer: (
      <>
        <p>Creating a listing is quick and easy:</p>
        <ol>
          <li>Click the <strong>"+ New Listing"</strong> button in the top navigation.</li>
          <li>Choose a category (Textbooks, Electronics, Furniture, etc.).</li>
          <li>Add clear photos of your item (up to 6 images).</li>
          <li>Write a descriptive title and detailed description.</li>
          <li>Set your price or mark it as "Trade Only" / "Free".</li>
          <li>Hit <strong>"Publish"</strong> and you're live!</li>
        </ol>
        <p className="tip">Pro tip: Listings with clear photos and detailed descriptions sell 3x faster!</p>
      </>
    ),
  },
  {
    id: 'payments',
    question: 'What payment methods are accepted?',
    answer: (
      <>
        <p>We recommend the following secure payment methods:</p>
        <ul>
          <li><strong>Venmo:</strong> Quick and easy for student-to-student payments.</li>
          <li><strong>Zelle:</strong> Instant bank transfers with no fees.</li>
          <li><strong>Cash:</strong> Always count before leaving the meeting spot.</li>
          <li><strong>Apple Pay / Google Pay:</strong> Convenient contactless options.</li>
        </ul>
        <p className="warning">Never accept checks, wire transfers, or payment apps from unverified accounts.</p>
      </>
    ),
  },
  {
    id: 'report',
    question: 'How do I report a suspicious listing or user?',
    answer: (
      <>
        <p>If you encounter something suspicious, please report it immediately:</p>
        <ol>
          <li>Click the <strong>"..."</strong> menu on any listing or user profile.</li>
          <li>Select <strong>"Report"</strong> from the dropdown.</li>
          <li>Choose a reason and add any additional details.</li>
          <li>Submit your report — our team reviews within 24 hours.</li>
        </ol>
        <p>For urgent safety concerns, contact UCF Police at <strong>(407) 823-5555</strong>.</p>
      </>
    ),
  },
  {
    id: 'negotiate',
    question: 'Can I negotiate prices with sellers?',
    answer: (
      <>
        <p><strong>Absolutely!</strong> Negotiation is encouraged on UCF Student Swap.</p>
        <ul>
          <li>Use the <strong>"Make an Offer"</strong> button to send a private offer.</li>
          <li>Be respectful — lowball offers are generally not appreciated.</li>
          <li>Check the listing for "Price Firm" tags before negotiating.</li>
          <li>Bundle deals often get better discounts!</li>
        </ul>
      </>
    ),
  },
];

const botResponses = [
  "Thanks for reaching out! A support team member will be with you shortly.",
  "I've noted your message. Our team typically responds within a few minutes during business hours.",
  "Got it! While you wait, feel free to check our FAQ section for quick answers.",
  "Thanks, Knight! We're here to help. Someone will respond soon.",
];

export default function HelpCenter() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hey there, Knight! How can I help you today?", isUser: false, time: 'Just now' },
  ]);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  function toggleFaq(index) {
    setActiveIndex(activeIndex === index ? null : index);
  }

  function sendMessage(text) {
    const msgText = text || inputValue.trim();
    if (!msgText) return;

    const now = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    setMessages(prev => [...prev, { text: msgText, isUser: true, time: now }]);
    setShowQuickReplies(false);
    setInputValue('');

    setTimeout(() => {
      const reply = botResponses[Math.floor(Math.random() * botResponses.length)];
      const replyTime = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
      setMessages(prev => [...prev, { text: reply, isUser: false, time: replyTime }]);
    }, 1000);
  }

  const filteredFaqs = faqs.filter(faq => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return faq.question.toLowerCase().includes(q);
  });

  return (
    <>
      <section className="help-center">
        {/* Header */}
        <div className="help-header">
          <span className="help-badge">Support</span>
          <h1>Help Center</h1>
          <p>Find answers to common questions about buying, selling, and trading on UCF Student Swap.</p>
        </div>

        {/* Search */}
        <div className="search-container">
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Search for help topics..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Quick Links */}
        <div className="quick-links">
          <a href="#safety" className="quick-link">
            <div className="quick-link-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <span>Safety Tips</span>
          </a>
          <a href="#account" className="quick-link">
            <div className="quick-link-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <span>Account</span>
          </a>
          <a href="#listings" className="quick-link">
            <div className="quick-link-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="9" y1="3" x2="9" y2="21"></line>
              </svg>
            </div>
            <span>Listings</span>
          </a>
          <a href="#payments" className="quick-link">
            <div className="quick-link-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                <line x1="1" y1="10" x2="23" y2="10"></line>
              </svg>
            </div>
            <span>Payments</span>
          </a>
        </div>

        {/* FAQ */}
        <div className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-accordion">
            {filteredFaqs.map((faq, index) => (
              <div key={faq.id} id={faq.id} className={`faq-item ${activeIndex === index ? 'active' : ''}`}>
                <button
                  className="faq-question"
                  aria-expanded={activeIndex === index}
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.question}</span>
                  <svg className="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                <div className="faq-answer">
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="contact-section">
          <div className="contact-card">
            <div className="contact-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <h3>Email Support</h3>
            <p>Get a response within 24 hours</p>
            <a href="mailto:support@ucfstudentswap.com" className="contact-link">support@ucfstudentswap.com</a>
          </div>
          <div className="contact-card">
            <div className="contact-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <h3>Live Chat</h3>
            <p>Available Mon-Fri, 9am-5pm</p>
            <button className="contact-link" onClick={() => setChatOpen(true)}>Start a conversation</button>
          </div>
        </div>
      </section>

      {/* Floating Chat Widget */}
      <div className={`chat-widget ${chatOpen ? 'open' : ''}`}>
        <button className="chat-toggle" onClick={() => setChatOpen(!chatOpen)} aria-label="Open support chat">
          <svg className="chat-icon-open" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <svg className="chat-icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
          {!chatOpen && <span className="chat-notification">1</span>}
        </button>

        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="chat-avatar">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                </svg>
              </div>
              <div>
                <h4>UCF Swap Support</h4>
                <span className="chat-status">
                  <span className="status-dot"></span>
                  Online now
                </span>
              </div>
            </div>
            <button className="chat-minimize" onClick={() => setChatOpen(false)} aria-label="Minimize chat">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
          </div>

          <div className="chat-messages" ref={chatMessagesRef}>
            {messages.map((msg, i) => (
              <div key={i} className={`chat-message ${msg.isUser ? 'user' : 'bot'}`}>
                <div className="message-avatar">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                  </svg>
                </div>
                <div className="message-content">
                  <p>{msg.text}</p>
                  <span className="message-time">{msg.time}</span>
                </div>
              </div>
            ))}

            {showQuickReplies && (
              <div className="quick-replies">
                <button className="quick-reply" onClick={() => sendMessage("I need help with my listing")}>Help with listing</button>
                <button className="quick-reply" onClick={() => sendMessage("I want to report a user")}>Report a user</button>
                <button className="quick-reply" onClick={() => sendMessage("I have a payment question")}>Payment question</button>
              </div>
            )}
          </div>

          <div className="chat-input-container">
            <input
              type="text"
              className="chat-input"
              placeholder="Type your message..."
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
            />
            <button className="chat-send" onClick={() => sendMessage()} aria-label="Send message">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
