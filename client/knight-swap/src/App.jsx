import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/login';
import Register from './pages/register';
import Seller from './pages/seller';
import Admin from './pages/admin';
import Buyer from './pages/buyer'; 
import Homepage from './pages/homepage'; 


export default function App() {
    return (
        <BrowserRouter>
            <div>
                <h1>Knight Swap Marketplace</h1>
                <hr />
                
                {/* The Routes control which component shows up based on the URL */}
                <Routes>
                    {/* The project requires the first screen to be the login page */}
                    <Route path="/" element={<Login />} />
                    
                    <Route path="/register" element={<Register />} />
                    <Route path="/seller" element={<Seller />} />
                    <Route path="/admin" element={<Admin />} />
                    
                    {/* <Route path="/buyer" element={<Buyer />} /> */}
                </Routes>
            </div>
        </BrowserRouter>
    );
}