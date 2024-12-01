import React, { useState } from 'react';
import { IconLogout2 } from '@tabler/icons-react';
import {
  Avatar,
  Badge,
  Button,
  Center,
  Divider,
  Flex,
  Group,
  Modal,
  Stack,
  Text,
} from '@mantine/core';

interface User {
  username: string;
  email: string;
  subscriptionTier: 'Free' | 'Premium';
}

interface AccountOverviewProps {
  open: boolean;
  close: () => void;
}

export const AccountOverview: React.FC<AccountOverviewProps> = ({open, close}) => {
  const [user, setUser] = useState<User>({
    username: 'johnnydoe11',
    email: 'johndoe@example.com',
    subscriptionTier: 'Free',
  });

  const toggleSubscription = () => {
    setUser((prevUser) => ({
      ...prevUser,
      subscriptionTier: prevUser.subscriptionTier === 'Free' ? 'Premium' : 'Free',
    }));
  };

  return (
    <Modal
    opened={open}
    onClose={close}
    title="Account Overview"
    centered
    size="sm"
  >
    <Stack gap="lg">
      <Flex style={{ flexDirection: 'column', gap: 5 }}>
        <Center>
          <Avatar radius="xl" size={62} />
        </Center>
        <Text size="md" style={{ textAlign: 'center', fontWeight: 400 }}>
          {user.username}
        </Text>
        <Text size="sm" style={{ textAlign: 'center', opacity: 0.7 }}>
          {user.email}
        </Text>
        <Center style={{ marginTop: 5 }}>
          <Badge
            color={user.subscriptionTier === 'Free' ? 'gray' : 'teal'}
            size="lg"
            variant="filled"
          >
            {user.subscriptionTier} Tier
          </Badge>
        </Center>
      </Flex>

      {user.subscriptionTier === 'Free' && (
        <Stack gap="sm" mt="md">
          <Text size="sm" style={{ textAlign: 'center' }}>
            Upgrade to <strong>Premium</strong> for exclusive features!
          </Text>
          <Button
            fullWidth
            variant="gradient"
            gradient={{ from: 'teal', to: 'lime' }}
            onClick={toggleSubscription}
          >
            Upgrade to Premium
          </Button>
        </Stack>
      )}

      <Divider />

      {/* Actions */}
      <Flex
        style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-end', gap: 10 }}
      >
        <Button variant="default" onClick={close}>
          Close
        </Button>
        <Button color="gray">
          <Flex style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
            <IconLogout2 size={16} />
            Logout
          </Flex>
        </Button>
      </Flex>
    </Stack>
  </Modal>
  );
};
