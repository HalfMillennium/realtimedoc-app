import React from 'react';
import { Text, useMantineColorScheme } from '@mantine/core';

interface ChatHistoryListItemProps {
    title: string;
    entryId: string;
}
export const ChatHistoryListItem: React.FC<ChatHistoryListItemProps> = ({title}) => {
    const { colorScheme } = useMantineColorScheme();
    return (
        <Text
        size="sm"
        mt="sm"
        style={{
          borderRadius: 5,
          padding: 10,
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colorScheme === 'light' ? '#f0f0f0' : 'black')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
      >
        {title}
      </Text>
    )
}