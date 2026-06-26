import { createStore, createEvent } from 'effector'

export const ALL = 'all'

export const resellerSelected = createEvent()
export const filterReset = createEvent()

export const $reseller = createStore(ALL)
  .on(resellerSelected, (_, reseller) => reseller)
  .reset(filterReset)
