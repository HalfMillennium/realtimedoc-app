// Layout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header/Header';

import './Layout.css';

const Layout = () => {
  return (
    <div
      className="layout"
      style={{
        backgroundImage: `url(${'../assets/texture_background_50.jpg'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
