import { useState } from 'react';
import { Flex, SegmentedControl, useMantineColorScheme } from '@mantine/core';
import { allSegmentMenuOptions, SegmentMenuOptions } from '../menus/segment_menu';
import { ContactForm } from './ContactForm';
import { HowItWorks } from './HowItWorks';

export const CurrentActivity = () => {
  const { colorScheme } = useMantineColorScheme();
  const [segmentMenuOption, setSegmentMenuOption] = useState<SegmentMenuOptions>(
    SegmentMenuOptions.HowItWorks
  );
  return (
    <div
      style={{
        display: 'flex',
        flex: 1,
        position: 'relative',
        justifyContent: 'space-between',
        backgroundColor: colorScheme === 'dark' ? '#212121' : '#efefef',
        borderTopLeftRadius: '2rem',
        borderBottomLeftRadius: '2rem',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 30
      }}
    >
      <Flex p="lg" style={{width: '100%', justifyContent: 'flex-start'}}>
        <SegmentedControl
          withItemsBorders={false}
          style={{
            backgroundColor: 'transparent',
          }}
          radius={10}
          value={segmentMenuOption}
          onChange={(option: string) => setSegmentMenuOption(option as SegmentMenuOptions)}
          data={allSegmentMenuOptions}
        />
      </Flex>
      {segmentMenuOption === SegmentMenuOptions.HowItWorks && <HowItWorks />}
      {segmentMenuOption === SegmentMenuOptions.AnyQuestions && (
        <ContactForm
        />
      )}
    </div>
  );
};
