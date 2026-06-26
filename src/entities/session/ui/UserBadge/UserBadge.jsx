import styles from './UserBadge.module.css'

// Имя пользователя + значок верификации ЕСИА + подпись.
export function UserBadge({ user }) {
  if (!user) return null
  return (
    <div className={styles.user}>
      <div className={styles.name}>
        {user.name}
        {user.esiaVerified && (
          <img
            className={styles.verified}
            src="/verified.svg"
            alt="Верифицирован через ЕСИА"
            width="18"
            height="18"
          />
        )}
      </div>
      <div className={styles.sub}>Верифицирован через ЕСИА</div>
    </div>
  )
}
