import React, { useState } from "react";
import Tabs from "./Tabs";
import CreditCardForm from "./CreditCardForm";
import PurchaseList from "./PurchaseList";

function App() {
  const [activeTab, setActiveTab] = useState("credit");
  const items = [
    { name: "Product A", price: 15.99 },
    { name: "Product B", price: 24.99 },
    { name: "Product C", price: 12.5 },
  ];
  const deliveryCost = 5.0;
  const total = items.reduce((sum, item) => sum + item.price, 0) + deliveryCost;

  return (
    <div className="app">
      <PurchaseList items={items} deliveryCost={deliveryCost} total={total} />
      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === "credit" && <CreditCardForm items={items} total={total} />}
      {activeTab === "gift" && (
        <div className="inactive-tab-content">Gift Card Content</div>
      )}
      {activeTab === "paypal" && (
        <div className="inactive-tab-content">PayPal Content</div>
      )}
    </div>
  );
}

export default App;
