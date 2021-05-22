import React from "react";
import { Container, Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <Container
      style={{ height: "80vh" }}
      className="d-flex justify-content-center align-items-center"
    >
      <Spinner animation="border" />
    </Container>
  );
};

export default Loader;
