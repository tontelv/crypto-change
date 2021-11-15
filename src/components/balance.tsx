import React from "react";

const Balance: React.FC = ({ children }) => {
  return (
    <div className="component-balance">
      <div className="component-balance__title">Balance</div>
      <div className="component-balance__value">{children}</div>
    </div>
  );
};

export default Balance;
