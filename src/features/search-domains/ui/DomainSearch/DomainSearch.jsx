import { useUnit } from 'effector-react'
import { $query, queryChanged } from '../../model/search.js'
import styles from './DomainSearch.module.css'

// Поле поиска по домену. Клик по всей области фокусирует ввод (label).
export function DomainSearch() {
  const [query, onChange] = useUnit([$query, queryChanged])
  return (
    <label className={styles.search}>
      <img className={styles.icon} src="/search.svg" alt="" width="24" height="24" />
      <input
        className={styles.input}
        placeholder="Поиск по домену…"
        value={query}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  )
}
