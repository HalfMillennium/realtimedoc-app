import * as React from 'react';
import { useState } from 'react';
import { IconSend } from '@tabler/icons-react';
import { Button, Textarea, useMantineColorScheme } from '@mantine/core';
import { ResearcherLeftSideBar } from './components/ResearcherLeftSideBar';
import { ResearcherRightSidebar } from './components/ResearcherRightSidebar';
import { CurrentChatMessages } from './CurrentChatMessages';

export interface SupportedDataSet {
  label: string;
  id: string;
}

const availableDataSets: SupportedDataSet[] = [
  { label: 'Housing Market Data', id: 'housing' },
  { label: 'Labor Market Data', id: 'labor' },
  { label: 'Public Government Data', id: 'government' },
  { label: 'Public Financial Data', id: 'financial' },
];

export const Researcher: React.FC = () => {
  const { colorScheme } = useMantineColorScheme();
  const [loadingDataSet, setLoadingDataSet] = useState(true);
  const [selectedDataSet, setSelectedDataSet] = useState<SupportedDataSet | undefined>(undefined);
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'Alex Ferguson',
      time: '2:45 PM',
      content: 'Hey, can you explain how the model determines token usage and tracks interactions?',
      tokens: null,
    },
    {
      sender: 'Prisma',
      time: '2:46 PM',
      content:
        'Sure! Our model counts tokens in both input and output, including spaces and special characters...',
      tokens: 32,
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    setIsLoadingNewMessage(true);
    const newChatMessage = {
      sender: 'Alex Ferguson',
      time: new Date().toLocaleTimeString(),
      content: newMessage,
      tokens: null,
    };

    setChatMessages((prevMessages) => [...prevMessages, newChatMessage]);
    setNewMessage('');

    // Simulate a response from the chat bot
    setTimeout(() => {
      const botResponse = {
        sender: 'Prisma',
        time: new Date().toLocaleTimeString(),
        content: 'This is a simulated response from the chat bot.',
        tokens: Math.floor(Math.random() * 100),
      };
      setIsLoadingNewMessage(false);
      setChatMessages((prevMessages) => [...prevMessages, botResponse]);
    }, 1000);
  };

  const [isLoadingNewMessage, setIsLoadingNewMessage] = useState(false);

  return (
    <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '97vh',
          flexDirection: 'column',
          padding: 30,
          gap: 10,
        }}
      >
        {/* Main Content */}
        <div
          style={{ display: 'flex', flex: 1, overflow: 'hidden', flexDirection: 'row', gap: 20 }}
        >
          {/* Left Sidebar */}
          <ResearcherLeftSideBar />

          {/* Chat Area */}
          <div style={{ flex: 1, padding: '8px' }}>
            <CurrentChatMessages
              messages={chatMessages}
              isLoadingNewMessage={isLoadingNewMessage}
            />
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
            loadingDataSet={loadingDataSet}
            setLoadingDataSet={setLoadingDataSet}
            availableDataSets={availableDataSets}
          />
        </div>
      </div>
    </div>
  );
};
