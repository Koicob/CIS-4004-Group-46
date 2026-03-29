import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/About.css';

const About= () => {
  return (
    <div className="about">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>About </h1>
          <p className="hero-subtitle">
            The Official Marketplace for <span className="hero-accent">Knight Nation</span>
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
        <Link to="/signup" className="cta-button">Get Started Now</Link>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-content">
          <div className="footer-logo">⚔ UCF Student Swap</div>
          <p className="footer-tagline">By Knights, For Knights</p>
          
          <div className="footer-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/safety">Safety Guidelines</Link>
            <Link to="/contact">Contact Us</Link>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2026 UCF Student Swap. Built exclusively for the University of Central Florida community.</p>
            <p style={{ marginTop: '0.5rem', fontSize: '0.8rem' }}>
              Not officially affiliated with the University of Central Florida.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
