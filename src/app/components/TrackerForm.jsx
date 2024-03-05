'use client'
import { useEffect, useMemo } from "react";
import { Card } from "react-bootstrap"
import { toast } from "react-toastify";
import { createTracker } from '../services/tracker';
import { useFormStatus, useFormState } from 'react-dom'

const initialState = {
  message: undefined,
  success: null
}

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button className="btn btn-success w-50" type="submit" disabled={pending}>
      { pending ? `Saving...` : `Save` }
    </button>
  )
}

const TrackerForm = () => {
  const [state, formAction] = useFormState(createTracker, initialState);

  useEffect(() => {
    if (state && state.hasOwnProperty('success')) {
      state.success ? toast.success(state.message) : toast.error(state.message);
    }
  }, [state])

  return (
    <Card className="shadow mt-4">
      <div className="card-header bg-dark text-light">New Tracker Form</div>
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
  );
};

export default TrackerForm;
