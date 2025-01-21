import React, { useState } from 'react';
import { IconCrown, IconLogout2 } from '@tabler/icons-react';
import { useSelector } from 'react-redux';
import {
  Button,
  Divider,
  Flex,
  Group,
  Modal,
  Stack,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { COLORS } from '@/common/colors';
import { RootState } from '@/store/store';
import { User } from '../../types/user';

interface AccountOverviewProps {
  open: boolean;
  close: () => void;
}

export const AccountOverview: React.FC<AccountOverviewProps> = ({ open, close }) => {
  const [user, setUser] = useState<User>({
    id: '1',
    email: 'kevinunhuy@gmail.com',
    name: 'Kevin Unhuy',
    memberSince: new Date().toISOString().split('T')[0],
  });

  const userMembership = useSelector((state: RootState) => state.membership.currentUserMembership);

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
          <TextInput label="Name" value={user.name} disabled />
          <TextInput label="Membership" value={userMembership} disabled />
          <TextInput label="User ID" value={user.id} disabled />
          <TextInput label="Email Address" value={user.email} disabled />
          <TextInput label="Member Since" value={user.memberSince} disabled />
        </Stack>
        <Flex style={{ flexDirection: 'column', gap: 5, alignItems: 'center' }}>
          <Flex
            style={{
              width: '100%',
              justifyContent: 'center',
              background: `linear-gradient(to right, ${COLORS.teal}, ${COLORS.peach})`,
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              borderRadius: 10,
            }}
          >
            <Button
              fullWidth
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                borderRadius: 10,
                backgroundColor: 'transparent',
                width: '100%',
                transition: 'background 0.3s ease',
              }}
            >
              <IconCrown size={18} style={{ marginRight: 10, color: 'white' }} />
              Upgrade to Premium
            </Button>
          </Flex>
          <Text style={{ fontSize: 12 }}>
            Upgrade today to unlock unlimited document uploads & chats!
          </Text>
        </Flex>
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
