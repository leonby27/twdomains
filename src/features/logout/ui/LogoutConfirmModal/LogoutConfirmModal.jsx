import { useEffect } from 'react'
import { useUnit } from 'effector-react'
import { useNavigate } from 'react-router-dom'
import { logout } from '@/entities/session'
import { ROUTES } from '@/shared/config/routes'
import { $logoutModalOpen, closeLogoutModal } from '../../model/logout.js'
import styles from './LogoutConfirmModal.module.css'

// Модалка подтверждения выхода из аккаунта.
export function LogoutConfirmModal() {
  const [open, doLogout, close] = useUnit([$logoutModalOpen, logout, closeLogoutModal])
  const navigate = useNavigate()

  useEffect(() => {
    if (!open) return undefined
    const h = (e) => e.key === 'Escape' && close()
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [open, close])

  if (!open) return null

  const confirm = () => {
    doLogout()
    close()
    navigate(ROUTES.login)
  }

  return (
    <div className={styles.scrim} onClick={close}>
      <div className={styles.card} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={close} title="Закрыть">
          ✕
        </button>

        <div className={styles.title}>Выйти из аккаунта?</div>
        <div className={styles.text}>
          Сессия будет завершена — для входа снова потребуется авторизация через Госуслуги.
        </div>

        <div className={styles.actions}>
          <button className={`${styles.btn} ${styles.cancel}`} onClick={close}>
            Отмена
          </button>
          <button className={`${styles.btn} ${styles.confirm}`} onClick={confirm}>
            Выйти
          </button>
        </div>
      </div>
    </div>
  )
}
