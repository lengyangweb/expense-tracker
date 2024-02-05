import React from "react";
import { Card, Col } from "react-bootstrap";

const ExpenseSuggestionItem = ({ suggestion, selected, setSelected }) => {
  const handleSelected = () => {
    if (!selected) {
      setSelected(suggestion);
      return;
    }

    if (suggestion.title === selected.title) {
      setSelected(undefined);
    } else {
      setSelected(suggestion);
    }
  };

  return (
    <Col xs={12} md={4} className="my-1 my-md-0" onClick={handleSelected}>
      <Card style={{ cursor: "pointer" }}>
        <Card.Header>{suggestion.title}</Card.Header>
        <Card.Body
          className={suggestion.income ? "text-success" : "text-danger"}
        >
          ${suggestion.amount}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ExpenseSuggestionItem;
