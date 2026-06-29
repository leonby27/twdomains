import { useUnit } from 'effector-react'
import { $theme } from '@/features/theme-switch'
import { RESELLER_ICONS, RESELLER_ICONS_DARK } from '@/shared/api/domainsApi'
import styles from './ResellerTag.module.css'

// Чип регистратора: иконка (если есть) + название.
export function ResellerTag({ reseller }) {
  const theme = useUnit($theme)
  const icon =
    (theme === 'dark' && RESELLER_ICONS_DARK[reseller]) || RESELLER_ICONS[reseller]
  return (
    <span className={styles.reseller}>
      {icon ? (
        <img className={styles.logo} src={icon} alt="" width="24" height="24" />
      ) : (
        <span className={styles.letter}>{reseller[0]}</span>
      )}
      {reseller}
    </span>
  )
}
