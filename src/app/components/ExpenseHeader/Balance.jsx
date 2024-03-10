"use client";
import { Col } from "react-bootstrap";

const Balance = ({ balance }) => {
  return (
    <Col>
      <div className="d-flex flex-column">
        <h6>YOUR BALANCE</h6>
        <h3>${balance.toFixed(2)}</h3>
      </div>
    </Col>
  );
};

export default Balance;
