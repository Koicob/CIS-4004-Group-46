import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/logo.png";
import '../CSS/About.css';
import '../CSS/Login.css';

const About = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("login");

  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

  return (
    <div className="about">

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

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>About</h1>
          <p className="hero-subtitle">
            Knight Swap for the <span className="hero-accent">Knight Nation</span>
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission" id="mission">
        <div className="section-header">
          <h2>Our Mission</h2>
          <p>Built by Knights, for Knights</p>
        </div>
        
        <div className="mission-content">
          <div className="mission-text">
            <h3>Empowering the UCF Community</h3>
            <p>
              UCF Student Swap was created with a simple belief:{' '}
              <span className="mission-highlight">Knights help Knights</span>. We know how expensive 
              college life can be—from $300 textbooks you'll only use for one semester to dorm 
              furniture you'll need to replace every year.
            </p>
            <p>
              Our platform connects the UCF community exclusively, ensuring that every transaction 
              happens between verified @knights.ucf.edu members. No more paying inflated prices to 
              strangers. No more meeting randos from public apps in sketchy parking lots.
            </p>
            <p>
              We're here to help you save money, reduce waste, and build connections within the 
              Knight's community.
            </p>
          </div>
          
          <div className="mission-stats">
            <div className="stat-card">
              <span className="stat-number">$500+</span>
              <div className="stat-label">Average savings per student per semester</div>
            </div>
            <div className="stat-card">
              <span className="stat-number">100%</span>
              <div className="stat-label">UCF verified community</div>
            </div>
            <div className="stat-card">
              <span className="stat-number">24/7</span>
              <div className="stat-label">Safe exchange zone monitoring</div>
            </div>
            <div className="stat-card">
              <span className="stat-number">Zero</span>
              <div className="stat-label">Strangers from outside UCF</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="why-section" id="why">
        <div className="section-header">
          <h2>Why Campus-Only?</h2>
          <p>Safety, Sustainability, and Community</p>
        </div>
        
        <div className="why-grid">
          <div className="why-card">
            <div className="why-icon">🛡️</div>
            <h3>Safety First</h3>
            <p>
              Public marketplace apps put you at risk—meeting strangers in unfamiliar locations 
              with no verification. UCF Student Swap eliminates that danger. Every user is verified 
              with a @knights.ucf.edu email, and we encourage all exchanges at UCF Police Department 
              Safe Exchange Spots—well-lit, monitored by surveillance, and staffed 24/7.
            </p>
          </div>
          
          <div className="why-card">
            <div className="why-icon">♻️</div>
            <h3>Sustainability</h3>
            <p>
              Every year, tons of perfectly good textbooks, furniture, and electronics end up in 
              landfills when students move out. By keeping transactions within the UCF community, 
              we're creating a circular economy where one Knight's unused item becomes another's 
              treasure. Reduce waste, reuse resources, recycle within Knight Nation.
            </p>
          </div>
          
          <div className="why-card">
            <div className="why-icon">🤝</div>
            <h3>Trusted Community</h3>
            <p>
              There's something powerful about knowing you're dealing with a fellow Knight. Whether 
              it's an upperclassman passing down study materials or a neighbor selling a mini-fridge, 
              these connections build the fabric of our campus community. We're not just a 
              marketplace—we're a network of students helping students succeed.
            </p>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process" id="how">
        <div className="section-header">
          <h2>How It Works</h2>
          <p>Three simple steps to start swapping</p>
        </div>
        
        <div className="process-steps">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <div className="step-icon">🎓</div>
              <h3>Join</h3>
              <p>
                Sign up with your @knights.ucf.edu email. Instant verification means you're part 
                of the trusted Knight Nation network within minutes.
              </p>
            </div>
          </div>
          
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <div className="step-icon">📱</div>
              <h3>List or Browse</h3>
              <p>
                Post items you want to sell with photos and descriptions, or search for what you 
                need—textbooks, dorm essentials, electronics, and more.
              </p>
            </div>
          </div>
          
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <div className="step-icon">🤝</div>
              <h3>Swap</h3>
              <p>
                Agree on a price, then meet at a designated UCF Safe Exchange Zone to complete your 
                transaction safely and securely.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <h2>Ready to Join Knight Nation?</h2>
        <p>
          Start saving money and connecting with fellow Knights today. Your next great deal is just 
          a click away.
        </p>
        <button className="cta-button" onClick={openSignupModal}>Join Knight Swap</button>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-content">
          <div className="footer-logo">UCF Student Swap</div>
          <p className="footer-tagline">By Knights, For Knights</p>
          <div className="footer-links">
            <Link to="/help">Help Center</Link>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 UCF Student Swap. Built exclusively for the University of Central Florida community.</p>
            <p style={{ marginTop: '0.5rem', fontSize: '0.8rem' }}>
              Not officially affiliated with the University of Central Florida.
            </p>
          </div>
        </div>
      </footer>

      {/* Modal */}
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
                  <input
                    id="loginUsername"
                    type="text"
                    placeholder="Enter your username"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    required
                  />
                  <label htmlFor="loginPassword">Password</label>
                  <input
                    id="loginPassword"
                    type="password"
                    placeholder="Enter your password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                  <button type="submit" className="ks-login-main-button">Log In</button>
                </form>
                <p className="ks-login-switch-text">
                  Don't have an account?{" "}
                  <span onClick={openSignupModal}>Sign up</span>
                </p>
              </>
            ) : (
              <>
                <h2>Join Knight Swap</h2>
                <p className="ks-login-modal-subtitle">Create an account to start buying and selling on campus</p>
                <form onSubmit={handleRegisterSubmit}>
                  <label htmlFor="registerEmail">UCF Email</label>
                  <input
                    id="registerEmail"
                    type="email"
                    placeholder="example@ucf.edu"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    required
                  />
                  <label htmlFor="registerUsername">Username</label>
                  <input
                    id="registerUsername"
                    type="text"
                    placeholder="Choose a username"
                    value={registerUsername}
                    onChange={(e) => setRegisterUsername(e.target.value)}
                    required
                  />
                  <label htmlFor="registerPassword">Password</label>
                  <input
                    id="registerPassword"
                    type="password"
                    placeholder="Create a password"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    required
                  />
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button type="submit" className="ks-login-main-button">Create Account</button>
                </form>
                <p className="ks-login-switch-text">
                  Already have an account?{" "}
                  <span onClick={openLoginModal}>Log in</span>
                </p>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default About;
