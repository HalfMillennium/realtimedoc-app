import React from 'react';
import { Text, useMantineColorScheme } from '@mantine/core';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface ChatHistoryListItemProps {
  title: string;
  conversationId: string;
}

export const ChatHistoryListItem: React.FC<ChatHistoryListItemProps> = ({ title, conversationId }) => {
  const { colorScheme } = useMantineColorScheme();
  const currentConversation = useSelector((state: RootState) => state.conversations.currentConversation);

  return (
    <Text
      size="sm"
      mt="sm"
      style={{
        borderRadius: 5,
        padding: 10,
        cursor: 'pointer',
        backgroundColor: currentConversation.id === conversationId ? (colorScheme === 'light' ? '#f0f0f0' : 'black') : 'transparent',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = colorScheme === 'light' ? '#f0f0f0' : 'black';
      }}
      onMouseLeave={(e) => {
        if (currentConversation.id !== conversationId) {
          e.currentTarget.style.backgroundColor = 'transparent';
        }
      }}
    >
      {title}
    </Text>
  );
};