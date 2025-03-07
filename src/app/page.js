import React from "react";
import Header from "./components/Header";
import { Col, Container, Row } from "react-bootstrap";
import { getUserInfo } from "./utilities/generateToken";

const HomePage = () => {
  const { username } = getUserInfo();

  return (
    <div className='d-flex'>
      <Header />
      <Container>
        <Row>
          <Col xs={12} className='h2 py-2'>
            <div className="d-flex align-items-center gap-2">
              <i className="pi pi-home h3"></i>
              <span>Home</span>
            </div>
            <hr />
          </Col>
          <Col xs={12}><h5>Hi { username },</h5></Col>
        </Row>
      </Container>
    </div>
  )
};

export default HomePage;
