import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Text, Title, useMantineColorScheme } from '@mantine/core';
import { CurrentActivity } from './activities/CurrentActivity';

export function HomePage() {
  const { colorScheme } = useMantineColorScheme();
  const navigate = useNavigate();
  const handleTryItNowClick = () => {
    navigate('/researcher');
  };
  useEffect(() => {
    fetch('/api/hello')
      .then((res) => res.json())
      .then((data) => console.log('Message from server:', data));
  }, []);
  return (
    <div
      style={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        height: '100%',
        gap: 100,
        paddingTop: 100,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
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
            alignItems: 'center',
            flexDirection: 'column',
            gap: 10,
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
            Welcome to
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
            realtimedoc
          </Text>
          <div style={{ display: 'flex', width: 500, textAlign: 'center' }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 400,
              }}
            >
              Upload PDFs. Ask anything. Find everything—powered by AI.
            </Text>
          </div>
          <div style={{ display: 'flex', marginTop: 20 }}>
            <Button
              variant="light"
              color={colorScheme === 'dark' ? 'orange' : 'pink'}
              onClick={handleTryItNowClick}
            >
              Try It Now
            </Button>
          </div>
        </div>
        <CurrentActivity />
      </div>
    </div>
  );
}
