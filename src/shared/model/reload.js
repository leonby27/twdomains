import { createEvent, createStore } from 'effector'

// «Фейковая» перезагрузка данных (клик по логотипу).
// Каждый клик инкрементит ключ — контент перемонтируется и заново
// проигрывает анимацию проявления, даже при быстрых повторных кликах.
export const reloadRequested = createEvent()

export const $reloadKey = createStore(0).on(reloadRequested, (n) => n + 1)
