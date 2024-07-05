import { connectDB } from "../lib/db";
import Tracker from "@/app/models/Tracker";
import TrackerForm from "./components/TrackerForm";
import { Container, Row, Col } from "react-bootstrap";
import TrackerList from "./components/TrackerList";

const TrackerPage = async () => {
  let data = [];

  try {
    await connectDB();
    data = await Tracker.find();
    data = JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.error(first);
  }

  return (
    <Container>
      <Row>
        <Col sm={12} lg={5}>
          <TrackerForm />
        </Col>
        <Col xs={12} lg={7} className="py-3">
          {!data.length && (
            <span>
              No tracker at the moments. Please Use the "Create Tracker Form" to
              add trackers.
            </span>
          )}
          {data.length > 0 && <TrackerList data={data} />}
        </Col>
      </Row>
    </Container>
  );
};

export default TrackerPage;
