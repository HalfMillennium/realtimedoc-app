import { IconChevronDown, IconMoon, IconSun, IconUserCog } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Center,
  Container,
  Group,
  Menu,
  Modal,
  Title,
  useMantineColorScheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { AccountOverview, UserDetails } from '@/pages/account/AccountOverview';
import classes from './Header.module.css';

const links = [
  { link: '/about', label: 'Features' },
  {
    link: '#1',
    label: 'Learn',
    links: [
      { link: '/docs', label: 'Documentation' },
      { link: '/resources', label: 'Resources' },
      { link: '/community', label: 'Community' },
      { link: '/blog', label: 'Blog' },
    ],
  },
  { link: '/about', label: 'About' },
  { link: '/pricing', label: 'Pricing' },
  {
    link: '#2',
    label: 'Support',
    links: [
      { link: '/faq', label: 'FAQ' },
      { link: '/demo', label: 'Book a demo' },
      { link: '/forums', label: 'Forums' },
    ],
  },
];

const exampleUser: UserDetails = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatarUrl: 'https://example.com/avatar.jpg',
  membershipLevel: 'Gold',
  accountBalance: 1000,
};

export function Header() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>{item.label}</Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
          <Menu.Target>
            <a
              href={link.link}
              className={classes.link}
              onClick={(event) => event.preventDefault()}
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
          <Title order={2} style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
            _prisma_
          </Title>
          <Group gap={5} visibleFrom="sm">
            {items}
          </Group>
          <Group gap={10}>
            {colorScheme === 'dark' ? (
              <div
                onClick={() => setColorScheme('light')}
                style={{
                  padding: '10px',
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
                  padding: '10px',
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
            <div
              onClick={open}
              style={{
                padding: '10px',
                cursor: 'pointer',
                backgroundColor: colorScheme === 'dark' ? '#212121' : '#efefef',
                borderRadius: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <IconUserCog size={22} />
            </div>

            <Modal opened={opened} onClose={close} title="Account Overview" size="md" centered>
              <AccountOverview userDetails={exampleUser} />
            </Modal>
          </Group>
        </div>
      </Container>
    </div>
  );
}
