import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/logo.png";
import '../CSS/HelpCenter.css';
import '../CSS/Login.css';

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
          <li>Click the <strong>"Sell"</strong> button in the navigation menu.</li>
          <li>Choose a category for your item (Textbooks, Electronics, Furniture, etc.).</li>
          <li>Add a photo of your item.</li>
          <li>Write a descriptive title and detailed description.</li>
          <li>Set your asking price.</li>
          <li>Hit <strong>"Post Item"</strong> and you're live!</li>
        </ol>
        <p className="tip">Pro tip: A clear photo and detailed description help your item sell faster!</p>
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
        <p>If you encounter something suspicious, please report it immediately using the <strong>Report</strong> button found on any listing or user profile. Our admin team reviews all reports promptly.</p>
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
          <li>Use the <strong>"Make an Offer"</strong> button on any listing to send a private offer to the seller.</li>
          <li>Be respectful — lowball offers are generally not appreciated.</li>
          <li>Bundle deals often get better discounts!</li>
        </ul>
      </>
    ),
  },
];

export default function HelpCenter() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("login");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Report modal state
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reportDetails, setReportDetails] = useState("");
  const [reportSubmitted, setReportSubmitted] = useState(false);

  function openLoginModal() {
    setLoginUsername("");
    setLoginPassword("");
    setModalType("login");
    setShowModal(true);
  }

  function openSignupModal() {
    setRegisterEmail("");
    setRegisterUsername("");
    setRegisterPassword("");
    setConfirmPassword("");
    setModalType("signup");
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setLoginUsername("");
    setLoginPassword("");
    setRegisterEmail("");
    setRegisterUsername("");
    setRegisterPassword("");
    setConfirmPassword("");
  }

  async function handleLoginSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: loginUsername, password: loginPassword })
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("savedUser", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        alert("Login successful");
        closeModal();
        if (data.user.role === "admin") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/homepage";
        }
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.log(error);
      alert("Error during login");
    }
  }

  async function handleRegisterSubmit(event) {
    event.preventDefault();
    if (registerPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: registerEmail,
          username: registerUsername,
          password: registerPassword
        })
      });
      const data = await response.json();
      if (response.ok) {
        alert("Account created successfully");
        setRegisterEmail("");
        setRegisterUsername("");
        setRegisterPassword("");
        setConfirmPassword("");
        setModalType("login");
        setShowModal(true);
      } else {
        alert(data.message || "Error creating account");
      }
    } catch (error) {
      console.log(error);
      alert("Error creating account");
    }
  }

  function toggleFaq(index) {
    setActiveIndex(activeIndex === index ? null : index);
  }

  function handleReportSubmit(event) {
    event.preventDefault();
    setReportSubmitted(true);
    setTimeout(() => {
      setShowReportModal(false);
      setReportSubmitted(false);
      setReportReason("");
      setReportDetails("");
    }, 2000);
  }

  const filteredFaqs = faqs.filter(faq => {
    if (!searchQuery) return true;
    return faq.question.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <>
      {/* Nav Bar */}
      <nav className="ks-login-top-nav" style={{ position: 'relative', padding: '18px 40px', width: '100%', boxSizing: 'border-box', background: 'linear-gradient(135deg, #000 0%, #1a1a1a 100%)' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src={logo} alt="Knight Swap logo" className="ks-logo-img" />
          <span style={{ fontSize: '30px', fontWeight: '700' }}>Knight Swap</span>
        </Link>
        <div className="ks-login-nav-links">
          <Link to="/about" style={{ color: 'white', textDecoration: 'none', fontWeight: '600' }}>About</Link>
          <a href="/#preview-section" style={{ color: 'white', textDecoration: 'none', fontWeight: '600' }}>Browse</a>
          <button className="ks-login-nav-login" onClick={openLoginModal}>Log In</button>
          <button className="ks-login-nav-signup" onClick={openSignupModal}>Sign Up</button>
        </div>
      </nav>

      <section className="help-center">
        {/* Header */}
        <div className="help-header">
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
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </div>
            <h3>Report an Issue</h3>
            <p>Flag a suspicious listing or user</p>
            <button className="contact-link" onClick={() => setShowReportModal(true)}>Submit a Report</button>
          </div>
        </div>
      </section>

      {/* Login/Signup Modal */}
      {showModal && (
        <div className="ks-login-modal-wrapper">
          <div className="ks-login-modal-card">
            <button className="ks-login-close-button" onClick={closeModal}>×</button>
            {modalType === "login" ? (
              <>
                <h2>Welcome to Knight Swap</h2>
                <p className="ks-login-modal-subtitle">Buy, sell, and discover items across UCF</p>
                <form onSubmit={handleLoginSubmit}>
                  <label htmlFor="loginUsername">Username</label>
                  <input id="loginUsername" type="text" placeholder="Enter your username" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} required />
                  <label htmlFor="loginPassword">Password</label>
                  <input id="loginPassword" type="password" placeholder="Enter your password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
                  <button type="submit" className="ks-login-main-button">Log In</button>
                </form>
                <p className="ks-login-switch-text">Don't have an account? <span onClick={openSignupModal}>Sign up</span></p>
              </>
            ) : (
              <>
                <h2>Join Knight Swap</h2>
                <p className="ks-login-modal-subtitle">Create an account to start buying and selling on campus</p>
                <form onSubmit={handleRegisterSubmit}>
                  <label htmlFor="registerEmail">UCF Email</label>
                  <input id="registerEmail" type="email" placeholder="example@ucf.edu" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} required />
                  <label htmlFor="registerUsername">Username</label>
                  <input id="registerUsername" type="text" placeholder="Choose a username" value={registerUsername} onChange={(e) => setRegisterUsername(e.target.value)} required />
                  <label htmlFor="registerPassword">Password</label>
                  <input id="registerPassword" type="password" placeholder="Create a password" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} required />
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input id="confirmPassword" type="password" placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                  <button type="submit" className="ks-login-main-button">Create Account</button>
                </form>
                <p className="ks-login-switch-text">Already have an account? <span onClick={openLoginModal}>Log in</span></p>
              </>
            )}
          </div>
        </div>
      )}

      {/* Report Modal */}
      {showReportModal && (
        <div className="ks-login-modal-wrapper">
          <div className="ks-login-modal-card">
            <button className="ks-login-close-button" onClick={() => { setShowReportModal(false); setReportSubmitted(false); setReportReason(""); setReportDetails(""); }}>×</button>
            {reportSubmitted ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                <h2 style={{ fontSize: '1.5rem' }}>Report Submitted</h2>
                <p className="ks-login-modal-subtitle">Our team will review it within 24 hours. Thank you!</p>
              </div>
            ) : (
              <>
                <h2>Submit a Report</h2>
                <p className="ks-login-modal-subtitle">Flag a suspicious listing or user to our admin team</p>
                <form onSubmit={handleReportSubmit}>
                  <label htmlFor="reportReason">Reason</label>
                  <select
                    id="reportReason"
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                    required
                    style={{ width: '100%', padding: '14px 16px', border: '1px solid #d3d3d3', borderRadius: '16px', fontSize: '16px', marginBottom: '8px', fontFamily: 'inherit' }}
                  >
                    <option value="">Select a reason...</option>
                    <option value="suspicious_listing">Suspicious listing</option>
                    <option value="suspicious_user">Suspicious user</option>
                    <option value="scam">Potential scam</option>
                    <option value="inappropriate">Inappropriate content</option>
                    <option value="other">Other</option>
                  </select>
                  <label htmlFor="reportDetails">Details</label>
                  <textarea
                    id="reportDetails"
                    placeholder="Describe the issue in detail..."
                    value={reportDetails}
                    onChange={(e) => setReportDetails(e.target.value)}
                    required
                    style={{ width: '100%', padding: '14px 16px', border: '1px solid #d3d3d3', borderRadius: '16px', fontSize: '16px', fontFamily: 'inherit', minHeight: '120px', resize: 'vertical' }}
                  />
                  <button type="submit" className="ks-login-main-button">Submit Report</button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
