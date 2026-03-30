import "../CSS/Shop.css";
import { useEffect, useState } from "react";
import { useNavigate, useLocation} from "react-router-dom";

function Shop() {
  const navigate = useNavigate();
  const location = useLocation();

  const [tags, setTags] = useState([]);
  const [mongoItems, setMongoItems] = useState([]);
  const [selectedTag, setSelectedTag] = useState("All");
  const [searchText, setSearchText] = useState("");

  // read search + tag from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tagFromUrl = params.get("tag");
    const searchFromUrl = params.get("search");
    
    setSelectedTag(tagFromUrl || "All");
    setSearchText(searchFromUrl || "");
    }, [location.search]);

    //fetch tags
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

    fetchTags();
  }, []);
  
  //fetch mongo items using current search + tag
  useEffect(() => {
    async function fetchItems() {
      try {
        const params = new URLSearchParams();

        if(searchText.trim()) {
          params.append("search", searchText.trim());
        }

        if(selectedTag !== "All") {
          params.append("tag", selectedTag);
        }

        const url = `http://localhost:8080/items?${params.toString()}`;
        const response = await fetch(url);
        const data = await response.json();
        setMongoItems(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchItems();
  }, [searchText, selectedTag]);

  function handleItem(id) {
    navigate("/item", { state: { id } })
  }

  const allDisplayedItems = mongoItems;

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
              <p>{allDisplayedItems.length} item(s)</p>
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
            {allDisplayedItems.map((item) => (
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

                  <button className="ks-shop-card-btn" onClick={() => handleItem(item._id)}>
                    View Item
                  </button>
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