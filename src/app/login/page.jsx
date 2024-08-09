'use client'

import { useState } from "react"
import { Card } from "primereact/card"
import Footer from "../components/Footer"
import { Col, Row } from "react-bootstrap"
import LoginForm from "./components/LoginForm"
import LoginTabMenu from "./components/LoginTabMenu"
import RegisterForm from "./components/RegisterForm"
import LoginWithTokenButton from "./components/LoginWithTokenButton"

const style = {
    width: '100vw',
    height: '100vh'
}

const page = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const items = [
        { label: 'Login', icon: 'pi pi-sign-in' },
        { label: 'Register', icon: 'pi pi-user-plus' },
    ];

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center" style={style}>
        <Col xs={12} sm={10} md={8} lg={6} xl={4}>
            <Row>
                <Col xs={12}>
                    <LoginTabMenu
                        items={ items }
                        activeIndex={activeIndex} 
                        setActiveIndex={setActiveIndex}
                    />
                </Col>
                <Col xs={12}>
                    <Card className="border border-3" title={ activeIndex === 0 ? "Login Form" : "Register Form" }>
                        <Row>
                            <Col xs={12} className="mb-2">
                                <div className="d-flex justify-content-center">
                                    { activeIndex === 0 && <LoginForm /> }
                                    { activeIndex === 1 && <RegisterForm /> }
                                </div>
                            </Col>
                            {/* <hr />
                            <Col className="mt-2">
                                <div className="d-flex justify-content-center">
                                    <LoginWithTokenButton />
                                </div>
                            </Col> */}
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Col>
        <Footer />
    </div>
  )
}

export default page