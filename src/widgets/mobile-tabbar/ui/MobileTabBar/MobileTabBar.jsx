import { NavLink } from 'react-router-dom'
import { IconGlobe, IconUser } from '@/shared/ui/Icon'
import { ROUTES } from '@/shared/config/routes'
import { useViewTransitionNavigate } from '@/shared/lib/viewTransition'
import styles from './MobileTabBar.module.css'

// Нижняя навигация (только мобайл): Домены / Аккаунт. Активная вкладка — по маршруту.
const TABS = [
  { to: ROUTES.home, label: 'Домены', Icon: IconGlobe },
  { to: ROUTES.account, label: 'Аккаунт', Icon: IconUser },
]

export function MobileTabBar() {
  const go = useViewTransitionNavigate()
  return (
    <nav className={styles.bar}>
      {TABS.map(({ to, label, Icon }) => (
        <NavLink
          key={to}
          to={to}
          onClick={(e) => {
            // Равноправные вкладки — переход с кроссфейдом (без направления).
            e.preventDefault()
            go(to)
          }}
          className={({ isActive }) => `${styles.tab} ${isActive ? styles.active : ''}`}
        >
          <Icon width="24" height="24" />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
