import React from 'react';
import { Badge, Card, Container, Flex, Grid, Space, Text, Title } from '@mantine/core';
import { COLORS } from '@/common/colors';

export const FAQPage: React.FC = () => {
  // FAQ items as an array for dynamic rendering
  const faqItems = [
    {
      number: 1,
      question: 'What is RealTimeDoc?',
      answer:
        'RealTimeDoc is a SaaS platform that allows users to upload PDF documents and ask questions to an AI about the content of those documents. Additionally, users can combine PDF data with live data libraries to enhance responses.',
    },
    {
      number: 2,
      question: 'What types of documents can I upload?',
      answer:
        'RealTimeDoc supports PDF documents. Whether it’s contracts, invoices, research papers, or any other type of PDF, you can upload and analyze the content.',
    },
    {
      number: 3,
      question: 'How does the AI answer questions about my PDF documents?',
      answer:
        'The AI scans the content of your uploaded PDF document, extracts relevant information, and uses that data to answer your questions in real time.',
    },
    {
      number: 4,
      question: 'What are live data libraries, and how are they used?',
      answer:
        'Live data libraries are constantly updated datasets that RealTimeDoc integrates with your uploaded PDFs. This allows the AI to enrich its responses with up-to-date and contextually relevant information.',
    },
    {
      number: 5,
      question: 'How secure are my uploaded documents?',
      answer:
        'Your uploaded documents are encrypted and stored securely. RealTimeDoc prioritizes data privacy and ensures that your documents and queries are not shared with any third parties.',
    },
    {
      number: 6,
      question: 'Can I upload multiple PDF documents at once?',
      answer:
        'Yes, RealTimeDoc supports uploading multiple PDF documents simultaneously, enabling you to query across multiple files seamlessly.',
    },
    {
      number: 7,
      question: 'What industries benefit most from RealTimeDoc?',
      answer:
        'RealTimeDoc is versatile and benefits a variety of industries, including legal, finance, healthcare, and research. Any organization that frequently works with PDFs can streamline their workflows using RealTimeDoc.',
    },
    {
      number: 8,
      question: 'What happens if the AI cannot find an answer to my query?',
      answer:
        'If the AI cannot find an answer within your PDF or the live data libraries, it will inform you and provide suggestions for refining your query or additional steps to take.',
    },
    {
      number: 9,
      question: 'How can I get started with RealTimeDoc?',
      answer:
        'Simply sign up on our platform, upload your PDF documents, and start querying! RealTimeDoc’s intuitive interface makes it easy to get started in minutes.',
    },
  ];

  return (
    <Container size="lg" style={{ marginTop: 50, justifyItems: 'center' }}>
      <Title style={{ textAlign: 'center', marginBottom: 20 }} order={1}>
        RealTimeDoc FAQ
      </Title>
      <Text style={{ textAlign: 'center', marginBottom: 40 }}>
        Frequently Asked Questions about uploading PDF documents and querying AI with RealTimeDoc.
      </Text>

      <Grid style={{ width: '70%' }} gutter="lg">
        {faqItems.map((faq) => (
          <Grid.Col key={faq.number}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Flex style={{ marginBottom: 10, gap: 10, verticalAlign: 'middle' }}>
                <Badge color={COLORS.teal} size="lg">{`#${faq.number}`}</Badge>
                <Text style={{ fontWeight: 700 }} size="lg">
                  {faq.question}
                </Text>
              </Flex>
              <Text size="sm">{faq.answer}</Text>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
};
