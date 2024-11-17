import { useState } from 'react';
import {
  Button,
  MantineColorScheme,
  SegmentedControl,
  Textarea,
  TextInput,
  useMantineColorScheme,
} from '@mantine/core';
import { allSegmentMenuOptions, SegmentMenuOptions } from '../menus/segment_menu';

interface ContactFormProps {
  segmentMenuOption: SegmentMenuOptions;
  setSegmentMenuOption: (option: SegmentMenuOptions) => void;
}
export const ContactForm: React.FC<ContactFormProps> = ({
  segmentMenuOption,
  setSegmentMenuOption,
}) => {
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
          placeholder="Enter your name"
          value={name}
          onChange={(event) => setName(event.currentTarget.value)}
          style={{ width: '100%' }}
        />
        <TextInput
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
          style={{ width: '100%' }}
        />
        <TextInput
          label="Subject"
          placeholder="Enter subject"
          value={subject}
          onChange={(event) => setSubject(event.currentTarget.value)}
          style={{ width: '100%' }}
        />
        <Textarea
          label="Message"
          placeholder="Enter your message"
          value={message}
          onChange={(event) => setMessage(event.currentTarget.value)}
          style={{ width: '100%' }}
        />
        <Button onClick={handleSubmit} style={{ marginTop: '1rem' }}>
          Submit
        </Button>
      </div>
    </div>
  );
};
