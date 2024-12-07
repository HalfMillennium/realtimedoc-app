import { useState } from 'react';
import { IconBooks, IconCloudUpload, IconHistory, IconPin, IconSend } from '@tabler/icons-react';
import { Avatar, Button, Card, Divider, Flex, Group, Text } from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import { Conversation, Message } from '@/store/conversations/conversationsSlice';
import { ChatHistoryListItem } from './ChatHistoryListItem';
import { EXAMPLE_CONVERSATIONS } from './utils';

export const ResearcherLeftSideBar = () => {
  const [fileSetStream, setFileSetStream] = useState<File[][]>([]);
  const dispatch = useDispatch();
  const handleFileUpload = (files: File[]) => {
    setFileSetStream((prevSets) => [...prevSets, files]);
    alert(`Uploaded file: ${files[0].name}`);
    const formData = new FormData();
    formData.append('file', files[0]);
  };

  const [conversationHistory, setConversationHistory] = useState<Conversation[]>(EXAMPLE_CONVERSATIONS);

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
      {conversationHistory.map((conversation) => (
        <div
          key={conversation.id}
          style={{
            transition: 'background-color 0.3s ease',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => (dispatchEvent())}
        >
          <ChatHistoryListItem title={conversation.title} conversationId={conversation.id} />
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
            borderRadius: 5,
          }}
        >
          <Button
            fullWidth
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              color: 'black',
              borderRadius: 5,
              backgroundColor: 'transparent',
              transition: 'background 0.3s ease',
            }}
          >
            <IconCloudUpload size={18} style={{ paddingRight: 5, color: 'black' }} />
            Upload Document & Start Chat
          </Button>
        </Dropzone>
        <Text style={{ fontSize: 12, fontWeight: 300, opacity: 0.7 }}>
          To start a new chat with realtimedoc, simply upload a new PDF document.
        </Text>
      </Flex>
    </div>
  );
};
