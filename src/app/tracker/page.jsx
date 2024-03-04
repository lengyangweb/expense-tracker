import { connectDB } from '../lib/db';
import Tracker from '@/app/models/Tracker';
import { Container, Row, Col } from "react-bootstrap";
import TrackerList from "../components/Tracker/TrackerList";
import AddTrackerForm from '../components/add-tracker-form';


const TrackerPage = async () => {
  let data = [];

  try {
    await connectDB();
    data = await Tracker.find();
    data = JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.error(first)
  }

  return (
    <Container>
      {/* <div className="d-flex justify-content-center"> */}
      <Row>
        <Col sm={12} lg={6}>
          <AddTrackerForm />
        </Col>
        <Col sm={12} lg={6}>
          <Row>
            <TrackerList data={data}/>
          </Row>
        </Col>
      </Row>
      {/* </div> */}
    </Container>
  );
};

export default TrackerPage;
