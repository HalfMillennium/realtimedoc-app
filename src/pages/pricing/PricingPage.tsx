import React from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import { Flex, Text, useMantineColorScheme } from '@mantine/core';
import { StripePricingTable } from './StripePricingTable';
import { UnauthPricingTable } from './UnauthPricingPage';

export const PricingPage: React.FC = () => {
  const { colorScheme } = useMantineColorScheme();
  const { isSignedIn } = useAuth();
  const user = useUser();
  const userId = user.user?.id;
  return (
    <Flex direction="column" style={{ justifyContent: 'center', width: '100%' }}>
      <Text style={{ textAlign: 'center', fontWeight: 300, fontSize: 36 }} mb="md">
        Choose Your Plan
      </Text>
      <Text style={{ textAlign: 'center' }} mb="xl" color="dimmed">
        Whether you're just starting out or need enterprise-grade tools, we have a plan tailored for
        you. Start small and scale as your needs grow.
      </Text>
      {(!isSignedIn || !userId) && <UnauthPricingTable />}
      {isSignedIn && userId && (
        <span style={{padding: 30, backgroundColor: colorScheme === 'dark' ? "#272727" : "#FFFFFF"}}>
          <StripePricingTable userId={userId} />
        </span>
      )}
    </Flex>
  );
};
