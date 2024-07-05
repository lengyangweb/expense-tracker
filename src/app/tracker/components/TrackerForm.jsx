"use client";

import { z } from "zod";
import { useRef } from "react";
import { Card } from "primereact/card";
import { toast } from "react-toastify";
import { Col, Row } from "react-bootstrap";
import { InputText } from "primereact/inputtext";
import AddTrackerButton from "./AddTrackerButton";
import { createTracker } from "../../services/tracker";

const Tracker = z.object({
  title: z.string().min(3).max(100),
});

const TrackerForm = () => {
  const formRef = useRef();

  /**
   * Create a new tracker
   * @param {*} formData
   * @returns
   */
  async function addTracker(formData) {
    // create new tracker object
    const tracker = { title: formData.get("title") };
    const validate = Tracker.safeParse(tracker);
    if (!validate.success) {
      // if validate fail
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
        <Card className="shadow mt-3" title="Create Tracker Form">
          <div className="card-body">
            <form className="p-1" action={addTracker} ref={formRef}>
              <div className="form-group d-flex flex-column">
                <label htmlFor="title" className="form-label">
                  Tracker Title:
                </label>
                <InputText
                  type="text"
                  id="title"
                  name="title"
                  placeholder="January Tracker"
                  className=""
                  autoComplete="title"
                />
              </div>
              <div className="form-group mt-4 mb-1">
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
