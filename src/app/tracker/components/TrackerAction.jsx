import Link from "next/link";
import { useState, useMemo } from "react";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";
import Confirm from "../../components/Confirm";
import { redirecToHistory } from "@/app/services/history";

const TrackerAction = ({ removeTracker, selectedTracker }) => {
  const router = useRouter();
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
  router.push(`/tracker/history/${selectedTracker?._id}`);
}

  return (
    <>
      <div className="d-flex gap-3">
        <Button
          severity="info"
          label="View"
          className="rounded"
          icon="pi pi-external-link"
          iconPos="right"
          disabled={actionEnable}
          raised
          onClick={viewTracker}
        />
        <Button
          severity="danger"
          label="Remove"
          className="rounded"
          icon="pi pi-trash"
          iconPos="right"
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
