import { Col, Container, Row } from "react-bootstrap";
import TrackerList from "../components/Tracker/TrackerList";

const TrackerPage = async () => {
  const trackers = [
    {
      _id: 1,
      title: `January Tracker`,
      createdStamp: new Date().toISOString(),
    },
    {
      _id: 2,
      title: `February Tracker`,
      createdStamp: new Date().toISOString(),
    },
    {
      _id: 3,
      title: `March Tracker`,
      createdStamp: new Date().toISOString(),
    },
    {
      _id: 4,
      title: `April Tracker`,
      createdStamp: new Date().toISOString(),
    },
    {
      _id: 5,
      title: `May Tracker`,
      createdStamp: new Date().toISOString(),
    },
    {
      _id: 6,
      title: `June Tracker`,
      createdStamp: new Date().toISOString(),
    },
    {
      _id: 7,
      title: `July Tracker`,
      createdStamp: new Date().toISOString(),
    },
    {
      _id: 8,
      title: `August Tracker`,
      createdStamp: new Date().toISOString(),
    },
    {
      _id: 9,
      title: `September Tracker`,
      createdStamp: new Date().toISOString(),
    },
    {
      _id: 10,
      title: `October Tracker`,
      createdStamp: new Date().toISOString(),
    },
    {
      _id: 11,
      title: `November Tracker`,
      createdStamp: new Date().toISOString(),
    },
    {
      _id: 12,
      title: `December Tracker`,
      createdStamp: new Date().toISOString(),
    },
  ];

  return (
    <Container>
      <Row>
        {/* <Col className="py-3">
          <h3>Manage Tracker</h3>
        </Col>
        <hr /> */}
        {!trackers.length && (
          <span>
            No trackers to display. Please create new tracker by clicking the
            "New" button.
          </span>
        )}
        {trackers.length > 0 && <TrackerList trackers={trackers} />}
      </Row>
    </Container>
  );
};

export default TrackerPage;
