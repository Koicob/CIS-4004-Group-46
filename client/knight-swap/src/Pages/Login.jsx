import { useEffect, useState } from "react";

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
      accent: "white",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
    },
    {
      title: "Find deals on",
      highlight: "dorm essentials",
      accent: "gold",
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
    },
    {
      title: "Find deals on",
      highlight: "student style",
      accent: "white",
      image:
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1200&q=80"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [showModal, setShowModal] = useState(true);
  const [modalType, setModalType] = useState("login");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [slides.length]);

  function openLoginModal() {
    setModalType("login");
    setShowModal(true);
  }

  function openSignupModal() {
    setModalType("signup");
    setShowModal(true);
  }

  function handleLoginSubmit(event) {
    event.preventDefault();
    console.log("Login submitted:", loginEmail, loginPassword);
  }

  function handleRegisterSubmit(event) {
    event.preventDefault();
    console.log(
      "Register submitted:",
      registerEmail,
      registerUsername,
      registerPassword,
      confirmPassword
    );
  }

  return (
    <div
      className="landing-page"
      style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
    >
      <div className="overlay">
        <nav className="top-nav">
          <div className="logo">Knight Swap</div>

          <div className="nav-links">
            <a href="#">About</a>
            <a href="#">Browse</a>
            <button className="nav-login" onClick={openLoginModal}>
              Log In
            </button>
            <button className="nav-signup" onClick={openSignupModal}>
              Sign Up
            </button>
          </div>
        </nav>

        <section className="hero-section">
          <div className="hero-text">
            <h1>{slides[currentSlide].title}</h1>
            <h1 className={slides[currentSlide].accent === "gold" ? "highlight-gold" : "highlight-white"}>
              {slides[currentSlide].highlight}
            </h1>

            <div className="dots">
              {slides.map((slide, index) => (
                <span
                  key={index}
                  className={index === currentSlide ? "dot active-dot" : "dot"}
                ></span>
              ))}
            </div>

            <div className="hero-buttons">
              <button className="hero-signup" onClick={openSignupModal}>
                Join Knight Swap
              </button>
              <button className="hero-login-link" onClick={openLoginModal}>
                I already have an account
              </button>
            </div>
          </div>
        </section>

        {showModal && (
          <div className="modal-wrapper">
            <div className="modal-card">
              <button className="close-button" onClick={() => setShowModal(false)}>
                ×
              </button>

              {modalType === "login" ? (
                <>
                  <h2>Welcome to Knight Swap</h2>
                  <p className="modal-subtitle">
                    Buy, sell, and discover items across UCF
                  </p>

                  <form onSubmit={handleLoginSubmit}>
                    <label htmlFor="loginEmail">UCF Email</label>
                    <input
                      id="loginEmail"
                      type="email"
                      placeholder="example@ucf.edu"
                      value={loginEmail}
                      onChange={(event) => setLoginEmail(event.target.value)}
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

                    <button type="submit" className="main-button">
                      Log In
                    </button>
                  </form>

                  <p className="switch-text">
                    Don’t have an account?{" "}
                    <span onClick={openSignupModal}>Sign up</span>
                  </p>
                </>
              ) : (
                <>
                  <h2>Join Knight Swap</h2>
                  <p className="modal-subtitle">
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

                    <button type="submit" className="main-button">
                      Create Account
                    </button>
                  </form>

                  <p className="switch-text">
                    Already have an account?{" "}
                    <span onClick={openLoginModal}>Log in</span>
                  </p>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;