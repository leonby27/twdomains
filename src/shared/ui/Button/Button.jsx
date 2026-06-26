import styles from './Button.module.css'

// Базовая кнопка. variant: 'gos' | 'soft' | 'ghost'. block — на всю ширину.
export function Button({ variant = 'ghost', block = false, className = '', ...rest }) {
  const cls = [styles.btn, styles[variant], block && styles.block, className]
    .filter(Boolean)
    .join(' ')
  return <button className={cls} {...rest} />
}
