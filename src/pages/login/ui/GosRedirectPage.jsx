import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUnit } from 'effector-react'
import { loginFx, $isAuthed } from '@/entities/session'
import { $theme } from '@/features/theme-switch'
import { Spinner } from '@/shared/ui/Spinner'
import { asset } from '@/shared/lib/asset'
import { ROUTES } from '@/shared/config/routes'
import styles from './auth.module.css'

// Имитация перехода на Госуслуги: запускаем loginFx, по готовности — на главную.
export function GosRedirectPage() {
  const navigate = useNavigate()
  const login = useUnit(loginFx)
  const authed = useUnit($isAuthed)
  const theme = useUnit($theme)
  const started = useRef(false)

  useEffect(() => {
    if (!started.current && !authed) {
      started.current = true
      login()
    }
  }, [authed, login])

  useEffect(() => {
    if (authed) navigate(ROUTES.home, { replace: true })
  }, [authed, navigate])

  return (
    <div className={styles.auth}>
      <img
        className={styles.topLogo}
        src={theme === 'dark' ? asset('/logo-dark.svg') : asset('/logo.svg')}
        alt="Timeweb"
      />
      <div className={`${styles.card} ${styles.center}`}>
        <Spinner />
        <div className={styles.loadTitle}>Переход на Госуслуги</div>
        <div className={styles.loadSub}>Получаем подтверждённые данные…</div>
      </div>
    </div>
  )
}
