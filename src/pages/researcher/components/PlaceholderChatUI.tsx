import { COLORS } from '@/common/colors';
import { Center, Text, Button, Stack, Image, useMantineColorScheme } from '@mantine/core';
import { IconMessageChatbot } from '@tabler/icons-react';

export const PlaceholderChatUI = () => {
  const { colorScheme } = useMantineColorScheme();
  return (
    <Center style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', textAlign: 'center', gap: 10, borderRadius: 10, backgroundColor: colorScheme === 'dark' ? '#ffffff05' : '#21212108' }}>
        <IconMessageChatbot size={52} color={COLORS.teal} />
        <Text size="lg" style={{fontWeight: 600}}>
          Ready to super-charge your documents?
        </Text>
        <Text style={{opacity: 0.7}} size="sm">
          Upload a PDF document to get started.
        </Text>
    </Center>
  );
};
