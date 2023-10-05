import React from "react";
import "./Tooltip.css";

const Tooltip = ({ children, content }) => {
  return (
    <div className="tooltip-container">
      {children}
      <div className="tooltip-content">{content}</div>
    </div>
  );
};

export default Tooltip;
