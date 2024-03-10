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
      <div className="d-flex justify-content-center">
          <Row>
            <Col sm={12} lg={6}>
              <TrackerForm />
            </Col>
            <Col xs={12} lg={6} className="py-3">
              <TrackerList data={data} />
            </Col>
          </Row>
      </div>
    </Container>
  );
};

export default TrackerPage;
