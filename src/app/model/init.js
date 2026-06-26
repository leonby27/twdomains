import { sample } from 'effector'
import { loginFx } from '@/entities/session'
import { logout } from '@/entities/session'
import { fetchDomainsFx, domainsReset } from '@/entities/domain'

// Кросс-слайсовая инициализация (уровень app):
// после успешного входа — грузим домены; при выходе — сбрасываем.
sample({ clock: loginFx.done, target: fetchDomainsFx })
sample({ clock: logout, target: domainsReset })
