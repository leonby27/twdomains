import { EsiaDetails } from '@/entities/session'
import { asset } from '@/shared/lib/asset'
import { IconLogout } from '@/shared/ui/Icon'
import styles from './MobileMenu.module.css'

// Bottom sheet меню: выезжает снизу. Сверху — хваталка и переключатель темы,
// затем блок пользователя, внизу — выход. Открывается бургером в шапке на мобильном.
export function MobileMenu({ open, onClose, user, onLogout }) {
  return (
    <div
      className={`${styles.scrim} ${open ? styles.open : ''}`}
      onClick={onClose}
      aria-hidden={!open}
    >
      <aside className={styles.panel} onClick={(e) => e.stopPropagation()}>
        <div className={styles.grabber} />

        <div className={styles.user}>
          <img className={styles.gos} src={asset('/gos.svg')} alt="Госуслуги" width="64" height="64" />
          {user && (
            <>
              <div className={styles.name}>
                {user.name}
                {user.esiaVerified && (
                  <img
                    className={styles.verified}
                    src={asset('/verified.svg')}
                    alt="Верифицирован через ЕСИА"
                    width="16"
                    height="16"
                  />
                )}
              </div>
              <div className={styles.sub}>Аккаунт верифицирован через ЕСИА</div>
              <div className={styles.details}>
                <EsiaDetails user={user} />
              </div>
            </>
          )}
        </div>

        <button className={styles.logout} onClick={onLogout}>
          <IconLogout width="20" height="20" />
          Выйти из аккаунта
        </button>
      </aside>
    </div>
  )
}
