import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/home/Home.page';
import { Researcher } from './pages/researcher/Researcher.page';
import { Register } from './pages/registration/Register';

import Layout from './layout/Layout';
export interface UserDetails {
  name: string;
  email: string;
  avatarUrl: string;
  membershipLevel: string;
  accountBalance: number;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
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
      }
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
