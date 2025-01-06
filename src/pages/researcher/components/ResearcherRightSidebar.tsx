import * as React from 'react';
import { IconBooks, IconCircleDashed, IconCircleDashedCheck, IconX } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Divider, Flex, Text, useMantineColorScheme } from '@mantine/core';
import { COLORS } from '@/common/colors';
import {
  deselectAllDataSets,
  selectDataSet,
  SupportedDataSet,
} from '@/store/dataSets/dataSetsSlice';
import { AppDispatch, RootState } from '@/store/store';
import { DataSetOptionsPanel } from './DataSetOptionsPanel';

export const ResearcherRightSideBar: React.FC = () => {
  const { colorScheme } = useMantineColorScheme();
  const selectedDataSetId = useSelector((state: RootState) => state.dataSets.selectedDataSetId);
  const dispatch = useDispatch<AppDispatch>();
  const dataSetOptions: SupportedDataSet[] = [];
  const availableDataSets = useSelector((state: RootState) =>
    state.dataSets.availableDataSets.filter((dataSet) => {
      if (dataSet.isDataSetOption) {
        dataSetOptions.push(dataSet);
        return false;
      }
      return true;
    })
  );

  React.useEffect(() => {
    console.log('selectedDataSetId change:', selectedDataSetId);
  }, [selectedDataSetId]);

  const isDataSetSelected = (dataSet: SupportedDataSet) => {
    return (
      !!selectedDataSetId &&
      (selectedDataSetId === dataSet.id || dataSet.children?.includes(selectedDataSetId))
    );
  };
  return (
    <div style={{ width: '20%', padding: '8px' }}>
      <Card withBorder style={{ gap: 10 }} radius={10}>
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
              <Text style={{ fontSize: 16, fontWeight: 300 }}>Live DataSets</Text>
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
        <Flex direction="column" gap="10">
          {availableDataSets.map((dataSet) => (
            <>
              <Card
                key={dataSet.id}
                withBorder
                shadow="sm"
                style={{
                  marginBottom: 10,
                  cursor: 'pointer',
                  borderRadius: 5,
                  backgroundColor: isDataSetSelected(dataSet) ? COLORS.teal : 'transparent',
                }}
                onClick={() => dispatch(selectDataSet({ dataSetId: dataSet.id }))}
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
                  {!isDataSetSelected(dataSet) && <IconCircleDashed size={16} />}
                  {isDataSetSelected(dataSet) && <IconCircleDashedCheck size={16} color="white" />}
                  <div>
                    <input
                      type="radio"
                      name="dataSet"
                      id={`dataSet:${dataSet.id}`}
                      style={{ display: 'none' }}
                    />
                    <label htmlFor={`dataSet:${dataSet.id}`} style={{ cursor: 'pointer' }}>
                      <Text
                        size="sm"
                        style={{
                          fontWeight: 300,
                          color: isDataSetSelected(dataSet)
                            ? 'white'
                            : colorScheme === 'dark'
                              ? '#f1f1f1'
                              : 'black',
                        }}
                      >
                        {dataSet.label}
                      </Text>
                    </label>
                  </div>
                </div>
              </Card>
              {!!dataSet.children &&
                !!selectedDataSetId &&
                (selectedDataSetId === dataSet.id ||
                  dataSet.children.includes(selectedDataSetId)) && (
                  <DataSetOptionsPanel options={dataSetOptions} />
                )}
            </>
          ))}
        </Flex>
        <Flex style={{ justifyContent: 'flex-end' }}>
          <Button
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              padding: '5px 10px',
              borderRadius: 10,
              width: 'auto',
            }}
            color={colorScheme === 'dark' ? 'white' : 'black'}
            variant="light"
            onClick={() => dispatch(deselectAllDataSets())}
          >
            <IconX size={14} style={{ marginRight: 5 }} />
            <Text style={{ fontSize: 12, fontWeight: 300, display: 'flex' }}>Reset Selection</Text>
          </Button>
        </Flex>
      </Card>
    </div>
  );
};
