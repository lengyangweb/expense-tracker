"use client";

import { toast } from "react-toastify";
import TrackerList from "./TrackerList";
import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import TrackerAction from "./TrackerAction";
import { removeTracker } from "@/app/services/tracker";

const TrackerContainer = ({ data }) => {
    const [trackers, setTrackers] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [selected, setSelected] = useState(undefined);
  
    useEffect(() => loadTrackerData, [data]);

    const loadTrackerData = () => {
        if (data && data.length > 0) setTrackers(data);
        setLoading(false);
    }
  
    // remove tracker
    const handleRemoveTracker = async () => {
      const response = await removeTracker(selected?._id);
      if (!response.success) return toast.error(response.message);
      toast.success(response.message);
      setSelected(undefined);
    };
  
    return (
      <Row>
        <Col xs={12}>
          <TrackerList 
            isLoading={isLoading}
            trackers={trackers} 
            selected={selected}
            setSelected={setSelected} 
        />
        </Col>
        <Col xs={12} className="pb-2 mt-sm-3">
          <TrackerAction
            removeTracker={handleRemoveTracker}
            selectedTracker={selected}
          />
        </Col>
      </Row>
    );
}

export default TrackerContainer