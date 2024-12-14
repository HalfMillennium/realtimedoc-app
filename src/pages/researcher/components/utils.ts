import { Conversation, ConversationMap } from '@/store/conversations/conversationsSlice';

export const EXAMPLE_CONVERSATIONS: Conversation[] = [
  {
    id: crypto.randomUUID(),
    title: 'Discussing Productivity Habits',
    embeddingId: '',
    messages: [
      {
        id: crypto.randomUUID(),
        content: 'Hi there! What’s a productivity habit you find effective?',
        author: 'User',
        timestamp: new Date('2022-01-01T09:00:00Z').toLocaleString(),
      },
      {
        id: crypto.randomUUID(),
        content: 'Hey! I’d say planning my day in advance really helps.',
        author: 'Assistant',
        timestamp: new Date('2022-01-01T09:05:00Z').toLocaleString(),
        tag: 'Pretty Nice',
      },
      {
        id: crypto.randomUUID(),
        content: 'Do you have a specific way you like to plan?',
        author: 'User',
        timestamp: new Date('2022-01-01T09:10:00Z').toLocaleString(),
      },
      {
        id: crypto.randomUUID(),
        content: 'Yes! I use time blocks to organize tasks by priority.',
        author: 'Assistant',
        timestamp: new Date('2022-01-01T09:15:00Z').toLocaleString(),
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    title: 'Learning About Investing',
    embeddingId: '',
    messages: [
      {
        id: crypto.randomUUID(),
        content: 'Hi! I’m curious about starting to invest. Any advice?',
        author: 'User',
        timestamp: new Date('2022-02-15T11:00:00Z').toLocaleString(),
      },
      {
        id: crypto.randomUUID(),
        content: 'Sure! The first step is to set your financial goals and learn the basics.',
        author: 'Assistant',
        timestamp: new Date('2022-02-15T11:05:00Z').toLocaleString(),
        tag: 'Cool',
      },
      {
        id: crypto.randomUUID(),
        content: 'What’s a good way to learn the basics?',
        author: 'User',
        timestamp: new Date('2022-02-15T11:10:00Z').toLocaleString(),
      },
      {
        id: crypto.randomUUID(),
        content: 'You can start with online courses or books about stock market fundamentals.',
        author: 'Assistant',
        timestamp: new Date('2022-02-15T11:15:00Z').toLocaleString(),
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    title: 'Dealing with Work Stress',
    embeddingId: '',
    messages: [
      {
        id: crypto.randomUUID(),
        content: 'Lately, work has been overwhelming. How do I manage stress better?',
        author: 'User',
        timestamp: new Date('2022-03-10T08:00:00Z').toLocaleString(),
        tag: 'Beautiful',
      },
      {
        id: crypto.randomUUID(),
        content: 'That’s tough. Have you tried taking short breaks during the day?',
        author: 'Assistant',
        timestamp: new Date('2022-03-10T08:05:00Z').toLocaleString(),
      },
      {
        id: crypto.randomUUID(),
        content: 'Not often enough. Would that make a big difference?',
        author: 'User',
        timestamp: new Date('2022-03-10T08:10:00Z').toLocaleString(),
      },
      {
        id: crypto.randomUUID(),
        content: 'Absolutely. Regular breaks can help reset your focus and reduce tension.',
        author: 'Assistant',
        timestamp: new Date('2022-03-10T08:15:00Z').toLocaleString(),
      },
    ],
  },
];

export const EXAMPLE_CONVERSATIONS_MAP: ConversationMap = EXAMPLE_CONVERSATIONS.reduce(
  (acc, conversation) => {
    acc[conversation.id] = conversation;
    return acc;
  },
  {} as ConversationMap
);
