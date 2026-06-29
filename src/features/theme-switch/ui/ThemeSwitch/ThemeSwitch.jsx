import { useUnit } from 'effector-react'
import { IconSun, IconMoon } from '@/shared/ui/Icon'
import { $theme, themeSet } from '../../model/theme.js'
import styles from './ThemeSwitch.module.css'

// Переключатель темы: солнце (light) / месяц (dark). Активный сегмент — на белой подложке.
export function ThemeSwitch() {
  const [theme, setTheme] = useUnit([$theme, themeSet])

  return (
    <div className={styles.tabs} role="group" aria-label="Тема оформления">
      <button
        type="button"
        className={`${styles.tab} ${theme === 'light' ? styles.active : ''}`}
        aria-pressed={theme === 'light'}
        title="Светлая тема"
        onClick={() => setTheme('light')}
      >
        <IconSun />
      </button>
      <button
        type="button"
        className={`${styles.tab} ${theme === 'dark' ? styles.active : ''}`}
        aria-pressed={theme === 'dark'}
        title="Тёмная тема"
        onClick={() => setTheme('dark')}
      >
        <IconMoon />
      </button>
    </div>
  )
}
