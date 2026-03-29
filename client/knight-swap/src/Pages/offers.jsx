import React, { useEffect, useState } from "react";
import "../CSS/Offers.css";

const tagOptions = [
  "all",
  "tech",
  "textbooks",
  "furniture",
  "clothes",
  "electronics",
  "school supplies",
  "misc",
];

export default function Offers() {
  const [offers, setOffers] = useState([]);
  const [selectedTag, setSelectedTag] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/offers");

      if (!response.ok) {
        throw new Error("Failed to fetch offers");
      }

      const data = await response.json();

      // Only keep true offers / buy-now requests on this page
      const receivedOffers = data.filter(
        (offer) => offer.offerType === "offer" || offer.offerType === "buy-now"
      );

      setOffers(receivedOffers);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredOffers =
    selectedTag === "all"
      ? offers
      : offers.filter((offer) => offer.tag === selectedTag);

  return (
    <div className="offers-page">
      <header className="offers-header">
        <h1>Received Offers</h1>
        <p>
          Review incoming price offers and direct buy requests for your posted
          items.
        </p>
      </header>

      <section className="offers-controls">
        <label htmlFor="tagFilter">Filter by Tag:</label>
        <select
          id="tagFilter"
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
        >
          {tagOptions.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </section>

      <section className="offers-list-section">
        <h2>Current Offers</h2>

        {loading && <p>Loading offers...</p>}
        {error && <p className="error-text">{error}</p>}
        {!loading && filteredOffers.length === 0 && (
          <p>No offers found for this tag.</p>
        )}

        <div className="offers-grid">
          {filteredOffers.map((offer) => (
            <div key={offer._id} className="offer-card">
              <div className="offer-card-top">
                <span className={`offer-badge ${offer.offerType}`}>
                  {offer.offerType}
                </span>
                <span className="offer-tag">{offer.tag}</span>
              </div>

              <p><strong>Listing:</strong> {offer.listingId}</p>
              <p><strong>Seller:</strong> {offer.sellerId}</p>
              <p><strong>Buyer:</strong> {offer.buyerId}</p>
              <p><strong>Amount:</strong> {offer.offerAmount ?? "N/A"}</p>
              <p><strong>Message:</strong> {offer.message}</p>
              <p><strong>Status:</strong> {offer.status}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}