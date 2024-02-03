"use client";
import propTypes from "prop-types";
import { Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";

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
