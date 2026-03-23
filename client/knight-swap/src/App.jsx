import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/login';
import Register from './pages/register';
import Seller from './pages/seller';
import Admin from './pages/admin';



export default function App() {
    return (
        <BrowserRouter>
            <div>
                <h1>Knight Swap Marketplace</h1>
                <hr />
             
                <Routes>
  
                    <Route path="/" element={<Login />} />
                    
                    <Route path="/register" element={<Register />} />
                    <Route path="/seller" element={<Seller />} />
                    <Route path="/admin" element={<Admin />} />
              
                </Routes>
            </div>
        </BrowserRouter>
    );
}