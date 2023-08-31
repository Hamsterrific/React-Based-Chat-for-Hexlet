import { createRoot } from 'react-dom/client';
import init from './init.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

const app = async () => {
  const root = createRoot(document.getElementById('root'));
  const vdom = await init();
  root.render(vdom);
};

app();
