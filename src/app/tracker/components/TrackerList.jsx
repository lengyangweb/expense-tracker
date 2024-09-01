"use client";

import Grid from "../../components/Grid/Grid";

const TrackerList = ({ isLoading, trackers, selected, setSelected }) => {

  const columns = [
    { header: "Title", field: "title" },
    { header: "CreatedStamp", field: "createdAt" },
  ];

  const columnsLayout = [6, 6];

  return (
    <Grid
      rows={trackers}
      columns={columns}
      layouts={columnsLayout}
      selectedRow={selected}
      setRowSelected={setSelected}
      scrollHeight="400px"
      isLoading={isLoading}
    />
  );
};

export default TrackerList;
