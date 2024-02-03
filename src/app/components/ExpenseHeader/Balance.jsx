"use client";
import propTypes from "prop-types";
import { Col } from "react-bootstrap";
import React, { useEffect } from "react";

const Balance = ({ histories }) => {
  const [balance, setBalance] = useState(0.0);

  useEffect(() => {
    calcBalance();
  }, [histories]);

  const calcBalance = () => {
    const income = histories.map;
    if (!income && !expense) return;
    const newBalance = income - expense;
    setBalance(newBalance);
  };

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
