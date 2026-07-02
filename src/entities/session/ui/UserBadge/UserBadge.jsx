import { asset } from '@/shared/lib/asset'
import styles from './UserBadge.module.css'

// Имя пользователя + значок верификации ЕСИА + подпись.
// С onClick становится кнопкой (открытие профиля из шапки).
export function UserBadge({ user, onClick }) {
  if (!user) return null
  const content = (
    <>
      <div className={styles.name}>
        {user.name}
        {user.esiaVerified && (
          <img
            className={styles.verified}
            src={asset('/verified.svg')}
            alt="Верифицирован через ЕСИА"
            width="18"
            height="18"
          />
        )}
      </div>
      <div className={styles.sub}>Верифицирован через ЕСИА</div>
    </>
  )
  if (onClick) {
    return (
      <button type="button" className={`${styles.user} ${styles.clickable}`} onClick={onClick}>
        {content}
      </button>
    )
  }
  return <div className={styles.user}>{content}</div>
}
