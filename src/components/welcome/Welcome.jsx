import './Welcome.css';

import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

export const Welcome = () => {
  return (
    <Container className="welcome-container text-center mt-5">
      <Row>
        <Col>
          <h1>
            <span className="d-block">Welcome to</span>
            <span className="d-block">Tea Stash</span>
          </h1>
          <p className="mt-3">
            A way to keep track of your ever-growing tea collection
          </p>
          <Image
            src="https://i0.wp.com/secrettrips.com/wp-content/uploads/2023/08/kerala-tea-fields.jpeg?fit=4824%2C3216&ssl=1"
            rounded
            className="mt-4"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Welcome;
