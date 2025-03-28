import { useEffect, useState } from 'react';
import { Textarea, ActionIcon } from '@mantine/core';
import { IconArrowUp } from '@tabler/icons-react';

// MessageInput component without extra memoization
interface MessageInputProps {
  onSend: (message: string) => void;
  colorScheme: string;
  disabled?: boolean;
  shouldRetry?: boolean;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  onSend,
  colorScheme,
  disabled,
  shouldRetry,
}) => {
  const [newMessage, setNewMessage] = useState('');
  const [lastMessage, setLastMessage] = useState('');

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.currentTarget.value);
  };
  useEffect(() => {
    if (shouldRetry === true) {
      onSend(lastMessage);
    }
  }, [shouldRetry]);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && newMessage.trim() !== '') {
      e.preventDefault();
      onSend(newMessage);
      setNewMessage('');
      setLastMessage(newMessage);
    }
  };

  const handleSendClick = () => {
    if (newMessage.trim() !== '') {
      onSend(newMessage);
      setNewMessage('');
    }
  };

  return (
    <div style={{ position: 'relative', marginTop: 16 }}>
      <Textarea
        placeholder="How can I help you?"
        radius={12}
        size="md"
        value={newMessage}
        onKeyDown={handleKeyDown}
        onChange={handleTextAreaChange}
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
          onClick={handleSendClick}
          disabled={disabled}
        >
          <IconArrowUp size={18} color={colorScheme === 'dark' ? '#f1f1f1' : '#212121'} />
        </ActionIcon>
      </div>
    </div>
  );
};
