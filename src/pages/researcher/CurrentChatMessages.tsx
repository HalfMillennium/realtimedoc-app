import { useState } from 'react';
import { Badge, Card, Divider, Text } from '@mantine/core';

interface ChatMessage {
  sender: string;
  time: string;
  content: string;
  tokens: number | null;
}

const noMessages: ChatMessage[] = [
  {
    sender: 'No Messages',
    time: '2:45 PM',
    content: 'Hey, can you explain how the model determines token usage and tracks interactions?',
    tokens: 32,
  },
];

export interface CurrentChatMessagesProps {
  messages: ChatMessage[];
}

export const CurrentChatMessages: React.FC<CurrentChatMessagesProps> = ({ messages }) => {
  return (
    <Card withBorder shadow="sm" style={{ height: '75%', overflowY: 'auto' }}>
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
    </Card>
  );
};
