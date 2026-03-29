import "../CSS/Login.css";
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import dormImg from "../assets/dorm.jpg";

function Login() {
  const slides = [
    {
      title: "Find deals on",
      highlight: "cheap textbooks",
      accent: "gold",
      image:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80"
    },
    {
      title: "Find deals on",
      highlight: "campus tech",
      accent: "gold",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
    },
    {
      title: "Find deals on",
      highlight: "dorm essentials",
      accent: "gold",
      image: dormImg
    },
    {
      title: "Find deals on",
      highlight: "student style",
      accent: "gold",
      image:
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1200&q=80"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [previousSlide, setPreviousSlide] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("login");

  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setPreviousSlide(currentSlide);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [currentSlide,slides.length]);


  function goToAbout() {
  window.location.href = "/about";
  }
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

  async function handleLoginSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: loginUsername,
          password: loginPassword
        })
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

  function closeModal() {
    setShowModal(false);

    setLoginUsername("");
    setLoginPassword("");

    setRegisterEmail("");
    setRegisterUsername("");
    setRegisterPassword("");
    setConfirmPassword("");
  }  

  return (

    
    <div className="ks-login-page">
      <div
        className="ks-login-bg"
        style={{ backgroundImage: `url(${slides[previousSlide].image})` }}
      ></div>
        
      <div
        key={currentSlide}
        className="ks-login-bg-fade"
        style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
      ></div>

      <div className="ks-login-overlay">
        <nav className="ks-login-top-nav">
          <div className="ks-login-logo">
            <img src={logo} alt="Knight Swap logo" className="ks-logo-img" />
            <span>Knight Swap</span>
          </div>

          <div className="ks-login-nav-links">
            <button className="ks-nav-link-btn" onClick={goToAbout}>
              About
            </button>
            <a href="#">Browse</a>
            <button className="ks-login-nav-login" onClick={openLoginModal}>
              Log In
            </button>
            <button className="ks-login-nav-signup" onClick={openSignupModal}>
              Sign Up
            </button>
          </div>
        </nav>

        <section className="ks-login-hero-section">
          <div className="ks-login-hero-text">
            <h1>{slides[currentSlide].title}</h1>
            <h1
              className={
                slides[currentSlide].accent === "gold"
                  ? "ks-login-highlight-gold"
                  : "ks-login-highlight-white"
              }
            >
              {slides[currentSlide].highlight}
            </h1>

            <div className="ks-login-dots">
              {slides.map((slide, index) => (
                <span
                  key={index}
                  className={
                    index === currentSlide
                      ? "ks-login-dot ks-login-active-dot"
                      : "ks-login-dot"
                  }
                ></span>
              ))}
            </div>

            <div className="ks-login-hero-buttons">
              <button className="ks-login-hero-signup" onClick={openSignupModal}>
                Join Knight Swap
              </button>
              <button
                className="ks-login-hero-login-link"
                onClick={openLoginModal}
              >
                I already have an account
              </button>
            </div>
          </div>
        </section>

        {showModal && (
          <div className="ks-login-modal-wrapper">
            <div className="ks-login-modal-card">
              <button
                className="ks-login-close-button"
                onClick={closeModal}
              >
                ×
              </button>

              {modalType === "login" ? (
                <>
                  <h2>Welcome to Knight Swap</h2>
                  <p className="ks-login-modal-subtitle">
                    Buy, sell, and discover items across UCF
                  </p>

                  <form onSubmit={handleLoginSubmit}>
                    <label htmlFor="loginUsername">Username</label>
                    <input
                      id="loginUsername"
                      type="text"
                      placeholder="Enter your username"
                      value={loginUsername}
                      onChange={(event) => setLoginUsername(event.target.value)}
                      required
                    />

                    <label htmlFor="loginPassword">Password</label>
                    <input
                      id="loginPassword"
                      type="password"
                      placeholder="Enter your password"
                      value={loginPassword}
                      onChange={(event) => setLoginPassword(event.target.value)}
                      required
                    />

                    <button type="submit" className="ks-login-main-button">
                      Log In
                    </button>
                  </form>

                  <p className="ks-login-switch-text">
                    Don’t have an account?{" "}
                    <span onClick={openSignupModal}>Sign up</span>
                  </p>
                </>
              ) : (
                <>
                  <h2>Join Knight Swap</h2>
                  <p className="ks-login-modal-subtitle">
                    Create an account to start buying and selling on campus
                  </p>

                  <form onSubmit={handleRegisterSubmit}>
                    <label htmlFor="registerEmail">UCF Email</label>
                    <input
                      id="registerEmail"
                      type="email"
                      placeholder="example@ucf.edu"
                      value={registerEmail}
                      onChange={(event) => setRegisterEmail(event.target.value)}
                      required
                    />

                    <label htmlFor="registerUsername">Username</label>
                    <input
                      id="registerUsername"
                      type="text"
                      placeholder="Choose a username"
                      value={registerUsername}
                      onChange={(event) => setRegisterUsername(event.target.value)}
                      required
                    />

                    <label htmlFor="registerPassword">Password</label>
                    <input
                      id="registerPassword"
                      type="password"
                      placeholder="Create a password"
                      value={registerPassword}
                      onChange={(event) => setRegisterPassword(event.target.value)}
                      required
                    />

                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(event) => setConfirmPassword(event.target.value)}
                      required
                    />

                    <button type="submit" className="ks-login-main-button">
                      Create Account
                    </button>
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
            <a href="/help" className="ks-support-fab">
        <span className="ks-support-icon">?</span>
        <span className="ks-support-label">Support</span>
      </a>
      
    </div>
  );
}

export default Login;
