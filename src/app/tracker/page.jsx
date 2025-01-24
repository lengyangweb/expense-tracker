import Header from "../components/Header";
import TrackerForm from "./components/TrackerForm";
import { Container, Row, Col } from "react-bootstrap";
import { getUserTrackers } from "../services/tracker";
import { getUserInfo } from '../utilities/generateToken';
import TrackerContainer from "./components/TrackerContainer";

const TrackerPage = async () => {
  const { userId } = getUserInfo(); // decode token to get userInfo
  
  let trackers = [];
  try {
    trackers = await getUserTrackers(userId);
    trackers = JSON.parse(JSON.stringify(trackers));
  } catch (err) {
    console.error(err);
  }

  return (
    <div className="d-flex">
      <Header />
      <Container>
        <Row>
          <Col sm={12} className="pt-2">
            <h3>Tracker</h3>
            <hr />
          </Col>
          <Col sm={12} lg={5}>
            <TrackerForm />
          </Col>
          <Col xs={12} lg={7} className="py-3">
            { !trackers.length && <span>No tracker at the moments. Please Use the "Create Tracker Form" to add trackers.</span> }
            { trackers.length > 0 && <TrackerContainer data={trackers} />}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TrackerPage;
