import { combine } from 'effector'
import { $domains } from '@/entities/domain'
import { $reseller, ALL } from '@/features/filter-domains-by-reseller'
import { $query } from '@/features/search-domains'
import { $sort } from '@/features/sort-domains'

// Видимые домены = данные сущности + фильтр + поиск + сортировка.
// Это кросс-слайсовая выборка, поэтому она живёт на уровне виджета.
export const $visibleDomains = combine(
  $domains,
  $reseller,
  $query,
  $sort,
  (domains, reseller, query, sort) => {
    const q = query.trim().toLowerCase()
    const dir = sort.dir === 'asc' ? 1 : -1
    return domains
      .filter(
        (d) =>
          (reseller === ALL || d.reseller === reseller) &&
          d.name.toLowerCase().includes(q),
      )
      .sort((a, b) => {
        const av = a[sort.field] ?? ''
        const bv = b[sort.field] ?? ''
        return String(av).localeCompare(String(bv), 'ru') * dir
      })
  },
)
