import Link from "next/link";
import Confirm from "../Confirm";
import { useState, useMemo } from "react";
import CreateTrackerModal from "./CreateTrackerModal";
import { FaListAlt, FaPlus, FaTrashAlt } from "react-icons/fa";

const TrackerAction = ({ removeTracker, selectedTracker, onSave }) => {
  const [actionEnable, setActionEnable] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useMemo(
    () => setActionEnable(!selectedTracker ? true : false),
    [selectedTracker]
  );

  const handleDeleteClose = () => setDeleteConfirm(false);
  const handleDeleteShow = () => setDeleteConfirm(true);
  const handleCreateModalClose = () => setShowCreateModal(false);
  const handleCreateModalShow = () => setShowCreateModal(true);

  function handleTrackerRemove() {
    removeTracker();
    setDeleteConfirm(false); // close modal
  }

  return (
    <>
      <div className="lead">Tracker Actions:</div>
      <hr />
      <div className="d-flex flex-column gap-2 align-items-center justify-content-end">
        <button className="btn btn-success w-100" onClick={handleCreateModalShow}>
          <div className="d-flex gap-2 justify-content-center align-items-center">
            <FaPlus />
            <span>Create Tracker</span>
          </div>
        </button>
        <button className="btn btn-primary w-100" disabled={actionEnable}>
          <Link 
            href={`/tracker/history/${selectedTracker?._id}`} 
            className="d-flex gap-2 justify-content-center align-items-center text-light text-decoration-none"
          >
            <FaListAlt />
            <span className="text-light">View Tracker</span>
          </Link>
        </button>
        <button
          className="btn btn-danger w-100"
          disabled={actionEnable}
          onClick={handleDeleteShow}
        >
          <div className="d-flex gap-2 justify-content-center align-items-center">
            <FaTrashAlt />
            <span>Remove Tracker</span>
          </div>
        </button>
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
      <CreateTrackerModal 
        show={showCreateModal} 
        handleClose={handleCreateModalClose}
        action={onSave}
      />
    </>
  );
};

export default TrackerAction;
