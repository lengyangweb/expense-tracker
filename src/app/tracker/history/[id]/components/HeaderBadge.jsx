import React from "react";

const HeaderBadge = ({ incomeQuantity, expenseQuantity }) => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <span className="badge bg-success mx-1">{incomeQuantity}</span>
      <span className="badge bg-danger">{expenseQuantity}</span>
    </div>
  );
};

export default HeaderBadge;
