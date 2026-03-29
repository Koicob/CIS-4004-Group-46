import "../CSS/Homepage.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


import textbooksImg from "../assets/textbooks.jpg";
import furnitureImg from "../assets/furniture.jpeg";
import clothesImg from "../assets/clothes.jpg";

function Homepage() {
  const savedUser = JSON.parse(localStorage.getItem("savedUser")) || {
    username: "Guest"
  };

  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  function handleHomepageSearch() {
    const trimmedSearch = searchText.trim();

    if (trimmedSearch) {
      navigate(`/shop?search=${encodeURIComponent(trimmedSearch)}`);
    } else {
      navigate("/shop");
    }
  }
  
  const categories = [
    {
      id: 1,
      title: "Textbooks",
      tag: "Textbooks",
      description: "Affordable books across campus.",
      image: textbooksImg
    },
    {
      id: 2,
      title: "Technology", // what user sees
      tag: "Tech",           // what backend uses
      description: "Laptops, calculators, keyboards, and more.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: 3,
      title: "Furniture",
      tag: "Furniture",
      description: "Chairs, desks, lamps, and dorm pieces.",
      image: furnitureImg
    },
    {
      id: 4,
      title: "Clothes",
      tag: "Clothes",
      description: "Everyday wear, hoodies, and campus style.",
      image: clothesImg
    }
  ];

  const featuredItems = [
    {
      id: 1,
      title: "Javascript Textbook",
      price: "$25",
      image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Desk Lamp",
      price: "$12",
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: 3,
      title: "Casio Calculator",
      price: "$10",
      image: "https://images.unsplash.com/photo-1574607383077-47ddc2dc51c4?q=80&w=1200&auto=format&fit=crop&w=900&q=80"
    },
    {
      id: 4,
      title: "Wireless Keyboard",
      price: "$20",
      image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=900&q=80"
    }
  ];

  function handleLogout() {
    localStorage.removeItem("savedUser");
    window.location.href = "/";
  }

  const formattedUsername = savedUser?.username
  ? savedUser.username.charAt(0).toUpperCase() + savedUser.username.slice(1)
  : "";

  function handleItem(id) {
    navigate("/item", { state: { id } })
  }

  return (
    <div className="ks-home-page">

      <section className="ks-home-hero">
        <h1>Welcome back, {formattedUsername}!</h1>
        <p>Find affordable items from fellow UCF students.</p>

        <div className="ks-home-search-row">
          <input
            type="text"
            placeholder="Search textbooks, tech, furniture..."
            className="ks-home-search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleHomepageSearch();
              }
            }}
          />
          <button className="ks-home-search-btn" onClick={handleHomepageSearch}>Search</button>
        </div>
      </section>

      <section className="ks-home-section">
        <div className="ks-home-section-top">
          <div>
            <h2>Featured Categories</h2>
            <p>Browse your favorite categories in seconds.</p>
          </div>
          <Link to="/shop" className="ks-home-link-text">
            Shop All Categories →
          </Link>
        </div>

        <div className="ks-home-category-grid">
          {categories.map((category) => (
            <Link 
              to={`/shop?tag=${encodeURIComponent(category.tag)}`}
              className="ks-home-category-link"
              key={category.id}
            >
              <div className="ks-home-category-card">
                <div className="ks-home-arrow-circle">↗</div>

                <img  
                  src={category.image}
                  alt={category.title}
                  className="ks-home-category-image"
                />

                <div className="ks-home-category-overlay">
                  <h3>{category.title}</h3>
                  <p>{category.description}</p>
                </div>

                <div className="ks-home-category-text">
                  <h3>{category.title}</h3>
                </div>
              </div>
            </Link>
          ))}
          </div>
      </section>

      <section className="ks-home-section">
        <div className="ks-home-section-top">
          <div>
            <h2>Featured Items</h2>
            <p>Popular student-friendly finds around campus.</p>
          </div>
        </div>

        <div className="ks-home-item-grid">
          {featuredItems.map((item) => (
            <div className="ks-home-item-card" key={item.id}>
              <div className="ks-home-item-image-wrap">
                <img
                  src={item.image}
                  alt={item.title}
                  className="ks-home-item-image"
                />
              </div>

              <div className="ks-home-item-info">
                <h3>{item.title}</h3>
                <p className="ks-home-item-price">{item.price}</p>
                <button className="ks-home-item-btn" onClick={() => handleItem(item._id)}>View Item</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Homepage;