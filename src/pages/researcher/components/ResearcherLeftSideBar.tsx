import { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import {
  IconCloudUpload,
  IconEyeQuestion,
  IconHistory,
  IconQuestionMark,
} from '@tabler/icons-react';
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
  setCurrentConversation,
  uploadFileAndCreateConversation,
} from '@/store/conversations/conversationsSlice';
import { AppDispatch, RootState } from '@/store/store';
import { ChatHistoryListItem } from './ChatHistoryListItem';
import { UploadDocumentButtonContent } from './UploadDocumentButtonContent';
import { setToken } from '@/store/user/userSlice';
import { useAuth } from '@clerk/clerk-react';

export const ResearcherLeftSideBar = () => {
  const [fileSetStream, setFileSetStream] = useState<File[][]>([]);
  const conversationsSelector = useSelector((state: RootState) => state.conversations);
  const user = useUser();
  const { getToken } = useAuth();
  const userName = user.user?.fullName ?? 'Alex Ferguson';
  const dispatch = useDispatch<AppDispatch>();
  const handleFileUpload = async (files: File[]) => {
    const token = await getToken();
    dispatch(setToken({ token: token ?? '' }));
    if (!!user.user?.id && !!token) {
      setFileSetStream((prevSets) => [...prevSets, files]);
      const formData = new FormData();
      formData.append('file', files[0]);
      dispatch(uploadFileAndCreateConversation({ authToken: token, formData, userId: user.user.id }));
    } else {
      console.log('No token or user id found');
    }
  };
  const isLoadingNewConversation = useSelector(
    (state: RootState) => state.conversations.isLoadingNewConversation
  );
  // Access the user state from the Redux store
  const allConversations = conversationsSelector.conversations;
  const { colorScheme } = useMantineColorScheme();

  return (
    <div style={{ width: '20%', display: 'flex', flexDirection: 'column' }}>
      <Group>
        <Avatar radius="xl" />
        <div>
          <Text size="md">{userName}</Text>
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
      {((!!!allConversations || Object.values(allConversations).length === 0) && !isLoadingNewConversation) && (
        <Card
          withBorder
          shadow="xs"
          p="lg"
          mt="sm"
          style={{
            opacity: 0.4,
            display: 'flex',
            alignItems: 'center',
            padding: 10,
            position: 'relative',
            backdropFilter: 'blur(5px)',
            borderRadius: 10,
          }}
        >
          <Flex direction="row" gap="10">
            <IconEyeQuestion size={14} />
            <Text size="xs" style={{ fontWeight: 300 }}>
              No chat history found
            </Text>
          </Flex>
        </Card>
      )}
      {isLoadingNewConversation && (
        <Card
          withBorder
          mt="sm"
          shadow="xs"
          p="lg"
          style={{
            padding: 10,
            position: 'relative',
            backdropFilter: 'blur(5px)',
            borderRadius: 10,
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
            borderRadius: 10,
          }}
        >
          {/* The UploadDocumentButtonContent hasChatMessages field is for conditionally rendering "shimmer" effect, but isn't being used at the moment */}
          <UploadDocumentButtonContent hasChatMessages={true} />
        </Dropzone>
        <Text style={{ fontSize: 12, fontWeight: 300, opacity: 0.7 }}>
          To start a new chat with realtimedoc, simply upload a new PDF document.
        </Text>
      </Flex>
    </div>
  );
};
