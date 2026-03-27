import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Pages/Login";
import Homepage from "./Pages/Homepage";
import AddItem from "./Pages/addItem";
import Offers from "./Pages/offers";
import UserPosts from "./Pages/userPosts";
import Admin from './pages/Admin';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/add-item" element={<AddItem />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/posts" element={<UserPosts />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
