import { useUnit } from 'effector-react'
import { GosuslugiButton } from '@/features/auth-by-gosuslugi'
import { $theme } from '@/features/theme-switch'
import { asset } from '@/shared/lib/asset'
import styles from './auth.module.css'

// Экран входа. Единственный способ авторизации — через Госуслуги (ЕСИА).
export function LoginPage() {
  const theme = useUnit($theme)
  return (
    <div className={styles.auth}>
      <img
        className={styles.topLogo}
        src={theme === 'dark' ? asset('/logo-dark.svg') : asset('/logo.svg')}
        alt="Timeweb"
      />
      <div className={styles.card}>
        <h1 className={styles.title}>Панель регистратора доменов</h1>
        <p className={styles.lead}>
          Вход только через Госуслуги. Ваш идентификатор ЕСИА — ключ ко всем
          верифицированным доменам, где бы они ни были размещены.
        </p>
        <GosuslugiButton />
      </div>
    </div>
  )
}
