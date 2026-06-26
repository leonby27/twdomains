import { createStore, createEvent, createEffect } from 'effector'
import { loginViaGosuslugi } from '@/shared/api/sessionApi'

// Бизнес-логика сессии на Effector.
// Реальная интеграция: loginFx уже завязан на shared/api — заменить мок на ЕСИА-флоу.

export const logout = createEvent()
export const loginFx = createEffect(loginViaGosuslugi)

export const $user = createStore(null)
  .on(loginFx.doneData, (_, user) => user)
  .reset(logout)

export const $isAuthed = $user.map((user) => Boolean(user))
export const $isLoggingIn = loginFx.pending
