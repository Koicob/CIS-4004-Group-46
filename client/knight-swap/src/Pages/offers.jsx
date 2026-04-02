import React from "react";
import "../CSS/offers.css";
import ReceivedOffers from "./ReceivedOffers";
import SentOffers from "./SentOffers";

export default function Offers() {
  return (
    <div className="offers-page">
      <header className="offers-header">
        <h1>Offers</h1>
        <p>
          Review incoming offers on your items and track offers you have sent.
        </p>
      </header>

      <ReceivedOffers />
      <SentOffers />
    </div>
  );
}