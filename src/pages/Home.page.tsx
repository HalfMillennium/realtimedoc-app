import { useState } from 'react';
import {
  NumberInput,
  PasswordInput,
  SegmentedControl,
  Select,
  Text,
  Textarea,
  TextInput,
  Title,
  useMantineColorScheme,
} from '@mantine/core';
import Header from '@/components/Header/Header';

export function HomePage() {
  const { colorScheme } = useMantineColorScheme();
  const [rightHandMenuOption, setRightHandMenuOption] = useState<
    'New hang' | 'Past hang' | 'Future hangs'
  >('New hang');
  return (
    <div style={{ height: '100%' }}>
      <Header />
      <div
        style={{
          display: 'flex',
          width: '100%',
          flexDirection: 'row',
          height: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            flex: 1,
            height: '50rem',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <Title
            order={1}
            style={{
              fontSize: '3rem',
              fontWeight: 200,
              textAlign: 'center',
            }}
          >
            Let's do
          </Title>

          <Text
            style={{
              fontSize: '7rem',
              fontWeight: 700,
              color: 'pink',
              textAlign: 'center',
            }}
            inherit
            variant="gradient"
            component="span"
            gradient={{ from: 'pink', to: 'yellow' }}
          >
            [ your place. ]
          </Text>
          <div style={{ display: 'flex', flex: 1 }}>
            <Text
              style={{
                fontSize: '1rem',
                fontWeight: 400,
              }}
            >
              Unless you're busy. In that case, no worries.
            </Text>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flex: 1,
            position: 'relative',
            justifyContent: 'center',
            backgroundColor: colorScheme === 'dark' ? '#212121' : '#efefef',
            borderTopLeftRadius: '2rem',
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
            value={rightHandMenuOption}
            onChange={(option: string) =>
              setRightHandMenuOption(option as 'New hang' | 'Past hang' | 'Future hangs')
            }
            data={['New Event', 'Past Events', 'Upcoming Events']}
          />

          <TextInput label="Event Name" placeholder="Enter event name" style={{ width: '300px' }} />

          <TextInput label="Host Name" placeholder="Enter your name" style={{ width: '300px' }} />

          <NumberInput
            label="Number of Guests"
            placeholder="Enter number of guests"
            style={{ width: '300px' }}
          />

          <Select
            label="Location"
            placeholder="Select location"
            data={[
              { value: 'home', label: 'At Home' },
              { value: 'park', label: 'At the Park' },
              { value: 'restaurant', label: 'Restaurant' },
            ]}
            style={{ width: '300px' }}
          />

          <TextInput
            label="Event Date"
            placeholder="Enter date (MM/DD/YYYY)"
            style={{ width: '300px' }}
          />

          <Textarea
            label="Additional Details"
            placeholder="Add any additional details"
            style={{ width: '300px' }}
          />
        </div>
      </div>
    </div>
  );
}
