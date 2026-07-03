import { useEffect, useState } from 'react'
import { useUnit } from 'effector-react'
import { $user, EsiaDetails } from '@/entities/session'
import { IconArrowLeft, IconClose } from '@/shared/ui/Icon'
import { reloadRequested } from '@/shared/model/reload'
import { AccountView } from '../AccountView/AccountView.jsx'
import { $profileModalOpen, closeProfileModal } from '../../model/profile.js'
import styles from './ProfileDrawer.module.css'

// Десктоп: профиль ЕСИА в правой выезжающей панели (вместо модалки).
// Внутри — та же верстка, что и на мобильной странице «Аккаунт»; «Личные данные»
// разворачиваются прямо в панели (drill-in), закрытие — по фону/Esc.
export function ProfileDrawer() {
  const [open, user, close, reload] = useUnit([
    $profileModalOpen,
    $user,
    closeProfileModal,
    reloadRequested,
  ])
  const [details, setDetails] = useState(false)

  // Сброс к обзору при закрытии + закрытие по Escape.
  useEffect(() => {
    if (!open) {
      setDetails(false)
      return undefined
    }
    const h = (e) => e.key === 'Escape' && close()
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [open, close])

  if (!user) return null

  return (
    <div
      className={`${styles.scrim} ${open ? styles.open : ''}`}
      onClick={close}
      aria-hidden={!open}
    >
      <aside className={styles.panel} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} title="Закрыть" onClick={close}>
          <IconClose width="22" height="22" />
        </button>
        {details ? (
          <>
            <button className={styles.back} onClick={() => setDetails(false)}>
              <IconArrowLeft width="20" height="20" />
              Назад
            </button>
            <EsiaDetails user={user} />
          </>
        ) : (
          <AccountView onRefresh={() => reload()} onDetails={() => setDetails(true)} />
        )}
      </aside>
    </div>
  )
}
