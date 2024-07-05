import { useFormStatus } from "react-dom";
import { Button } from "primereact/button";

const AddTrackerButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      severity="success"
      className="w-25 rounded"
      type="submit"
      disabled={pending}
      label={pending ? "Saving..." : "Save"}
      loading={pending}
      raised
    />
  );
};

export default AddTrackerButton;
