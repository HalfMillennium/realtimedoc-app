import { useEffect } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { IconRefresh, IconX } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Badge,
  Button,
  Card,
  Divider,
  Flex,
  Group,
  LoadingOverlay,
  Stack,
  Text,
  useMantineColorScheme,
} from '@mantine/core';
import { COLORS } from '@/common/colors';
import { deselectAllDataSets } from '../../store/datasets/dataSetsSlice';
import { RootState } from '@/store/store';

export interface CurrentChatMessagesProps {
  isLoadingNewMessage: boolean;
  hasFailedToLoadNewMessage: boolean;
  newMessageRetry: () => void;
}

export const CurrentChatMessages: React.FC<CurrentChatMessagesProps> = ({
  isLoadingNewMessage,
  hasFailedToLoadNewMessage,
  newMessageRetry
}) => {
  const messages = useSelector(
    (state: RootState) => state.conversations.currentConversation?.messages
  );
  const selectedDataSet = useSelector((state: RootState) => state.dataSets.selectedDataSetId);
  const dispatch = useDispatch();
  const { colorScheme } = useMantineColorScheme();
  const navigate = useNavigate();
  const handleNewMessageRetry = () => {
    newMessageRetry();
  }
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
            backgroundColor: colorScheme === 'dark' ? '#212121' : '#fafafa',
            alignItems: 'center',
            marginBottom: 10,
            width: '100%',
            justifyContent: 'space-between',
          }}
          radius="md"
          p="sm"
        >
          <Flex align="center" gap="5" justify="center">
            <DotLottieReact
              src={
                colorScheme === 'dark'
                  ? 'https://lottie.host/d11a40ce-5dec-4622-af88-a55765ab41db/tbCmYNgfhu.lottie'
                  : 'https://lottie.host/ec651857-f823-432c-88f7-c9ce74b60add/zWM1XnmSBw.lottie'
              }
              loop
              autoplay
              style={{ width: 30, paddingBottom: 4 }}
            />
            <Text
              size="xs"
              style={{
                display: 'flex',
                fontWeight: 600,
                letterSpacing: 1,
                lineHeight: 1,
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
              <Text style={{ fontSize: 12, fontWeight: 400, display: 'flex' }}>Remove</Text>
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
              {/** TODO: This logic delineates between whether message is from user or the bot. This is asinine, and I should change it */}
              {!!message.tag && (
                <>
                  <div
                    key={message.id}
                    style={{
                      padding: 10,
                      backgroundColor: colorScheme === 'dark' ? '#4d4c4c' : `${COLORS.teal}20`,
                      borderRadius: 10,
                    }}
                  >
                    <Text size="xs" style={{ opacity: 0.7, fontWeight: 500 }}>
                      {message.userName} - {message.timestamp}
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
                      {'You'} - {message.timestamp}
                    </Text>
                    <Text size="md">{message.content}</Text>
                  </div>
                  {index < messages.length - 1 && <Divider my="sm" />}
                </>
              )}
            </>
          ))}
        {isLoadingNewMessage && (
          <Stack>
            <Divider my="sm" />
            <Card
              withBorder
              shadow="xs"
              radius="md"
              p="xl"
              style={{
                padding: 10,
                position: 'relative',
                backdropFilter: 'blur(5px)',
              }}
            >
              <LoadingOverlay
                visible
                loaderProps={{ type: 'dots', color: 'orange' }}
                overlayProps={{
                  children: (
                    <Flex p={10} gap={100} align="center" justify="flex-end">
                      <Text size="sm">Taking too long?</Text>
                      <Button radius={10} size="xs" variant="light" onClick={handleNewMessageRetry}>
                        <IconRefresh />
                        <Text size="sm" ml={5}>
                          Retry
                        </Text>
                      </Button>
                    </Flex>
                  ),
                  center: true
                }}
              />
            </Card>
          </Stack>
        )}
        {hasFailedToLoadNewMessage && (
          <Card
            withBorder
            shadow="xs"
            radius="md"
            p="lg"
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 10,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLORS.softRed + '20',
              borderColor: COLORS.softRed + '30',
            }}
          >
            <IconX size={16} style={{ color: COLORS.softRed }} />
            <Text size="md" style={{ color: COLORS.softRed }}>
              Failed to load new message
            </Text>
            <div>
              <Button size="xs" color="red" variant="light" onClick={() => navigate(0)}>
                <IconRefresh size={14} style={{ marginRight: 5 }} />
                Reload
              </Button>
            </div>
          </Card>
        )}
      </Flex>
    </Card>
  );
};
