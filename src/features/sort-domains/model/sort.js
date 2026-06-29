import { createStore, createEvent } from 'effector'

// Сортировка таблицы: поле + направление. По умолчанию — по сроку (истекающие вверху).
export const DEFAULT_SORT = { field: 'expiresAt', dir: 'asc' }

export const sortToggled = createEvent() // payload: field

export const $sort = createStore(DEFAULT_SORT).on(sortToggled, (s, field) => {
  if (s.field === field) return { field, dir: s.dir === 'asc' ? 'desc' : 'asc' }
  return { field, dir: 'asc' }
})
