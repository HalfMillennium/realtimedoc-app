import { useEffect } from 'react';
import { IconCube } from '@tabler/icons-react';
import { useSelector } from 'react-redux';
import {
  Badge,
  Card,
  Divider,
  Flex,
  LoadingOverlay,
  Text,
  useMantineColorScheme,
} from '@mantine/core';
import { COLORS } from '@/common/colors';
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
  const selectedDataSet = useSelector((state: RootState) => state.datasets.selectedDataSetId);
  const { colorScheme } = useMantineColorScheme();
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
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        gap: 10,
      }}
    >
      {selectedDataSet !== undefined && (
        <Card
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 10,
            backgroundColor: COLORS.teal,
            alignItems: 'center',
            marginBottom: 10,
          }}
          shadow="xs"
          radius="md"
          p="sm"
        >
          <IconCube fontSize={10} />
          <Text size="xs" style={{ fontWeight: 500, letterSpacing: 1 }}>
            LIVE DATASET CONNECTED
          </Text>
        </Card>
      )}
      <Flex
        style={{
          flexDirection: 'column',
          height: '100%',
          width: '100%',
          overflowY: 'scroll',
          scrollbarWidth: 'none',
          scrollBehavior: 'smooth',
          gap: 10,
        }}
      >
        {messages.map((message, index) => (
          <>
            {!!message.tag && (
              <>
                <div
                  key={index}
                  style={{
                    padding: 10,
                    backgroundColor: colorScheme === 'dark' ? '#4d4c4c' : `${COLORS.teal}20`,
                    borderRadius: 10,
                  }}
                >
                  <Text size="xs" style={{ opacity: 0.7, fontWeight: 500 }}>
                    {message.author} - {message.timestamp}
                  </Text>
                  <Text size="md">{message.content}</Text>
                  <Badge size="sm" color={COLORS.teal}>
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
            p="lg"
            style={{ padding: 10, position: 'relative', backdropFilter: 'blur(5px)' }}
          >
            <LoadingOverlay visible loaderProps={{ type: 'dots', color: 'orange' }} />
          </Card>
        )}
      </Flex>
    </Card>
  );
};
