import { Card } from "primereact/card"
import LoginForm from "./components/LoginForm"
import { Col, Row } from "react-bootstrap"
import { Button } from "primereact/button"
import Footer from "../components/Footer"

const style = {
    width: '100vw',
    height: '100vh'
}

const page = () => {
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center" style={style}>
        <Col xs={12} sm={10} md={8} lg={6} xl={4}>
            <Card>
                <h3>Login Form</h3>
                <hr />
                <Row>
                    <Col xs={12} className="mb-4">
                        <LoginForm />
                    </Col>
                    <hr />
                    <Col className="mt-2">
                        <div className="d-flex justify-content-center">
                            {/* <span className="text-primary">Login with token</span>
                            <i className="text-primary pi pi-arrow-right"></i> */}
                            <Button
                                outlined
                                className="rounded py-2 px-4"
                                severity="secondary"
                                label="Login with token"
                                icon="pi pi-arrow-right"
                                iconPos="right"
                            />
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