"use client";
import React, { useEffect, useState } from "react";

const IncomeTab = ({ incomes }) => {
  if (!incomes) return;
  return (
    <div className="py-2 px-4 border-end border-1">
      <div className="d-flex flex-column align-items-center">
        <span>INCOME</span>
        <span className="text-success">{incomes.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default IncomeTab;
