import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Flex, Radio, RadioGroup, Text } from '@mantine/core';
import { COLORS } from '@/common/colors';
import { SupportedDataSet, selectDataSet } from '@/store/dataSets/dataSetsSlice';
import { RootState } from '@/store/store';
import { IconFlag } from '@tabler/icons-react';

interface DataSetOptionsPanelProps {
  options: SupportedDataSet[];
}
export const DataSetOptionsPanel: React.FC<DataSetOptionsPanelProps> = ({ options }) => {
  const selectedDataSetId = useSelector((state: RootState) => state.dataSets.selectedDataSetId);
  const dispatch = useDispatch();
  const handleDataSetChange = (value: string) => {
    dispatch(selectDataSet({dataSetId: value}));
  };

  return (
    <RadioGroup
      style={{ padding: 10, paddingBottom: 20 }}
      value={selectedDataSetId}
      onChange={handleDataSetChange}
      label={
        <Flex gap="5">
          <IconFlag size={14} color={COLORS.teal} />
          <Text
            size="sm"
            style={{ marginBottom: 10, fontWeight: 600, letterSpacing: 1, color: COLORS.teal, lineHeight: 1 }}
          >
            SELECTION REQUIRED
          </Text>
        </Flex>
      }
    >
      <Flex style={{ flexDirection: 'column', gap: 10 }}>
        {options.map((option) => (
          <Radio
            color={COLORS.teal}
            value={option.id}
            label={<Text style={{ cursor: 'pointer', lineHeight: 1 }}>{option.title}</Text>}
            description={option.subtitle}
          />
        ))}
      </Flex>
    </RadioGroup>
  );
};
