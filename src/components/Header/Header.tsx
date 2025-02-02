import { useEffect } from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/clerk-react';
import {
  IconAward,
  IconFileNeutral,
  IconMoon,
  IconSun,
  IconTrophyFilled,
  IconUser,
} from '@tabler/icons-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Flex, Group, Image, Text, useMantineColorScheme } from '@mantine/core';
import { SegmentMenuOptions } from '@/pages/home/menus/segment_menu';
import { setCurrentSegmentMenuOption } from '@/store/homePageActivity/homePageActivitySlice';
import { AppDispatch } from '@/store/store';
import { getUserSubscriptions } from '@/store/subscriptions/subscriptionsSlice';
import darkModeLogo from '../../assets/logo_dark_mode.png';
import lightModeLogo from '../../assets/logo_light_mode.png';
import { UserSubscriptionIndicator } from './UserSubscriptionIndicator';
import classes from './Header.module.css';

const links = [
  { link: '/features', label: 'Features' },
  {
    link: '/faq',
    label: 'FAQ',
  },
  {
    link: '/',
    label: 'How It Works',
    action: setCurrentSegmentMenuOption({ menuOption: SegmentMenuOptions.HowItWorks }),
  },
  { link: '/pricing', label: 'Pricing' },
  {
    link: '/',
    label: 'Contact',
    action: setCurrentSegmentMenuOption({ menuOption: SegmentMenuOptions.AnyQuestions }),
  },
];

export function Header() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useUser();
  const items = links.map((link) => {
    return (
      <a
        key={link.label}
        href={link.link}
        className={classes.link}
        onClick={(event) => {
          event.preventDefault();
          navigate(link.link);
          if (!!link.action) {
            dispatch(link.action);
          }
        }}
      >
        {link.label}
      </a>
    );
  });
  useEffect(() => {
    const userEmail = user.user?.emailAddresses[0].emailAddress;
    if (userEmail) {
      dispatch(getUserSubscriptions({ userEmail: userEmail }));
    } else {
      console.error('User ID not found.');
    }
  }, [user, dispatch]);

  return (
    <div
      style={{
        height: 'rem(56px)',
        background: `linear-gradient(to right, ${colorScheme === 'dark' ? '#00000040' : '#ffffff'} 0%, ${colorScheme === 'dark' ? '#00000020' : '#ffffff'} 100%)`,
        boxShadow: colorScheme !== 'dark' ? '0 4px 6px #00000010' : '',
      }}
    >
      <Container>
        <div className={classes.inner}>
          <Image
            src={colorScheme === 'dark' ? darkModeLogo : lightModeLogo}
            style={{ width: 'auto', height: 20, cursor: 'pointer' }}
            onClick={() => navigate('/')}
          />
          <Group gap={5} visibleFrom="sm">
            {items}
          </Group>
          <Flex direction="row" justify="space-between" align="center" gap={20}>
            {colorScheme === 'dark' ? (
              <div
                onClick={() => setColorScheme('light')}
                style={{
                  padding: 8,
                  cursor: 'pointer',
                  backgroundColor: '#212121',
                  borderRadius: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <IconSun size={22} />
              </div>
            ) : (
              <div
                onClick={() => setColorScheme('dark')}
                style={{
                  padding: 8,
                  cursor: 'pointer',
                  backgroundColor: '#efefef',
                  borderRadius: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <IconMoon size={18} />
              </div>
            )}
            <SignedOut>
              <SignInButton>
                <Button
                  radius={10}
                  style={{ paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10 }}
                  variant="light"
                  color={colorScheme === 'dark' ? 'orange' : 'pink'}
                >
                  <Flex direction="row" gap="5" style={{ alignItems: 'center' }}>
                    <IconUser size={18} />
                    <Text style={{ fontSize: 14, fontWeight: 500 }}>Sign In / Register</Text>
                  </Flex>
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedIn>
              <UserSubscriptionIndicator />
            </SignedIn>
          </Flex>
        </div>
      </Container>
    </div>
  );
}
