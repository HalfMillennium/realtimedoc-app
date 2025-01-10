import React from 'react';
import { Container, Text, useMantineColorScheme } from '@mantine/core';
import { COLORS } from '@/common/colors';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { colorScheme } = useMantineColorScheme();
  return (
    <footer
      style={{
        background: `linear-gradient(to right, ${colorScheme === 'dark' ? '#00000040' : '#ffffff'} 0%, ${colorScheme === 'dark' ? '#00000020' : '#ffffff'} 100%)`,
        padding: '1rem 0',
        marginTop: 'auto',
      }}
    >
      <Container size="lg" style={{ textAlign: 'center' }}>
        <Text size="sm" style={{ color: COLORS.mantineDefaultGray }}>
          &copy; {currentYear} RealTimeDoc. All rights reserved.
        </Text>
      </Container>
    </footer>
  );
};

export default Footer;
