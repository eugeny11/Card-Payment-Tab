import React from "react";
import "./PurchaseList.css";

const PurchaseList = ({ items, deliveryCost, total }) => {
  return (
    <div className="purchase-list">
      <h3>Purchase list</h3>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.name} - {item.price.toFixed(2)}
          </li>
        ))}
      </ul>
      <p>Delivery: ${deliveryCost.toFixed(2)}</p>
      <p>Total: ${total.toFixed(2)}</p>
    </div>
  );
};

export default PurchaseList;
