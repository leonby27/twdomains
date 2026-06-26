import { useNavigate } from 'react-router-dom'
import { IconGos, IconLock } from '../components/icons.jsx'

// Экран входа. Единственный способ авторизации — через Госуслуги (ЕСИА).
export default function Login() {
  const navigate = useNavigate()

  return (
    <div className="auth">
      <div className="auth__card">
        <div className="brand brand--lg">
          <img className="auth__logo" src="/logo.svg" alt="Timeweb" />
          <span className="brand__sub">Домены</span>
        </div>
        <h1 className="auth__title">Панель регистратора доменов</h1>
        <p className="auth__lead">
          Вход только через Госуслуги. Ваш идентификатор ЕСИА — ключ ко всем
          верифицированным доменам, где бы они ни были размещены.
        </p>

        <button className="btn btn--gos btn--block" onClick={() => navigate('/auth/gosuslugi')}>
          <IconGos width="20" height="20" />
          Войти через Госуслуги
        </button>

        <div className="auth__foot">
          <IconLock width="13" height="13" />
          Соединение защищено · domains.timeweb.ru
        </div>
      </div>
    </div>
  )
}
