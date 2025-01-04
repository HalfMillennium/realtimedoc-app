import { useState } from 'react';
import {
  Button,
  Textarea,
  TextInput,
  useMantineColorScheme,
} from '@mantine/core';

export const ContactForm: React.FC = () => {
  const { colorScheme } = useMantineColorScheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log({ name, email, subject, message });
  };

  return (
    <div
      style={{
        display: 'flex',
        flex: 1,
        position: 'relative',
        justifyContent: 'center',
        backgroundColor: colorScheme === 'dark' ? '#212121' : '#efefef',
        borderTopLeftRadius: '2rem',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <div style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <TextInput
          label="Name"
          radius={10}
          placeholder="Enter your name"
          value={name}
          onChange={(event) => setName(event.currentTarget.value)}
          style={{ width: '100%' }}
        />
        <TextInput
          label="Email"
          radius={10}
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
          style={{ width: '100%' }}
        />
        <TextInput
          label="Subject"
          radius={10}
          placeholder="Enter subject"
          value={subject}
          onChange={(event) => setSubject(event.currentTarget.value)}
          style={{ width: '100%' }}
        />
        <Textarea
          label="Message"
          radius={10}
          placeholder="Enter your message"
          value={message}
          onChange={(event) => setMessage(event.currentTarget.value)}
          style={{ width: '100%' }}
        />
        <Button radius={10} onClick={handleSubmit} style={{ marginTop: '1rem' }}>
          Submit
        </Button>
      </div>
    </div>
  );
};
