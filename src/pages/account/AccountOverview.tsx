import React, { useState } from 'react';
import { IconLogout2 } from '@tabler/icons-react';
import {
  Avatar,
  Button,
  Center,
  Divider,
  Flex,
  Group,
  Modal,
  Stack,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';

interface User {
  profileName: string;
  username: string;
  status: string;
  about: string;
}

interface AccountOverviewProps {
  open: boolean;
  close: () => void;
}

export const AccountOverview: React.FC<AccountOverviewProps> = ({ open, close }) => {
  const [user, setUser] = useState<User>({
    profileName: 'Kevin Heart',
    username: '@kevinunhuy',
    status: 'On duty',
    about: 'Discuss only on work hours, unless you wanna discuss about music 🎸',
  });

  return (
    <Modal
      opened={open}
      onClose={close}
      title={
        <Text size="sm" style={{ letterSpacing: 1.2, textTransform: 'uppercase', fontWeight: 500 }}>
          Account Overview
        </Text>
      }
      centered
      size="md"
    >
      <Stack gap="md">
        <Stack gap="xs">
          <TextInput
            label="Username"
            value={user.username}
            disabled
          />
          <TextInput
            label="Status recently"
            value={user.status}
            onChange={(e) => setUser({ ...user, status: e.target.value })}
          />
          <Textarea
            label="About me"
            value={user.about}
            minRows={3}
            onChange={(e) => setUser({ ...user, about: e.target.value })}
          />
        </Stack>

        <Divider />
        <Flex style={{ width: '100%', justifyContent: 'flex-end' }}>
          <Group gap="sm">
            <Button variant="default" onClick={close}>
              Close
            </Button>
            <Button variant="defualt">
              <Flex align="center" gap={6}>
                <IconLogout2 size={16} />
                Logout
              </Flex>
            </Button>
          </Group>
        </Flex>
      </Stack>
    </Modal>
  );
};
