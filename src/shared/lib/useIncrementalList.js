import { useState, useEffect, useRef, useCallback } from 'react'

// Имитация постраничной подгрузки: показывает первые `step` элементов,
// при появлении нижнего сентинеля в зоне видимости догружает следующую порцию.
export function useIncrementalList(items, step = 30, delay = 700) {
  const [shown, setShown] = useState(step)
  const [loading, setLoading] = useState(false)
  const sentinelRef = useRef(null)
  const timer = useRef(null)

  // Сброс при смене набора (фильтр/поиск).
  useEffect(() => {
    setShown(step)
    setLoading(false)
    if (timer.current) clearTimeout(timer.current)
  }, [items, step])

  const hasMore = shown < items.length

  const loadMore = useCallback(() => {
    setLoading(true)
    timer.current = setTimeout(() => {
      setShown((s) => Math.min(s + step, items.length))
      setLoading(false)
    }, delay)
  }, [step, delay, items.length])

  useEffect(() => {
    if (!hasMore || loading) return undefined
    const node = sentinelRef.current
    if (!node) return undefined
    const io = new IntersectionObserver(
      (entries) => entries[0].isIntersecting && loadMore(),
      { rootMargin: '120px' },
    )
    io.observe(node)
    return () => io.disconnect()
  }, [hasMore, loading, loadMore])

  return { visible: items.slice(0, shown), hasMore, sentinelRef }
}
