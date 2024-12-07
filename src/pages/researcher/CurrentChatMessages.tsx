import { useState } from 'react';
import { Badge, Card, Divider, LoadingOverlay, Text } from '@mantine/core';

interface ChatMessage {
  sender: string;
  time: string;
  content: string;
  tokens: number | null;
}

export interface CurrentChatMessagesProps {
  messages: ChatMessage[];
  isLoadingNewMessage: boolean;
}

export const CurrentChatMessages: React.FC<CurrentChatMessagesProps> = ({
  messages,
  isLoadingNewMessage,
}) => {
  return (
    <Card withBorder shadow="sm" style={{ height: '100%', width: '100%', overflowY: 'scroll', scrollbarWidth: 'none' }}>
      {messages.map((message, index) => (
        <div key={index}>
          <Text size="xs" mt="sm" style={{ opacity: 0.7, fontWeight: 500 }}>
            {message.sender} - {message.time}
          </Text>
          <Text size="md" mt="xs">
            {message.content}
          </Text>
          {message.tokens !== null && (
            <Card withBorder shadow="xs" p="md" radius="md" mt="xs">
              <Text size="sm">{message.content}</Text>
              <Badge size="sm" color="blue" mt="sm">
                {message.tokens} tokens
              </Badge>
            </Card>
          )}
          {index < messages.length - 1 && <Divider my="sm" />}
        </div>
      ))}
      {isLoadingNewMessage && (
        <Card
          withBorder
          shadow="xs"
          p="md"
          radius="md"
          mt="xs"
          style={{ position: 'relative', backdropFilter: 'blur(5px)' }}
        >
          <LoadingOverlay visible loaderProps={{ type: 'dots', color: 'orange' }} />
        </Card>
      )}
    </Card>
  );
};
