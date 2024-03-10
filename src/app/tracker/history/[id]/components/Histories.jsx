"use client";
import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import ExpenseHistory from "./ExpenseHistory";
import ExpenseTransaction from "./ExpenseTransaction";
import ExpenseHeader from "./ExpenseHeader";
import ExpenseSuggestion from "./ExpenseSuggestion";

const Histories = ({ data, trackerId }) => {
  const [histories, setHistories] = useState([]);
  const [suggestionSelected, setSuggestionSelected] = useState();

  useEffect(() => setHistories(data), [data]);

  return (
    <div className="d-flex justify-content-center py-3">
      <Col xs={11}>
        <Row>
          <Col xs={12} md={6}>
            <Row>
              <Col xs={12}>
                <ExpenseHeader histories={histories} />
              </Col>
              <Col xs={12}>
                <ExpenseTransaction
                  trackerId={trackerId}
                  histories={histories}
                  setHistories={setHistories}
                  suggestionSelected={suggestionSelected}
                  setSuggestionSelected={setSuggestionSelected}
                />
              </Col>
              <Col xs={12}>
                <ExpenseSuggestion
                  selected={suggestionSelected}
                  setSelected={setSuggestionSelected}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={12} md={6}>
            <ExpenseHistory histories={histories} setHistories={setHistories} />
          </Col>
        </Row>
      </Col>
    </div>
  );
};

export default Histories;
