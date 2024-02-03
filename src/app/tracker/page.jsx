"use client";
import { Col, Row } from "react-bootstrap";
import { useEffect, useMemo, useState } from "react";
import ExpenseHeader from "../components/ExpenseHeader/ExpenseHeader";
import ExpenseHistory from "../components/ExpenseHistory";
import ExpenseTransaction from "../components/ExpenseTransaction";

const TrackerPage = () => {
  const [histories, setHistories] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState();

  useEffect(() => {
    // wait a minute to load transaction histories
    setTimeout(() => {
      const data = getHistories();
      setHistories(data);
    }, 1000);
  }, []);

  function getHistories() {
    const histories = JSON.parse(localStorage.getItem("histories"));
    // set loading status
    setIsLoading(false);
    return histories;
  }

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

  // if no histories
  if (!histories || !histories.length) {
    return <span>No transaction history.</span>;
  }

  return (
    <div className="d-flex justify-content-center py-3">
      <Col xs={10}>
        <Row>
          <Col xs={6}>
            <Row>
              <Col xs={12}>
                <ExpenseHeader histories={histories} />
              </Col>
              <Col xs={12}>
                <ExpenseTransaction
                  histories={histories}
                  setHistories={setHistories}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={6}>
            <ExpenseHistory
              histories={histories}
              setHistories={setHistories}
              selected={selected}
              setSelected={setSelected}
            />
          </Col>
        </Row>
      </Col>
    </div>
  );
};

export default TrackerPage;
