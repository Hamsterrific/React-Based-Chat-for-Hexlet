import React from 'react';
import { Button, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/hooks.js';

const Header = () => {
  const { logOut, isLoggedIn } = useAuth();
  const { t } = useTranslation();
  return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <div className="container">
        <Navbar.Brand as={Link} to="/">
          {t('chatName')}
        </Navbar.Brand>
        {isLoggedIn && <Button onClick={logOut}>{t('logOut')}</Button>}
      </div>
    </Navbar>
  );
};

export default Header;
