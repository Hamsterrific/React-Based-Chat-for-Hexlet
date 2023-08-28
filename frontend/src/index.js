import { createRoot } from 'react-dom/client';
import init from './init.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

const app = async () => {
    const root = createRoot(document.getElementById('root'));
    root.render(await init());
  };
  
  app();