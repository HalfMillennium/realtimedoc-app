import { IconMessageChatbot } from '@tabler/icons-react';
import { Card, Text, useMantineColorScheme } from '@mantine/core';
import { COLORS } from '@/common/colors';

export const PlaceholderChatUI = () => {
  const { colorScheme } = useMantineColorScheme();
  return (
    <Card
      withBorder
      style={{
        gap: 10,
        display: 'flex',
        flex: 1,
        backgroundColor: colorScheme === 'dark' ? '#ffffff05' : '#21212108',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      radius={10}
    >
      <IconMessageChatbot size={52} color={COLORS.teal} />
      <Text size="lg" style={{ fontWeight: 600 }}>
        Ready to super-charge your documents?
      </Text>
      <Text style={{ opacity: 0.7 }} size="sm">
        Upload a PDF document to get started.
      </Text>
    </Card>
  );
};
