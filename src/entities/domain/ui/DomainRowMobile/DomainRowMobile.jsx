import { IconGlobe, IconChevronRight } from '@/shared/ui/Icon'
import { RESELLER_ICONS, RESELLER_COLORS } from '@/shared/api/domainsApi'
import styles from './DomainRowMobile.module.css'

// Мобильная строка домена: цветная иконка регистратора + имя + «До …».
export function DomainRowMobile({ domain, onClick }) {
  const icon = RESELLER_ICONS[domain.reseller]
  const color = RESELLER_COLORS[domain.reseller] || 'var(--accent)'
  const warn = domain.dateStatus === 'warning'
  return (
    <button className={styles.row} onClick={onClick}>
      {icon ? (
        <img className={styles.icon} src={icon} alt="" width="40" height="40" />
      ) : (
        <span className={styles.globe} style={{ background: color }}>
          <IconGlobe width="20" height="20" />
        </span>
      )}
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
