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
  const root = document.documentElement
  root.setAttribute('data-theme', theme)
  // Красим панели браузера/ОС в цвет фона текущей темы. Читаем живое значение
  // --bg, чтобы не дублировать цвета из CSS. На Android нижний системный бар
  // подхватывает theme-color при установке сайта как PWA.
  const bg = getComputedStyle(root).getPropertyValue('--bg').trim()
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta && bg) meta.setAttribute('content', bg)
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    /* localStorage недоступен — игнорируем */
  }
})
