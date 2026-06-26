import { useParams, useNavigate } from 'react-router-dom'
import Layout from '../components/Layout.jsx'
import { usePanel } from '../store.jsx'
import { IconGlobe, IconCheckCircle, IconAlert } from '../components/icons.jsx'

// Деталь домена: реселлер, срок, администратор, размещение + действия.
export default function DomainDetail() {
  const { name } = useParams()
  const navigate = useNavigate()
  const { domains, user } = usePanel()
  const domain = domains.find((d) => d.name === decodeURIComponent(name || ''))

  if (!domain) {
    return (
      <Layout back="/home">
        <div className="empty">Домен не найден</div>
      </Layout>
    )
  }

  return (
    <Layout back="/home">
      <div className="detail">
        <div className="detail__head">
          <span className="detail__ic">
            <IconGlobe width="26" height="26" />
          </span>
          <div>
            <div className="detail__name">{domain.name}</div>
            <span className={`datebadge datebadge--${domain.dateStatus === 'warning' ? 'orange' : 'green'}`}>
              {domain.dateStatus === 'warning' ? (
                <IconAlert width="18" height="18" />
              ) : (
                <IconCheckCircle width="18" height="18" />
              )}
              Оплачен до {domain.paidUntil}
            </span>
          </div>
        </div>

        <dl className="kv">
          <div className="kv__row">
            <dt>Реселлер</dt>
            <dd>{domain.reseller}</dd>
          </div>
          <div className="kv__row">
            <dt>Действует до</dt>
            <dd>{domain.paidUntil}</dd>
          </div>
          <div className="kv__row">
            <dt>Администратор</dt>
            <dd>{user.fullName} · ЕСИА</dd>
          </div>
          <div className="kv__row">
            <dt>Размещение</dt>
            <dd>{domain.hosting}</dd>
          </div>
        </dl>

        <div className="detail__actions">
          <button className="btn btn--soft btn--block">Открыть в ЛК реселлера</button>
          <button className="btn btn--ghost btn--block">Продлить домен</button>
          <button className="btn btn--ghost btn--block" onClick={() => navigate('/code')}>
            Сгенерировать код верификации
          </button>
        </div>
      </div>
    </Layout>
  )
}
