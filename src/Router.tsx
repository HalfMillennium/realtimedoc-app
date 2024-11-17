import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/home/Home.page';
import { Researcher } from './pages/researcher/Researcher.page';
import { ResearcherAlt } from './pages/researcher/ResearcherAlt.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/researcher',
    element: <ResearcherAlt />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
