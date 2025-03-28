import React from 'react';
import { SignInButton } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { Badge, Button, Card, Flex, Group, Stack, Text } from '@mantine/core';
import { COLORS } from '@/common/colors';

export const UnauthPricingTable = () => {
  return (
    <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', padding: '2rem' }}>
      <Card
        shadow="sm"
        padding="lg"
        radius={15}
        style={{ width: '300px', backgroundColor: '#262626' }}
      >
        <Flex direction="column" gap={10}>
          <Text style={{ color: '#fff', fontWeight: 400, fontSize: 24 }}>Researcher Lite</Text>
          <Text style={{ color: '#ccc' }}>
            Researcher Lite offers unlimited document uploads and the ability to engage in
            interactive chats with your files. This subscription includes up to 10 daily
            conversations powered by live datasets, enabling you to enhance your research and
            analysis with dynamic, real-time insights.
          </Text>

          <Flex direction="column" gap={0} style={{ paddingTop: 10, paddingBottom: 10 }}>
            <Text style={{ fontSize: 36, fontWeight: 'bold', color: '#fff', lineHeight: 1 }}>
              $10
            </Text>
            <Text style={{ color: '#ccc', lineHeight: 1 }}>per month</Text>
          </Flex>

          <SignInButton>
            <Button
              variant="filled"
              style={{ backgroundColor: '#fbbd68', color: '#1a1a1a', fontWeight: 'bold' }}
            >
              Register
            </Button>
          </SignInButton>
          <Stack gap="xs" mt="sm">
            <Text style={{ color: '#ccc' }}>This includes:</Text>
            <Group gap="xs">
              <Text style={{ color: '#ccc' }}>✔ Upload and chat with your PDF documents</Text>
            </Group>
            <Group gap="xs">
              <Text style={{ color: '#ccc' }}>
                ✔ Connect up to 10 conversations daily to dynamic live dataset sources
              </Text>
            </Group>
          </Stack>
        </Flex>
      </Card>

      <Card
        shadow="md"
        padding="lg"
        radius={15}
        style={{ width: '300px', backgroundColor: '#333333' }}
      >
        <Flex direction="column" gap={10}>
          <Text style={{ color: COLORS.peach, fontWeight: 400, fontSize: 24 }}>Researcher Pro</Text>
          <Group justify="space-between" style={{ marginBottom: '1rem' }}>
            <Badge color="gray" variant="filled">
              Recommended
            </Badge>
          </Group>
          <Text style={{ color: '#ccc' }}>
            Researcher Pro is crafted for professionals who demand unlimited access to advanced
            research tools. Unlock the full potential of RealTimeDoc with Researcher Pro and take
            your research to the next level.
          </Text>
          <Flex direction="column" gap={0} style={{ paddingTop: 10, paddingBottom: 10 }}>
            <Text
              style={{
                display: 'flex',
                fontSize: 36,
                fontWeight: 'bold',
                color: '#fff',
                lineHeight: 1,
              }}
            >
              $14
            </Text>
            <Text style={{ display: 'flex', color: '#ccc', lineHeight: 1 }}>per month</Text>
          </Flex>

          <SignInButton>
            <Button
              variant="filled"
              style={{ backgroundColor: '#fbbd68', color: '#1a1a1a', fontWeight: 'bold' }}
            >
              Register
            </Button>
          </SignInButton>
          <Stack gap="xs" mt="sm">
            <Text style={{ color: '#ccc' }}>This includes:</Text>
            <Group gap="xs">
              <Text style={{ color: '#ccc' }}>✔ Upload and chat with unlimited PDF documents</Text>
            </Group>
            <Group gap="xs">
              <Text style={{ color: '#ccc' }}>
                ✔ Connect unlimited conversations to dynamic live dataset sources
              </Text>
            </Group>
          </Stack>
        </Flex>
      </Card>
    </div>
  );
};
