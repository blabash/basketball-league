import React from 'react';
import { Nav } from 'react-bootstrap';

interface Props {}

const Navbar: React.FC<Props> = () => {
  return (
    <Nav
      activeKey={window.location.pathname}
      className='justify-content-center pt-1'
      variant='tabs'
    >
      <Nav.Link className='mr-5' href='/'>
        Home
      </Nav.Link>
      <Nav.Link href='/teams'>Teams</Nav.Link>
      <Nav.Link href='/players'>Players</Nav.Link>
    </Nav>
  );
};

export default Navbar;
