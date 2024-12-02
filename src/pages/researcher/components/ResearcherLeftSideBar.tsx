import { useState } from 'react';
import { IconBooks, IconCloudUpload, IconHistory, IconPin, IconSend } from '@tabler/icons-react';
import { Avatar, Button, Card, Divider, Flex, Group, Text } from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import { ChatHistoryListItem } from './ChatHistoryListItem';

export interface HistoryResult {
  id: string;
  title: string;
}

export const ResearcherLeftSideBar = () => {
  const [fileSetStream, setFileSetStream] = useState<File[][]>([]);
  const handleFileUpload = (files: File[]) => {
    setFileSetStream((prevSets) => [...prevSets, files]);
    alert(`Uploaded file: ${files[0].name}`);
    const formData = new FormData();
    formData.append('file', files[0]);

    fetch('http://localhost:8000/create-convo/1234', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error('Error:', error));
  };

  const [historyResults, setHistoryResults] = useState<HistoryResult[]>([
    { id: '1', title: 'How can I improve my time management?' },
    { id: '2', title: 'How do I start investing in stocks?' },
    { id: '3', title: 'How can I reduce stress at work?' },
  ]);

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
      {historyResults.map((entry) => (
        <div
          key={entry.id}
          style={{
            transition: 'background-color 0.3s ease',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ChatHistoryListItem title={entry.title} entryId={entry.id} />
        </div>
      ))}
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
            borderRadius: '8px',
          }}
        >
          <Button
            fullWidth
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              color: 'black',
              borderRadius: '8px',
              backgroundColor: 'transparent',
              transition: 'background 0.3s ease',
            }}
          >
            <IconCloudUpload size={18} style={{ paddingRight: 5, color: 'black' }} />
            Upload Document & Start Chat
          </Button>
        </Dropzone>
        <Text style={{ fontSize: 12, fontWeight: 300, opacity: 0.7 }}>
          To start a new chat with Prisma AI, simply upload a new PDF document.
        </Text>
      </Flex>
    </div>
  );
};
