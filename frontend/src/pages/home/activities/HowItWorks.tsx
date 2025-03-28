import React from 'react';
import { IconChartDots3, IconCheck } from '@tabler/icons-react';
import { Flex, List, Text, ThemeIcon, useMantineColorScheme } from '@mantine/core';
import { COLORS } from '@/common/colors';

export const HowItWorks: React.FC = () => {
  const { colorScheme } = useMantineColorScheme();
  return (
    <Flex direction="column" style={styles.container} flex="1">
      <Flex direction="row" gap="10" align="center" justify="start">
        <IconChartDots3
          color={colorScheme === 'dark' ? COLORS.peach : COLORS.mantineDefaultBlack}
        />
        <Text style={{ fontWeight: 400, fontSize: 26 }}>
          PDF Insights with Live Datasets
        </Text>
      </Flex>
      <Text
        style={{
          marginTop: '0.5rem',
          color: colorScheme === 'dark' ? COLORS.peach : COLORS.mantineDefaultBlack,
          fontWeight: 400,
        }}
      >
        Transform your documents into a searchable, interactive knowledge hub.
      </Text>
      <Flex direction="column" justify="space-between">
        <Text style={styles.sectionTitle}>How It Works</Text>
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
        </List>
        <Text style={styles.sectionTitle}>Our tool is designed to:</Text>
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
          <List.Item>
            Make better decisions with enhanced, context-rich information at your fingertips.
          </List.Item>{' '}
        </List>
      </Flex>
    </Flex>
  );
};

const styles = {
  container: {
    width: '75%',
    height: '100%',
    overflowY: 'auto' as 'auto'
  },
  sectionTitle: {
    marginTop: 30,
    fontWeight: 500,
    fontSize: 16,
  },
  text: {
    marginTop: '0.5rem',
    fontWeight: 400,
    fontSize: 12,
  },
  list: {
    marginTop: 10,
  },
  icon: {
    size: 15,
    borderRadius: '50%',
  },
};

export default HowItWorks;
