import React from 'react';
import { Button, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/hooks.js';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { logOut, loggedIn } = useAuth();
  const { t } = useTranslation();
  return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <div className="container">
        <Navbar.Brand as={Link} to="/">{t('chatName')}</Navbar.Brand>
        {!!loggedIn && <Button onClick={logOut}>{t('logOut')}</Button>}
      </div>    
    </Navbar>
  );
};

export default Header;
