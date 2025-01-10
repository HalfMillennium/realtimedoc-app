import { useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { Button, Flex, Image, Text, useMantineColorScheme } from '@mantine/core';
import darkModeLogo from '../../assets/logo_dark_mode.png';
import lightModeLogo from '../../assets/logo_light_mode.png';
import { CurrentActivity } from './activities/CurrentActivity';

export function HomePage() {
  const { colorScheme } = useMantineColorScheme();
  const navigate = useNavigate();
  const handleTryItNowClick = () => {
    navigate('/researcher');
  };
  const { isSignedIn } = useAuth();
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
      <Flex
        direction="row"
        style={{
          width: '100%',
          alignContent: 'flex-start',
          height: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            flex: 1,
            height: '100%',
            alignItems: 'center',
            flexDirection: 'column',
            gap: 40,
          }}
        >
          <Text
            style={{
              fontSize: 28,
              fontWeight: 400,
              textAlign: 'center',
            }}
          >
            Welcome to
          </Text>
          <Image
            src={colorScheme === 'dark' ? darkModeLogo : lightModeLogo}
            style={{ width: 'auto', height: 85, cursor: 'pointer' }}
            onClick={() => navigate('/')}
          />
          <div style={{ display: 'flex', width: 500, textAlign: 'center' }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: 400,
              }}
            >
              Upload PDFs. Ask anything. Find everything—powered by AI.
            </Text>
          </div>
          <div style={{ display: 'flex', marginTop: 20 }}>
            <Button
              variant="light"
              radius={10}
              color={colorScheme === 'dark' ? 'orange' : 'pink'}
              onClick={handleTryItNowClick}
            >
              {!isSignedIn ? 'Try It Now' : 'Enter the Research Suite'}
            </Button>
          </div>
        </div>
        <CurrentActivity />
      </Flex>
    </div>
  );
}
