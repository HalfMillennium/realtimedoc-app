import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/home/Home.page';
import { Researcher } from './pages/researcher/Researcher.page';
import { Register } from './pages/registration/Register';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/researcher',
    element: <Researcher />,
  },
  {
    path: '/register',
    element: <Register />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
