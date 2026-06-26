// Форматирование секунд в M:SS.
export function formatTtl(total) {
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${m}:${String(s).padStart(2, '0')}`
}
