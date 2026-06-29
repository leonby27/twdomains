import { createStore, createEvent, sample } from 'effector'
import { codeRequested, codeReset } from '@/entities/code'

// Состояние модалки кода верификации.
// Открытие запрашивает новый код, закрытие сбрасывает состояние.
export const openCodeModal = createEvent()
export const closeCodeModal = createEvent()

export const $codeModalOpen = createStore(false)
  .on(openCodeModal, () => true)
  .on(closeCodeModal, () => false)

sample({ clock: openCodeModal, target: codeRequested })
sample({ clock: closeCodeModal, target: codeReset })
