import * as React from 'react';
import { useState } from 'react';
import { IconCloudUpload, IconHistory, IconPin, IconSend } from '@tabler/icons-react';
import {
  Avatar,
  Badge,
  Button,
  Card,
  Divider,
  Group,
  Text,
  Textarea,
  useMantineColorScheme,
} from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import { Header } from '@/components/Header/Header';
import { CurrentChatMessages } from './CurrentChatMessages';

interface HistoryResult {
  id: string;
  title: string;
}

export const Researcher: React.FC = () => {
  const { colorScheme } = useMantineColorScheme();
  const [historyResults, setHistoryResults] = useState<HistoryResult[]>([
    { id: '1', title: 'How can I improve my time management?' },
    { id: '2', title: 'How do I start investing in stocks?' },
    { id: '3', title: 'How can I reduce stress at work?' },
  ]);
  const [fileSetStream, setFileSetStream] = useState<File[][]>([]);
  const [pinnedHistoryResults, setPinnedHistoryResults] = useState<HistoryResult[]>([
    { id: '3', title: 'How can I reduce stress at work?' },
  ]);
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'Alex Ferguson',
      time: '2:45 PM',
      content: 'Hey, can you explain how the model determines token usage and tracks interactions?',
      tokens: null,
    },
    {
      sender: 'Ciphy.io',
      time: '2:46 PM',
      content:
        'Sure! Our model counts tokens in both input and output, including spaces and special characters...',
      tokens: 32,
    },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleFileUpload = (files: File[]) => {
    setFileSetStream((prevSets) => [...prevSets, files]);
    alert(`Uploaded file: ${files[0].name}`);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

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
        sender: 'Ciphy.io',
        time: new Date().toLocaleTimeString(),
        content: 'This is a simulated response from the chat bot.',
        tokens: Math.floor(Math.random() * 100),
      };
      setChatMessages((prevMessages) => [...prevMessages, botResponse]);
    }, 1000);
  };

  return (
    <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
      <Header />
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
          <div style={{ width: '20%' }}>
            <Group>
              <Avatar radius="xl" />
              <div>
                <Text size="md">Alex Ferguson</Text>
                <Text size="xs">Chat User</Text>
              </div>
            </Group>
            <Divider my="sm" />
            <div style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
              <IconPin size={16} />
              <Text size="xs" style={{ fontWeight: 700 }}>
                Pinned
              </Text>
            </div>
            {pinnedHistoryResults.map((entry) => (
              <div key={entry.id} style={{ padding: 10 }}>
                <Text size="sm" mt="sm">
                  {entry.title}
                </Text>
              </div>
            ))}
            <Divider my="sm" />
            <div style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
              <IconHistory size={16} />
              <Text size="xs" style={{ fontWeight: 700 }}>
                Chat History
              </Text>
            </div>
            {historyResults.map((entry) => (
              <div key={entry.id} style={{ padding: 10 }}>
                <Text size="sm" mt="sm">
                  {entry.title}
                </Text>
              </div>
            ))}
            <Divider my="sm" />

            <Dropzone onDrop={handleFileUpload} maxSize={30 * 1024 ** 2}>
              <Button
                fullWidth
                style={{
                  display: 'flex',
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 16,
                  background: 'linear-gradient(to right, #ff9a9e, #fad0c4)',
                  color: 'black',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  transition: 'background 0.3s ease',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = 'linear-gradient(to right, #fad0c4, #ff9a9e)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = 'linear-gradient(to right, #ff9a9e, #fad0c4)')
                }
              >
                <IconCloudUpload size={18} style={{ marginRight: 5, color: 'black' }} />
                Upload Document & Start Chat
              </Button>
            </Dropzone>
          </div>

          {/* Chat Area */}
          <div style={{ flex: 1, padding: '8px' }}>
            <CurrentChatMessages messages={chatMessages} />
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
              <IconSend
                size={42}
                style={{
                  position: 'absolute',
                  right: 20,
                  top: '50%',
                  padding: 10,
                  backgroundColor: colorScheme === 'light' ? '#f1f1f1' : '#212121',
                  borderRadius: 100,
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                }}
                onClick={handleSendMessage}
              />
            </div>
          </div>

          {/* Right Sidebar */}
          <div style={{ width: '20%', padding: '8px' }}>
            <Card withBorder shadow="sm">
              <Text size="sm">GPT-4 Model</Text>
              <Text size="xs" mt="sm">
                The latest GPT-4 model with improved instruction following...
              </Text>
              <Divider my="sm" />
              <Text size="sm">Token Usage</Text>
              <Text size="xs" mt="sm">
                Tokens are the basic units of text that language models process...
              </Text>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
