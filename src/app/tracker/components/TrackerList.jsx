"use client";
import Grid from "../../components/Grid/Grid";
import { toast } from "react-toastify";
import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import TrackerAction from "./TrackerAction";
import { removeTracker } from "@/app/services/tracker";

const TrackerList = ({ data }) => {
  const [trackers, setTrackers] = useState([]);
  const [selected, setSelected] = useState(undefined);

  useEffect(() => setTrackers(data), [data]);

  const columns = [
    { header: "Title", field: "title" },
    { header: "CreatedStamp", field: "createdAt" },
  ];

  const columnsLayout = [6, 6];

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
        <Grid
          rows={trackers}
          columns={columns}
          layouts={columnsLayout}
          selectedRow={selected}
          setRowSelected={setSelected}
          scrollHeight="500px"
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
};

export default TrackerList;
