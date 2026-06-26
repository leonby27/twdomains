// МОК-API кода верификации. Граница для реальной интеграции:
// разработчики заменят на запрос временного кода у бэкенда регистратора.

export const CODE_TTL_SECONDS = 30 * 60

const delay = (ms) => new Promise((r) => setTimeout(r, ms))

// Запрос нового временного кода верификации.
export async function requestVerificationCode() {
  await delay(120)
  return { code: 'TWD-7K4P-9X2M', ttlSeconds: CODE_TTL_SECONDS }
}
