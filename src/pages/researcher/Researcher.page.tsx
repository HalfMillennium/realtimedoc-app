import * as React from 'react';
import { useState } from 'react';
import { IconSend } from '@tabler/icons-react';
import { useSelector } from 'react-redux';
import { Button, Flex, Textarea, useMantineColorScheme } from '@mantine/core';
import { Message } from '@/store/conversations/conversationsSlice';
import { RootState } from '@/store/store';
import ResearcherPageHeader from './components/PageHeader';
import { ResearcherLeftSideBar } from './components/ResearcherLeftSideBar';
import { ResearcherRightSidebar } from './components/ResearcherRightSidebar';
import { CurrentChatMessages } from './CurrentChatMessages';

export interface DataSetOption {
  id: string;
  title: string;
  subtitle: string;
}

export interface SupportedDataSet {
  label: string;
  id: string;
  options?: DataSetOption[];
}

const availableDataSets: SupportedDataSet[] = [
  { label: 'Housing Market Data', id: 'housing' },
  { label: 'Labor Market Data', id: 'labor' },
  {
    label: 'Economic Spending Data',
    id: 'government',
    options: [
      {
        id: 'usaConsumerSpending',
        title: 'US Consumers',
        subtitle: 'Latest available macro-economic data for US-based consumers.',
      },
      {
        id: 'usaGovernmentSpending',
        title: 'US Government',
        subtitle: 'Latest available macro-economic data for the US government.',
      },
    ],
  },
  { label: 'Public Financial Data', id: 'financial' },
];

export const Researcher: React.FC = () => {
  const { colorScheme } = useMantineColorScheme();
  const [selectedDataSet, setSelectedDataSet] = useState<SupportedDataSet | undefined>(undefined);
  const currentChatMessages = useSelector(
    (state: RootState) => state.conversations.currentConversation.messages
  );
  const [newMessage, setNewMessage] = useState('');
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    setIsLoadingNewMessage(true);
    const newChatMessage = {
      id: crypto.randomUUID(),
      author: 'Alex Ferguson',
      timestamp: new Date().toLocaleTimeString(),
      content: newMessage,
    };

    //setChatMessages((prevMessages) => [...prevMessages, newChatMessage]);
    setNewMessage('');

    // Simulate a response from the chat bot
    setTimeout(() => {
      const botResponse = {
        id: crypto.randomUUID(),
        author: 'RealTimDoc AI',
        timestamp: new Date().toLocaleTimeString(),
        content: 'This is a simulated response from the chat bot.',
        tag: 'Bot Response',
      };
      setIsLoadingNewMessage(false);
      //setChatMessages((prevMessages) => [...prevMessages, botResponse]);
    }, 1000);
  };

  const [isLoadingNewMessage, setIsLoadingNewMessage] = useState(false);

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
            <Flex style={{ flex: 1, width: '100%', overflowY: 'scroll', scrollbarWidth: 'none' }}>
              <CurrentChatMessages
                messages={currentChatMessages}
                isLoadingNewMessage={isLoadingNewMessage}
              />
            </Flex>
            <div style={{ position: 'relative', marginTop: '16px' }}>
              <Textarea
                placeholder="How can I help you?"
                radius="sm"
                size="md"
                value={newMessage}
                onChange={(e) => {
                  setNewMessage(e.currentTarget.value);
                  console.log('cT.value: ', e.currentTarget.value);
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

          <ResearcherRightSidebar
            selectedDataSet={selectedDataSet}
            setSelectedDataSet={setSelectedDataSet}
            availableDataSets={availableDataSets}
          />
        </div>
      </div>
    </div>
  );
};
