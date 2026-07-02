import { useEffect } from 'react'
import { useUnit } from 'effector-react'
import { $user, EsiaDetails } from '@/entities/session'
import { asset } from '@/shared/lib/asset'
import { $profileModalOpen, closeProfileModal } from '../../model/profile.js'
import styles from './ProfileModal.module.css'

// Модалка профиля: логотип Госуслуг, имя со значком верификации и данные ЕСИА.
export function ProfileModal() {
  const [open, user, close] = useUnit([$profileModalOpen, $user, closeProfileModal])

  useEffect(() => {
    if (!open) return undefined
    const h = (e) => e.key === 'Escape' && close()
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [open, close])

  if (!open || !user) return null

  return (
    <div className={styles.scrim} onClick={close}>
      <div className={styles.card} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={close} title="Закрыть">
          ✕
        </button>

        <img className={styles.gos} src={asset('/gos.svg')} alt="Госуслуги" width="56" height="56" />
        <div className={styles.name}>
          {user.name}
          {user.esiaVerified && (
            <img
              src={asset('/verified.svg')}
              alt="Верифицирован через ЕСИА"
              width="18"
              height="18"
            />
          )}
        </div>
        <div className={styles.sub}>Аккаунт верифицирован через ЕСИА</div>

        <EsiaDetails user={user} />
      </div>
    </div>
  )
}
