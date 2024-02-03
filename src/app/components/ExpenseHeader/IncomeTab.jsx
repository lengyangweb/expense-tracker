"use client";
import React, { useEffect, useState } from "react";

const IncomeTab = ({ histories }) => {
  const [income, setIncome] = useState(0.0);

  useEffect(() => {
    sumIncome();
  }, [histories]);

  const sumIncome = () => {
    const incomeTotal = histories
      .filter((tran) => tran.income === true)
      .map((tran) => tran.total)
      .reduce((sum, total) => (sum += total));

    setIncome(incomeTotal);
  };

  return (
    <div className="py-2 px-4 border-end border-1">
      <div className="d-flex flex-column align-items-center">
        <span>INCOME</span>
        <span className="text-success">{income.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default IncomeTab;
