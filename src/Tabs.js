import React from "react";
import "./Tabs.css";

const Tabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="tabs">
      <button
        className={activeTab === "credit" ? "active" : ""}
        onClick={() => onTabChange("credit")}
      >
        Credit card
      </button>

      <button
        className={activeTab === "gift" ? "active" : ""}
        onClick={() => onTabChange("gift")}
      >
        Gift card
      </button>

      <button
        className={activeTab === "paypal" ? "active" : ""}
        onClick={() => onTabChange("paypal")}
      >
        PayPal
      </button>
    </div>
  );
};

export default Tabs;
