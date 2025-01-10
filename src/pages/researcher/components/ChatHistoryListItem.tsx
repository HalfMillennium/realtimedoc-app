import React, { useState } from 'react';
import { IconTrash } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, Button, Flex, Text, useMantineColorScheme } from '@mantine/core';
import { deselectAllDataSets } from '@/store/dataSets/dataSetsSlice';
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
  const dispatch = useDispatch();
  const [deleteButtonIsVisible, setDeleteButtonIsVisible] = useState(false);

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
        setDeleteButtonIsVisible(true);
      }}
      onMouseLeave={(e) => {
        if (currentConversation.id !== conversationId) {
          e.currentTarget.style.backgroundColor = 'transparent';
        }
        setDeleteButtonIsVisible(false);
      }}
    >
      <Text size="sm" flex={1} style={{wordBreak: 'break-word'}}>
        {title}
      </Text>
      <Flex direction="row" align="center" gap="10">
        {conversation.messages.length === 1 && (
          <Badge size="sm" color="green">
            Ready
          </Badge>
        )}
        {deleteButtonIsVisible && (
          <Button
            radius={1000}
            color="gray"
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: 5,
              height: 20,
            }}
            variant="light"
            onClick={() => dispatch(deselectAllDataSets())}
          >
            <IconTrash size={10} />
          </Button>
        )}
      </Flex>
    </Flex>
  );
};
