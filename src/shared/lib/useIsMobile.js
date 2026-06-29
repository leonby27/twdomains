import { useState, useEffect } from 'react'

// Реактивная проверка мобильного вьюпорта (брейкпоинт 760px).
export function useIsMobile(breakpoint = 760) {
  const query = `(max-width:${breakpoint}px)`
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  )

  useEffect(() => {
    const mq = window.matchMedia(query)
    const handler = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    setIsMobile(mq.matches)
    return () => mq.removeEventListener('change', handler)
  }, [query])

  return isMobile
}
