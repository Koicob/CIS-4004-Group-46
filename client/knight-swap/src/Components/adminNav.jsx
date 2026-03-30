import logo from "../assets/logo.png";
import "./Navbar.css";

function Navbar() {

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

        <button className="ks-home-logout-btn" onClick={handleLogout}>
          Log Out
        </button>
    </nav>
  );
}

export default Navbar;