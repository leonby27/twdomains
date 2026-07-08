import { createStore, createEvent } from 'effector'

// Состояние модалки «Есть вопросы?» и формы сообщения.
export const openContactModal = createEvent()
export const closeContactModal = createEvent()
export const emailChanged = createEvent()
export const messageChanged = createEvent()
export const messageSent = createEvent()

export const $contactModalOpen = createStore(false)
  .on(openContactModal, () => true)
  .on(closeContactModal, () => false)

export const $email = createStore('')
  .on(emailChanged, (_, value) => value)
  .reset(closeContactModal)

export const $message = createStore('')
  .on(messageChanged, (_, value) => value)
  .reset(closeContactModal)

export const $messageSent = createStore(false)
  .on(messageSent, () => true)
  .reset(closeContactModal)
