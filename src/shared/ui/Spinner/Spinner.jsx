import styles from './Spinner.module.css'

// Спиннер. size — диаметр в px; gray — серый вариант (для подгрузки).
export function Spinner({ size = 46, gray = false }) {
  const borderWidth = Math.max(2, Math.round(size / 12))
  return (
    <div
      className={`${styles.spinner} ${gray ? styles.gray : ''}`}
      style={{ width: size, height: size, borderWidth }}
    />
  )
}
