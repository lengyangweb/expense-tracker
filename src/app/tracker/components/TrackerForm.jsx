"use client";

import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";
import { useFormStatus } from "react-dom";
import { Card, Col, Row } from "react-bootstrap";
import { createTracker } from "../../services/tracker";
import ErrorMessage from "../../components/ErrorMessage";
import { useEffect, useOptimistic, useRef, useState } from "react";

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
  const formRef = useRef();
  const [error, setError] = useState();
  const [optimisticTracker, addOptimisticTracker] = useOptimistic((state, newTracker) => {
    return [...state, ...newTracker];
  });

  async function submitForm(formData) {
    addOptimisticTracker({
      title: formData.get('title')
    });
    await createTracker(formData);
    // reset form values after
    formRef.current.reset();
  }

  return (
    <Row>
      <Col>
        <Card className="shadow mt-3">
          <div className="card-header bg-dark text-light">
            Create Tracker Form
          </div>
          <div className="card-body">
            <form className="p-1" action={submitForm} ref={formRef}>
              <div className="form-group">
                <label htmlFor="title" className="form-label">
                  Title:
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="January Tracker"
                  className="form-control"
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
