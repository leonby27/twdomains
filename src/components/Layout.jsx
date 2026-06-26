import { Link, useNavigate } from 'react-router-dom'
import { usePanel } from '../store.jsx'

// Общий каркас авторизованных экранов: шапка (по макету Figma) + контент.
export default function Layout({ children, back }) {
  const { user, logout } = usePanel()
  const navigate = useNavigate()

  return (
    <div className="app">
      <header className="appbar">
        <div className="appbar__inner">
          <Link to="/home" className="appbar__brand">
            <img className="appbar__logo" src="/logo.svg" alt="Timeweb" />
            <span className="appbar__caption">Панель регистратора доменов</span>
          </Link>

          <div className="appbar__right">
            <span className="appbar__gos" title="ЕСИА · Госуслуги">
              <img src="/gos.svg" alt="Госуслуги" width="32" height="32" />
            </span>

            <div className="userblock">
              <div className="userblock__name">
                {user.name}
                {user.esiaVerified && (
                  <img
                    className="userblock__verified"
                    src="/verified.svg"
                    alt="Верифицирован через ЕСИА"
                    width="18"
                    height="18"
                  />
                )}
              </div>
              <div className="userblock__sub">Верифицирован через ЕСИА</div>
            </div>

            <button
              className="appbar__logout"
              title="Выйти"
              onClick={() => {
                logout()
                navigate('/login')
              }}
            >
              <img src="/logout.svg" alt="Выйти" width="24" height="24" />
            </button>
          </div>
        </div>
      </header>

      <main className="content">
        {back && (
          <button className="backlink" onClick={() => navigate(back)}>
            ‹ Назад
          </button>
        )}
        {children}
      </main>
    </div>
  )
}
