import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

interface Props {}

const Home: React.FC<Props> = () => {
  return (
    <Container>
      <Row>
        <Col>Home</Col>
      </Row>
    </Container>
  );
};

export default Home;
