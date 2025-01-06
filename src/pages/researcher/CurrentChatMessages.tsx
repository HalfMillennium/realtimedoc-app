import { useEffect } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { IconX } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Badge,
  Button,
  Card,
  Divider,
  Flex,
  LoadingOverlay,
  Text,
  useMantineColorScheme,
} from '@mantine/core';
import { COLORS } from '@/common/colors';
import { deselectAllDataSets } from '@/store/dataSets/dataSetsSlice';
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
  const selectedDataSet = useSelector((state: RootState) => state.dataSets.selectedDataSetId);
  const dispatch = useDispatch();
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
      radius={12}
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
            gap: 5,
            backgroundColor: '#212121',
            alignItems: 'center',
            marginBottom: 10,
            width: '100%',
            justifyContent: 'space-between',
          }}
          shadow="xs"
          radius="md"
          p="sm"
        >
          <Flex align="center" gap="5">
            <DotLottieReact
              src="https://lottie.host/d11a40ce-5dec-4622-af88-a55765ab41db/tbCmYNgfhu.lottie"
              loop
              autoplay
              style={{ width: 30 }}
              color={COLORS.teal}
            />
            <Text
              size="xs"
              style={{
                display: 'flex',
                fontWeight: 500,
                letterSpacing: 1,
                color: 'white',
                marginTop: 2,
              }}
            >
              LIVE DATASET CONNECTED
            </Text>
          </Flex>
          <Flex>
            <Button
              radius={100}
              color="gray"
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: '5px 10px',
                width: 'auto',
              }}
              variant="light"
              onClick={() => dispatch(deselectAllDataSets())}
            >
              <IconX size={14} style={{ marginRight: 5 }} />
              <Text style={{ fontSize: 12, fontWeight: 300, display: 'flex' }}>Remove</Text>
            </Button>
          </Flex>
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
        {!!messages &&
          messages.map((message, index) => (
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
