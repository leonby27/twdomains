import { createStore, createEffect, createEvent } from 'effector'
import { fetchDomains } from '@/shared/api/domainsApi'

// Бизнес-логика доменов на Effector.
// Реальная интеграция: fetchDomainsFx завязан на shared/api — заменить мок на API реселлеров.

export const domainsReset = createEvent()
export const fetchDomainsFx = createEffect(fetchDomains)

export const $domains = createStore([])
  .on(fetchDomainsFx.doneData, (_, domains) => domains)
  .reset(domainsReset)

export const $domainsPending = fetchDomainsFx.pending

// Поиск домена по имени (для страницы детали).
export const selectDomainByName = (domains, name) =>
  domains.find((d) => d.name === name) || null
