import React from 'react';
import { Button, Card, Container, Grid, Text, Title } from '@mantine/core';

export const PricingPage: React.FC = () => {
  return (
    <Container style={{ display: 'flex', alignContent: 'center', alignItems: 'center' }}>
      <Title my="lg">Pricing Plans</Title>
      <Grid>
        <Grid.Col span={6}>
          <Card shadow="sm" padding="lg">
            <Title order={2}>Free Tier</Title>
            <Text size="xl" style={{ fontWeight: 700 }} my="md">
              $0 / month
            </Text>
            <Text>Basic features for personal use</Text>
            <Button fullWidth mt="md">
              Get Started
            </Button>
          </Card>
        </Grid.Col>
        <Grid.Col span={6}>
          <Card shadow="sm" padding="lg">
            <Title order={2}>Pro Tier</Title>
            <Text size="xl" style={{ fontWeight: 700 }} my="md">
              $9.99 / month
            </Text>
            <Text>Advanced features for professionals</Text>
            <Button fullWidth mt="md">
              Subscribe Now
            </Button>
          </Card>
        </Grid.Col>
      </Grid>
    </Container>
  );
};
