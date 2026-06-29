import styles from './Spinner.module.css'

// Спиннер. size — диаметр в px (толщина рамки масштабируется).
export function Spinner({ size = 46 }) {
  const borderWidth = Math.max(2, Math.round(size / 12))
  return <div className={styles.spinner} style={{ width: size, height: size, borderWidth }} />
}
