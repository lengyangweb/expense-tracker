"use client";
import React from "react";
import { Row } from "react-bootstrap";
import ExpenseSuggestionItem from "./ExpenseSuggestionItem";

const ExpenseSuggestion = () => {
  const suggestions = [
    {
      title: "Weekly Paid 1",
      amount: "150.00",
      income: true,
    },
    {
      title: "Apartment Rent",
      amount: "150.00",
      income: false,
    },
    {
      title: "Weekly Paid 2",
      amount: "250.00",
      income: true,
    },
  ];

  return (
    <div className="d-flex flex-column">
      <span>Click to choose from one of the suggestion below?</span>
      <Row className="my-3 my-md-0">
        {suggestions.map(({ title, amount, income }) => (
          <ExpenseSuggestionItem
            key={title}
            title={title}
            amount={amount}
            income={income}
          />
        ))}
      </Row>
    </div>
  );
};

export default ExpenseSuggestion;
