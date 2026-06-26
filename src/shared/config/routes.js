// Карта путей пользователя. Используется в роутере и навигации.
export const ROUTES = {
  login: '/login',
  gosuslugi: '/auth/gosuslugi',
  home: '/home',
  domain: (name = ':name') => `/domains/${name}`,
  code: '/code',
}
