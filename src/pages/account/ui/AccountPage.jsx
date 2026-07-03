import { Navigate } from 'react-router-dom'
import { useUnit } from 'effector-react'
import { $user } from '@/entities/session'
import { openLogoutModal } from '@/features/logout'
import { AccountView } from '@/features/profile'
import { reloadRequested } from '@/shared/model/reload'
import { ROUTES } from '@/shared/config/routes'
import { useIsMobile } from '@/shared/lib/useIsMobile'
import { useViewTransitionNavigate } from '@/shared/lib/viewTransition'

// Страница «Аккаунт» (мобайл): та же верстка, что и в десктопной боковой панели.
// На десктопе профиль — в панели, поэтому страница редиректит на «Мои домены».
export function AccountPage() {
  const isMobile = useIsMobile()
  const go = useViewTransitionNavigate()
  const [user, reload, openLogout] = useUnit([$user, reloadRequested, openLogoutModal])

  if (!isMobile) return <Navigate to={ROUTES.home} replace />
  if (!user) return null

  return (
    <AccountView
      onRefresh={() => reload()}
      onLogout={() => openLogout()}
      onDetails={() => go(ROUTES.passport, 'forward')}
    />
  )
}
