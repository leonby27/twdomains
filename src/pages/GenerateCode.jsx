import { useEffect, useRef, useState } from 'react'
import Layout from '../components/Layout.jsx'
import { IconClock, IconCopy, IconCheck } from '../components/icons.jsx'
import { VERIFICATION_CODE, CODE_TTL_SECONDS } from '../data/mock.js'

function format(total) {
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

// Генерация временного кода верификации с обратным отсчётом TTL.
// Добавлен краевой кейс: истечение кода → состояние «протух» + перевыпуск.
export default function GenerateCode() {
  const [left, setLeft] = useState(CODE_TTL_SECONDS)
  const [copied, setCopied] = useState(false)
  const timer = useRef(null)

  function start() {
    setLeft(CODE_TTL_SECONDS)
    if (timer.current) clearInterval(timer.current)
    timer.current = setInterval(() => {
      setLeft((v) => {
        if (v <= 1) {
          clearInterval(timer.current)
          return 0
        }
        return v - 1
      })
    }, 1000)
  }

  useEffect(() => {
    start()
    return () => clearInterval(timer.current)
  }, [])

  const expired = left === 0
  const warn = left > 0 && left < 5 * 60

  async function copy() {
    try {
      await navigator.clipboard.writeText(VERIFICATION_CODE)
    } catch {
      /* clipboard может быть недоступен в проде без https — это прототип */
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <Layout back="/home">
      <h1 className="page-title">Код верификации</h1>

      <div className={`code-card ${expired ? 'code-card--expired' : ''}`}>
        <div className="code-card__label">Временный код верификации</div>
        <div className="code-card__value">{expired ? '— — — —' : VERIFICATION_CODE}</div>

        {expired ? (
          <div className="code-card__ttl code-card__ttl--expired">
            <IconClock width="13" height="13" />
            Срок действия истёк
          </div>
        ) : (
          <div className={`code-card__ttl ${warn ? 'code-card__ttl--warn' : ''}`}>
            <IconClock width="13" height="13" />
            Действует {format(left)}
          </div>
        )}

        {expired ? (
          <button className="code-card__btn" onClick={start}>
            Сгенерировать новый код
          </button>
        ) : (
          <button className={`code-card__btn ${copied ? 'is-copied' : ''}`} onClick={copy}>
            {copied ? <IconCheck width="16" height="16" /> : <IconCopy width="16" height="16" />}
            {copied ? 'Скопировано' : 'Скопировать код'}
          </button>
        )}
      </div>

      <div className="note note--amber">
        <span className="note__ic">📨</span>
        <div>
          Передайте код владельцу аккаунта любым каналом — он введёт его в личном кабинете
          реселлера. Код действует 30 минут и привязан к вашему ЕСИА.
        </div>
      </div>
    </Layout>
  )
}
