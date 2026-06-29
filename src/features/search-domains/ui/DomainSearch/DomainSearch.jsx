import { useUnit } from 'effector-react'
import { hasCyrillic, ruLayoutToEn } from '@/shared/lib/keyboardLayout'
import { asset } from '@/shared/lib/asset'
import { $query, queryChanged } from '../../model/search.js'
import styles from './DomainSearch.module.css'

// Поле поиска по домену. Клик по всей области фокусирует ввод (label).
export function DomainSearch() {
  const [query, onChange] = useUnit([$query, queryChanged])

  // Если набрано кириллицей — предлагаем латинскую версию по раскладке.
  // Поиск и так найдёт по обоим вариантам, но подсказка помогает понять,
  // что именно ищется, и одним кликом исправить запрос.
  const fixed = hasCyrillic(query) ? ruLayoutToEn(query) : null
  const showHint = fixed && /[a-z]/i.test(fixed) && fixed !== query.toLowerCase()

  return (
    <div className={styles.wrap}>
      <label className={styles.search}>
        <img className={styles.icon} src={asset('/search.svg')} alt="" width="24" height="24" />
        <input
          className={styles.input}
          placeholder="Поиск по домену…"
          value={query}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
      {showHint && (
        <p className={styles.hint}>
          Похоже, не та раскладка. Искать{' '}
          <button type="button" className={styles.fix} onClick={() => onChange(fixed)}>
            «{fixed}»
          </button>
          ?
        </p>
      )}
    </div>
  )
}
