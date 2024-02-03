"use client";
import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import ExpenseHeader from "../components/ExpenseHeader/ExpenseHeader";
import ExpenseHistory from "../components/ExpenseHistory";
import ExpenseTransaction from "../components/ExpenseTransaction";

const TrackerPage = () => {
  const [histories, setHistories] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // wait a minute to load transaction histories
    setTimeout(() => {
      const data = getHistories();
      setHistories(data);
    }, 500);
  }, []);

  /**
   * Get transaction histories
   * @returns {Array}
   */
  const getHistories = () => {
    // if there's no transaction histories
    if (!localStorage.getItem("histories")) {
      localStorage.setItem("histories", JSON.stringify([]));
      setIsLoading(false);
      return [];
    }
    // get transaction histories from localStorage
    const histories = JSON.parse(localStorage.getItem("histories"));
    // set loading status
    setIsLoading(false);
    // if there's histories then return histories, otherwise an empty array
    return histories;
  };

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
      <Col xs={10}>
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

export default TrackerPage;
