import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TeamLogo from './TeamLogo';
import { Link } from 'react-router-dom';
import { getTeamNames } from '../api';

interface Props {}

const Home: React.FC<Props> = () => {
  const [teamNames, setTeamNames] = React.useState([]);

  React.useEffect(() => {
    getTeamNames().then(teamNames => setTeamNames(teamNames));
  }, []);
  return (
    <Container className='text-center pt-3'>
      <Row>
        <Col>
          <h1 style={{ fontSize: 54 }}>App Academy Basketball League</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className='pt-5'>
            <h3>Select a team</h3>
            {teamNames.map(id => {
              return (
                <Link key={id} to={`/${id}`}>
                  <TeamLogo id={id} width='125px' />
                </Link>
              );
            })}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
