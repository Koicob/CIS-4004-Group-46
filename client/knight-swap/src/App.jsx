import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // 1. Import the Provider
import './App.css';

import Login from './pages/Login';
import Register from './pages/Register';
import Homepage from './pages/Homepage';
import Users from './pages/Users';
import Admin from './pages/Admin';
import Buyer from './pages/Buyer';
import Seller from './pages/Seller';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Homepage />} />
            <Route path="/users" element={<Users />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/buyer" element={<Buyer />} />
            <Route path="/seller" element={<Seller />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;