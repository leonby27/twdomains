import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useUnit } from 'effector-react'
import { $user, UserBadge } from '@/entities/session'
import { openLogoutModal } from '@/features/logout'
import { openProfileModal } from '@/features/profile'
import { $theme } from '@/features/theme-switch'
import { reloadRequested } from '@/shared/model/reload'
import { asset } from '@/shared/lib/asset'
import { ROUTES } from '@/shared/config/routes'
import styles from './Header.module.css'

// Шапка панели: логотип + подпись · разделитель │ Госуслуги │ пользователь · выход.
// На мобильном шапка — только логотип; навигация (Домены/Аккаунт) — в нижнем таб-баре.
export function Header() {
  const [user, openLogout, openProfile, theme, reload] = useUnit([
    $user,
    openLogoutModal,
    openProfileModal,
    $theme,
    reloadRequested,
  ])
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLogout = () => openLogout()

  return (
    <header className={`${styles.appbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <Link
          to={ROUTES.home}
          className={styles.brand}
          onClick={() => {
            reload()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          <img
            className={styles.logo}
            src={theme === 'dark' ? asset('/logo-dark.svg') : asset('/logo.svg')}
            alt="Timeweb"
          />
          <span className={styles.caption}>Панель регистратора доменов</span>
        </Link>

        <div className={styles.right}>
          <span className={styles.gos} title="ЕСИА · Госуслуги">
            <img src={asset('/gos.svg')} alt="Госуслуги" width="32" height="32" />
          </span>

          <UserBadge user={user} onClick={openProfile} />

          <button
            className={styles.logout}
            data-tip="Выйти из аккаунта"
            onClick={handleLogout}
          >
            <img src={asset('/logout.svg')} alt="Выйти" width="24" height="24" />
          </button>
        </div>

      </div>
    </header>
  )
}
