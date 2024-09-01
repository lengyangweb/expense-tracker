"use client";

import HistoryForm from "./HistoryForm";
import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import ExpenseHeader from "./ExpenseHeader";
import ExpenseHistory from "./ExpenseHistory";

const Histories = ({ title, data, trackerId }) => {
  const [histories, setHistories] = useState([]);

  useEffect(() => setHistories(data), [data]);

  return (
    <div className="d-flex justify-content-center py-3">
      <Col xs={11}>
        <Row>
          <Col xs={12}>
            <h3>{title}</h3>
            <hr />
          </Col>
          <Col xs={12} md={6}>
            <Row>
              <Col xs={12}>
                <ExpenseHeader histories={histories} />
              </Col>
              <Col xs={12} className="mt-3">
                <HistoryForm trackerId={trackerId} />
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
