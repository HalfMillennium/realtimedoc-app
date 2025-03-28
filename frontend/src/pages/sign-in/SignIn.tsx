import React from 'react';
import { IconBrandGithub, IconBrandGoogle, IconBrandMeta } from '@tabler/icons-react';
import { Button, Center, Divider, Flex, Modal, Text, TextInput } from '@mantine/core';

export const SignIn: React.FC = () => {
  const [opened, setOpened] = React.useState(false);
  const iconSize = 16;
  const buttonTextSize = 'sm';
  return (
    <>
      <Button onClick={() => setOpened(true)}>Open Modal</Button>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Sign in to Acme Co"
        centered
        radius="lg"
        styles={{
          body: {
            backgroundColor: '#fff',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          },
          title: { fontWeight: 700, fontSize: '18px' },
          close: { color: '#888' },
        }}
      >
        <Center>
          <p style={{ marginBottom: '16px', fontSize: '14px', color: '#666' }}>
            Welcome back! Please sign in to continue
          </p>
        </Center>

        <Center style={{ display: 'flex', gap: 10 }}>
          <Button variant="default">
            <Flex direction="row" gap="5" align="center">
              <IconBrandGoogle size={iconSize} />
              <Text size={buttonTextSize}>Google</Text>
            </Flex>
          </Button>
          <Button variant="default">
            <Flex direction="row" gap="5" align="center">
              <IconBrandMeta size={iconSize} />
              <Text size={buttonTextSize}>Meta</Text>
            </Flex>
          </Button>
          <Button variant="default">
            <Flex direction="row" gap="5" align="center">
              <IconBrandGithub size={iconSize} />
              <Text size={buttonTextSize}>GitHub</Text>
            </Flex>
          </Button>
        </Center>

        <Divider my="lg" label="or" labelPosition="center" />

        <TextInput
          placeholder="Email address"
          size="md"
          radius="md"
          styles={{ input: { borderColor: '#ddd' } }}
        />

        <Button fullWidth mt="lg" size="md" radius="md">
          Continue
        </Button>

        <Center mt="md">
          <p style={{ fontSize: '14px', color: '#888' }}>
            Don’t have an account? <a href="#">Sign up</a>
          </p>
        </Center>

        <Center mt="sm">
          <p style={{ fontSize: '12px', color: '#aaa' }}>Secured by Clerk</p>
        </Center>
      </Modal>
    </>
  );
};

export default SignIn;
