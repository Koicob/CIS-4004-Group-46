import React, { useEffect, useState } from "react";
import "../CSS/offers.css";

export default function Offers() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("http://localhost:8080/offers");

      if (!response.ok) {
        throw new Error("Failed to fetch offers");
      }

      const data = await response.json();
      console.log("Fetched offers:", data);

      setOffers(data);
    } catch (err) {
      console.error("Error fetching offers:", err);
      setError(err.message || "Failed to fetch offers");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="offers-page">
      <header className="offers-header">
        <h1>Received Offers</h1>
        <p>
          Review incoming price offers and direct buy requests for your posted
          items.
        </p>
      </header>

      <section className="offers-list-section">
        <h2>Current Offers</h2>

        {loading && <p>Loading offers...</p>}
        {error && <p className="error-text">{error}</p>}
        {!loading && !error && offers.length === 0 && (
          <p>No offers found.</p>
        )}

        <div className="offers-grid">
          {offers.map((offer) => (
            <div key={offer._id} className="offer-card">
              <div className="offer-card-top">
                <span className="offer-badge offer">Offer</span>
              </div>

              <p>
                <strong>Item:</strong> {offer.itemId}
              </p>
              <p>
                <strong>Buyer:</strong> {offer.buyerId}
              </p>
              <p>
                <strong>Amount:</strong> {offer.offerPrice ?? "N/A"}
              </p>
              <p>
                <strong>Message:</strong> {offer.comment || "No message provided"}
              </p>
              <p>
                <strong>Status:</strong> {offer.status}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}