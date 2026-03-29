import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Login from "./Pages/Login";
import Homepage from "./Pages/Homepage";
import About from "./Pages/About";
import Shop from "./Pages/Shop";
import AddItem from "./Pages/addItem";
import Offers from "./Pages/offers";
import UserPosts from "./Pages/userPosts";
import ViewPost from "./Pages/viewPost";
import Admin from './pages/Admin';
import Menu from './Components/Navbar';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<HelpCenter />} />
        <Route path="/homepage" element={<><Menu /> <Homepage /></>} />
        <Route path="/shop" element={<><Menu /> <Shop /></>} />
        <Route path="/sell" element={<><Menu /> <AddItem /></>} />
        <Route path="/offers" element={<><Menu /> <Offers /></>} />
        <Route path="/posts" element={<><Menu /> <UserPosts /></>} />
        <Route path="/item" element={<><Menu /> <ViewPost /></>} />
        <Route path="/admin" element={<><Menu /> <Admin /></>} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
