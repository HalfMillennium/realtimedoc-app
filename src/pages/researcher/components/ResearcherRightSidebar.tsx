import * as React from 'react';
import { IconBooks, IconCircleDashed, IconCircleDashedCheck, IconX } from '@tabler/icons-react';
import {
  Button,
  Card,
  Divider,
  Flex,
  LoadingOverlay,
  Text,
  useMantineColorScheme,
} from '@mantine/core';
import { SupportedDataSet } from '../Researcher.page';

interface ResearcherRightSidebarProps {
  availableDataSets: SupportedDataSet[];
  loadingDataSet: boolean;
  setLoadingDataSet: (loading: boolean) => void;
  selectedDataSet: SupportedDataSet | undefined;
  setSelectedDataSet: (dataSet: SupportedDataSet | undefined) => void;
}

export const ResearcherRightSidebar: React.FC<ResearcherRightSidebarProps> = ({
  selectedDataSet,
  setSelectedDataSet,
  loadingDataSet,
  availableDataSets,
}) => {
  const { colorScheme } = useMantineColorScheme();
  return (
    <div style={{ width: '20%', padding: '8px' }}>
      <Card withBorder>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Flex style={{ flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
              <IconBooks size={18} />
              <Text style={{ fontSize: 16, fontWeight: 300 }}>Live Datasets</Text>
            </div>
            <Text style={{ fontSize: 12, fontWeight: 300, opacity: 0.7 }}>
              Combine the information in your uploaded documents with Prisma's up-to-date data
              libraries to further enhance generated insights.
            </Text>
          </Flex>
          <Flex>
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
                Reset
              </Text>
            </Button>
          </Flex>
        </div>
        <Divider my="sm" />
        <div>
          {availableDataSets.map((dataset, index) => (
            <Card
              key={index}
              withBorder
              shadow="sm"
              style={{
                marginBottom: '8px',
                cursor: 'pointer',
                backgroundColor: selectedDataSet?.id === dataset.id ? '#f1f1f1' : 'transparent',
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
                  <>
                    <LoadingOverlay
                      visible={loadingDataSet}
                      zIndex={1000}
                      loaderProps={{ color: '#FEC98F', type: 'bars' }}
                    />
                    <IconCircleDashedCheck size={16} color="green" />
                  </>
                )}
                <div>
                  <input
                    type="radio"
                    name="dataset"
                    id={`dataset-${index}`}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor={`dataset-${index}`} style={{ cursor: 'pointer' }}>
                    <Text
                      size="sm"
                      style={{
                        fontWeight: 300,
                        color:
                          !!selectedDataSet && selectedDataSet.id === dataset.id
                            ? 'black'
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
          ))}
        </div>
      </Card>
    </div>
  );
};
