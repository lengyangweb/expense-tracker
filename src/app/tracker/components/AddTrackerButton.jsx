import { FaPlus } from "react-icons/fa";
import { useFormStatus } from "react-dom";
import { Button } from "primereact/button";

const AddTrackerButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      severity="success"
      className="w-50 rounded"
      type="submit"
      disabled={pending}
      label={pending ? "Saving..." : "Save"}
      icon="pi pi-plus"
    >
      {/* <div className="d-flex justify-content-center align-items-center gap-2">
        <FaPlus />
        <span>{pending ? `Saving...` : `Save`}</span>
      </div> */}
    </Button>
  );
};

export default AddTrackerButton;
