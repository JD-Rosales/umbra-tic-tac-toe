import { createBrowserRouter } from 'react-router-dom';
import App from './pages/App';
import Play from './pages/Play';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/play',
    element: <Play />,
  },
]);

export default router;
