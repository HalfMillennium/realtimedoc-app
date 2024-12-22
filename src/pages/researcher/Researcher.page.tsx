import * as React from 'react';
import { useState } from 'react';
import { IconSend } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Flex, Textarea, useMantineColorScheme } from '@mantine/core';
import {
  getNewChatResponse,
  setCurrentConversation,
  updateConversation,
} from '@/store/conversations/conversationsSlice';
import { AppDispatch, RootState } from '@/store/store';
import ResearcherPageHeader from './components/PageHeader';
import { ResearcherLeftSideBar } from './components/ResearcherLeftSideBar';
import { ResearcherRightSidebar } from './components/ResearcherRightSidebar';
import { CurrentChatMessages } from './CurrentChatMessages';

export const Researcher: React.FC = () => {
  const { colorScheme } = useMantineColorScheme();
  const availableDataSets = useSelector((state: RootState) => state.datasets.availableDataSets);
  const selectedDataSetId = useSelector((state: RootState) => state.datasets.selectedDataSetId);
  const currentConversation = useSelector(
    (state: RootState) => state.conversations.currentConversation
  );
  const isLoadingNewMessage = useSelector(
    (state: RootState) => state.conversations.isLoadingNewMessage
  );
  const currentUser = useSelector((state: RootState) => state.user);
  const [newMessage, setNewMessage] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    const newChatMessage = {
      id: crypto.randomUUID(),
      author: currentUser.name,
      timestamp: new Date().toLocaleTimeString(),
      content: newMessage,
    };
    dispatch(
      updateConversation({ message: newChatMessage, conversationId: currentConversation.id })
    );
    dispatch(setCurrentConversation({ conversationId: currentConversation.id }));
    dispatch(
      getNewChatResponse({
        conversationId: currentConversation.id,
        message: newMessage,
        selectedDatasetName: 'financial',
      })
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && newMessage.trim() !== '') {
      setNewMessage('');
      handleSendMessage();
    }
  };

  return (
    <div style={{ display: 'flex', flex: 1, flexDirection: 'column', gap: 30 }}>
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
            <div style={{ position: 'relative', marginTop: '16px' }}>
              <Textarea
                placeholder="How can I help you?"
                radius="sm"
                size="md"
                value={newMessage}
                onKeyDown={handleKeyDown}
                onChange={(e) => {
                  setNewMessage(e.currentTarget.value);
                }}
                style={{ width: '100%', borderColor: colorScheme === 'light' ? 'black' : 'white' }}
              />
              <Button
                style={{
                  position: 'absolute',
                  right: 20,
                  top: '50%',
                  backgroundColor: colorScheme === 'light' ? '#f1f1f1' : '#212121',
                  transform: 'translateY(-50%)',
                  borderRadius: '100%',
                  width: 45,
                  height: 45,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onClick={handleSendMessage}
              >
                <IconSend size={18} color={colorScheme === 'dark' ? '#f1f1f1' : '#212121'} />
              </Button>
            </div>
          </div>

          <ResearcherRightSidebar selectedDataSetId={selectedDataSetId} />
        </div>
      </div>
    </div>
  );
};
