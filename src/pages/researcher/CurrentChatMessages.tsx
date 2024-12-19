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
        <>
          {!!message.tag && (
            <>
              <div
                key={index}
                style={{ padding: 10, backgroundColor: '#4d4c4c', borderRadius: 10 }}
              >
                <Text size="xs" style={{ opacity: 0.7, fontWeight: 500 }}>
                  {message.author} - {message.timestamp}
                </Text>
                <Text size="md">{message.content}</Text>
                <Badge size="sm" color="blue">
                  {message.tag}
                </Badge>
              </div>

              {index < messages.length - 1 && <Divider my="sm" />}
            </>
          )}
          {!!!message.tag && (
            <>
              <div key={index}>
                <Text size="xs" style={{ opacity: 0.7, fontWeight: 500 }}>
                  {message.author} - {message.timestamp}
                </Text>
                <Text size="md">{message.content}</Text>
              </div>
              {index < messages.length - 1 && <Divider my="sm" />}
            </>
          )}
        </>
      ))}
      {isLoadingNewMessage && (
        <Card
          withBorder
          shadow="xs"
          radius="md"
          mt="sm"
          style={{ padding: 10, position: 'relative', backdropFilter: 'blur(5px)' }}
        >
          <LoadingOverlay visible loaderProps={{ type: 'dots', color: 'orange' }} />
        </Card>
      )}
    </Card>
  );
};
