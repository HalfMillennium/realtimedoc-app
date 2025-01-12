import React from 'react';
import { Container, Flex,  Text, useMantineColorScheme } from '@mantine/core';
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
      <Flex direction="row" gap="50" justify="center" align="center">
        <Text size="xs" style={{ color: COLORS.mantineDefaultGray, textDecoration: 'underline' }}>
          &copy; {currentYear} RealTimeDoc. All rights reserved.
        </Text>
        <Text size="xs" style={{ color: COLORS.mantineDefaultGray, textDecoration: 'underline' }}>
          &copy; Privacy Policy
        </Text>
        <Text size="xs" style={{ color: COLORS.mantineDefaultGray, textDecoration: 'underline' }}>
          &copy; Terms of Service
        </Text>
      </Flex>
    </footer>
  );
};

export default Footer;