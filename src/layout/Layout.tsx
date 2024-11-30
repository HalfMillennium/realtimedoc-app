// Layout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header/Header';
import './Layout.css'; // Import the CSS file

const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;