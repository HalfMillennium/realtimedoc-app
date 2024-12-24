import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { IconChevronDown, IconMoon, IconSun, IconUser } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Center,
  Container,
  Flex,
  Group,
  Image,
  Menu,
  Text,
  useMantineColorScheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import darkModeLogo from '../../assets/logo_dark_mode.png';
import lightModeLogo from '../../assets/logo_light_mode.png';
import { AccountOverview } from '../../pages/account/AccountOverview';
import classes from './Header.module.css';

const links = [
  { link: '/about', label: 'Features' },
  {
    link: '#1',
    label: 'Learn',
    links: [{ link: '/faq', label: 'FAQ' }],
  },
  { link: '/about', label: 'About' },
  { link: '/pricing', label: 'Pricing' },
  {
    link: '#2',
    label: 'Support',
    links: [{ link: '/contact', label: 'Contact' }],
  },
];

export function Header() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link} onClick={() => navigate(item.link)}>
        {item.label}
      </Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
          <Menu.Target>
            <a
              className={classes.link}
              onClick={(event) => {
                event.preventDefault();
              }}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size="0.9rem" stroke={1.5} />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <a
        key={link.label}
        href={link.link}
        className={classes.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </a>
    );
  });

  return (
    <div className={classes.header}>
      <Container size="md">
        <div className={classes.inner}>
          <Image
            src={colorScheme === 'dark' ? darkModeLogo : lightModeLogo}
            style={{ width: 'auto', height: 20, cursor: 'pointer' }}
            onClick={() => navigate('/')}
          />
          <Group gap={5} visibleFrom="sm">
            {items}
          </Group>
          <Group gap={10}>
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
          </Group>
        </div>
      </Container>
    </div>
  );
}
