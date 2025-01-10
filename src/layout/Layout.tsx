// Layout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header/Header';
import { useMantineColorScheme } from '@mantine/core';
import lightModeImage from '../assets/svgs/grid_background_light_mode.svg';
import darkModeImage from '../assets/svgs/grid_background_dark_mode.svg';

import './Layout.css';
import Footer from '@/components/Footer/Footer';

const Layout = () => {
  const { colorScheme } = useMantineColorScheme();
  return (
    <div
      className="layout"
      style={{
        backgroundImage: `url(${colorScheme === 'dark' ? darkModeImage : lightModeImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: colorScheme !== 'dark' ? 'white' : undefined,
      }}
    >
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
};

export default Layout;
