import { connectDB } from "../lib/db";
import { Container, Row } from "react-bootstrap";
import { getTrackers } from "../services/tracker";
import TrackerList from "../components/Tracker/TrackerList";

const TrackerPage = async () => {
  let trackers = [];

  try {
    await connectDB();
    trackers = await getTrackers();
    trackers = JSON.parse(JSON.stringify(trackers));
  } catch (error) {
    console.error(`Fail getting trackers`, error);
  }

  return (
    <Container>
      <Row>
        {/* {!trackers.length && (
          <span>No trackers to display. Please create new tracker by clicking the "New" button.</span>
        )}
        {trackers.length > 0 && <TrackerList data={trackers} />} */}
        <TrackerList data={trackers} />
      </Row>
    </Container>
  );
};

export default TrackerPage;
