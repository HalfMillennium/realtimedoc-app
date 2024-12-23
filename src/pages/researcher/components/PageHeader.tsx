import React from 'react';
import { IconCrown, IconDotsVertical, IconHelp } from '@tabler/icons-react';
import { Button, Center, Divider, Flex, Group, Text, useMantineColorScheme } from '@mantine/core';
import { COLORS } from '@/common/colors';

export const ResearcherPageHeader: React.FC = () => {
  const { colorScheme } = useMantineColorScheme();
  const lightOnDarkMode = colorScheme === 'dark' ? 'white' : '#212121';

  return (
    <Flex>
      <Center style={{ marginBottom: '1rem', justifyContent: 'space-between', width: '100%' }}>
        {/* Title and Description */}
        <div>
          <Text style={{ fontWeight: 700, fontSize: 36 }} size="xl">
            Research Suite
          </Text>
          <Text size="sm" color="dimmed">
            Upload your files to generate actionable insights, or connect live external databases
            for real-time data updates and insights.
          </Text>
        </div>
        <Group
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 15,
            borderRadius: 10,
            borderColor: lightOnDarkMode,
            gap: 15,
          }}
        >
          <Flex
            style={{
              justifyContent: 'center',
              background: `linear-gradient(to right, #ff9a9e, ${COLORS.teal})`,
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              borderRadius: 10,
            }}
          >
            <Button
              fullWidth
              radius={10}
              p="sm"
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                backgroundColor: 'transparent',
                transition: 'background 0.3s ease',
              }}
            >
              <IconCrown size={14} style={{ marginRight: 10, color: 'white' }} />
              <Text style={{ fontSize: 14 }}>Upgrade to Premium</Text>
            </Button>
          </Flex>
          <Button
            variant="outline"
            color={colorScheme === 'dark' ? COLORS.mantineDefaultGray : COLORS.mantineDefaultBlack}
            style={{
              boxShadow: '0px 5px 5px #00000010',
            }}
          >
            <IconHelp size={18} style={{ marginRight: 5 }} />
            Ask For Help
          </Button>
          <IconDotsVertical
            size={24}
            color={colorScheme === 'dark' ? COLORS.mantineDefaultGray : COLORS.mantineDefaultBlack}
          />
        </Group>
      </Center>
      <Divider />
    </Flex>
  );
};

export default ResearcherPageHeader;
