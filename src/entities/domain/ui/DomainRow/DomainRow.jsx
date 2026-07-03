import { IconGlobe } from '@/shared/ui/Icon'
import { DateBadge } from '../DateBadge/DateBadge.jsx'
import styles from './DomainRow.module.css'

// Строка домена в таблице: глобус + имя · «Оплачен до».
export function DomainRow({ domain }) {
  return (
    <div className={styles.row}>
      <span className={styles.domain}>
        <span className={styles.globe}>
          <IconGlobe width="20" height="20" />
        </span>
        <span className={styles.name}>{domain.name}</span>
      </span>
      <span>
        <DateBadge date={domain.paidUntil} status={domain.dateStatus} />
      </span>
    </div>
  )
}
