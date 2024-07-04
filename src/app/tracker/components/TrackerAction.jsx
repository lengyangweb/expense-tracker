import Link from "next/link";
import { useState, useMemo } from "react";
import { Button } from "primereact/button";
import Confirm from "../../components/Confirm";
import { FaListAlt, FaTrashAlt } from "react-icons/fa";
import { redirect } from "next/navigation";

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
      <div className="lead">Actions:</div>
      <hr />
      <div className="d-flex flex-column gap-2 align-items-center justify-content-end">
        <Button
          severity="info"
          label="View Tracker"
          className="w-100 rounded"
          disabled={actionEnable}
          onClick={viewTracker}
        />
        <Button
          severity="danger"
          label="Remove Tracker"
          className="w-100 rounded"
          icon="pi pi-trash"
          disabled={actionEnable}
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
