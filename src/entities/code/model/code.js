import { createStore, createEvent, createEffect, sample } from 'effector'
import { requestVerificationCode, CODE_TTL_SECONDS } from '@/shared/api/codeApi'

// Бизнес-логика кода верификации на Effector: запрос кода и обратный отсчёт TTL.
// Механизм «тика» (setInterval) — на стороне UI: страница диспатчит ticked() раз в секунду.
// Реальная интеграция: requestCodeFx завязан на shared/api — заменить мок на бэкенд.

export const codeRequested = createEvent() // первый запрос / перевыпуск
export const ticked = createEvent()
export const codeReset = createEvent()

export const requestCodeFx = createEffect(requestVerificationCode)

sample({ clock: codeRequested, target: requestCodeFx })

export const $code = createStore('')
  .on(requestCodeFx.doneData, (_, res) => res.code)
  .reset(codeReset)

export const $secondsLeft = createStore(CODE_TTL_SECONDS)
  .on(requestCodeFx.doneData, (_, res) => res.ttlSeconds)
  .on(ticked, (s) => (s > 0 ? s - 1 : 0))
  .reset(codeReset)

export const $expired = $secondsLeft.map((s) => s === 0)
