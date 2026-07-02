import { createStore, createEvent } from 'effector'

// Тема оформления: light | dark. Переключатель скрыт — всегда светлая;
// сохранённое в localStorage значение игнорируется.
export const STORAGE_KEY = 'tw-theme'

const initial = 'light'

export const themeSet = createEvent() // payload: 'light' | 'dark'
export const themeToggled = createEvent()

export const $theme = createStore(initial)
  .on(themeSet, (_, t) => t)
  .on(themeToggled, (t) => (t === 'dark' ? 'light' : 'dark'))
