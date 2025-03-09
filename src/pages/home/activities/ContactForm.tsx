import { useState } from 'react';
import { IconCheck } from '@tabler/icons-react';
import { Button, Stack, Flex, Text, Textarea, TextInput } from '@mantine/core';
import { COLORS } from '@/common/colors';
import Confetti from 'js-confetti';
import supabase from '../../../utils/supabase';

export const ContactForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [formState, setFormState] = useState<'idle' | 'success' | 'fail'>('idle');

  const handleSubmit = () => {
    sendFormMessage({ name, email, subject, message });
  };

  const sendFormMessage = async ({
    name,
    email,
    subject,
    message,
  }: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) => {
    const { data, error } = await supabase
      .from('messages')
      .insert([{ name, email, subject, message }]);

    if (error) {
      console.error('Error inserting row:', error);
      setFormState('fail');
    } else {
      console.log('Inserted row:', data);
      const confetti = new Confetti();
      setFormState('success');
      confetti.addConfetti()
    }
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
      {formState === 'idle' && (
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
      )}
      {formState === 'success' && (
        <div
          style={{
            paddingTop: 45,
            width: '300px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 25,
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              width: 'fit-content',
              padding: 45,
              borderRadius: 100,
              backgroundColor: '#2e8f18',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <IconCheck size={100} color='white' />
          </div>
          <Stack align='center' gap={10}>
          <Text
            style={{
              fontSize: 32,
              fontWeight: 800,
              textAlign: 'center',
            }}
          >
            Message sent!
          </Text>
          <Text             style={{
              fontSize: 24,
              fontWeight: 600,
              textAlign: 'center',
            }}>
          Thanks.
          </Text>
            </Stack>
        </div>
      )}
    </div>
  );
};
