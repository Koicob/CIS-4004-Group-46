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
  const [sortOption, setSortOption] = useState("newest");

  const params = new URLSearchParams(location.search);
  const tagFromUrl = params.get("tag") || "All";
  const searchFromUrl = params.get("search") || "";
  const sortFromUrl = params.get("sort") || "newest";

  // Handle tag click to update URL with selected tag
  function handleTagClick(tagName) {
    const params = new URLSearchParams(location.search);

    if (tagName === "All") {
      params.delete("tag");
    } else {
      params.set("tag", tagName);
    }

    navigate(`/shop?${params.toString()}`, { replace: true });
  }

  // Handle search change to update URL with search query
  function handleSearchChange(value) {
    const params = new URLSearchParams(location.search);

    if (value.trim()) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    navigate(`/shop?${params.toString()}`, { replace: true });
  }

  // Handle sort change to update URL with selected sort option
  function handleSortChange(value) {
    const params = new URLSearchParams(location.search);

    if (value && value !== "newest") {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }

    navigate(`/shop?${params.toString()}`, { replace: true });
  }

  // read search + tag from URL
  useEffect(() => {
    setSelectedTag(tagFromUrl);
    setSearchText(searchFromUrl);
    setSortOption(sortFromUrl);
    }, [tagFromUrl, searchFromUrl, sortFromUrl]);

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
        const queryParams = new URLSearchParams();

        if(searchFromUrl.trim()) {
          queryParams.append("search", searchFromUrl.trim());
        }

        if(tagFromUrl !== "All") {
          queryParams.append("tag", tagFromUrl);
        }

        if(sortFromUrl && sortFromUrl !== "newest") {
          queryParams.append("sort", sortFromUrl);
        }

        const url = `http://localhost:8080/items?${queryParams.toString()}`;
        const response = await fetch(url);
        const data = await response.json();
        setMongoItems(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchItems();
  }, [tagFromUrl, searchFromUrl, sortFromUrl]);

  function handleItem(id) {
    navigate("/item", { state: { id } })
  }

  const allDisplayedItems = mongoItems;

  return (
    <div className="ks-shop-page">

      <section className="ks-shop-content">
        <aside className="ks-shop-sidebar">
          <h3>Categories</h3>

          <div className="ks-shop-tag-list">
            <button
              className={`ks-shop-tag-btn ${selectedTag === "All" ? "active" : ""}`}
              onClick={() => handleTagClick("All")}
            >
              All
            </button>

            {tags.map((tag) => (
              <button
                key={tag._id}
                className={`ks-shop-tag-btn ${selectedTag === tag.name ? "active" : ""}`}
                onClick={() => handleTagClick(tag.name)}
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

            <div className="ks-shop-controls">
              <select
                className="ks-shop-sort"
                value={sortOption}
                onChange={(e) => handleSortChange(e.target.value)}
              >
                <option value="newest">Newest</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
              </select>
              
            <input
              type="text"
              placeholder="Search items..."
              className="ks-shop-search"
              value={searchText}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
        </div>

        {allDisplayedItems.length === 0 ? (
          <div className="ks-shop-empty">
            <p>No items found.</p>
            <span>Try a different search or category.</span>
          </div>
        ) : (
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
          )}
        </div>
      </section>
    </div>
  );
} 

export default Shop;