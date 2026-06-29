import { createStore, createEvent } from 'effector'

// Тема оформления: light | dark. Сохраняется в localStorage между сессиями.
export const STORAGE_KEY = 'tw-theme'

const readStored = () => {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    return v === 'dark' || v === 'light' ? v : null
  } catch {
    return null
  }
}

const initial = readStored() ?? 'light'

export const themeSet = createEvent() // payload: 'light' | 'dark'
export const themeToggled = createEvent()

export const $theme = createStore(initial)
  .on(themeSet, (_, t) => t)
  .on(themeToggled, (t) => (t === 'dark' ? 'light' : 'dark'))
