import { IconCheckCircle, IconAlert } from '@/shared/ui/Icon'
import { pluralizeDays } from '@/shared/lib/pluralizeDays'
import styles from './DateBadge.module.css'

// Бейдж «Оплачен до»: зелёный (оплачен) / оранжевый (истекает, с тултипом «через N дней»).
export function DateBadge({ date, status, prefix, daysLeft }) {
  const ok = status !== 'warning'
  const tooltip =
    !ok && typeof daysLeft === 'number'
      ? `Домен истекает через ${daysLeft} ${pluralizeDays(daysLeft)}`
      : undefined
  return (
    <span
      className={`${styles.badge} ${ok ? styles.green : styles.orange}`}
      data-tooltip={tooltip}
    >
      {ok ? <IconCheckCircle width="18" height="18" /> : <IconAlert width="18" height="18" />}
      {prefix ? `${prefix} ${date}` : date}
    </span>
  )
}
