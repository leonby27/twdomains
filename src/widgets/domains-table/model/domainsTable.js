import { combine } from 'effector'
import { $domains } from '@/entities/domain'
import { $reseller, ALL } from '@/features/filter-domains-by-reseller'
import { $query } from '@/features/search-domains'

// Видимые домены = данные сущности + фильтр по реселлеру + поиск.
// Это кросс-слайсовая выборка, поэтому она живёт на уровне виджета.
export const $visibleDomains = combine(
  $domains,
  $reseller,
  $query,
  (domains, reseller, query) => {
    const q = query.trim().toLowerCase()
    return domains
      .filter(
        (d) =>
          (reseller === ALL || d.reseller === reseller) &&
          d.name.toLowerCase().includes(q),
      )
      // По умолчанию — сортировка по сроку регистрации: истекающие вверху.
      .sort((a, b) => (a.expiresAt < b.expiresAt ? -1 : a.expiresAt > b.expiresAt ? 1 : 0))
  },
)
