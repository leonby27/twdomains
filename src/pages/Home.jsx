import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout.jsx'
import { usePanel } from '../store.jsx'
import {
  IconGlobe,
  IconChevronRight,
  IconCheckCircle,
  IconAlert,
  IconQuestion,
} from '../components/icons.jsx'
import { RESELLERS, RESELLER_ICONS, FAQ_LINKS } from '../data/mock.js'

// Бейдж «Оплачен до»: зелёный (оплачен) / оранжевый (истекает).
function DateBadge({ date, status }) {
  const ok = status !== 'warning'
  return (
    <span className={`datebadge datebadge--${ok ? 'green' : 'orange'}`}>
      {ok ? (
        <IconCheckCircle width="18" height="18" />
      ) : (
        <IconAlert width="18" height="18" />
      )}
      {date}
    </span>
  )
}

// Главный экран панели — «Мои домены»: фильтры + таблица доменов со всех реселлеров.
export default function Home() {
  const navigate = useNavigate()
  const { domains } = usePanel()
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')

  const chips = ['all', ...RESELLERS]

  const items = useMemo(
    () =>
      domains.filter(
        (d) =>
          (filter === 'all' || d.reseller === filter) &&
          d.name.toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [domains, filter, query],
  )

  return (
    <Layout>
      <div className="dash__top">
        <div className="dash__top-left">
          <h1 className="dash__title">Мои домены</h1>
          <div className="chips">
            {chips.map((c) => (
              <button
                key={c}
                className={`chip ${filter === c ? 'chip--active' : ''}`}
                onClick={() => setFilter(c)}
              >
                {c === 'all' ? 'Все домены' : c}
              </button>
            ))}
          </div>
        </div>

        <button className="gencode" onClick={() => navigate('/code')}>
          <span className="gencode__ic">
            <img src="/lock.svg" alt="" width="24" height="24" />
          </span>
          <span className="gencode__body">
            <span className="gencode__title">Сгенерировать код</span>
            <span className="gencode__sub">для верификации домена</span>
          </span>
          <IconChevronRight className="gencode__arrow" width="20" height="20" />
        </button>
      </div>

      <div className="search">
        <img className="search__ic" src="/search.svg" alt="" width="24" height="24" />
        <input
          className="search__input"
          placeholder="Поиск по домену…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="table">
        <div className="table__head">
          <span>Домен</span>
          <span>Оплачен до</span>
          <span className="table__head-center">Регистратор</span>
          <span />
        </div>
        <div className="table__body">
          <div className="table__rows">
          {items.length === 0 ? (
            <div className="empty">Ничего не найдено</div>
          ) : (
            items.map((d) => (
              <button
                key={d.name}
                className="trow"
                onClick={() => navigate(`/domains/${encodeURIComponent(d.name)}`)}
              >
                <span className="trow__domain">
                  <span className="trow__globe">
                    <IconGlobe width="20" height="20" />
                  </span>
                  <span className="trow__name">{d.name}</span>
                </span>
                <span className="trow__date">
                  <DateBadge date={d.paidUntil} status={d.dateStatus} />
                </span>
                <span className="trow__reseller">
                  <span className="reseller">
                    {RESELLER_ICONS[d.reseller] ? (
                      <img
                        className="reseller__logo"
                        src={RESELLER_ICONS[d.reseller]}
                        alt=""
                        width="24"
                        height="24"
                      />
                    ) : (
                      <span className="reseller__dot" />
                    )}
                    {d.reseller}
                  </span>
                </span>
                <IconChevronRight className="trow__chev" width="20" height="20" />
              </button>
            ))
          )}
          </div>
        </div>
      </div>

      <div className="faq">
        <span className="faq__q">
          <IconQuestion width="22" height="22" />
        </span>
        <span className="faq__title">Частые вопросы</span>
        <span className="faq__divider" />
        <nav className="faq__links">
          {FAQ_LINKS.map((l) => (
            <a key={l} href="#" onClick={(e) => e.preventDefault()}>
              {l}
            </a>
          ))}
        </nav>
      </div>
    </Layout>
  )
}
