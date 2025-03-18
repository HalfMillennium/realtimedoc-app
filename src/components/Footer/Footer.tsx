import React from 'react';
import { Container, Flex, Text, useMantineColorScheme } from '@mantine/core';
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
        <Text
          size="xs"
          style={{
            color: COLORS.mantineDefaultGray,
            textDecoration: 'underline',
            cursor: 'pointer',
          }}
          onClick={() =>
            window.open(
              'https://www.termsfeed.com/live/dffc3899-8e12-422a-92f1-0bb3c3d83713',
              '_blank'
            )
          }
        >
          &copy; Privacy Policy
        </Text>
        <Text size="xs" style={{ color: COLORS.mantineDefaultGray, textDecoration: 'underline' }}          onClick={() =>
            window.open(
              'https://docs.google.com/document/d/1IyfhFSNavSyjj2ofv7--wr6TPYduOiIQdW2pwkyHcvo/edit?usp=sharing',
              '_blank'
            )
          }>
          &copy; Terms of Service
        </Text>
      </Flex>
    </footer>
  );
};

export default Footer;
