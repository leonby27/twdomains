import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUnit } from 'effector-react'
import { $user, logout, UserBadge } from '@/entities/session'
import { IconBurger } from '@/shared/ui/Icon'
import { ROUTES } from '@/shared/config/routes'
import { MobileMenu } from '../MobileMenu/MobileMenu.jsx'
import styles from './Header.module.css'

// Шапка панели: логотип + подпись · разделитель │ Госуслуги │ пользователь · выход.
// На мобильном — бургер, открывающий off-canvas меню.
export function Header() {
  const navigate = useNavigate()
  const [user, onLogout] = useUnit([$user, logout])
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    onLogout()
    navigate(ROUTES.login)
    setMenuOpen(false)
  }

  return (
    <header className={styles.appbar}>
      <div className={styles.inner}>
        <Link to={ROUTES.home} className={styles.brand}>
          <img className={styles.logo} src="/logo.svg" alt="Timeweb" />
          <span className={styles.caption}>Панель регистратора доменов</span>
        </Link>

        <div className={styles.right}>
          <span className={styles.gos} title="ЕСИА · Госуслуги">
            <img src="/gos.svg" alt="Госуслуги" width="32" height="32" />
          </span>

          <UserBadge user={user} />

          <button className={styles.logout} title="Выйти" onClick={handleLogout}>
            <img src="/logout.svg" alt="Выйти" width="24" height="24" />
          </button>
        </div>

        {/* Мобильное меню-бургер (показывается только на узких экранах) */}
        <button className={styles.burger} title="Меню" onClick={() => setMenuOpen(true)}>
          <IconBurger width="24" height="24" />
        </button>
      </div>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        user={user}
        onLogout={handleLogout}
      />
    </header>
  )
}
