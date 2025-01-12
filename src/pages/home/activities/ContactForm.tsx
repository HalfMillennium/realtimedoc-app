import { useState } from 'react';
import { Button, Flex, Text, Textarea, TextInput } from '@mantine/core';
import { COLORS } from '@/common/colors';

export const ContactForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    console.log({ name, email, subject, message });
  };

  return (
    <div
      style={{
        display: 'flex',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 50,
      }}
    >
      <Flex direction="column" align="center" justify="center" style={{ width: '100%' }}>
        <Text
          style={{
            fontSize: 36,
            fontWeight: 400,
            textAlign: 'center',
          }}
        >
          Have any <span style={{ color: COLORS.peach, fontWeight: 400 }}>questions?</span>
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 400,
            textAlign: 'center',
          }}
        >
          Leave us a note by filling out the form below and we will get back to you.
        </Text>
      </Flex>
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
