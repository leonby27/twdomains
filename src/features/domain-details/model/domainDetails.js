import { createStore, createEvent } from 'effector'

// Состояние модалки детали домена: хранит имя выбранного домена.
export const openDomainDetails = createEvent() // payload: имя домена
export const closeDomainDetails = createEvent()

export const $selectedDomainName = createStore(null)
  .on(openDomainDetails, (_, name) => name)
  .reset(closeDomainDetails)

export const $domainDetailsOpen = $selectedDomainName.map((n) => Boolean(n))
