import * as React from 'react';
import { IconBooks, IconCircleDashed, IconCircleDashedCheck, IconX } from '@tabler/icons-react';
import { Button, Card, Divider, Flex, Text, useMantineColorScheme } from '@mantine/core';
import { COLORS } from '@/common/colors';
import { SupportedDataSet } from '../Researcher.page';
import { DataSetOptionsPanel } from './DataSetOptionsPanel';

interface ResearcherRightSidebarProps {
  availableDataSets: SupportedDataSet[];
  selectedDataSet: SupportedDataSet | undefined;
  setSelectedDataSet: (dataSet: SupportedDataSet | undefined) => void;
}

export const ResearcherRightSidebar: React.FC<ResearcherRightSidebarProps> = ({
  selectedDataSet,
  setSelectedDataSet,
  availableDataSets,
}) => {
  const { colorScheme } = useMantineColorScheme();
  return (
    <div style={{ width: '20%', padding: '8px' }}>
      <Card withBorder style={{ gap: 10 }}>
        <Flex
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 5,
            width: '100%',
          }}
        >
          <Flex
            style={{
              flexDirection: 'row',
              gap: 10,
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', gap: 5, alignItems: 'center', paddingBottom: '5px' }}>
              <IconBooks size={18} color={COLORS.peach} />
              <Text style={{ fontSize: 16, fontWeight: 300 }}>Live Datasets</Text>
            </div>
          </Flex>
          <Flex>
            <Text style={{ fontSize: 12, fontWeight: 300, opacity: 0.7 }}>
              Combine the information in your uploaded documents with Prisma's up-to-date data
              libraries to further enhance generated insights.
            </Text>
          </Flex>
        </Flex>
        <Divider my="sm" />
        <div>
          {availableDataSets.map((dataset) => (
            <>
              <Card
                key={dataset.id}
                withBorder
                shadow="sm"
                style={{
                  marginBottom: '8px',
                  cursor: 'pointer',
                  backgroundColor: selectedDataSet?.id === dataset.id ? COLORS.teal : 'transparent',
                }}
                onClick={() => setSelectedDataSet(dataset)}
              >
                <div
                  style={{
                    display: 'flex',
                    gap: 10,
                    padding: 10,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}
                >
                  {selectedDataSet?.id !== dataset.id && <IconCircleDashed size={16} />}
                  {selectedDataSet?.id === dataset.id && (
                    <IconCircleDashedCheck size={16} color="white" />
                  )}
                  <div>
                    <input
                      type="radio"
                      name="dataset"
                      id={`dataset:${dataset.id}`}
                      style={{ display: 'none' }}
                    />
                    <label htmlFor={`dataset:${dataset.id}`} style={{ cursor: 'pointer' }}>
                      <Text
                        size="sm"
                        style={{
                          fontWeight: 300,
                          color:
                            !!selectedDataSet && selectedDataSet.id === dataset.id
                              ? 'white'
                              : colorScheme === 'dark'
                                ? '#f1f1f1'
                                : 'black',
                        }}
                      >
                        {dataset.label}
                      </Text>
                    </label>
                  </div>
                </div>
              </Card>
              {!!dataset.options && !!selectedDataSet && selectedDataSet.id === dataset.id && (
                <DataSetOptionsPanel options={dataset.options} />
              )}
            </>
          ))}
        </div>
        <Flex style={{ justifyContent: 'flex-end' }}>
          <Button
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              padding: '5px 10px',
              borderRadius: 5,
              backgroundColor: '#FEC98F',
              width: 'auto',
            }}
            onClick={() => setSelectedDataSet(undefined)}
          >
            <IconX size={14} color="black" style={{ marginRight: 5 }} />
            <Text style={{ fontSize: 12, fontWeight: 300, color: 'black', display: 'flex' }}>
              Reset Selection
            </Text>
          </Button>
        </Flex>
      </Card>
    </div>
  );
};
