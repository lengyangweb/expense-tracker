import { FaPlus } from "react-icons/fa";
import { useFormStatus } from "react-dom";

const AddTrackerButton = () => {
    const { pending } = useFormStatus();

    return (
      <button className="btn btn-success w-50" type="submit" disabled={pending}>
        <div className="d-flex justify-content-center align-items-center gap-2">
          <FaPlus />
          <span>{pending ? `Saving...` : `Save`}</span>
        </div>
      </button>
    );
}

export default AddTrackerButton