import React from 'react';

const NotFoundPage = () => {
    return (
        <div className="text-center">
          <img alt="Page Not Found" className="img-fluid h-25" src="https://cdn2.hexlet.io/assets/error-pages/404-4b6ef16aba4c494d8101c104236304e640683fa9abdb3dd7a46cab7ad05d46e9.svg" />
          <h1 className="h4 text-muted">
          Page Not Found
          </h1>
          <p className="text-muted">
            404 Not Found
          </p>
        </div>)
}

export default NotFoundPage;