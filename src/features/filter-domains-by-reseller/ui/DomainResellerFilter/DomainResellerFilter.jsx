import { useUnit } from 'effector-react'
import {
  $reseller,
  resellerSelected,
  ALL,
  MOCK_EMPTY,
  $presentResellers,
} from '../../model/filter.js'
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

  // MOCK_EMPTY — демо-таб для проверки заглушки «нет доменов».
  const chips = [ALL, ...present, MOCK_EMPTY]
  const label = (c) => (c === ALL ? 'Все домены' : c === MOCK_EMPTY ? 'мок: нет доменов' : c)

  return (
    <div className={styles.chips}>
      {chips.map((c) => (
        <button
          key={c}
          className={`${styles.chip} ${reseller === c ? styles.active : ''} ${c === MOCK_EMPTY ? styles.mock : ''}`}
          onClick={() => onSelect(c)}
        >
          {label(c)}
        </button>
      ))}
    </div>
  )
}
