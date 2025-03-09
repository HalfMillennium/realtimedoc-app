import * as React from 'react';
import { useEffect, useState } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import { createSelector } from '@reduxjs/toolkit';
import { IconMoodWrrrFilled } from '@tabler/icons-react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Flex,
  LoadingOverlay,
  Modal,
  Text,
  useMantineColorScheme,
} from '@mantine/core';
import {
  getNewChatResponse,
  loadUserConversations,
  setCurrentConversation,
  updateConversation,
} from '@/store/conversations/conversationsSlice';
import { deselectAllDataSets } from '../../store/dataSets/dataSetsSlice';
import { AppDispatch, RootState } from '@/store/store';
import { setToken } from '@/store/user/userSlice';
import { ResearcherPageHeader } from './components/PageHeader';
import { PlaceholderChatUI } from './components/PlaceholderChatUI';
import { ResearcherLeftSideBar } from './components/ResearcherLeftSideBar';
import { ResearcherRightSideBar } from './components/ResearcherRightSidebar';
import { CurrentChatMessages } from './CurrentChatMessages';
import { MessageInput } from './MessageInput';

const selectConversations = (state: RootState) => state.conversations;
const selectDataSets = (state: RootState) => state.dataSets;
const selectUser = (state: RootState) => state.user;

const selectCurrentConversation = createSelector(
  [selectConversations],
  (conversations) => conversations.currentConversation
);

const selectIsLoadingMessage = createSelector(
  [selectConversations],
  (conversations) => conversations.isLoadingNewMessage
);

const selectHasFailedToLoadNewMessage = createSelector(
  [selectConversations],
  (conversations) => conversations.hasFailedToLoadNewMessage
);

const selectDailyLimitExceeded = createSelector(
  [selectConversations],
  (conversations) => conversations.isDailyLimitExceeded
);

// ErrorModal component without extra memoization
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
        <Text style={{ fontSize: 24, fontWeight: 400, textAlign: 'center' }}>
          {errorTitle}
        </Text>
        <Text style={{ fontSize: 14, fontWeight: 400, textAlign: 'center' }}>
          {errorDescription}
        </Text>
        <Button variant="light" onClick={handleCloseErrorModal} color="gray" mt="md">
          Close
        </Button>
      </Flex>
    </Modal>
  );
};

// Main Researcher component
export const Researcher: React.FC = () => {
  const currentConversation = useSelector(selectCurrentConversation, shallowEqual);
  const isLoadingNewMessage = useSelector(selectIsLoadingMessage);
  const hasExceededDailyLimit = useSelector(selectDailyLimitExceeded);
  const hasFailedToLoadNewMessage = useSelector(selectHasFailedToLoadNewMessage);
  const selectedDataSetId = useSelector((state: RootState) => selectDataSets(state).selectedDataSetId);
  const authToken = useSelector((state: RootState) => selectUser(state).token);
  const [shouldRetryMessage, setShouldRetryMessage] = useState(false);
  const { colorScheme } = useMantineColorScheme();
  const { getToken } = useAuth();
  const user = useUser();
  const userName = user.user?.fullName ?? 'Arbitrary Robert';
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const handleNewMessageRetry = () => {
    setShouldRetryMessage(true);
  }
  const [errorModalOpen, setErrorModalOpen] = useState(hasExceededDailyLimit);

  useEffect(() => {
    setErrorModalOpen(hasExceededDailyLimit);
  }, [hasExceededDailyLimit]);

  useEffect(() => {
    dispatch(deselectAllDataSets());
    const userId = user.user?.id;
    if (userId) {
      console.log('Fetching quota details for user');
    } else {
      console.error('User ID not found.');
    }
  }, [dispatch, user.user?.id]);

  useEffect(() => {
    getToken()
      .then((token) => {
        if (token) {
          dispatch(setToken({ token }));
          dispatch(loadUserConversations({ authToken: token, userId: user.user?.id ?? '' }));
        } else {
          console.error('Token fetched, but undefined.');
        }
      })
      .catch((error) => console.error('Failed to get token:', error));
  }, [dispatch, getToken, user.user?.id]);

  const handleSendMessage = async (message: string) => {
    if (!authToken) {
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
          userName: 'You',
          timestamp: new Date().toLocaleTimeString(),
          content: message,
        };

        dispatch(
          updateConversation({
            message: newChatMessage,
            conversationId: currentConversation?.id ?? '',
          })
        );

        dispatch(
          setCurrentConversation({
            conversationId: currentConversation?.id ?? '',
          })
        );

        dispatch(
          getNewChatResponse({
            authToken,
            conversationId: currentConversation?.id ?? '',
            message,
            selectedDataSetId,
          })
        );
      }
    } catch (error) {
      console.error(`Could not update conversation: ${error}`);
      setErrorModalOpen(true);
    }
  };

  const hasActiveConversation =
    !!currentConversation?.messages && currentConversation.messages.length > 0;

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
        {false && <ResearcherPageHeader />}
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden', flexDirection: 'row', gap: 20 }}>
          <React.Suspense fallback={<LoadingOverlay zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />}>
            <ResearcherLeftSideBar containerWidth={20} />
          </React.Suspense>
          <Flex direction="column" w={'100%'} style={{ padding: '8px' }}>
            {!hasActiveConversation && <PlaceholderChatUI />}
            {hasActiveConversation && (
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
                  <CurrentChatMessages
                    isLoadingNewMessage={isLoadingNewMessage}
                    newMessageRetry={handleNewMessageRetry}
                    hasFailedToLoadNewMessage={hasFailedToLoadNewMessage}
                  />
                </Flex>
                <MessageInput
                  onSend={handleSendMessage}
                  shouldRetry={shouldRetryMessage}
                  colorScheme={colorScheme}
                  disabled={isLoadingNewMessage || hasExceededDailyLimit}
                />
              </>
            )}
          </Flex>
          <ResearcherRightSideBar />
        </div>
      </div>
    </div>
  );
};

export default Researcher;
