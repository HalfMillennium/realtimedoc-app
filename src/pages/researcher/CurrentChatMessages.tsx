import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Badge, Card, Divider, LoadingOverlay, Text } from '@mantine/core';
import { Message } from '@/store/conversations/conversationsSlice';
import { RootState } from '@/store/store';

export interface CurrentChatMessagesProps {
  isLoadingNewMessage: boolean;
}

export const CurrentChatMessages: React.FC<CurrentChatMessagesProps> = ({
  isLoadingNewMessage,
}) => {
  const messages = useSelector(
    (state: RootState) => state.conversations.currentConversation.messages
  );
  useEffect(() => {
    // Scroll to the bottom when new messages are added
    const chatContainer = document.querySelector('.chat-container');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);
  return (
    <Card
      withBorder
      shadow="sm"
      className="chat-container"
      style={{
        height: '100%',
        width: '100%',
        overflowY: 'scroll',
        scrollbarWidth: 'none',
        scrollBehavior: 'smooth',
      }}
    >
      {messages.map((message, index) => (
        <div key={index}>
          <Text size="xs" mt="sm" style={{ opacity: 0.7, fontWeight: 500 }}>
            {message.author} - {message.timestamp}
          </Text>
          <Text size="md" mt="xs">
            {message.content}
          </Text>
          {!!message.tag && (
            <Card withBorder shadow="xs" p="md" radius="md" mt="xs">
              <Text size="sm">{message.content}</Text>
              <Badge size="sm" color="blue" mt="sm">
                {message.tag}
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
