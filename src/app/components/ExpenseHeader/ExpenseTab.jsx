"use client";
import React, { useEffect, useState } from "react";

const ExpenseTab = ({ histories }) => {
  const [expense, setExpense] = useState(0.0);

  useEffect(() => {
    sumExpense();
  }, [histories]);

  const sumExpense = () => {
    const expenseTotal = histories
      .filter((tran) => tran.income === false)
      .map((tran) => tran.total)
      .reduce((sum, total) => (sum += total));

    setExpense(expenseTotal);
  };

  return (
    <div className="py-2 px-4">
      <div className="d-flex flex-column align-items-center">
        <span>EXPENSE</span>
        <span className="text-danger">{expense.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default ExpenseTab;
