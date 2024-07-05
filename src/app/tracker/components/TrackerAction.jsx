import Link from "next/link";
import { useState, useMemo } from "react";
import { Button } from "primereact/button";
import { redirect } from "next/navigation";
import Confirm from "../../components/Confirm";

const TrackerAction = ({ removeTracker, selectedTracker }) => {
  const [actionEnable, setActionEnable] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  useMemo(
    () => setActionEnable(!selectedTracker ? true : false),
    [selectedTracker]
  );

  const handleDeleteClose = () => setDeleteConfirm(false);
  const handleDeleteShow = () => setDeleteConfirm(true);

  function handleTrackerRemove() {
    removeTracker();
    setDeleteConfirm(false); // close modal
  }

  function viewTracker() {
    redirect(`/tracker/history/${selectedTracker?._id}`);
  }

  return (
    <>
      {/* <div className="lead">Actions:</div> */}
      {/* <hr /> */}
      <div className="d-flex gap-2">
        <Button
          severity="info"
          label="View"
          className="rounded"
          icon="pi pi-external-link"
          disabled={actionEnable}
          raised
          onClick={viewTracker}
        />
        <Button
          severity="danger"
          label="Remove"
          className="rounded"
          icon="pi pi-trash"
          disabled={actionEnable}
          raised
          onClick={handleDeleteShow}
        />
      </div>
      <Confirm
        show={deleteConfirm}
        setShow={setDeleteConfirm}
        handleClose={handleDeleteClose}
        handleShow={handleDeleteShow}
        title="Confirm Tracker Delete"
        message="Are you sure you want to remove this tracker?"
        action={handleTrackerRemove}
      />
    </>
  );
};

export default TrackerAction;
