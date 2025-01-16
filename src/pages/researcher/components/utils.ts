import { Conversation, ConversationMap } from '@/store/conversations/conversationsSlice';

export const EXAMPLE_CONVERSATIONS: Conversation[] = [
  {
    id: crypto.randomUUID(),
    title: 'Discussing Productivity Habits',
    messages: [
      {
        id: crypto.randomUUID(),
        content: 'Hi there! What’s a productivity habit you find effective?',
        userName: 'User',
        timestamp: new Date('2022-01-01T09:00:00Z').toLocaleString(),
      },
      {
        id: crypto.randomUUID(),
        content: 'Hey! I’d say planning my day in advance really helps.',
        userName: 'Assistant',
        timestamp: new Date('2022-01-01T09:05:00Z').toLocaleString(),
        tag: 'Pretty Nice',
      },
      {
        id: crypto.randomUUID(),
        content: 'Do you have a specific way you like to plan?',
        userName: 'User',
        timestamp: new Date('2022-01-01T09:10:00Z').toLocaleString(),
      },
      {
        id: crypto.randomUUID(),
        content: 'Yes! I use time blocks to organize tasks by priority.',
        userName: 'Assistant',
        timestamp: new Date('2022-01-01T09:15:00Z').toLocaleString(),
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    title: 'Learning About Investing',
    messages: [
      {
        id: crypto.randomUUID(),
        content: 'Hi! I’m curious about starting to invest. Any advice?',
        userName: 'User',
        timestamp: new Date('2022-02-15T11:00:00Z').toLocaleString(),
      },
      {
        id: crypto.randomUUID(),
        content: 'Sure! The first step is to set your financial goals and learn the basics.',
        userName: 'Assistant',
        timestamp: new Date('2022-02-15T11:05:00Z').toLocaleString(),
        tag: 'Cool',
      },
      {
        id: crypto.randomUUID(),
        content: 'What’s a good way to learn the basics?',
        userName: 'User',
        timestamp: new Date('2022-02-15T11:10:00Z').toLocaleString(),
      },
      {
        id: crypto.randomUUID(),
        content: 'You can start with online courses or books about stock market fundamentals.',
        userName: 'Assistant',
        timestamp: new Date('2022-02-15T11:15:00Z').toLocaleString(),
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    title: 'Dealing with Work Stress',
    messages: [
      {
        id: crypto.randomUUID(),
        content: 'Lately, work has been overwhelming. How do I manage stress better?',
        userName: 'User',
        timestamp: new Date('2022-03-10T08:00:00Z').toLocaleString(),
        tag: 'Beautiful',
      },
      {
        id: crypto.randomUUID(),
        content: 'That’s tough. Have you tried taking short breaks during the day?',
        userName: 'Assistant',
        timestamp: new Date('2022-03-10T08:05:00Z').toLocaleString(),
      },
      {
        id: crypto.randomUUID(),
        content: 'Not often enough. Would that make a big difference?',
        userName: 'User',
        timestamp: new Date('2022-03-10T08:10:00Z').toLocaleString(),
      },
      {
        id: crypto.randomUUID(),
        content: 'Absolutely. Regular breaks can help reset your focus and reduce tension.',
        userName: 'Assistant',
        timestamp: new Date('2022-03-10T08:15:00Z').toLocaleString(),
      },
    ],
  },
];

export const conversationsMapFromArray = (conversations: Conversation[]) => {
  return conversations.reduce((acc, conversation) => {
    acc[conversation.id] = conversation;
    return acc;
  }, {} as ConversationMap);
};

export const EXAMPLE_CONVERSATIONS_MAP: ConversationMap = conversationsMapFromArray(EXAMPLE_CONVERSATIONS)
