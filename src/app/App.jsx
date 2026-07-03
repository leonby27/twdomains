import { Navigate, Route, Routes } from 'react-router-dom'
import { useUnit } from 'effector-react'
import { $isAuthed } from '@/entities/session'
import { LoginPage, GosRedirectPage } from '@/pages/login'
import { HomePage } from '@/pages/home'
import { AccountPage, PassportPage } from '@/pages/account'
import { ROUTES } from '@/shared/config/routes'
import { PanelLayout } from './layouts/PanelLayout/PanelLayout.jsx'

// Гард авторизации + общий каркас панели для авторизованных страниц.
function Protected({ children, back }) {
  const authed = useUnit($isAuthed)
  if (!authed) return <Navigate to={ROUTES.login} replace />
  return <PanelLayout back={back}>{children}</PanelLayout>
}

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={ROUTES.home} replace />} />
      <Route path={ROUTES.login} element={<LoginPage />} />
      <Route path={ROUTES.gosuslugi} element={<GosRedirectPage />} />
      <Route
        path={ROUTES.home}
        element={
          <Protected>
            <HomePage />
          </Protected>
        }
      />
      <Route
        path={ROUTES.account}
        element={
          <Protected>
            <AccountPage />
          </Protected>
        }
      />
      <Route
        path={ROUTES.passport}
        element={
          <Protected>
            <PassportPage />
          </Protected>
        }
      />
      <Route path="/domains" element={<Navigate to={ROUTES.home} replace />} />
      <Route path={ROUTES.domain()} element={<Navigate to={ROUTES.home} replace />} />
      <Route path={ROUTES.code} element={<Navigate to={ROUTES.home} replace />} />
      <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
    </Routes>
  )
}
