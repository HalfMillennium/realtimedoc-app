import React from 'react';
import { IconLock, IconSettings, IconShield, IconSwitchHorizontal } from '@tabler/icons-react';
import { Button, Card, Center, Container, Stack, Text, ThemeIcon, Title } from '@mantine/core';

export const FeaturesPageAlt: React.FC = () => {
  return (
    <Container size="lg" py="xl">
      <Stack gap="xl" style={{ textAlign: 'center' }}>
        {/* Header Section */}
        <Title order={1}>With Our Tool, You're in Control</Title>
        <Text size="lg" color="dimmed">
          Have a specific workflow in mind? Customize your experience to fit your unique needs.
        </Text>
        <Button size="lg" radius="md" variant="gradient" gradient={{ from: 'blue', to: 'violet' }}>
          Start your free 14-day trial
        </Button>

        {/* Features Section */}
        <Center mt="xl" style={{ flexWrap: 'wrap', gap: '20px' }}>
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            style={{
              width: '240px',
              textAlign: 'center',
              border: '1px solid #e0e0e0',
            }}
          >
            <ThemeIcon size={48} radius="xl" color="orange">
              <IconSettings size={28} />
            </ThemeIcon>
            <Title order={4} mt="sm">
              Customize
            </Title>
            <Text size="sm" color="dimmed" mt="xs">
              your workflows and preferences.
            </Text>
          </Card>

          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            style={{
              width: '240px',
              textAlign: 'center',
              border: '1px solid #e0e0e0',
            }}
          >
            <ThemeIcon size={48} radius="xl" color="blue">
              <IconShield size={28} />
            </ThemeIcon>
            <Title order={4} mt="sm">
              Automated Workflows
            </Title>
            <Text size="sm" color="dimmed" mt="xs">
              Reward members with custom badges.
            </Text>
          </Card>

          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            style={{
              width: '240px',
              textAlign: 'center',
              border: '1px solid #e0e0e0',
            }}
          >
            <ThemeIcon size={48} radius="xl" color="green">
              <IconSwitchHorizontal size={28} />
            </ThemeIcon>
            <Title order={4} mt="sm">
              Toggle Features
            </Title>
            <Text size="sm" color="dimmed" mt="xs">
              Turn off features that aren't relevant.
            </Text>
          </Card>

          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            style={{
              width: '240px',
              textAlign: 'center',
              border: '1px solid #e0e0e0',
            }}
          >
            <ThemeIcon size={48} radius="xl" color="violet">
              <IconLock size={28} />
            </ThemeIcon>
            <Title order={4} mt="sm">
              Privacy Controls
            </Title>
            <Text size="sm" color="dimmed" mt="xs">
              Show or hide your data as needed.
            </Text>
          </Card>
        </Center>
      </Stack>
    </Container>
  );
};
