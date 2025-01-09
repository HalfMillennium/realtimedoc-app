import React from 'react';
import { IconChartInfographic, IconDatabase, IconFileUpload, IconRobot } from '@tabler/icons-react';
import { Box, Card, Center, Container, Group, SimpleGrid, Text, Title } from '@mantine/core';
import { COLORS } from '@/common/colors';

export const AltFeaturesPage: React.FC = () => {
  return (
    <Container size="lg" p={50}>
      <section style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Title style={{ textAlign: 'center', fontWeight: 300, fontSize: 36 }}>Features</Title>
        <SimpleGrid cols={4} spacing="lg">
          <Card shadow="sm" padding="lg" radius={20}>
            <Center>
              <IconFileUpload size={48} color={COLORS.teal} />
            </Center>
            <Text style={{ textAlign: 'center', fontWeight: 500 }} mt="md">
              Upload PDFs
            </Text>
            <Text style={{ textAlign: 'center' }} size="sm" color="dimmed">
              Upload one or more PDF documents and interact with them through an AI chat interface.
            </Text>
          </Card>

          <Card shadow="sm" padding="lg" radius={20}>
            <Center>
              <IconRobot size={48} color={COLORS.teal} />
            </Center>
            <Text style={{ textAlign: 'center', fontWeight: 600 }} mt="md">
              AI Chatbot
            </Text>
            <Text style={{ textAlign: 'center' }} size="sm" color="dimmed">
              Ask the AI questions about your uploaded documents and gain deep insights instantly.
            </Text>
          </Card>
          <Card shadow="sm" padding="lg" radius={20}>
            <Center>
              <IconDatabase size={48} color={COLORS.teal} />
            </Center>
            <Text style={{ textAlign: 'center', fontWeight: 600 }} mt="md">
              Dynamic Data
            </Text>
            <Text style={{ textAlign: 'center' }} size="sm" color="dimmed">
              Link your documents to live datasets and enrich static data with real-time insights.
            </Text>
          </Card>

          <Card shadow="sm" padding="lg" radius={20}>
            <Center>
              <IconChartInfographic size={48} color={COLORS.teal} />
            </Center>
            <Text style={{ textAlign: 'center', fontWeight: 600 }} mt="md">
              Enhanced Analytics
            </Text>
            <Text style={{ textAlign: 'center' }} size="sm" color="dimmed">
              Infuse static data with dynamic sources for enhanced and actionable analytics.
            </Text>
          </Card>
        </SimpleGrid>
      </section>

      {/* About Us Section */}
      <section style={{ marginTop: '4rem' }}>
        <SimpleGrid cols={2} spacing="lg">
          <Box>
            <img
              src="https://via.placeholder.com/600x400" // Replace with a relevant image URL
              alt="About Us"
              style={{ borderRadius: '8px', width: '100%' }}
            />
          </Box>
          <Box>
            <Title order={3} mb="md">
              ABOUT US
            </Title>
            <Text color="dimmed" mb="md">
              Our platform enables users to transform static documents into dynamic resources,
              powered by AI and live datasets.
            </Text>
            <Text style={{ fontWeight: 500 }} mb="xs">
              Why Choose Us?
            </Text>
            <ul style={{ paddingLeft: '1.5rem' }}>
              <li>Interact with your documents like never before.</li>
              <li>Infuse static PDFs with real-time data sources.</li>
              <li>Generate powerful insights through AI.</li>
              <li>Seamlessly link data for dynamic exploration.</li>
            </ul>
          </Box>
        </SimpleGrid>
      </section>

      {/* Our Services Section */}
      <section style={{ marginTop: '4rem', padding: '2rem 0' }}>
        <Container size="lg">
          <Title order={2} style={{ textAlign: 'center' }} mb="lg">
            OUR SERVICES
          </Title>
          <SimpleGrid cols={3} spacing="lg">
            <Card shadow="sm" padding="lg" radius="md">
              <Center>
                <IconFileUpload size={48} color={COLORS.peach} />
              </Center>
              <Text style={{ textAlign: 'center', fontWeight: 600 }} mt="md">
                Document Uploads
              </Text>
              <Text style={{ textAlign: 'center' }} size="sm" color="dimmed">
                Seamless document upload process.
              </Text>
            </Card>

            <Card shadow="sm" padding="lg" radius="md">
              <Center>
                <IconRobot size={48} color={COLORS.peach} />
              </Center>
              <Text style={{ textAlign: 'center', fontWeight: 600 }} mt="md">
                AI-Powered Insights
              </Text>
              <Text style={{ textAlign: 'center' }} size="sm" color="dimmed">
                Transform your documents into actionable data.
              </Text>
            </Card>

            <Card shadow="sm" padding="lg" radius="md">
              <Center>
                <IconDatabase size={48} color={COLORS.peach} />
              </Center>
              <Text style={{ textAlign: 'center', fontWeight: 600 }} mt="md">
                Live Data Integration
              </Text>
              <Text style={{ textAlign: 'center' }} size="sm" color="dimmed">
                Combine your documents with live datasets.
              </Text>
            </Card>
          </SimpleGrid>
        </Container>
      </section>
    </Container>
  );
};
