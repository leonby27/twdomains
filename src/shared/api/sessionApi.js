// МОК-API сессии. Граница для реальной интеграции:
// здесь разработчики заменят возврат мока на OAuth-флоу ЕСИА / запрос профиля.

const MOCK_USER = {
  name: 'Ильюков Никита Сергеевич',
  fullName: 'Ильюков Никита Сергеевич',
  esiaVerified: true,
}

const delay = (ms) => new Promise((r) => setTimeout(r, ms))

// Имитация авторизации через Госуслуги и получения подтверждённого профиля.
export async function loginViaGosuslugi() {
  await delay(1600)
  return MOCK_USER
}
