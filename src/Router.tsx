import React, { lazy, Suspense } from 'react';
import { RedirectToSignIn, useAuth } from '@clerk/clerk-react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LoadingOverlay } from '@mantine/core';
import Layout from './layout/Layout';
import { FAQPage } from './pages/faq/FAQPage';
import { FeaturesPage } from './pages/features/FeaturesPage';
import { HomePage } from './pages/home/Home.page';
import { PricingPage } from './pages/pricing/PricingPage';
import { Register } from './pages/registration/Register';
import SignIn from './pages/sign-in/SignIn';
import { AltFeaturesPage } from './pages/features-alt/AltFeaturesPage';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  return <>{children}</>;
};

const Researcher = lazy(() => import('./pages/researcher/Researcher.page'));

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
        element: (
          <ProtectedRoute>
            <Suspense fallback={<LoadingOverlay />}>
              <Researcher />
            </Suspense>
          </ProtectedRoute>
        ),
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
      {
        path: '/features',
        element: <AltFeaturesPage />,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
