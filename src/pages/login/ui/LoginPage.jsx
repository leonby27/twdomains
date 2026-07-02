import { useState } from 'react'
import { useUnit } from 'effector-react'
import { GosuslugiButton } from '@/features/auth-by-gosuslugi'
import { $theme } from '@/features/theme-switch'
import { asset } from '@/shared/lib/asset'
import styles from './auth.module.css'

// Экран входа. Единственный способ авторизации — через Госуслуги (ЕСИА).
export function LoginPage() {
  const theme = useUnit($theme)
  const [agreed, setAgreed] = useState(true)
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
          Ваш аккаунт в Госуслугах — ключ ко всем верифицированным доменам,
          где бы они ни были размещены.
        </p>
        <GosuslugiButton disabled={!agreed} />
        <label className={styles.consent}>
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <span>
            Согласен с{' '}
            <a href="#" onClick={(e) => e.preventDefault()}>
              политикой
            </a>{' '}
            и{' '}
            <a href="#" onClick={(e) => e.preventDefault()}>
              правилами
            </a>
          </span>
        </label>
      </div>
    </div>
  )
}
