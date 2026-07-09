import { useUnit } from 'effector-react'
import { $user } from '@/entities/session'
import { asset } from '@/shared/lib/asset'
import { Button } from '@/shared/ui/Button'
import { IconUser, IconChevronRight, IconLogout } from '@/shared/ui/Icon'
import styles from './AccountView.module.css'

// Общая верстка экрана «Аккаунт»: используется и мобильной страницей, и
// десктопной боковой панелью. Поведение кнопок задаётся через пропсы.
// Кнопка выхода рендерится только если передан onLogout (в панели выход — в шапке).
export function AccountView({ onRefresh, onLogout, onDetails }) {
  const user = useUnit($user)
  if (!user) return null

  return (
    <div className={styles.view}>
      {onLogout && (
        <button className={styles.logout} title="Выйти из аккаунта" onClick={onLogout}>
          <IconLogout width="22" height="22" />
        </button>
      )}

      <div className={styles.user}>
        <img className={styles.gos} src={asset('/gos.svg')} alt="Госуслуги" width="64" height="64" />
        <div className={styles.name}>
          {user.name}
          {user.esiaVerified && (
            <img
              className={styles.verified}
              src={asset('/verified.svg')}
              alt="Верифицирован через Госуслуги"
              width="16"
              height="16"
            />
          )}
        </div>
        <div className={styles.sub}>Аккаунт подтверждён через Госуслуги</div>
        <Button variant="accent" className={styles.refresh} onClick={onRefresh}>
          Обновить данные
        </Button>
      </div>

      <div className={styles.sep} />

      <button type="button" className={styles.item} onClick={onDetails}>
        <span className={styles.itemIcon}>
          <IconUser width="22" height="22" />
        </span>
        <span className={styles.itemBody}>
          <span className={styles.itemTitle}>Личные данные</span>
          <span className={styles.itemSub}>ФИО, контакты и прочее</span>
        </span>
        <IconChevronRight className={styles.itemChev} width="20" height="20" />
      </button>
    </div>
  )
}
