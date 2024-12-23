import { useState } from 'react';
import { IconCloudUpload, IconHistory } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Avatar,
  Button,
  Card,
  Divider,
  Flex,
  Group,
  LoadingOverlay,
  Text,
  useMantineColorScheme,
} from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import { COLORS } from '@/common/colors';
import {
  Conversation,
  Message,
  setCurrentConversation,
  uploadFileAndCreateConversation,
} from '@/store/conversations/conversationsSlice';
import { AppDispatch, RootState } from '@/store/store';
import { ChatHistoryListItem } from './ChatHistoryListItem';

export const ResearcherLeftSideBar = () => {
  const [fileSetStream, setFileSetStream] = useState<File[][]>([]);
  const conversationsSelector = useSelector((state: RootState) => state.conversations);
  const dispatch = useDispatch<AppDispatch>();
  const handleFileUpload = (files: File[]) => {
    setFileSetStream((prevSets) => [...prevSets, files]);
    const formData = new FormData();
    formData.append('file', files[0]);
    dispatch(uploadFileAndCreateConversation({ formData, userId: '123' }));
  };
  const isLoadingNewConversation = useSelector(
    (state: RootState) => state.conversations.isLoadingNewConversation
  );
  // Access the user state from the Redux store
  const allConversations = conversationsSelector.conversations;
  const { colorScheme } = useMantineColorScheme();

  return (
    <div style={{ width: '20%' }}>
      <Group>
        <Avatar radius="xl" />
        <div>
          <Text size="md">Alex Ferguson</Text>
          <Text size="xs">Chat User</Text>
        </div>
      </Group>
      <Divider my="sm" />
      <div style={{ display: 'flex', flexDirection: 'row', gap: 5, opacity: 0.5 }}>
        <IconHistory size={16} />
        <Text size="xs" style={{ fontWeight: 300 }}>
          Chat History
        </Text>
      </div>
      {Object.values(allConversations).map((conversation) => (
        <div
          key={conversation.id}
          style={{
            transition: 'background-color 0.3s ease',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => dispatch(setCurrentConversation({ conversationId: conversation.id }))}
        >
          <ChatHistoryListItem title={conversation.title} conversationId={conversation.id} />
        </div>
      ))}
      {isLoadingNewConversation && (
        <Card
          withBorder
          shadow="xs"
          p="lg"
          mt="sm"
          style={{
            padding: 10,
            position: 'relative',
            backdropFilter: 'blur(5px)',
            borderRadius: 100,
          }}
        >
          <LoadingOverlay visible loaderProps={{ type: 'dots', color: COLORS.teal }} />
        </Card>
      )}
      <Divider my="sm" />
      <Flex style={{ flexDirection: 'column', gap: 10 }}>
        <Dropzone
          onDrop={handleFileUpload}
          maxSize={30 * 1024 ** 2}
          style={{
            display: 'flex',
            flex: 1,
            marginTop: 16,
            justifyContent: 'center',
            background: 'linear-gradient(to right, #ff9a9e, #fad0c4)',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            borderRadius: 5,
          }}
        >
          <Button
            fullWidth
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              color: 'black',
              borderRadius: 5,
              backgroundColor: 'transparent',
              transition: 'background 0.3s ease',
            }}
          >
            <IconCloudUpload size={18} style={{ paddingRight: 5, color: 'black' }} />
            Upload Document & Start Chat
          </Button>
        </Dropzone>
        <Text style={{ fontSize: 12, fontWeight: 300, opacity: 0.7 }}>
          To start a new chat with realtimedoc, simply upload a new PDF document.
        </Text>
      </Flex>
    </div>
  );
};
