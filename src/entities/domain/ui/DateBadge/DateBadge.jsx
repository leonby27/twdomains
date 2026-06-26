import { IconCheckCircle, IconAlert } from '@/shared/ui/Icon'
import styles from './DateBadge.module.css'

// Бейдж «Оплачен до»: зелёный (оплачен) / оранжевый (истекает).
export function DateBadge({ date, status, prefix }) {
  const ok = status !== 'warning'
  return (
    <span className={`${styles.badge} ${ok ? styles.green : styles.orange}`}>
      {ok ? <IconCheckCircle width="18" height="18" /> : <IconAlert width="18" height="18" />}
      {prefix ? `${prefix} ${date}` : date}
    </span>
  )
}
