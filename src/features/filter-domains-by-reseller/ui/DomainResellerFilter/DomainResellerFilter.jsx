import { useUnit } from 'effector-react'
import { RESELLERS } from '@/shared/api/domainsApi'
import { $reseller, resellerSelected, ALL } from '../../model/filter.js'
import styles from './DomainResellerFilter.module.css'

// Чипы-фильтр по реселлеру.
export function DomainResellerFilter() {
  const [reseller, onSelect] = useUnit([$reseller, resellerSelected])
  const chips = [ALL, ...RESELLERS]

  return (
    <div className={styles.chips}>
      {chips.map((c) => (
        <button
          key={c}
          className={`${styles.chip} ${reseller === c ? styles.active : ''}`}
          onClick={() => onSelect(c)}
        >
          {c === ALL ? 'Все домены' : c}
        </button>
      ))}
    </div>
  )
}
