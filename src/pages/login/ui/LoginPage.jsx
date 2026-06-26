import { GosuslugiButton } from '@/features/auth-by-gosuslugi'
import { IconLock } from '@/shared/ui/Icon'
import styles from './auth.module.css'

// Экран входа. Единственный способ авторизации — через Госуслуги (ЕСИА).
export function LoginPage() {
  return (
    <div className={styles.auth}>
      <div className={styles.card}>
        <div className={styles.brand}>
          <img className={styles.logo} src="/logo.svg" alt="Timeweb" />
          <span className={styles.brandSub}>Домены</span>
        </div>
        <h1 className={styles.title}>Панель регистратора доменов</h1>
        <p className={styles.lead}>
          Вход только через Госуслуги. Ваш идентификатор ЕСИА — ключ ко всем
          верифицированным доменам, где бы они ни были размещены.
        </p>
        <GosuslugiButton />
        <div className={styles.foot}>
          <IconLock width="13" height="13" />
          Соединение защищено · domains.timeweb.ru
        </div>
      </div>
    </div>
  )
}
