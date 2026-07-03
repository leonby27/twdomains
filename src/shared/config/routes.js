// Карта путей пользователя. Используется в роутере и навигации.
export const ROUTES = {
  login: '/login',
  gosuslugi: '/auth/gosuslugi',
  home: '/home',
  account: '/account',
  passport: '/account/passport',
  domain: (name = ':name') => `/domains/${name}`,
  code: '/code',
}
