import * as React from 'react';
import { useEffect, useState } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import { IconArrowUp, IconMoodWrrrFilled } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  ActionIcon,
  Button,
  Flex,
  Modal,
  Text,
  Textarea,
  useMantineColorScheme,
} from '@mantine/core';
import {
  getNewChatResponse,
  setCurrentConversation,
  updateConversation,
} from '@/store/conversations/conversationsSlice';
import { deselectAllDataSets } from '@/store/dataSets/dataSetsSlice';
import { AppDispatch, RootState } from '@/store/store';
import { setToken } from '@/store/user/userSlice';
import { ResearcherPageHeader } from './components/PageHeader';
import { PlaceholderChatUI } from './components/PlaceholderChatUI';
import { ResearcherLeftSideBar } from './components/ResearcherLeftSideBar';
import { ResearcherRightSidebar } from './components/ResearcherRightSidebar';
import { CurrentChatMessages } from './CurrentChatMessages';

export const Researcher: React.FC = () => {
  const { colorScheme } = useMantineColorScheme();
  const selectedDataSetId = useSelector((state: RootState) => state.dataSets.selectedDataSetId);
  const currentConversation = useSelector(
    (state: RootState) => state.conversations.currentConversation
  );
  const isLoadingNewMessage = useSelector(
    (state: RootState) => state.conversations.isLoadingNewMessage
  );
  const hasExceededDailyLimit = useSelector(
    (state: RootState) => state.conversations.isDailyLimitExceeded
  );
  const { getToken } = useAuth();
  const authToken = useSelector((state: RootState) => state.user.token);
  const [newMessage, setNewMessage] = useState<string>('');
  const user = useUser();
  const userName = user.user?.fullName ?? 'Arbitrary Robert';
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [errorModalOpen, setErrorModalOpen] = useState(hasExceededDailyLimit);

  useEffect(() => {
    dispatch(deselectAllDataSets());
  }, []);

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;
    if (!!!authToken) {
      navigate('/');
      return;
    }

    try {
      const token = await getToken();
      if (!token) throw new Error('No token found');
      dispatch(setToken({ token }));
      if (user.user?.id) {
        const newChatMessage = {
          id: crypto.randomUUID(),
          author: userName,
          timestamp: new Date().toLocaleTimeString(),
          content: newMessage,
        };
        console.log('Updating current conversation: ', currentConversation.id);
        dispatch(
          updateConversation({ message: newChatMessage, conversationId: currentConversation.id })
        );
        dispatch(setCurrentConversation({ conversationId: currentConversation.id }));
        dispatch(
          getNewChatResponse({
            authToken,
            conversationId: currentConversation.id,
            message: newMessage,
            selectedDataSetId,
          })
        );
        setNewMessage('');
      } else {
        console.error('No user id found');
      }
    } catch (error) {
      console.error(`Could not update conversation: ${error}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && newMessage.trim() !== '') {
      e.preventDefault();
      setNewMessage('');
      handleSendMessage();
    }
  };

  return (
    <div style={{ display: 'flex', flex: 1, flexDirection: 'column', gap: 30 }}>
      <ErrorModal
        errorTitle={
          hasExceededDailyLimit ? "Looks like you're over your limit." : "That didn't work."
        }
        errorDescription={
          hasExceededDailyLimit
            ? 'The basic plan limits you to only 10 conversations per day. Upgrade for unlimited access!'
            : 'Something went wrong. Please try again.'
        }
        errorModalOpen={errorModalOpen}
        setErrorModalOpen={setErrorModalOpen}
      />
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          flexDirection: 'column',
          flex: 1,
          padding: 30,
          paddingTop: 15,
          gap: 10,
        }}
      >
        <ResearcherPageHeader />
        <div
          style={{ display: 'flex', flex: 1, overflow: 'hidden', flexDirection: 'row', gap: 20 }}
        >
          {/* Left Sidebar */}
          <ResearcherLeftSideBar />

          {/* Chat Area */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              padding: '8px',
            }}
          >
            {(!currentConversation?.messages || currentConversation.messages.length === 0) && (
              <PlaceholderChatUI />
            )}
            {!!currentConversation?.messages && currentConversation.messages.length > 0 && (
              <>
                <Flex
                  style={{
                    flex: 1,
                    width: '100%',
                    overflowY: 'scroll',
                    scrollbarWidth: 'none',
                    scrollBehavior: 'smooth',
                  }}
                >
                  <CurrentChatMessages isLoadingNewMessage={isLoadingNewMessage} />
                </Flex>
                <div style={{ position: 'relative', marginTop: 16 }}>
                  <Textarea
                    placeholder="How can I help you?"
                    radius={12}
                    size="md"
                    value={newMessage}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => {
                      setNewMessage(e.currentTarget.value);
                    }}
                    style={{
                      width: '100%',
                      borderColor: colorScheme === 'light' ? 'black' : 'white',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      right: 20,
                      top: 0,
                      bottom: 0,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <ActionIcon
                      style={{
                        backgroundColor: colorScheme === 'light' ? '#f1f1f1' : '#212121',
                        borderRadius: '100%',
                        width: 45,
                        height: 45,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onClick={handleSendMessage}
                    >
                      <IconArrowUp
                        size={18}
                        color={colorScheme === 'dark' ? '#f1f1f1' : '#212121'}
                      />
                    </ActionIcon>
                  </div>
                </div>
              </>
            )}
          </div>
          <ResearcherRightSidebar />
        </div>
      </div>
    </div>
  );
};

interface ErrorModalProps {
  errorTitle: string;
  errorDescription: string;
  errorModalOpen: boolean;
  setErrorModalOpen: (open: boolean) => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({
  errorTitle,
  errorDescription,
  errorModalOpen,
  setErrorModalOpen,
}) => {
  const handleCloseErrorModal = () => {
    setErrorModalOpen(false);
  };
  return (
    <Modal
      opened={errorModalOpen}
      onClose={handleCloseErrorModal}
      size="md"
      centered
      withCloseButton={false}
      radius={20}
    >
      <Flex direction="column" gap={15} flex="1" style={{ alignItems: 'center' }}>
        <IconMoodWrrrFilled size={72} color="#f54266" />
        <Text style={{ fontSize: 24, fontWeight: 400, textAlign: 'center' }}>{errorTitle}</Text>
        <Text style={{ fontSize: 14, fontWeight: 200, textAlign: 'center' }}>
          {errorDescription}
        </Text>
        <Button variant="light" onClick={handleCloseErrorModal} color="gray" mt="md">
          Close
        </Button>
      </Flex>
    </Modal>
  );
};

export default Researcher;
