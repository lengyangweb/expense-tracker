"use client";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";
import ErrorMessage from "../../components/ErrorMessage";
import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { createTracker } from "../../services/tracker";
import { useFormStatus, useFormState } from "react-dom";

const initialState = {
  message: undefined,
  success: null,
};

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button className="btn btn-success w-50" type="submit" disabled={pending}>
      <div className="d-flex justify-content-center align-items-center gap-2">
        <FaPlus />
        <span>{pending ? `Saving...` : `Save`}</span>
      </div>
    </button>
  );
};

const TrackerForm = () => {
  const [title, setTitle] = useState();
  const [state, formAction] = useFormState(createTracker, initialState);
  const [error, setError] = useState();

  useEffect(() => {
    if (state && state.hasOwnProperty("success")) {
      if (!state.success) {
        setError(state.message);
        setTimeout(() => setError(undefined), 8000);
      } else {
        toast.success(state.message);
        setTitle(undefined);
      }
    }
  }, [state]);

  return (
    <Row>
      <Col>
        <Card className="shadow mt-3">
          <div className="card-header bg-dark text-light">
            Create Tracker Form
          </div>
          <div className="card-body">
            <form className="p-1" action={formAction}>
              <div className="form-group">
                <label htmlFor="title" className="form-label">
                  Title:
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="January Tracker"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  autoFocus={true}
                  autoComplete="title"
                />
              </div>
              <div className="form-group mt-3 mb-1">
                <div className="d-flex justify-content-center">
                  <SubmitButton />
                </div>
              </div>
            </form>
          </div>
        </Card>
      </Col>
      <Col xs={12} className="mt-2">{error && <ErrorMessage errorMessage={error} />}</Col>
    </Row>
  );
};

export default TrackerForm;
