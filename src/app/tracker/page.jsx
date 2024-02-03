"use client";
import { Col, Row } from "react-bootstrap";
import { useEffect, useMemo, useState } from "react";
import ExpenseHeader from "../components/ExpenseHeader/ExpenseHeader";
import ExpenseHistory from "../components/ExpenseHistory";
import ExpenseTransaction from "../components/ExpenseTransaction";

const TrackerPage = () => {
  const [histories, setHistories] = useState();

  useEffect(() => {
    const data = getHistories();
    setHistories(data);
  }, []);

  function getHistories() {
    const histories = JSON.parse(localStorage.getItem("histories"));
    return histories;
  }

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
            <ExpenseHistory histories={histories} setHistories={setHistories} />
          </Col>
        </Row>
      </Col>
    </div>
  );
};

export default TrackerPage;
