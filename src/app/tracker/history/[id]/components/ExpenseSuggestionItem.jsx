import React from "react";
import { Card, Col } from "react-bootstrap";

const ExpenseSuggestionItem = ({ suggestion, selected, setSelected }) => {
  const handleSelected = () => {
    // if no suggestion item selected
    if (!selected) {
      setSelected(suggestion);
      return;
    }

    // if there's an item selected and is equal to the current item
    if (suggestion.title === selected.title) {
      setSelected(undefined);
    } else {
      setSelected(suggestion);
    }
  };

  return (
    <Col xs={6} md={4} className="my-1 my-md-0" onClick={handleSelected}>
      <button
        className={`btn btn-sm p-0 w-100${
          selected?.title === suggestion.title
            ? " border border-2 border-primary"
            : ""
        }`}
        disabled={selected?.title === suggestion.title}
      >
        <Card style={{ cursor: "pointer" }}>
          <Card.Header>{suggestion.title}</Card.Header>
          <Card.Body
            className={suggestion.income ? "text-success" : "text-danger"}
          >
            ${suggestion.amount}
          </Card.Body>
        </Card>
      </button>
    </Col>
  );
};

export default ExpenseSuggestionItem;
