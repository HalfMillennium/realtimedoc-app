import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './layout/Layout';
import { FAQPage } from './pages/faq/FAQPage';
import { HomePage } from './pages/home/Home.page';
import { PricingPage } from './pages/pricing/PricingPage';
import { Register } from './pages/registration/Register';
import { Researcher } from './pages/researcher/Researcher.page';
import SignIn from './pages/sign-in/SignIn';

export interface UserDetails {
  name: string;
  email: string;
  avatarUrl: string;
  membershipLevel: string;
  accountBalance: number;
}

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
        path: '/sign-in',
        element: <SignIn />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/pricing',
        element: <PricingPage />,
      },
      {
        path: '/faq',
        element: <FAQPage />,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
