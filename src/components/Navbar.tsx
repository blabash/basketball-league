import React from 'react';
import { Nav } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router-dom';

const Navbar: React.FC<RouteComponentProps> = ({ location }) => {
  let sliceIdx;
  location.pathname.split('').forEach((char, idx) => {
    if (idx === 0) return;
    if (char === '/') sliceIdx = idx;
  });

  const baseLocation = location.pathname.slice(0, sliceIdx);
  return (
    <Nav
      activeKey={baseLocation}
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
