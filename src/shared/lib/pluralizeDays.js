// Склонение слова «день» под число: 1 день, 2 дня, 5 дней, 21 день...
export function pluralizeDays(n) {
  const abs = Math.abs(n) % 100
  const last = abs % 10
  if (abs > 10 && abs < 20) return 'дней'
  if (last === 1) return 'день'
  if (last >= 2 && last <= 4) return 'дня'
  return 'дней'
}
