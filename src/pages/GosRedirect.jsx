import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePanel } from '../store.jsx'

// Имитация перехода на Госуслуги и возврата с подтверждёнными данными.
export default function GosRedirect() {
  const navigate = useNavigate()
  const { login } = usePanel()

  useEffect(() => {
    const t = setTimeout(() => {
      login()
      navigate('/home', { replace: true })
    }, 1600)
    return () => clearTimeout(t)
  }, [login, navigate])

  return (
    <div className="auth">
      <div className="auth__card auth__card--center">
        <div className="spinner" />
        <div className="gos-load__title">Переход на Госуслуги</div>
        <div className="gos-load__sub">Получаем подтверждённые данные…</div>
      </div>
    </div>
  )
}
