import React from 'react';
import { useSelector } from 'react-redux';
import { Badge, Flex, Text, useMantineColorScheme } from '@mantine/core';
import { RootState } from '@/store/store';

interface ChatHistoryListItemProps {
  title: string;
  conversationId: string;
}

export const ChatHistoryListItem: React.FC<ChatHistoryListItemProps> = ({
  title,
  conversationId,
}) => {
  const { colorScheme } = useMantineColorScheme();
  const currentConversation = useSelector(
    (state: RootState) => state.conversations.currentConversation
  );
  const conversation = useSelector(
    (state: RootState) => state.conversations.conversations[conversationId]
  );

  return (
    <Flex
      mt="sm"
      style={{
        borderRadius: 10,
        padding: 10,
        cursor: 'pointer',
        backgroundColor:
          currentConversation.id === conversationId
            ? colorScheme === 'light'
              ? '#f0f0f0'
              : 'black'
            : 'transparent',
        justifyContent: 'space-between',
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
      <Text size="sm" flex={1}>{title}</Text>
      {conversation.messages.length === 1 && (
        <Badge size="sm" color="green">
          Ready
        </Badge>
      )}
    </Flex>
  );
};
