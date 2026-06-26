import { RESELLER_ICONS } from '@/shared/api/domainsApi'
import styles from './ResellerTag.module.css'

// Чип регистратора: иконка (если есть) + название.
export function ResellerTag({ reseller }) {
  const icon = RESELLER_ICONS[reseller]
  return (
    <span className={styles.reseller}>
      {icon ? (
        <img className={styles.logo} src={icon} alt="" width="24" height="24" />
      ) : (
        <span className={styles.dot} />
      )}
      {reseller}
    </span>
  )
}
