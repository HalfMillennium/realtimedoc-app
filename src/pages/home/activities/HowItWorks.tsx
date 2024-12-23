import React from 'react';
import { IconCheck } from '@tabler/icons-react';
import { Container, List, Text, ThemeIcon, Title } from '@mantine/core';

export const HowItWorks: React.FC = () => {
  return (
    <Container size="md" py="xl" style={styles.container}>
      <Title order={1} style={styles.title}>
        AI-Powered PDF Insights
      </Title>
      <Text style={styles.subtitle} color="dimmed">
        Transform your documents into a searchable, interactive knowledge hub.
      </Text>

      <Title order={2} style={styles.sectionTitle}>
        How It Works
      </Title>
      <Text style={styles.text}>Getting started is simple:</Text>
      <List
        style={styles.list}
        spacing="sm"
        icon={
          <ThemeIcon color="blue" style={styles.icon}>
            <IconCheck size={18} />
          </ThemeIcon>
        }
      >
        <List.Item>Upload your PDF documents through our intuitive web app.</List.Item>
        <List.Item>Ask questions or search specific content using natural language.</List.Item>
        <List.Item>
          (Optional) Select one of our live datasets to enhance the insights present in your
          document.
        </List.Item>
        <List.Item>Receive instant, accurate results powered by advanced AI.</List.Item>
      </List>

      <Title order={2} style={styles.sectionTitle}>
        Who Is This For?
      </Title>
      <Text style={styles.text}>
        Whether you're a researcher, analyst, or business professional, our tool is designed to:
      </Text>
      <List
        style={styles.list}
        spacing="sm"
        icon={
          <ThemeIcon color="orange" style={styles.icon}>
            <IconCheck size={18} />
          </ThemeIcon>
        }
      >
        <List.Item>Save time by automating document searches and analyses.</List.Item>
        <List.Item>
          Enable deeper insights without manual effort by allowing you to incorporate real-time
          datasets into your pre-existing docs.
        </List.Item>
        <List.Item>Provide a seamless way to interact with critical information.</List.Item>
      </List>
    </Container>
  );
};

const styles = {
  container: {
    paddingTop: '2rem',
    paddingBottom: '2rem',
  },
  title: {
    marginTop: '1rem',
  },
  subtitle: {
    marginTop: '0.5rem',
  },
  sectionTitle: {
    marginTop: '2rem',
  },
  text: {
    marginTop: '0.5rem',
  },
  list: {
    marginTop: '1rem',
  },
  icon: {
    size: '1.5rem',
    borderRadius: '50%',
  },
};

export default HowItWorks;
