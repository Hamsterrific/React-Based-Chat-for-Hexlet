import React from 'react';
import ReactDOM from 'react-dom/client';
import init from './init.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.querySelector('#chat'));
const vdom = init();
root.render(<React.StrictMode>{vdom}</React.StrictMode>);
