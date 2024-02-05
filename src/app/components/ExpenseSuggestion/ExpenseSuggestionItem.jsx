import React from "react";
import { Card, Col } from "react-bootstrap";

const ExpenseSuggestionItem = ({ title, income, amount }) => {
  return (
    <Col xs={12} md={4} className="my-1 my-md-0">
      <Card style={{ cursor: "pointer" }}>
        <Card.Header>{title}</Card.Header>
        <Card.Body className={income ? "text-success" : "text-danger"}>
          ${amount}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ExpenseSuggestionItem;
