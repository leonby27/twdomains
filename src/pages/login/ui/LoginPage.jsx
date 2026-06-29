import { GosuslugiButton } from '@/features/auth-by-gosuslugi'
import styles from './auth.module.css'

// Экран входа. Единственный способ авторизации — через Госуслуги (ЕСИА).
export function LoginPage() {
  return (
    <div className={styles.auth}>
      <img className={styles.topLogo} src="/logo.svg" alt="Timeweb" />
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
