"use client";
import React from "react";
import { Row } from "react-bootstrap";
import ExpenseSuggestionItem from "./ExpenseSuggestionItem";

const ExpenseSuggestion = ({ selected, setSelected }) => {
  const suggestions = [
    {
      title: "Weekly Paid 1",
      amount: "750.00",
      income: true,
    },
    {
      title: "Rent",
      amount: "150.00",
      income: false,
    },
    {
      title: "Student Loan",
      amount: "250.00",
      income: false,
    },
  ];

  return (
    <div className="d-flex flex-column">
      <span>Click to choose from one of the suggestion below?</span>
      <Row className="my-3 my-md-1">
        {suggestions.map((suggestion) => (
          <ExpenseSuggestionItem
            key={suggestion.title}
            suggestion={suggestion}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
      </Row>
    </div>
  );
};

export default ExpenseSuggestion;
