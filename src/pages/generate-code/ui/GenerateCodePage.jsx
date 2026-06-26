import { useEffect, useState } from 'react'
import { useUnit } from 'effector-react'
import {
  $code,
  $secondsLeft,
  $expired,
  codeRequested,
  ticked,
  codeReset,
} from '@/entities/code'
import { IconClock, IconCopy, IconCheck } from '@/shared/ui/Icon'
import { formatTtl } from '@/shared/lib/formatTtl'
import styles from './GenerateCodePage.module.css'

// Экран генерации кода верификации с обратным отсчётом TTL.
export function GenerateCodePage() {
  const [code, secondsLeft, expired, requestCode, tick] = useUnit([
    $code,
    $secondsLeft,
    $expired,
    codeRequested,
    ticked,
  ])
  const [copied, setCopied] = useState(false)

  // Запрос кода при входе, сброс при уходе.
  useEffect(() => {
    requestCode()
    return () => codeReset()
  }, [requestCode])

  // Тик раз в секунду — механизм таймера на стороне UI.
  useEffect(() => {
    const t = setInterval(() => tick(), 1000)
    return () => clearInterval(t)
  }, [tick])

  const warn = !expired && secondsLeft < 5 * 60

  async function copy() {
    try {
      await navigator.clipboard.writeText(code)
    } catch {
      /* clipboard может быть недоступен без https — это прототип */
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <>
      <h1 className={styles.title}>Код верификации</h1>

      <div className={`${styles.card} ${expired ? styles.expired : ''}`}>
        <div className={styles.label}>Временный код верификации</div>
        <div className={styles.value}>{expired ? '— — — —' : code || '········'}</div>

        {expired ? (
          <div className={`${styles.ttl} ${styles.ttlExpired}`}>
            <IconClock width="13" height="13" />
            Срок действия истёк
          </div>
        ) : (
          <div className={`${styles.ttl} ${warn ? styles.ttlWarn : ''}`}>
            <IconClock width="13" height="13" />
            Действует {formatTtl(secondsLeft)}
          </div>
        )}

        {expired ? (
          <button className={styles.btn} onClick={() => requestCode()}>
            Сгенерировать новый код
          </button>
        ) : (
          <button
            className={`${styles.btn} ${copied ? styles.btnCopied : ''}`}
            onClick={copy}
          >
            {copied ? <IconCheck width="16" height="16" /> : <IconCopy width="16" height="16" />}
            {copied ? 'Скопировано' : 'Скопировать код'}
          </button>
        )}
      </div>

      <div className={styles.note}>
        <span className={styles.noteIc}>📨</span>
        <div>
          Передайте код владельцу аккаунта любым каналом — он введёт его в личном кабинете
          реселлера. Код действует 30 минут и привязан к вашему ЕСИА.
        </div>
      </div>
    </>
  )
}
