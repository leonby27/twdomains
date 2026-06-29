import styles from './EmptyState.module.css'

// Заглушка для пустых состояний: иконка в кружке + заголовок + подпись.
export function EmptyState({ icon, title, text }) {
  return (
    <div className={styles.empty}>
      {icon && <span className={styles.icon}>{icon}</span>}
      <div className={styles.title}>{title}</div>
      {text && <div className={styles.text}>{text}</div>}
    </div>
  )
}
