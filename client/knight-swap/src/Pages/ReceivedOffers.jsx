import React, { useEffect, useState } from "react";

export default function ReceivedOffers() {
  const [receivedOffers, setReceivedOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchReceivedOffers();
  }, []);

  const fetchReceivedOffers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("http://localhost:8080/offers");

      if (!response.ok) {
        throw new Error("Failed to fetch received offers");
      }

      const data = await response.json();

      // Placeholder logic:
      // Later this should filter by sellerId === currentUserId
      setReceivedOffers(data);
    } catch (err) {
      console.error("Error fetching received offers:", err);
      setError(err.message || "Failed to fetch received offers");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="offers-list-section">
      <h2>Received Offers</h2>

      {loading && <p>Loading received offers...</p>}
      {error && <p className="error-text">{error}</p>}
      {!loading && !error && receivedOffers.length === 0 && (
        <p>No received offers found.</p>
      )}

      <div className="offers-grid">
        {receivedOffers.map((offer) => (
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

            {/* Later: Accept / Deny buttons go here */}
          </div>
        ))}
      </div>
    </section>
  );
}