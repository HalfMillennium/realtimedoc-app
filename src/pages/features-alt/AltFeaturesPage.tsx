import React from 'react';
import { IconChartInfographic, IconDatabase, IconFileUpload, IconRobot } from '@tabler/icons-react';
import { Button, Card, Center, Container, Flex, SimpleGrid, Text, Title } from '@mantine/core';
import coolFox from '@/assets/cool_fox.png';
import { COLORS } from '@/common/colors';
import { useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

export const AltFeaturesPage: React.FC = () => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('/researcher');
  }
  return (
    <Container size="lg" p={50}>
      <section style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Title style={{ textAlign: 'center', fontWeight: 300, fontSize: 36 }}>Features</Title>
        <Flex direction="row" gap="lg">
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
        </Flex>
      </section>

      {/* About Us Section */}
      <section style={{ marginTop: '4rem' }}>
        <Flex direction="row" gap="lg" align="center" justify="center">
          <Flex
            style={{ backgroundColor: COLORS.peach, borderRadius: 10, flex: 1 }}
            justify="center"
          >
            <img src={coolFox} alt="About Us" style={{ borderRadius: '8px', height: 350 }} />
          </Flex>
          <Flex direction="column" style={{ flex: 1 }} gap="10">
            <Flex direction="column" gap="10">
              <Title style={{ fontWeight: 300, fontSize: 28 }}>About us</Title>
              <Text color="dimmed">
                Our platform enables users to transform static documents into dynamic resources,
                powered by AI and live datasets.
              </Text>
            </Flex>
            <Flex direction="column">
              <Text style={{ fontWeight: 500 }}>Why Choose Us?</Text>
              <ul style={{ paddingLeft: '1.5rem' }}>
                <li>Interact with your documents like never before.</li>
                <li>Infuse static PDFs with real-time data sources.</li>
                <li>Generate powerful insights through AI.</li>
                <li>Seamlessly link data for dynamic exploration.</li>
              </ul>
              <Button
                w={'auto'}
                variant="light"
                radius={10}
                onClick={handleButtonClick}
              >
                {!isSignedIn ? 'Try It Now' : 'Enter the Research Suite'}
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </section>

      {/* Our Services Section */}
      <section style={{ marginTop: '4rem', padding: '2rem 0' }}>
        <Flex direction="column" gap="20">
          <Title style={{ textAlign: 'center', fontWeight: 300, fontSize: 32 }}>Our Services</Title>
          <SimpleGrid cols={3} spacing="lg">
            <Card shadow="sm" padding="lg" radius={20}>
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

            <Card shadow="sm" padding="lg" radius={20}>
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

            <Card shadow="sm" padding="lg" radius={20}>
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
        </Flex>
      </section>
    </Container>
  );
};
