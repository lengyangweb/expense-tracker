import Header from "../components/Header"
import AccessCode from "./components/AccessCode"
import { getAccessCodes } from "../services/utilities";
import { Col, Container, Row } from "react-bootstrap"

const page = async () => {

  let accessCodes;
  try {
    accessCodes = await getAccessCodes();
    accessCodes = accessCodes.map((code) => ({ code }));
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
                    <AccessCode accessCodes={accessCodes} />
                </Col>
            </Row>
        </Container>
    </div>
  )
}

export default page