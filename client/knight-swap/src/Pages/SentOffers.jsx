import React, { useEffect, useState } from "react";

export default function SentOffers() {
  const [sentOffers, setSentOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const savedUser = JSON.parse(localStorage.getItem("savedUser"));
  const currentUserId = savedUser?._id;

  useEffect(() => {
    fetchSentOffers();
  }, []);

  const fetchSentOffers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("http://localhost:8080/offers");

      if (!response.ok) {
        throw new Error("Failed to fetch sent offers");
      }

      const data = await response.json();

      const filtered = data.filter(
        (offer) => String(offer.buyerId) === String(currentUserId)
      );

      setSentOffers(filtered);
    } catch (err) {
      console.error("Error fetching sent offers:", err);
      setError(err.message || "Failed to fetch sent offers");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOffer = async (offerId) => {
    try {
      setError("");

      const response = await fetch(`http://localhost:8080/offers/${offerId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to cancel offer");
      }

      setSentOffers((prevOffers) =>
        prevOffers.filter((offer) => offer._id !== offerId)
      );

      alert("Offer cancelled successfully.");
    } catch (err) {
      console.error("Error cancelling offer:", err);
      setError(err.message || "Failed to cancel offer");
    }
  };

  return (
    <section className="offers-list-section">
      <h2>Sent Offers ({sentOffers.length})</h2>

      {loading && <p>Loading sent offers...</p>}
      {error && <p className="error-text">{error}</p>}
      {!loading && !error && sentOffers.length === 0 && (
        <p>You have not sent any offers yet.</p>
      )}

      <div className="offers-grid">
        {sentOffers.map((offer) => (
          <div key={offer._id} className="offer-card">
            <div className="offer-card-top">
              <span className="offer-badge offer">Offer</span>
            </div>

            <p><strong>Item:</strong> {offer.itemTitle || "Unknown Item"}</p>
            <p><strong>Seller:</strong> {offer.sellerUsername || "Unknown"}</p>
            <p><strong>Amount:</strong> ${offer.offerPrice ?? "N/A"}</p>
            <p><strong>Message:</strong> {offer.comment || "No message provided"}</p>
            <p><strong>Status:</strong>{" "} 
              <span className={`offer-status ${offer.status}`}>
                {offer.status}
              </span> 
            </p>
            {offer.status == "pending" && (
              <div className="offer-actions">
                  <button
                    className="button"
                    onClick={() => handleCancelOffer(offer._id)}
                  >
                    Cancel Offer
                  </button>
                </div>
                )}      
          </div>
        ))}
      </div>
    </section>
  );
}