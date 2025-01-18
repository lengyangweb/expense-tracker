 'use client'

import { useState } from "react"
import LoginForm from "./LoginForm"
import { Card } from "primereact/card"
import { Col, Row } from "react-bootstrap"
import RegisterForm from "./RegisterForm"
import Footer from "@/app/components/Footer"

 const style = {
    width: '100vw',
    height: '100vh'
}

const LoginContainer = () => {
    const [view, setView] = useState('Login');

    function updateView() { setView((currView) => currView = (currView === 'Login') ? 'Register' : 'Login'); }
    
    return (
        <div className="container-fluid d-flex justify-content-center align-items-center" style={style}>
        <Col xs={12} sm={10} md={8} lg={6} xl={4}>
            <Row>
                <Col xs={12}>
                    <Row>
                        <Col xs={12}>
                            <div className="d-flex align-items-center gap-2 h3 p-3 border text-white rounded-top-2" style={{ background: '#0059b3'}}>
                                <i className="bg-white rounded-circle text-dark p-3 fs-2 pi pi-lock"></i>
                                <span className="fw-bold spacing-2" style={{ letterSpacing: '1px', textTransform: 'uppercase' }}>{ view } FORM</span>
                            </div>
                        </Col>
                        <Col xs={12}>
                            <Card>
                                <Row>
                                    { view === 'Login' && (
                                        <Col xs={12}>
                                            <div className="d-flex justify-content-center">
                                                <LoginForm />
                                            </div>
                                            <hr />
                                            <div className="d-flex gap-2" style={{ fontSize: '14px' }}>
                                                <span>New around here?</span>
                                                <strong className="text-primary" style={{ cursor: 'pointer' }} onClick={updateView} >Create account</strong>
                                            </div>
                                        </Col>
                                    )}
                                    { view === 'Register' && (
                                        <Col xs={12}>
                                            <div className="d-flex">
                                                <RegisterForm />
                                            </div>
                                        </Col>
                                    )}
                                </Row>
                            </Card>
                            { view === 'Register' && (
                                <div className="d-flex justify-content-center mt-2 gap-1" style={{ fontSize: '14px' }}>
                                    <span>Already have an account?</span>
                                    <strong  className="text-primary" style={{ cursor: 'pointer' }} onClick={updateView}>Log in</strong>
                                </div>
                            )}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Col>
        <Footer />
    </div>
    )
}

export default LoginContainer