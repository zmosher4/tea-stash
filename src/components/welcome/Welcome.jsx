import './Welcome.css';

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export const Welcome = () => {
  return (
    <Container className="text-center mt-5">
      <Row>
        <Col>
          <h1>
            <span className="d-block">Welcome to</span>
            <span className="d-block">Tea Stash</span>
          </h1>
          <p className="mt-3">
            A way to keep track of your ever-growing tea collection
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Welcome;
