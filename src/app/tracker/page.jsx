import { connectDB } from "../lib/db";
import Tracker from "@/app/models/Tracker";
import TrackerForm from "./components/TrackerForm";
import { Container, Row, Col } from "react-bootstrap";
import TrackerList from "./components/TrackerList";

const TrackerPage = async () => {
  let trackers = [];

  try {
    await connectDB();
    trackers = await Tracker.find();
    trackers = JSON.parse(JSON.stringify(trackers));
  } catch (error) {
    console.error(error);
  }

  return (
    <Container>
      <Row>
        <Col sm={12} lg={5}>
          <TrackerForm />
        </Col>
        <Col xs={12} lg={7} className="py-3">
          { !trackers.length && <span>No tracker at the moments. Please Use the "Create Tracker Form" to add trackers.</span> }
          { trackers.length > 0 && <TrackerList data={trackers} /> }
        </Col>
      </Row>
    </Container>
  );
};

export default TrackerPage;
