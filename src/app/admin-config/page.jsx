import Header from "../components/Header"
import AccessCode from "./components/AccessCode"
import { getAccessCodes } from "../services/utilities";
import { Col, Container, Row } from "react-bootstrap"
import { getUsers } from "../services/userService";
import UserGrid from "./components/UserGrid";

const page = async () => {

  let accessCodes;
  let users;
  try {
    [accessCodes, users] = await Promise.all([getAccessCodes(), getUsers()])
    accessCodes = accessCodes.map((code) => ({ code }));
    users = JSON.parse(JSON.stringify(users));
    users = users.filter(({ username, email }) => ({ username, email }));
  } catch (error) {
    console.error(`${new Date().toISOString()} - ${error}`);
    return;
  }

  return (
    <div className='d-flex'>
        <Header />
        <Container>
            <Row>
                <Col xs={12} className='h2 py-2'>
                    <div className="d-flex align-items-center gap-2">
                        <i className="pi pi-cog h3"></i>
                        <span>Admin Config</span>
                    </div>
                    <hr />
                </Col>
                <Col xs={6}>
                    <UserGrid users={users} />
                </Col>
                <Col xs={6}>
                    <AccessCode accessCodes={accessCodes} />
                </Col>
            </Row>
        </Container>
    </div>
  )
}

export default page