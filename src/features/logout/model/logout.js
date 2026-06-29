import { createStore, createEvent } from 'effector'

// Состояние модалки подтверждения выхода.
export const openLogoutModal = createEvent()
export const closeLogoutModal = createEvent()

export const $logoutModalOpen = createStore(false)
  .on(openLogoutModal, () => true)
  .on(closeLogoutModal, () => false)
