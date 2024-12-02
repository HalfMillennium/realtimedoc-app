import React from 'react';
import { Badge, Button, Card, Container, Flex, Grid, Group, Text, Title } from '@mantine/core';

export const PricingPage: React.FC = () => {
  const tiers = [
    {
      name: 'Free',
      price: '$0',
      description: 'Basic features for personal use.',
      features: ['Upload documents', 'Basic AI insights'],
      buttonText: 'Get Started',
      isPopular: false,
    },
    {
      name: 'Standard',
      price: '$19/month',
      description: 'Enhanced tools for researchers.',
      features: ['Upload larger files', 'Live dataset integration', 'Access to economic data'],
      buttonText: 'Upgrade',
      isPopular: true,
    },
    {
      name: 'Premium',
      price: '$49/month',
      description: 'Full access for professionals.',
      features: ['All Standard features', 'Priority support', 'Unlimited queries'],
      buttonText: 'Subscribe',
      isPopular: false,
    },
  ];

  return (
    <Container size="lg" py="xl">
      <Title style={{ textAlign: 'center' }} mb="lg">
        Choose Your Plan
      </Title>
      <Text style={{ textAlign: 'center' }} mb="xl">
        Flexible pricing to suit your needs.
      </Text>
      <Flex style={{ flexDirection: 'row', gap: 50 }}>
        {tiers.map((tier) => (
          <Card
            shadow="sm"
            radius="md"
            withBorder
            style={{
              borderColor: tier.isPopular ? 'gold' : undefined,
              display: 'flex',
              justifyContent: 'center',
              flex: 1,
            }}
          >
            {tier.isPopular && (
              <Badge
                color="yellow"
                variant="filled"
                style={{ alignSelf: 'center', marginBottom: 10 }}
              >
                Most Popular
              </Badge>
            )}
            <Title order={3} style={{ textAlign: 'center' }}>
              {tier.name}
            </Title>
            <Text style={{ textAlign: 'center', fontWeight: 'bold' }} size="xl" mt="sm">
              {tier.price}
            </Text>
            <Text style={{ textAlign: 'center', opacity: 0.5 }} mt="sm">
              {tier.description}
            </Text>
            <Flex
              style={{
                flexDirection: 'row',
                gap: 50,
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}
            >
              {tier.features.map((feature, index) => (
                <Text key={index} size="sm">
                  {feature}
                </Text>
              ))}
            </Flex>
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
