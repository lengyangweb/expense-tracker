import { Button } from "react-bootstrap";
import { useFormStatus } from "react-dom";

const AddTrackerButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button variant="success" type="submit" disabled={pending}>
      <div className="d-flex gap-2 align-items-center">
        <span>{pending ? 'Saving...' : 'Save' }</span>
        <i className="pi pi-plus"></i>
      </div>
    </Button>
  );
};

export default AddTrackerButton;
