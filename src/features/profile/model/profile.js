import { createStore, createEvent } from 'effector'

// Модалка профиля пользователя (данные ЕСИА).
export const openProfileModal = createEvent()
export const closeProfileModal = createEvent()

export const $profileModalOpen = createStore(false)
  .on(openProfileModal, () => true)
  .on(closeProfileModal, () => false)
