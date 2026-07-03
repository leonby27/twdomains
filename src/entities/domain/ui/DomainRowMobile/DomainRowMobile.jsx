import { IconGlobe } from '@/shared/ui/Icon'
import styles from './DomainRowMobile.module.css'

// Мобильная строка домена: планета на синем фоне + имя + «До …».
export function DomainRowMobile({ domain }) {
  const warn = domain.dateStatus === 'warning'
  return (
    <div className={styles.row}>
      <span className={styles.globe}>
        <IconGlobe width="20" height="20" />
      </span>
      <span className={styles.body}>
        <span className={styles.name}>{domain.name}</span>
        <span className={`${styles.sub} ${warn ? styles.subWarn : ''}`}>
          До {domain.paidUntil}
        </span>
      </span>
    </div>
  )
}
