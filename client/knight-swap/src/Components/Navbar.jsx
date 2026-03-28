import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Navbar.css";

function Navbar({ username }) {
  const navigate = useNavigate();
  const location = useLocation();

  function handleLogout() {
    localStorage.removeItem("savedUser");
    window.location.href = "/";
  }

  return (
    <nav className="ks-home-navbar">
      <div className="ks-home-logo" onClick={() => navigate("/homepage")}>
        <img src={logo} alt="Knight Swap logo" className="ks-home-logo-img" />
        <span>Knight Swap</span>
      </div>

      <div className="ks-home-nav-links">
        <span
          className={location.pathname === "/homepage" ? "ks-home-nav-active" : ""}
          onClick={() => navigate("/homepage")}
        >
          HOME
        </span>

        <span
          classname={location.pathname === "/shop" ? "ks-home-nav-active" : ""  }
        > 
          SHOP 
        </span>

        <span
          className={location.pathname === "/add-item" ? "ks-home-nav-active" : ""}
          onClick={() => navigate("/add-item")}
        >
          SELL
        </span>

        <span
          className={location.pathname === "/offers" ? "ks-home-nav-active" : ""}
          onClick={() => navigate("/offers")}
        >
          OFFERS
        </span>

        <span
          className={location.pathname === "/posts" ? "ks-home-nav-active" : ""}
          onClick={() => navigate("/posts")}
        >
          POSTS
        </span>

        <button className="ks-home-logout-btn" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </nav>
  );
}

export default Navbar;