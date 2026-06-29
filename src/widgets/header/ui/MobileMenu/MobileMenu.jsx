import { IconLock } from '@/shared/ui/Icon'
import styles from './MobileMenu.module.css'

// Off-canvas меню (правая панель) с карточкой пользователя и выходом.
// Открывается бургером в шапке на мобильном.
export function MobileMenu({ open, onClose, user, onLogout }) {
  return (
    <div
      className={`${styles.scrim} ${open ? styles.open : ''}`}
      onClick={onClose}
      aria-hidden={!open}
    >
      <aside className={styles.panel} onClick={(e) => e.stopPropagation()}>
        <div className={styles.card}>
          <img className={styles.gos} src="/gos.svg" alt="Госуслуги" width="40" height="40" />
          {user && (
            <div className={styles.info}>
              <div className={styles.name}>
                {user.name}
                {user.esiaVerified && (
                  <img
                    className={styles.verified}
                    src="/verified.svg"
                    alt="Верифицирован через ЕСИА"
                    width="18"
                    height="18"
                  />
                )}
              </div>
              <div className={styles.sub}>Верифицирован через ЕСИА</div>
            </div>
          )}
        </div>

        <button className={styles.logout} onClick={onLogout}>
          <img src="/logout.svg" alt="" width="20" height="20" />
          Выйти из аккаунта
        </button>
      </aside>
    </div>
  )
}
