import React from "react";

const ExpenseItemDetails = ({ title, amount }) => {
  return (
    <div className="bg-white my-2 p-2 d-flex justify-content-between w-100">
      <span>{title}</span>
      <span>${amount.toFixed(2)}</span>
    </div>
  );
};

export default ExpenseItemDetails;
