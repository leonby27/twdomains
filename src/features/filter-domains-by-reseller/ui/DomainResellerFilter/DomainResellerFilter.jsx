import { useUnit } from 'effector-react'
import { $reseller, resellerSelected, ALL, $presentResellers } from '../../model/filter.js'
import styles from './DomainResellerFilter.module.css'

// Чипы-фильтр по реселлеру.
// Показываем только присутствующие группы; если группа одна (или домен один) —
// фильтровать нечего, панель не рендерим.
export function DomainResellerFilter() {
  const [reseller, onSelect, present] = useUnit([
    $reseller,
    resellerSelected,
    $presentResellers,
  ])

  if (present.length <= 1) return null

  const chips = [ALL, ...present]

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
