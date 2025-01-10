import React from 'react';
import { IconCheck } from '@tabler/icons-react';
import {
  Button,
  Card,
  Center,
  Container,
  List,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';

export const FeaturesPage: React.FC = () => {
  return (
    <Container size="md" py="xl">
      <Stack gap="xl">
        {/* Header Section */}
        <Title style={{ textAlign: 'center', fontWeight: 400, fontSize: 56 }}>
          PDF Insights with Live Datasets
        </Title>
        <Text style={{ textAlign: 'center' }} size="lg" color="dimmed">
          Transform your documents into a searchable, interactive knowledge hub.
        </Text>

        {/* How It Works Section */}
        <Title order={2} mt="xl">
          How It Works
        </Title>
        <List
          spacing="sm"
          icon={
            <ThemeIcon color="teal" size={24} radius="xl">
              <IconCheck size={16} />
            </ThemeIcon>
          }
        >
          <List.Item>Upload your PDF documents through our intuitive web app.</List.Item>
          <List.Item>
            Integrate live datasets, such as financial reports or economic spending data, to enhance
            document insights.
          </List.Item>
          <List.Item>Ask questions or search specific content using natural language.</List.Item>
          <List.Item>Receive instant, accurate results powered by advanced AI.</List.Item>
        </List>

        {/* Who Is This For Section */}
        <Title order={2} mt="xl">
          Who Is This For?
        </Title>
        <Text size="md">
          Whether you're a researcher, analyst, or business professional, our tool is designed to:
        </Text>
        <List
          spacing="sm"
          icon={
            <ThemeIcon color="blue" size={24} radius="xl">
              <IconCheck size={16} />
            </ThemeIcon>
          }
        >
          <List.Item>Save time by automating document searches and analyses.</List.Item>
          <List.Item>
            Gain deeper insights by combining static documents with dynamic data sources.
          </List.Item>
          <List.Item>Enable deeper insights without manual effort.</List.Item>
          <List.Item>
            Make better decisions with enhanced, context-rich information at your fingertips.
          </List.Item>
        </List>

        {/* Pricing Section */}
        <Title order={2} mt="xl" style={{ textAlign: 'center' }}>
          Pricing Plans
        </Title>
        <Center style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
          {/* Basic Plan */}
          <Card shadow="sm" padding="lg" radius="md" style={{ flex: '1 1 300px', margin: '10px' }}>
            <Title order={3}>Basic Tier</Title>
            <Text size="sm" color="dimmed" mt="xs">
              10 uploads/conversations per day
            </Text>
            <Text mt="md" size="lg" style={{ fontWeight: 500 }}>
              Free
            </Text>
            <Button fullWidth variant="outline" mt="md" radius="md">
              Get Started
            </Button>
          </Card>

          {/* Advanced Plan */}
          <Card shadow="sm" padding="lg" radius="md" style={{ flex: '1 1 300px', margin: '10px' }}>
            <Title order={3}>Advanced Tier</Title>
            <Text size="sm" color="dimmed" mt="xs">
              Unlimited uploads/conversations
            </Text>
            <Text mt="md" size="lg" style={{ fontWeight: 500 }}>
              $49/month
            </Text>
            <Button fullWidth variant="filled" color="blue" mt="md" radius="md">
              Upgrade Now
            </Button>
          </Card>
        </Center>
      </Stack>
    </Container>
  );
};
