import React, { useState } from "react";
import "./Offers.css";

const tagOptions = [
  "tech",
  "textbooks",
  "furniture",
  "clothes",
  "electronics",
  "school supplies",
  "misc",
];

export default function Inqueries({
  userId = "",
  postId = "",
  defaultTag = "tech",
  onSubmitted,
}) {
  const [formData, setFormData] = useState({
    userId,
    postId,
    message: "",
    offerAmount: "",
    offerType: "inquiry",
    tag: defaultTag,
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setSuccessMessage("");

      const payload = {
        ...formData,
        offerAmount:
          formData.offerAmount === "" ? null : Number(formData.offerAmount),
      };

      const response = await fetch("http://localhost:8080/offers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to submit inquiry/offer");
      }

      const createdRecord = await response.json();

      setSuccessMessage("Your inquiry/offer was sent successfully.");

      setFormData((prev) => ({
        ...prev,
        message: "",
        offerAmount: "",
        offerType: "inquiry",
      }));

      if (onSubmitted) {
        onSubmitted(createdRecord);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="offer-form-section">
      <h2>Send an Inquiry or Offer</h2>

      {error && <p className="error-text">{error}</p>}
      {successMessage && <p>{successMessage}</p>}

      <form className="offer-form" onSubmit={handleSubmit}>
        <select
          name="tag"
          value={formData.tag}
          onChange={handleChange}
          required
        >
          {tagOptions.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>

        <select
          name="offerType"
          value={formData.offerType}
          onChange={handleChange}
        >
          <option value="inquiry">Inquiry</option>
          <option value="offer">Offer</option>
          <option value="buy-now">Buy Now</option>
        </select>

        <input
          type="number"
          name="offerAmount"
          placeholder="Offer Amount (optional)"
          value={formData.offerAmount}
          onChange={handleChange}
        />

        <textarea
          name="message"
          placeholder="Write your message..."
          value={formData.message}
          onChange={handleChange}
          required
        />

        <button type="submit">Send</button>
      </form>
    </section>
  );
}