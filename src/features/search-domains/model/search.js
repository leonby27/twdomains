import { createStore, createEvent } from 'effector'

export const queryChanged = createEvent()
export const searchReset = createEvent()

export const $query = createStore('')
  .on(queryChanged, (_, query) => query)
  .reset(searchReset)
