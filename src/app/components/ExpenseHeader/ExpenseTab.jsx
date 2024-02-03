"use client";
import React, { useEffect, useState } from "react";

const ExpenseTab = ({ expenses }) => {
  return (
    <div className="py-2 px-4">
      <div className="d-flex flex-column align-items-center">
        <span>EXPENSE</span>
        <span className="text-danger">{expenses.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default ExpenseTab;
