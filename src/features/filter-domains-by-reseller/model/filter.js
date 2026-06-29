import { createStore, createEvent, combine } from 'effector'
import { $domains } from '@/entities/domain'
import { RESELLERS } from '@/shared/api/domainsApi'

export const ALL = 'all'
// Демо-таб: ни один домен не имеет такого реселлера → список пуст,
// показываем заглушку «нет доменов».
export const MOCK_EMPTY = 'mock:empty'

export const resellerSelected = createEvent()
export const filterReset = createEvent()

export const $reseller = createStore(ALL)
  .on(resellerSelected, (_, reseller) => reseller)
  .reset(filterReset)

// Реселлеры, реально присутствующие у пользователя (в порядке RESELLERS).
// Пустые группы в фильтр не попадают.
export const $presentResellers = combine($domains, (domains) => {
  const set = new Set(domains.map((d) => d.reseller))
  return RESELLERS.filter((r) => set.has(r))
})

// Фильтр имеет смысл только когда групп больше одной (иначе и один домен,
// и домены одной группы — фильтровать нечего, панель/иконку прячем).
export const $canFilter = $presentResellers.map((present) => present.length > 1)
