import { useCallback } from 'react'
import { flushSync } from 'react-dom'
import { useNavigate } from 'react-router-dom'

// Помечает переход направлением (для View Transitions API):
// 'forward' — заход вглубь (slide влево), 'back' — возврат (slide вправо).
// Класс вешается на <html> и снимается по завершении перехода.
function markDirection(dir) {
  const cls = dir === 'back' ? 'vt-back' : 'vt-forward'
  const root = document.documentElement
  root.classList.add(cls)
  window.setTimeout(() => root.classList.remove(cls), 500)
}

// Навигация с плавным переходом. У нас классический <BrowserRouter>, где проп
// `viewTransition` не работает, поэтому запускаем document.startViewTransition
// вручную: flushSync заставляет React отрисовать новую страницу синхронно,
// чтобы браузер снял «новый» снимок. Без поддержки API — обычный переход.
export function useViewTransitionNavigate() {
  const navigate = useNavigate()
  return useCallback(
    (to, dir) => {
      if (typeof document === 'undefined' || !document.startViewTransition) {
        navigate(to)
        return
      }
      if (dir) markDirection(dir)
      document.startViewTransition(() => flushSync(() => navigate(to)))
    },
    [navigate],
  )
}
