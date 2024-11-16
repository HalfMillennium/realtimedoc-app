import { IconChevronDown, IconMoon, IconSun } from '@tabler/icons-react';
import {
  Burger,
  Center,
  Container,
  Group,
  Menu,
  Title,
  useMantineColorScheme,
} from '@mantine/core';
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

export default function Header() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
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
    <header className={classes.header}>
      <Container size="md">
        <div className={classes.inner}>
          <Title order={2}>[ yourplace ]</Title>
          <Group gap={5} visibleFrom="sm">
            {items}
          </Group>
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
        </div>
      </Container>
    </header>
  );
}
