"use client";

import { z } from 'zod';
import { useRef } from "react";
import { toast } from "react-toastify";
import { Card, Col, Row } from "react-bootstrap";
import AddTrackerButton from './AddTrackerButton';
import { createTracker } from "../../services/tracker";

const Tracker = z.object({
  title: z.string().min(3).max(100),
})

const TrackerForm = () => {
  const formRef = useRef();

  /**
   * Create a new tracker
   * @param {*} formData 
   * @returns 
   */
  async function addTracker(formData) {
    // create new tracker object
    const tracker = { title: formData.get('title') };
    const validate = Tracker.safeParse(tracker);
    if (!validate.success) { // if validate fail
      const { message } = validate.error.issues[0];
      return toast.error(message);
    }

    try {
      const result = await createTracker(tracker);
      // if success is false
      if (!result.success) return toast.error(result.message);
      toast.success(result.message); // add success message
      // reset form values after
      formRef.current.reset();
    } catch (error) {
      toast.error(`Something went wrong`);
      console.error(error);
    }
  }

  return (
    <Row>
      <Col>
        <Card className="shadow mt-3">
          <div className="card-header bg-dark text-light">
            Create Tracker Form
          </div>
          <div className="card-body">
            <form className="p-1" action={addTracker} ref={formRef}>
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
                  <AddTrackerButton />
                </div>
              </div>
            </form>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default TrackerForm;
