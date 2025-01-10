import React from 'react';
import {
  Badge,
  Button,
  Card,
  Center,
  Container,
  Divider,
  Flex,
  Group,
  Stack,
  Text,
  Title,
  useMantineColorScheme,
} from '@mantine/core';
import { StripePricingTable } from './StripePricingTable';

export const PricingPage: React.FC = () => {
  const { colorScheme } = useMantineColorScheme();

  return (
    <Flex direction="column" style={{justifyContent: 'center', width: '100%'}}>
      <Text style={{ textAlign: 'center', fontWeight: 300, fontSize: 36 }} mb="md">
        Choose Your Plan
      </Text>
      <Text style={{ textAlign: 'center' }} mb="xl" color="dimmed">
        Whether you're just starting out or need enterprise-grade tools, we have a plan tailored for
        you. Start small and scale as your needs grow.
      </Text>
      <div style={{padding: 30, backgroundColor: colorScheme === 'dark' ? '#272727' : '#ffffff', width: 'auto'}}>
        <StripePricingTable />
      </div>
    </Flex>
  );
};
