// МОК-API кода верификации. Граница для реальной интеграции:
// разработчики заменят на запрос временного кода у бэкенда регистратора.

export const CODE_TTL_SECONDS = 30 * 60

const delay = (ms) => new Promise((r) => setTimeout(r, ms))

const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
const randomBlock = (len) =>
  Array.from({ length: len }, () => CHARS[Math.floor(Math.random() * CHARS.length)]).join('')

// Запрос нового временного кода верификации.
export async function requestVerificationCode() {
  await delay(120)
  const code = `TWD-${randomBlock(4)}-${randomBlock(4)}`
  return { code, ttlSeconds: CODE_TTL_SECONDS }
}
