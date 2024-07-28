import { Card } from "primereact/card"
import Footer from "../components/Footer"
import { Col, Row } from "react-bootstrap"
import LoginForm from "./components/LoginForm"
import LoginWithTokenButton from "./components/LoginWithTokenButton"

const style = {
    width: '100vw',
    height: '100vh'
}

const page = () => {
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center" style={style}>
        <Col xs={12} sm={10} md={8} lg={6} xl={5}>
            <Card>
                <h3>Login Form</h3>
                <hr />
                <Row>
                    <Col xs={12} className="mb-4">
                        <div className="d-flex justify-content-center">
                            <LoginForm />
                        </div>
                    </Col>
                    <hr />
                    <Col className="mt-2">
                        <div className="d-flex justify-content-center">
                            <LoginWithTokenButton />
                        </div>
                    </Col>
                </Row>
            </Card>
        </Col>
        <Footer />
    </div>
  )
}

export default page