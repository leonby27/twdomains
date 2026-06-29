import { combine } from 'effector'
import { $domains } from '@/entities/domain'
import { $reseller, ALL } from '@/features/filter-domains-by-reseller'
import { $query } from '@/features/search-domains'
import { $sort } from '@/features/sort-domains'
import { hasCyrillic, ruLayoutToEn } from '@/shared/lib/keyboardLayout'

// Видимые домены = данные сущности + фильтр + поиск + сортировка.
// Это кросс-слайсовая выборка, поэтому она живёт на уровне виджета.
export const $visibleDomains = combine(
  $domains,
  $reseller,
  $query,
  $sort,
  (domains, reseller, query, sort) => {
    const q = query.trim().toLowerCase()
    // Запасной вариант запроса: если набрано в русской раскладке по ошибке.
    const qLayout = hasCyrillic(q) ? ruLayoutToEn(q) : null
    const dir = sort.dir === 'asc' ? 1 : -1
    return domains
      .filter((d) => {
        if (reseller !== ALL && d.reseller !== reseller) return false
        const name = d.name.toLowerCase()
        return name.includes(q) || (qLayout !== null && name.includes(qLayout))
      })
      .sort((a, b) => {
        const av = a[sort.field] ?? ''
        const bv = b[sort.field] ?? ''
        return String(av).localeCompare(String(bv), 'ru') * dir
      })
  },
)
