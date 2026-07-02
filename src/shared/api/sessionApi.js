// МОК-API сессии. Граница для реальной интеграции:
// здесь разработчики заменят возврат мока на OAuth-флоу ЕСИА / запрос профиля.

const MOCK_USER = {
  name: 'Ильюков Никита Сергеевич',
  fullName: 'Ильюков Никита Сергеевич',
  birthDate: '14.03.1994',
  birthPlace: 'г. Санкт-Петербург',
  passport: {
    series: '40 12',
    number: '345678', // в UI середина номера скрывается звёздочками
    issueDate: '22.04.2014',
    departmentCode: '780-012',
    issuedBy: 'ГУ МВД России по г. Санкт-Петербургу и Ленинградской области',
  },
  esiaVerified: true,
}

const delay = (ms) => new Promise((r) => setTimeout(r, ms))

// Имитация авторизации через Госуслуги и получения подтверждённого профиля.
export async function loginViaGosuslugi() {
  await delay(1600)
  return MOCK_USER
}
