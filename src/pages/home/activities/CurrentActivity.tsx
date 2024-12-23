import { useState } from 'react';
import { SegmentedControl, useMantineColorScheme } from '@mantine/core';
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
        padding: 50,
        justifyContent: 'center',
        backgroundColor: colorScheme === 'dark' ? '#212121' : '#efefef',
        borderTopLeftRadius: '2rem',
        borderBottomLeftRadius: '2rem',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <SegmentedControl
        withItemsBorders={false}
        style={{
          position: 'absolute',
          top: 20,
          left: 20,
          backgroundColor: 'transparent',
        }}
        value={segmentMenuOption}
        onChange={(option: string) => setSegmentMenuOption(option as SegmentMenuOptions)}
        data={allSegmentMenuOptions}
      />
      {segmentMenuOption === SegmentMenuOptions.HowItWorks && <HowItWorks />}
      {segmentMenuOption === SegmentMenuOptions.AnyQuestions && (
        <ContactForm
          segmentMenuOption={segmentMenuOption}
          setSegmentMenuOption={setSegmentMenuOption}
        />
      )}
    </div>
  );
};
