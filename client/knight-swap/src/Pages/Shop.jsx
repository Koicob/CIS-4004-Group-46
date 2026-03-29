import "../CSS/Shop.css";
import { useEffect, useState } from "react";
import clothesImg from "../assets/clothes.jpg";

function Shop() {
  const [tags, setTags] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedTag, setSelectedTag] = useState("All");
  const [searchText, setSearchText] = useState("");

  const sampleItems = [
    {
      _id: "1",
      title: "Wireless Keyboard",
      description: "Good condition keyboard for class or dorm setup.",
      price: 20,
      image:
        "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=900&q=80",
      tags: [{ _id: "t1", name: "Tech" }],
      location: { name: "Library Floor 1" }
    },
    {
      _id: "2",
      title: "Javascript Textbook",
      description: "Used textbook for javascript courses.",
      price: 25,
      image:
        "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=1200&auto=format&fit=crop",
      tags: [{ _id: "t2", name: "Textbooks" }],
      location: { name: "Student Union Floor 2" }
    },
    {
      _id: "3",
      title: "Desk Lamp",
      description: "Perfect for dorm desks and late-night studying.",
      price: 12,
      image:
        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80",
      tags: [{ _id: "t3", name: "Furniture" }],
      location: { name: "Classroom Building 1" }
    },
    {
      _id: "4",
      title: "UCF Sweatshirt",
      description: "Comfortable sweatshirt in good condition.",
      price: 18,
      image:
        clothesImg,
      tags: [{ _id: "t4", name: "Clothes" }],
      location: { name: "Student Union Floor 1" }
    },
    {
      _id: "5",
      title: "Bluetooth Headphones",
      description: "Noise-friendly headphones for campus use.",
      price: 30,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
      tags: [{ _id: "t5", name: "Electronics" }],
      location: { name: "Library Floor 3" }
    },
    {
      _id: "6",
      title: "Notebook Set",
      description: "Helpful for notes, planning, and assignments.",
      price: 8,
      image:
        "https://images.unsplash.com/photo-1625533617580-3977f2651fc0?q=80&w=2070&auto=format&fit=crop&w=900&q=80",
      tags: [{ _id: "t6", name: "School Supplies" }],
      location: { name: "Classroom Building 2" }
    },
    {
      _id: "7",
      title: "Yellow Chair",
      description: "Brighten up your dorm with this comfortable chair.",
      price: 10,
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=80",
      tags: [{ _id: "t7", name: "Furniture" }],
      location: { name: "Student Union Floor 4" }
    },
    {
      _id: "8",
      title: "Storage Bin",
      description: "Useful extra storage for dorm rooms.",
      price: 5,
      image:
        "https://plus.unsplash.com/premium_photo-1664033881717-1980c19d9ade?q=80&w=1064&auto=format&fit=crop&w=900&q=80",
      tags: [{ _id: "t8", name: "Misc" }],
      location: { name: "Library Floor 2" }
    }
  ];

  useEffect(() => {
    async function fetchTags() {
      try {
        const response = await fetch("http://localhost:8080/tags");
        const data = await response.json();
        setTags(data);
      } catch (error) {
        console.log(error);
      }
    }

    async function fetchItems() {
      try {
        const response = await fetch("http://localhost:8080/items");
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchTags();
    fetchItems();
  }, []);

  const displayedItems = items.length > 0 ? items : sampleItems;

  const filteredItems = displayedItems.filter((item) => {
    const matchesTag =
      selectedTag === "All" ||
      item.tags.some((tag) => tag.name === selectedTag);

    const matchesSearch =
      item.title.toLowerCase().includes(searchText.toLowerCase()) ||
      item.description.toLowerCase().includes(searchText.toLowerCase());

    return matchesTag && matchesSearch;
  });

  return (
    <div className="ks-shop-page">
      {/*<section className="ks-shop-header">
        <h1>Shop</h1>
        <p>Browse items from your fellow Knights.</p>
      </section>*/}

      <section className="ks-shop-content">
        <aside className="ks-shop-sidebar">
          <h3>Categories</h3>

          <div className="ks-shop-tag-list">
            <button
              className={`ks-shop-tag-btn ${selectedTag === "All" ? "active" : ""}`}
              onClick={() => setSelectedTag("All")}
            >
              All
            </button>

            {tags.map((tag) => (
              <button
                key={tag._id}
                className={`ks-shop-tag-btn ${selectedTag === tag.name ? "active" : ""}`}
                onClick={() => setSelectedTag(tag.name)}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </aside>

        <div className="ks-shop-main">
          <div className="ks-shop-results-top">
            <div className="ks-shop-results-text">
              <h2>{selectedTag === "All" ? "All Items" : selectedTag}</h2>
              <p>{filteredItems.length} item(s)</p>
            </div>

            <input
              type="text"
              placeholder="Search items..."
              className="ks-shop-search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          <div className="ks-shop-grid">
            {filteredItems.map((item) => (
              <div className="ks-shop-card" key={item._id}>
                <div className="ks-shop-card-image-wrap">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="ks-shop-card-image"
                  />
                </div>

                <div className="ks-shop-card-info">
                  <h3>{item.title}</h3>
                  <p className="ks-shop-card-price">${item.price}</p>

                  <div className="ks-shop-card-tags">
                    {item.tags.map((tag) => (
                      <span className="ks-shop-card-tag" key={tag._id}>
                        {tag.name}
                      </span>
                    ))}
                  </div>

                  <p className="ks-shop-card-location">
                    {item.location ? item.location.name : "No location"}
                  </p>

                  <button className="ks-shop-card-btn">View Item</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Shop;