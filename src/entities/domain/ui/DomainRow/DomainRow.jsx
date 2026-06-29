import { IconGlobe, IconChevronRight } from '@/shared/ui/Icon'
import { DateBadge } from '../DateBadge/DateBadge.jsx'
import { ResellerTag } from '../ResellerTag/ResellerTag.jsx'
import styles from './DomainRow.module.css'

// Строка домена в таблице: глобус + имя · «Оплачен до» · регистратор · шеврон.
export function DomainRow({ domain, onClick }) {
  return (
    <button className={styles.row} onClick={onClick}>
      <span className={styles.domain}>
        <span className={styles.globe}>
          <IconGlobe width="20" height="20" />
        </span>
        <span className={styles.name}>{domain.name}</span>
      </span>
      <span>
        <DateBadge date={domain.paidUntil} status={domain.dateStatus} />
      </span>
      <span className={styles.reseller}>
        <ResellerTag reseller={domain.reseller} />
      </span>
      <IconChevronRight className={styles.chev} width="20" height="20" />
    </button>
  )
}
