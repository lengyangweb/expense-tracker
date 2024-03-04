"use client";
import Grid from "../Grid/Grid";
import { toast } from 'react-toastify';
import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import TrackerAction from "./TrackerAction";

const TrackerList = () => {
  const [trackers, setTrackers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [selected, setSelected] = useState(undefined);

  useEffect(() => {
    fetchTrackers()
      .then((data) => {
        setTrackers(data)
        setLoading(false);
      })
      .catch((error) => console.error(`Fetching trackers error`, error));
  }, []);

  async function fetchTrackers() {
    try {
      const response = await fetch('http://localhost:3000/api/transaction/tracker');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Fail fetching trackers`, error);
      toast.error(`Something went wrong`);
    }
  }

  const columns = [
    { heading: "Title", field: "title" },
    { heading: "CreatedStamp", field: "createdAt" },
  ];

  const columnsLayout = [6, 6];

  const saveTracker = async (newTracker) => {
    try {
      // send new tracker to backend to save to db
      const response = await fetch(
        `http://localhost:3000/api/transaction/tracker`, 
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newTracker)
        }
      );
      // parse result
      const result = await response.json();
      // if no result
      if (!result) return;
      // update trackers state with the new added tracker
      setTrackers([...trackers, result.tracker]);
      toast.success(`New Tracker Added`);
    } catch (error) {
      console.error(`Fail saving new tracker`, error);
      toast.error(`Something went wrong`);
      return;
    }
  }

  // remove tracker
  const handleRemoveTracker = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/transaction/tracker/${selected?._id}`, 
        { method: 'DELETE' }
      );
      const result = await response.json();
      if (!result) return;
      // update tracker state
      const updatedTrackers = trackers.filter((tracker) => tracker._id !== selected._id)
      setTrackers(updatedTrackers);
      toast.success(`Tracker Deleted`);
      setSelected(undefined); // reset selected
    } catch (error) {
      toast.error(`Something went wrong`);
      console.error(`Fail removing tracker`, error);
    }
  };

  return (
    <Col xs={12} className="py-3">
      <Row>
        <Col xs={12}>
          {/* <div className="lead">Select a tracker:</div> */}
          <Grid 
            rows={trackers} 
            columns={columns} 
            layouts={columnsLayout} 
            selectedRow={selected} 
            setRowSelected={setSelected} 
            isLoading={isLoading}
          />
        </Col>
        <Col xs={12} className="pb-2 mt-sm-3">
          <TrackerAction 
            removeTracker={handleRemoveTracker} 
            selectedTracker={selected}
            onSave={saveTracker}
          />
        </Col>
      </Row>
    </Col>
  );
};

export default TrackerList;
