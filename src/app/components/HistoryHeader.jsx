import React from "react";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";

const HistoryHeader = ({ sortStatus, setSortStatus, sortHistories }) => {
  function sort() {
    if (!sortStatus || (sortStatus && sortStatus === "desc")) sortUP();
    if (sortStatus && sortStatus === "asc") sortDOWN();
  }

  function sortUP() {
    setSortStatus((prev) => (prev = "asc"));
    sortHistories('asc');
  }

  function sortDOWN() {
    setSortStatus((prev) => (prev = "desc"));
    sortHistories('desc');
  }

  return (
    <div className="d-flex align-items-center">
      <span>History</span>
      {!sortStatus && <FaSort onClick={sort} style={{ cursor: "pointer" }} />}
      {sortStatus && sortStatus === "asc" && (
        <FaSortUp onClick={sort} style={{ cursor: "pointer" }} />
      )}
      {sortStatus && sortStatus === "desc" && (
        <FaSortDown onClick={sort} style={{ cursor: "pointer" }} />
      )}
    </div>
  );
};

export default HistoryHeader;
