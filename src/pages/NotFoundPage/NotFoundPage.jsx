import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <Container
      fluid
      className="d-flex flex-column align-items-center justify-content-center text-white"
      style={{
        backgroundColor: "black",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "8rem", fontWeight: "bold" }}>404</h1>

      <p style={{ fontSize: "1.2rem", color: "#aaa", marginBottom: "30px" }}>
        Page Not Found
      </p>

      <Button
        as={Link}
        to="/"
        variant="danger"
        style={{
          backgroundColor: "#e50914",
          border: "none",
          padding: "10px 25px",
          fontWeight: "bold",
        }}
      >
        GO HOME
      </Button>
    </Container>
  );
};

export default NotFoundPage;
