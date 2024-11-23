import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  NumberInput,
  PasswordInput,
  SegmentedControl,
  Select,
  Text,
  Textarea,
  TextInput,
  Title,
  useMantineColorScheme,
} from '@mantine/core';
import { Header } from '@/components/Header/Header';
import { ContactForm } from './activities/ContactForm';
import { CurrentActivity } from './activities/CurrentActivity';
import { HowItWorks } from './activities/HowItWorks';
import { SegmentMenuOptions } from './menus/segment_menu';

export function HomePage() {
  const { colorScheme } = useMantineColorScheme();
  const navigate = useNavigate();
  const handleTryItNowClick = () => {
    navigate('/researcher');
  };
  return (
    <div style={{ display: 'flex', flex: 1, flexDirection: 'column', height: '100%', gap: 100 }}>
      <Header />
      <div
        style={{
          display: 'flex',
          width: '100%',
          flexDirection: 'row',
          height: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            flex: 1,
            height: '50rem',
            alignItems: 'center',
            flexDirection: 'column',
            gap: 10,
          }}
        >
          <Title
            order={1}
            style={{
              fontSize: '3rem',
              fontWeight: 200,
              textAlign: 'center',
            }}
          >
            Welcome to
          </Title>
          <Text
            style={{
              fontSize: '7rem',
              fontWeight: 700,
              color: 'pink',
              textAlign: 'center',
            }}
            inherit
            variant="gradient"
            component="span"
            gradient={{ from: 'pink', to: 'yellow' }}
          >
            PRISMA
          </Text>
          <div style={{ display: 'flex', width: 500, textAlign: 'center' }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 400,
              }}
            >
              Upload PDFs. Ask anything. Find everything—powered by AI.
            </Text>
          </div>
          <div style={{ display: 'flex', marginTop: 20 }}>
            <Button
              variant="light"
              color={colorScheme === 'dark' ? 'orange' : 'pink'}
              onClick={handleTryItNowClick}
            >
              Try It Now
            </Button>
          </div>
        </div>
        <CurrentActivity />
      </div>
    </div>
  );
}
