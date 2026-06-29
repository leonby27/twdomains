import { sample } from 'effector'
import { loginFx } from '@/entities/session'
import { logout } from '@/entities/session'
import { fetchDomainsFx, domainsReset } from '@/entities/domain'
import { $theme, STORAGE_KEY } from '@/features/theme-switch'

// Кросс-слайсовая инициализация (уровень app):
// после успешного входа — грузим домены; при выходе — сбрасываем.
sample({ clock: loginFx.done, target: fetchDomainsFx })
sample({ clock: logout, target: domainsReset })

// Тема: применяем к <html> и сохраняем. watch срабатывает сразу с текущим
// значением, поэтому начальная тема выставляется при загрузке.
$theme.watch((theme) => {
  document.documentElement.setAttribute('data-theme', theme)
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    /* localStorage недоступен — игнорируем */
  }
})
