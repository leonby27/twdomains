import { Navigate, Route, Routes } from 'react-router-dom'
import { usePanel } from './store.jsx'
import Login from './pages/Login.jsx'
import GosRedirect from './pages/GosRedirect.jsx'
import Home from './pages/Home.jsx'
import DomainDetail from './pages/DomainDetail.jsx'
import GenerateCode from './pages/GenerateCode.jsx'

// Гард авторизации: неавторизованного отправляем на /login.
function Protected({ children }) {
  const { authed } = usePanel()
  if (!authed) return <Navigate to="/login" replace />
  return children
}

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/gosuslugi" element={<GosRedirect />} />
        <Route
          path="/home"
          element={
            <Protected>
              <Home />
            </Protected>
          }
        />
        <Route path="/domains" element={<Navigate to="/home" replace />} />
        <Route
          path="/domains/:name"
          element={
            <Protected>
              <DomainDetail />
            </Protected>
          }
        />
        <Route
          path="/code"
          element={
            <Protected>
              <GenerateCode />
            </Protected>
          }
        />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </>
  )
}
