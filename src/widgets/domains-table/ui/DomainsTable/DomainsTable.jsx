import { useUnit } from 'effector-react'
import { DomainRow } from '@/entities/domain'
import { $sort, sortToggled } from '@/features/sort-domains'
import { $reseller, MOCK_EMPTY } from '@/features/filter-domains-by-reseller'
import { Spinner } from '@/shared/ui/Spinner'
import { EmptyState } from '@/shared/ui/EmptyState'
import { IconArrowUp, IconGlobe } from '@/shared/ui/Icon'
import { useIncrementalList } from '@/shared/lib/useIncrementalList'
import { $visibleDomains } from '../../model/domainsTable.js'
import styles from './DomainsTable.module.css'

// Колонки, по которым доступна сортировка.
const COLUMNS = [
  { field: 'name', label: 'Домен' },
  { field: 'expiresAt', label: 'Оплачен до' },
]

// Таблица доменов: сортируемые заголовки + строки. Данные — из $visibleDomains.
// Первые 30 строк, остальное догружается при скролле (имитация).
export function DomainsTable() {
  const [domains, sort, onSort, reseller] = useUnit([
    $visibleDomains,
    $sort,
    sortToggled,
    $reseller,
  ])
  const { visible, hasMore, sentinelRef } = useIncrementalList(domains, 30)

  // Демо-таб «нет доменов» — показываем заглушку вместо таблицы.
  if (reseller === MOCK_EMPTY) {
    return (
      <div className={styles.table}>
        <EmptyState
          icon={<IconGlobe width="28" height="28" />}
          title="Доменов пока нет"
          text="Здесь появятся ваши верифицированные домены."
        />
      </div>
    )
  }

  return (
    <div className={styles.table}>
      <div className={styles.head}>
        {COLUMNS.map((c) => {
          const active = sort.field === c.field
          const desc = active && sort.dir === 'desc'
          const tip = active && sort.dir === 'asc' ? 'По убыванию' : 'По возрастанию'
          return (
            <button
              key={c.field}
              className={`${styles.th} ${active ? styles.active : ''} ${desc ? styles.desc : ''}`}
              onClick={() => onSort(c.field)}
            >
              <span>
                {c.label}
                {c.field === 'name' && (
                  <span className={styles.count}> · {domains.length}</span>
                )}
              </span>
              <span className={styles.arrow} data-tip={tip}>
                <IconArrowUp width="16" height="16" />
              </span>
            </button>
          )
        })}
      </div>
      <div className={styles.body}>
        {visible.length === 0 ? (
          <div className={styles.empty}>Ничего не найдено</div>
        ) : (
          visible.map((d) => <DomainRow key={d.name} domain={d} />)
        )}
      </div>
      {hasMore && (
        <div className={styles.loader} ref={sentinelRef}>
          <Spinner size={24} gray />
        </div>
      )}
    </div>
  )
}
