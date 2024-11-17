import React, { useEffect, useState } from 'react';
import { IconUpload } from '@tabler/icons-react';
import {
  Button,
  Card,
  Container,
  Group,
  Input,
  MantineProvider,
  Text,
  Textarea,
  Title,
  useMantineColorScheme,
} from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { Header } from '@/components/Header/Header';

interface ConversationEntry {
  user: string;
  message: string;
}

export const Researcher: React.FC = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [conversation, setConversation] = useState<ConversationEntry[]>([]);
  const [currentMessage, setCurrentMessage] = useState<string>('');

  const handleFileUpload = (files: File[]) => {
    setUploadedFile(files[0]);
    alert(`Uploaded file: ${files[0].name}`);
  };

  useEffect(() => {
    if (currentMessage.trim() !== '') {
      setConversation((prev) => [...prev, { user: 'You', message: currentMessage }]);
      setCurrentMessage('');
      setConversation((prev) => [
        ...prev,
        { user: 'Document', message: `Response to: "${currentMessage}"` },
      ]);
      console.log('conversation, updated - useEffect', conversation);
    }
  }, [currentMessage]);

  const handleSendMessage = () => {
    if (currentMessage.trim() !== '') {
      setConversation((prev) => [...prev, { user: 'You', message: currentMessage }]);
      setCurrentMessage('');
      setConversation((prev) => [
        ...prev,
        { user: 'Document', message: `Response to: "${currentMessage}"` },
      ]);
      console.log('conversation, updated - handleSendMessage', conversation);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        width: '100%',
        gap: 50,
      }}
    >
      <Header />
      <Container
        style={{
          display: 'flex',
          width: '100%',
          height: '80vh',
          flexDirection: 'column',
          gap: 20,
        }}
      >
        <div style={{ display: 'flex', gap: 20, height: '100%' }}>
          {/* Left Column: Conversation History */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              border: '1px solid lightgray',
              borderRadius: 10,
              padding: '1rem',
              justifyContent: 'space-between',
              height: '100%',
            }}
          >
            <div
              style={{
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
                height: '95%',
                overflowY: 'scroll',
              }}
            >
              <Title order={4}>Conversation History</Title>
              {conversation.map((entry, index) => (
                <Card key={index} shadow="sm" style={{ marginBottom: '1rem' }}>
                  <Text>{entry.user}</Text>
                  <Text>{entry.message}</Text>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Column: Chat Interface */}
          <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Title order={4}>Chat</Title>
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                border: '1px solid lightgray',
                borderRadius: '5px',
                padding: '1rem',
              }}
            >
              {conversation.map((entry, index) => (
                <Card key={index} shadow="sm" style={{ marginBottom: '1rem' }}>
                  <Text>{entry.user}</Text>
                  <Text>{entry.message}</Text>
                </Card>
              ))}
            </div>
            <Textarea
              placeholder="Type a message..."
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                }
              }}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};
