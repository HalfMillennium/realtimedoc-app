import React from 'react';
import {
  Anchor,
  Box,
  Button,
  Divider,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
  useMantineColorScheme,
} from '@mantine/core';
import { Header } from '@/components/Header/Header';
import { GoogleButton } from './SocialButtons';
import classes from './Register.module.css';

interface RegisterProps {}

interface BoxStyles {
  width: string;
  height: string;
  display: string;
  justifyContent: string;
  alignItems: string;
  backgroundColor: string;
}

interface BoxContentStyles {
  width: number;
  padding: string;
  borderRadius: string;
  backgroundColor: string;
  boxShadow: string;
}

export const Register: React.FC<RegisterProps> = () => {
  const { colorScheme } = useMantineColorScheme();

  const boxContentStyles: BoxContentStyles = {
    width: 400,
    padding: '2rem',
    borderRadius: '8px',
    backgroundColor: colorScheme === 'dark' ? '#212121' : '#fafafa',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  };

  return (
    <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
      <Box
        className={classes.pageBody}
        style={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          justifyItems: 'center',
          alignItems: 'center',
        }}
      >
        <Box style={boxContentStyles}>
          <Stack>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Title order={3} style={{ fontWeight: 300 }}>
                Join
              </Title>
              <Text
                style={{
                  fontSize: 48,
                  fontWeight: 700,
                  color: 'pink',
                  textAlign: 'center',
                }}
                inherit
                variant="gradient"
                component="span"
                gradient={{ from: 'pink', to: 'yellow' }}
              >
                PRISMA AI
              </Text>
            </div>
            <div
              style={{
                display: 'flex',
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 10,
              }}
            >
              <TextInput label="First name" placeholder="First name" size="md" required />
              <TextInput label="Last name" placeholder="Last name" size="md" required />
            </div>
            <TextInput
              label="Email address or phone number"
              placeholder="Enter your email or phone"
              size="md"
              required
            />
            <PasswordInput label="Password" placeholder="Choose a good one" size="md" required />
            <Button fullWidth size="md" color="teal">
              Continue
            </Button>
            <div
              style={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text size="sm">
                Already have an account?{' '}
                <Anchor href="#" size="sm">
                  Sign In
                </Anchor>
              </Text>
            </div>

            <Divider label="OR" labelPosition="center" />

            <Stack>
              <GoogleButton />
            </Stack>
          </Stack>
        </Box>
      </Box>
    </div>
  );
};
