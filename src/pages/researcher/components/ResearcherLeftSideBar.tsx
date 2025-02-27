import * as React from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import { IconCloudUpload, IconEyeQuestion, IconHistory } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Card, Divider, Flex, Group, LoadingOverlay, Text } from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import { COLORS } from '@/common/colors';
import {
  setCurrentConversation,
  uploadFileAndCreateConversation,
} from '@/store/conversations/conversationsSlice';
import { AppDispatch, RootState } from '@/store/store';
import { setToken } from '@/store/user/userSlice';
import { ChatHistoryListItem } from './ChatHistoryListItem';
import { QuotaStatus } from './QuotaStatus';
import { getSubscriptionTypeId } from '@/store/subscriptions/subscriptionsSlice';

export const ResearcherLeftSideBar: React.FC<{ containerWidth: number }> = (containerWidth) => {
  const conversationsSelector = useSelector((state: RootState) => state.conversations);
  const user = useUser();
  const { getToken } = useAuth();
  const userName = user.user?.fullName ?? 'Arbitrary Robert';
  const userSubscriptions = useSelector((state: RootState) => state.subscriptions.subscriptions);
  const dispatch = useDispatch<AppDispatch>();
  const handleFileUpload = async (files: File[]) => {
    try {
      const token = await getToken();
      if (!token) throw new Error('No token found');
      dispatch(setToken({ token }));
      if (user.user?.id) {
        const formData = new FormData();
        formData.append('file', files[0]);
        const productTypeId = !!userSubscriptions?.[0] ? getSubscriptionTypeId(userSubscriptions[0]) : '';
        formData.append('productTypeId', productTypeId);
        dispatch(
          uploadFileAndCreateConversation({ authToken: token, formData, userId: user.user.id })
        );
      } else {
        console.error('No user id found');
      }
    } catch (error) {
      console.error(`Could not upload file: ${error}`);
    }
  };
  const isLoadingNewConversation = useSelector(
    (state: RootState) => state.conversations.isLoadingNewConversation
  );
  // Access the user state from the Redux store
  const allConversations = conversationsSelector.conversations;

  return (
    <Flex direction="column" w={`30%`}>
      <Flex direction="row" align="center" justify="space-between" style={{ width: 'full' }}>
        <Group>
          <Avatar radius="xl" />
          <div>
            <Text size="md">{userName}</Text>
            <Text size="xs">Chat User</Text>
          </div>
        </Group>
        {!!user.user?.id && <QuotaStatus userId={user.user?.id}/>}
      </Flex>
      <Divider my="sm" />
      <div style={{ display: 'flex', flexDirection: 'row', gap: 5, opacity: 0.5 }}>
        <IconHistory size={16} />
        <Text size="xs" style={{ fontWeight: 400 }}>
          Chat History
        </Text>
      </div>
      {!!conversationsSelector.currentConversation?.id &&
        Object.values(allConversations).map((conversation) => (
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
      {!conversationsSelector.currentConversation?.id && !isLoadingNewConversation && (
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
            <Text size="xs" style={{ fontWeight: 400 }}>
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
      <Flex style={{ flexDirection: 'column', gap: 10 }}>
        <Dropzone
          onDrop={handleFileUpload}
          maxSize={30 * 1024 ** 2}
          accept={['application/pdf']}
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
          <Button
            fullWidth
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              color: 'black',
              borderRadius: 10,
              backgroundColor: 'transparent',
              transition: 'background 0.3s ease',
            }}
          >
            <IconCloudUpload size={18} style={{ paddingRight: 5, color: 'black' }} />
            Upload Document & Start Chat
          </Button>
        </Dropzone>
        <Text style={{ fontSize: 12, fontWeight: 400, opacity: 0.7 }}>
          To start a new chat with realtimedoc, simply upload a new PDF document.
        </Text>
      </Flex>
    </Flex>
  );
};
