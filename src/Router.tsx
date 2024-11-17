import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/home/Home.page';
import { Researcher } from './pages/researcher/Researcher.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/researcher',
    element: <Researcher />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
