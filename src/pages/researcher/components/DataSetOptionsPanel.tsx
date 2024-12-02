import React from 'react';
import { Flex, Radio, RadioGroup, Text, useMantineColorScheme } from '@mantine/core';
import { COLORS } from '@/common/colors';
import { DataSetOption } from '../Researcher.page';

interface DataSetOptionsPanelProps {
  options: DataSetOption[];
}
export const DataSetOptionsPanel: React.FC<DataSetOptionsPanelProps> = ({ options }) => {
  const { colorScheme } = useMantineColorScheme();
  const [value, setValue] = React.useState<string>(options[0].id);

  return (
    <RadioGroup
      style={{ padding: 10, paddingBottom: 20 }}
      value={value}
      color={colorScheme === 'dark' ? 'white' : 'black'}
      onChange={setValue}
      label={
        <Text
          size="sm"
          style={{ marginBottom: 10, fontWeight: 300, letterSpacing: 1, color: COLORS.teal }}
        >
          SELECTION REQUIRED
        </Text>
      }
    >
      <Flex style={{ flexDirection: 'column', gap: 10 }}>
        {options.map((option) => (
          <Radio value={option.id} label={option.title} description={option.subtitle} />
        ))}
      </Flex>
    </RadioGroup>
  );
};
