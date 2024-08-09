import React from 'react'
import Header from '../components/Header'
import { Col, Container, Row } from 'react-bootstrap'

const page = () => {
  return (
    <div className='d-flex'>
        <Header />
        <Container>
            <Row>
                <Col xs={12} className='h2 py-2'>
                    <div className="d-flex align-items-center gap-2">
                        <i className="pi pi-user h3"></i>
                        <span>User Profile</span>
                    </div>
                    <hr />
                </Col>
            </Row>
        </Container>
    </div>
  )
}

export default page