import { IconMoon, IconSun } from '@tabler/icons-react';
import { Button, Group, useMantineColorScheme } from '@mantine/core';
import styles from './ColorSchemeToggle.module.css';

export function ColorSchemeToggle() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  return (
    <>
      {colorScheme === 'dark' && (
        <div className={styles.iconContainer} onClick={() => setColorScheme('light')}>
          <IconSun size={22} />
        </div>
      )}
      {colorScheme === 'light' && (
        <div className={styles.iconContainer} onClick={() => setColorScheme('dark')}>
          <IconMoon size={18} />
        </div>
      )}
      {colorScheme === 'auto' && (
        <div className={styles.iconContainer} onClick={() => setColorScheme('light')}>
          <IconSun size={22} />
        </div>
      )}
    </>
  );
}
