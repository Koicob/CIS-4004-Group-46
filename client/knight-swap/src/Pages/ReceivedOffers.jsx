import React, { useEffect, useState } from "react";

export default function ReceivedOffers() {
  const [receivedOffers, setReceivedOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const savedUser = JSON.parse(localStorage.getItem("savedUser"));
  const currentUserId = savedUser?._id;

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

      const filtered = data.filter(
        (offer) => String(offer.sellerId) === String(currentUserId)
      );

      setReceivedOffers(filtered);
    } catch (err) {
      console.error("Error fetching received offers:", err);
      setError(err.message || "Failed to fetch received offers");
    } finally {
      setLoading(false);
    }
  };

  const updateOfferStatus = async (offerId, newStatus) => {
    try {
      setError("");

      const response = await fetch(
        `http://localhost:8080/offers/${offerId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update offer to ${newStatus}`);
      }

      setReceivedOffers((prevOffers) =>
        prevOffers.map((offer) =>
          offer._id === offerId ? { ...offer, status: newStatus } : offer
        )
      );
    } catch (err) {
      console.error("Error updating offer status:", err);
      setError(err.message || "Failed to update offer status");
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

            <p><strong>Item:</strong> {offer.itemId}</p>
            <p><strong>Buyer:</strong> {offer.buyerUsername || "Unknown"}</p>
            <p><strong>Amount:</strong> {offer.offerPrice ?? "N/A"}</p>
            <p><strong>Message:</strong> {offer.comment || "No message provided"}</p>
            <p><strong>Status:</strong> {offer.status}</p>

            {offer.status === "pending" && (
              <div className="offer-actions">
                <button
                  type="button"
                  onClick={() => updateOfferStatus(offer._id, "accepted")}
                >
                  Accept
                </button>
                <button
                  type="button"
                  onClick={() => updateOfferStatus(offer._id, "denied")}
                >
                  Deny
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}