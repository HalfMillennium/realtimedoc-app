import React from 'react';
import { IconCheck } from '@tabler/icons-react';
import { Flex, List, Text, ThemeIcon, Title } from '@mantine/core';

export const HowItWorks: React.FC = () => {
  return (
    <Flex direction="column" style={styles.container} flex="1">
      <Title order={1}>
        PDF Insights with Live Data
      </Title>
      <Text style={styles.subtitle} color="dimmed">
        Transform your documents into a searchable, interactive knowledge hub.
      </Text>

      <Title order={3} style={styles.sectionTitle}>
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
        <List.Item>
          Integrate live datasets, such as financial reports or economic spending data, to enhance
          document insights.
        </List.Item>
        <List.Item>Ask questions or search specific content using natural language.</List.Item>
        <List.Item>Receive instant, accurate results powered by advanced AI.</List.Item>
      </List>

      <Title order={3} style={styles.sectionTitle}>
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
          Gain deeper insights by combining static documents with dynamic data sources.
        </List.Item>
        <List.Item>Enable deeper insights without manual effort.</List.Item>
        <List.Item>
          Make better decisions with enhanced, context-rich information at your fingertips.
        </List.Item>{' '}
      </List>
    </Flex>
  );
};

const styles = {
  container: {
    width: '75%',
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
