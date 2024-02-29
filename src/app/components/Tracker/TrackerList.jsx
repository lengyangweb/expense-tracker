"use client";
import React, { useMemo, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Grid from "../Grid/Grid";

const TrackerList = ({ trackers }) => {
  const [selected, setSelected] = useState(undefined);
  const [actionEnable, setActionEnable] = useState(true);

  useMemo(() => setActionEnable(!selected ? true : false), [selected]);

  const columns = [
    { heading: "Title", field: "title" },
    { heading: "CreatedStamp", field: "createdStamp" },
  ];

  const columnsLayout = [6, 6];

  if (!trackers.length) return;

  return (
    <Col xs={12} className="py-3">
      <Row>
        <Col xs={8}>
          <div className="lead">Select a tracker:</div>
          <Grid 
            rows={trackers} 
            columns={columns} 
            layouts={columnsLayout} 
            selectedRow={selected} 
            setRowSelected={setSelected} 
          />
        </Col>
        <Col xs={4} className="pb-2">
          <div className="lead">Tracker Actions:</div>
          <hr />
          <div className="d-flex flex-column gap-2 align-items-center justify-content-end">
            <button className="btn btn-success w-100">Create New Tracker</button>
            <button className="btn btn-primary w-100" disabled={actionEnable}>View Tracker</button>
            <button className="btn btn-danger w-100" disabled={actionEnable}>Remove Tracker</button>
          </div>
        </Col>
      </Row>
    </Col>
  );
};

export default TrackerList;
