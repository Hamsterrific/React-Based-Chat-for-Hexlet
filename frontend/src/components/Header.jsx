import React from 'react';
import { Button, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/hooks.js';

const Header = () => {
  const { logOut, loggedIn } = useAuth();
  return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <div className="container">
        <Navbar.Brand as={Link} to="/">MyChat</Navbar.Brand>
        {!!loggedIn && <Button onClick={logOut}>Log Out</Button>}
      </div>    
    </Navbar>
  );
};

export default Header;
