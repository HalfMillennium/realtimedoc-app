import React, { useState } from 'react';
import { IconCirclePlus, IconMail, IconMessage, IconVideo } from '@tabler/icons-react';
import { Accordion, Button, Flex, SegmentedControl, Text, Title } from '@mantine/core';
import { COLORS } from '@/common/colors';
import { useNavigate } from 'react-router-dom';
import { setCurrentSegmentMenuOption } from '@/store/homePageActivity/homePageActivitySlice';
import { useDispatch } from 'react-redux';
import { SegmentMenuOptions } from '../home/menus/segment_menu';

export const FAQPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('General');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleReachOutButtonClick = () => {
    dispatch(setCurrentSegmentMenuOption({menuOption: SegmentMenuOptions.AnyQuestions}));
    navigate('/');
  };

  const faqData: Record<string, { question: string; answer: string; icon: JSX.Element }[]> = {
    General: [
      {
        question: 'What is RealTimeDoc?',
        answer:
          'RealTimeDoc is a SaaS platform that allows users to upload PDF documents and ask questions to an AI about the content of those documents. Additionally, users can combine PDF data with live data libraries to enhance responses.',
        icon: <IconCirclePlus size={20} />,
      },
      {
        question: 'What types of documents can I upload?',
        answer:
          'RealTimeDoc supports PDF documents. Whether it’s contracts, invoices, research papers, or any other type of PDF, you can upload and analyze the content.',
        icon: <IconCirclePlus size={20} />,
      },
      {
        question: 'How does the AI answer questions about my PDF documents?',
        answer:
          'The AI scans the content of your uploaded PDF document, extracts relevant information, and uses that data to answer your questions in real time.',
        icon: <IconCirclePlus size={20} />,
      },
      {
        question: 'What are live data libraries, and how are they used?',
        answer:
          'Live data libraries are constantly updated dataSets that RealTimeDoc integrates with your uploaded PDFs. This allows the AI to enrich its responses with up-to-date and contextually relevant information.',
        icon: <IconCirclePlus size={20} />,
      },
      {
        question: 'How secure are my uploaded documents?',
        answer:
          'Your uploaded documents are encrypted and stored securely. RealTimeDoc prioritizes data privacy and ensures that your documents and queries are not shared with any third parties.',
        icon: <IconCirclePlus size={20} />,
      },
      {
        question: 'Can I upload multiple PDF documents at once?',
        answer:
          'This feature is coming soon! RealTimeDoc will soon support uploading multiple PDF documents simultaneously, enabling you to query across multiple files seamlessly.',
        icon: <IconCirclePlus size={20} />,
      },
      {
        question: 'Can RealTimeDoc be integrated into my existing workflows?',
        answer:
          'Yes, RealTimeDoc offers API support, allowing you to integrate its functionality into your current applications and workflows.',
        icon: <IconCirclePlus size={20} />,
      },
      {
        question: 'What industries benefit most from RealTimeDoc?',
        answer:
          'RealTimeDoc is versatile and benefits a variety of industries, including legal, finance, healthcare, and research. Any organization that frequently works with PDFs can streamline their workflows using RealTimeDoc.',
        icon: <IconCirclePlus size={20} />,
      },
      {
        question: 'What happens if the AI cannot find an answer to my query?',
        answer:
          'If the AI cannot find an answer within your PDF or the live data libraries, it will inform you and provide suggestions for refining your query or additional steps to take.',
        icon: <IconCirclePlus size={20} />,
      },
      {
        question: 'How can I get started with RealTimeDoc?',
        answer:
          'Simply sign up on our platform, upload your PDF documents, and start querying! RealTimeDoc’s intuitive interface makes it easy to get started in minutes.',
        icon: <IconCirclePlus size={20} />,
      },
    ],
  };

  return (
    <Flex direction="column" gap={15} style={{ width: '100%' }} py="xl">
      <Flex direction="row" style={{ flex: 1, justifyContent: 'center' }}>
        <Flex direction="column" style={{ width: '50%' }} py={20} gap={20}>
          <Text style={{ textAlign: 'center', fontWeight: 400, fontSize: 56 }}>
            Frequently asked questions
          </Text>
          <Text style={{ textAlign: 'center', fontSize: 18, opacity: 0.5 }}>
            These are the most commonly asked questions about RealTimeDoc.
          </Text>
          <Accordion style={{ borderRadius: 10, gap: 10 }}>
            {faqData[activeCategory].map((faq, index) => (
              <Accordion.Item style={{ borderRadius: 10 }} key={index} value={faq.question}>
                <Accordion.Control icon={faq.icon} style={{ borderRadius: 10 }}>
                  {faq.question}
                </Accordion.Control>
                <Accordion.Panel style={{ borderRadius: 10 }}>{faq.answer}</Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </Flex>
      </Flex>
      <Flex style={{ alignItems: 'center', justifyContent: 'center' }} gap={20}>
        <Text style={{ opacity: 0.5 }}>Can’t find what you’re looking for?</Text>
        <Button radius={10} variant="light" color={COLORS.pink} onClick={handleReachOutButtonClick}>
          <Flex gap={5} direction="row" style={{ alignItems: 'center', width: 'auto' }}>
            <IconMessage />
            <Text>Reach Out</Text>
          </Flex>
        </Button>
      </Flex>
    </Flex>
  );
};
