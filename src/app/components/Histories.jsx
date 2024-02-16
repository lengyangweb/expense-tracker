"use client";
import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import ExpenseHistory from "../components/ExpenseHistory";
import ExpenseTransaction from "../components/ExpenseTransaction";
import ExpenseHeader from "../components/ExpenseHeader/ExpenseHeader";
import ExpenseSuggestion from "../components/ExpenseSuggestion/ExpenseSuggestion";

const Histories = ({ data }) => {
  const [histories, setHistories] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [suggestionSelected, setSuggestionSelected] = useState();

  useEffect(() => {
      setHistories(data);
      setLoading(false);
  }, [data]);

  // if still loading histories
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center mt-4">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

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
