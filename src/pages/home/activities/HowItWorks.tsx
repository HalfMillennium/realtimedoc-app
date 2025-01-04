import React from 'react';
import { IconChartDots3, IconCheck } from '@tabler/icons-react';
import { Flex, List, Text, ThemeIcon, Title } from '@mantine/core';
import { COLORS } from '@/common/colors';

export const HowItWorks: React.FC = () => {
  return (
    <Flex direction="column" style={styles.container} flex="1">
      <Flex direction="row" gap="10" align="center" justify="start">
        <IconChartDots3 color={COLORS.peach}/>
      <Title order={1} style={{fontWeight: 100}}>
        PDF Insights with Live Datasets
      </Title>
      </Flex>
      <Text style={styles.subtitle}>
        Transform your documents into a searchable, interactive knowledge hub.
      </Text>

      <Title order={3} style={styles.sectionTitle}>
        How It Works
      </Title>
      <Text style={styles.text}>Getting started is simple.</Text>
      <List
        style={styles.list}
        spacing="sm"
        icon={
          <ThemeIcon color={COLORS.teal} style={styles.icon}>
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
          <ThemeIcon color={COLORS.pink} style={styles.icon}>
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
    color: COLORS.peach
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
