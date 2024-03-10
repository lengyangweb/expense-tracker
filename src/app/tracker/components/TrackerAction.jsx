import Link from "next/link";
import Confirm from "../../components/Confirm";
import { useState, useMemo } from "react";
import { FaListAlt, FaTrashAlt } from "react-icons/fa";

const TrackerAction = ({ removeTracker, selectedTracker }) => {
  const [actionEnable, setActionEnable] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  useMemo(() => setActionEnable(!selectedTracker ? true : false),[selectedTracker]);

  const handleDeleteClose = () => setDeleteConfirm(false);
  const handleDeleteShow = () => setDeleteConfirm(true);

  function handleTrackerRemove() {
    removeTracker();
    setDeleteConfirm(false); // close modal
  }

  return (
    <>
      <div className="lead">Actions:</div>
      <hr />
      <div className="d-flex flex-column gap-2 align-items-center justify-content-end">
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
    </>
  );
};

export default TrackerAction;
