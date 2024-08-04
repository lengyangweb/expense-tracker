import React from "react";
import Header from "./components/Header";
import { Container } from "react-bootstrap";

const HomePage = () => {
  return (
    <div className="d-flex">
      <Header />
      <Container>
        <div>HomePage</div>
      </Container>
    </div>
  )
};

export default HomePage;
