import { IconGlobe, IconChevronRight } from '@/shared/ui/Icon'
import { RESELLER_COLORS } from '@/shared/api/domainsApi'
import styles from './DomainRowMobile.module.css'

// Мобильная строка домена: цветной кружок-глобус (по регистратору) + имя + «До …».
export function DomainRowMobile({ domain, onClick }) {
  const color = RESELLER_COLORS[domain.reseller] || 'var(--accent)'
  const warn = domain.dateStatus === 'warning'
  return (
    <button className={styles.row} onClick={onClick}>
      <span className={styles.globe} style={{ background: color }}>
        <IconGlobe width="20" height="20" />
      </span>
      <span className={styles.body}>
        <span className={styles.name}>{domain.name}</span>
        <span className={`${styles.sub} ${warn ? styles.subWarn : ''}`}>
          До {domain.paidUntil}
        </span>
      </span>
      <IconChevronRight className={styles.chev} width="20" height="20" />
    </button>
  )
}
