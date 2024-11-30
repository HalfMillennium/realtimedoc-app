import React from 'react';
import { Group, Button, Text, Avatar, Stack, Divider } from '@mantine/core';

export interface UserDetails {
  name: string;
  email: string;
  avatarUrl: string;
  membershipLevel: string;
  accountBalance: number;
};

type AccountOverviewProps = {
    userDetails: UserDetails;
};

export const AccountOverview: React.FC<AccountOverviewProps> = ({
  userDetails: { name, email, avatarUrl, membershipLevel, accountBalance },
}) => {
  return (
    <Stack>
    {/* Avatar and Name */}
    <Group>
      <Avatar src={avatarUrl} radius="xl" size="lg" />
      <Stack>
        <Text size="lg">
          {name}
        </Text>
        <Text size="sm">
          {email}
        </Text>
      </Stack>
    </Group>

    <Divider />

    {/* Membership Details */}
    <Stack>
      <Text size="sm">
        Membership Level
      </Text>
      <Text size="lg">
        {membershipLevel}
      </Text>
    </Stack>

    {/* Account Balance */}
    <Stack>
      <Text size="sm" color="dimmed">
        Account Balance
      </Text>
      <Text size="lg">
        ${accountBalance.toFixed(2)}
      </Text>
    </Stack>

    <Divider />

    {/* Actions */}
    <Group>
      <Button variant="default" onClick={close}>
        Close
      </Button>
      <Button color="red">
        Logout
      </Button>
    </Group>
  </Stack>
  );
};
