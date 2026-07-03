import { Navigate } from 'react-router-dom'
import { useUnit } from 'effector-react'
import { $user, EsiaDetails } from '@/entities/session'
import { IconArrowLeft } from '@/shared/ui/Icon'
import { ROUTES } from '@/shared/config/routes'
import { useIsMobile } from '@/shared/lib/useIsMobile'
import { useViewTransitionNavigate } from '@/shared/lib/viewTransition'
import styles from './PassportPage.module.css'

// Внутренняя страница «Личные данные» (мобайл): кнопка «Назад» + карточка данных ЕСИА.
export function PassportPage() {
  const isMobile = useIsMobile()
  const user = useUnit($user)
  const go = useViewTransitionNavigate()

  if (!isMobile) return <Navigate to={ROUTES.home} replace />
  if (!user) return null

  return (
    <div className={styles.page}>
      <button className={styles.back} onClick={() => go(ROUTES.account, 'back')}>
        <IconArrowLeft width="20" height="20" />
        Назад
      </button>
      <EsiaDetails user={user} />
    </div>
  )
}
