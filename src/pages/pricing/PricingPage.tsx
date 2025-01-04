import React from 'react';
import {
  Badge,
  Button,
  Card,
  Container,
  Flex,
  Group,
  Center,
  Text,
  Title,
  Stack,
  Divider,
} from '@mantine/core';

export const PricingPage: React.FC = () => {
  const tiers = [
    {
      name: 'Free',
      price: '$0',
      description: 'A perfect way to start exploring our platform at no cost.',
      features: [
        'Analyze up to 10 documents per month',
        'Basic AI-generated insights for quick analysis',
        'Simple and intuitive interface for easy onboarding',
        'Community support to assist you along the way',
      ],
      buttonText: 'Get Started',
      isPopular: false,
    },
    {
      name: 'Standard',
      price: '$19/month',
      description:
        'Ideal for researchers and teams needing detailed insights and advanced tools.',
      features: [
        'Analyze up to 250 documents per month',
        'Detailed insights, including trends and relationships',
        'Integration with live dataSets for real-time updates',
        'Access to economic data for data-driven decisions',
        'Shared team workspaces for collaboration',
        'Priority support to resolve issues quickly',
      ],
      buttonText: 'Upgrade',
      isPopular: true,
    },
    {
      name: 'Premium',
      price: '$49/month',
      description:
        'Designed for professionals and enterprises who need unlimited scalability.',
      features: [
        'Unlimited document uploads and advanced analysis',
        'All Standard features included',
        'Deeper insights with advanced live dataSets',
        'Custom API integration with existing tools',
        'Enterprise-grade security and compliance',
        'Dedicated insights specialist for tailored solutions',
        '24/7 premium support for uninterrupted operations',
      ],
      buttonText: 'Subscribe',
      isPopular: false,
    },
  ];

  return (
    <Container size="lg" py="xl">
      <Title style={{ textAlign: 'center' }} mb="md">
        Choose Your Plan
      </Title>
      <Text style={{ textAlign: 'center' }} mb="xl" color="dimmed">
        Whether you're just starting out or need enterprise-grade tools, we have a plan tailored for you. Start small and scale as your needs grow.
      </Text>
      <Flex
        wrap="wrap"
        gap="lg"
        justify="center"
        align="stretch"
      >
        {tiers.map((tier) => (
          <Card
            key={tier.name}
            shadow="md"
            radius="md"
            withBorder
            style={{
              borderColor: tier.isPopular ? 'gold' : undefined,
              maxWidth: 300,
              flex: '1 1 calc(33% - 1rem)',
              justifyContent: 'center',
            }}
          >
            <Center style={{ width: '100%' }}>
              {tier.isPopular && (
                <Badge color="yellow" variant="filled" size="lg" mb="sm">
                  Most Popular
                </Badge>
              )}
            </Center>
            <Stack gap="xs" align="center">
              <Title order={3}>{tier.name}</Title>
              <Text size="xl" style={{ fontWeight: 'bold' }} color="dark">
                {tier.price}
              </Text>
              <Text style={{ textAlign: 'center' }} color="dimmed">
                {tier.description}
              </Text>
            </Stack>
            <Divider my="sm" />
            <Stack gap="xs" mt="md">
              {tier.features.map((feature, index) => (
                <Text key={index} size="sm" style={{ textAlign: 'center' }}>
                  {feature}
                </Text>
              ))}
            </Stack>
            <Group mt="md">
              <Button
                size="md"
                variant={tier.isPopular ? 'filled' : 'outline'}
                color={tier.isPopular ? 'yellow' : 'blue'}
                fullWidth
              >
                {tier.buttonText}
              </Button>
            </Group>
          </Card>
        ))}
      </Flex>
    </Container>
  );
};
