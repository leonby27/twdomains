import { useEffect, useState } from 'react'
import { useUnit } from 'effector-react'
import {
  $code,
  $secondsLeft,
  $expired,
  codeRequested,
  ticked,
} from '@/entities/code'
import { IconCopy, IconCheck } from '@/shared/ui/Icon'
import { formatTtl } from '@/shared/lib/formatTtl'
import { $codeModalOpen, closeCodeModal } from '../../model/modal.js'
import styles from './CodeModal.module.css'

// Модалка кода верификации: код + обратный отсчёт TTL + копирование.
export function CodeModal() {
  const [open, code, secondsLeft, expired, close, tick, request] = useUnit([
    $codeModalOpen,
    $code,
    $secondsLeft,
    $expired,
    closeCodeModal,
    ticked,
    codeRequested,
  ])
  const [copied, setCopied] = useState(false)

  // Тик раз в секунду, пока модалка открыта.
  useEffect(() => {
    if (!open) return undefined
    const t = setInterval(() => tick(), 1000)
    return () => clearInterval(t)
  }, [open, tick])

  // Закрытие по Escape.
  useEffect(() => {
    if (!open) return undefined
    const h = (e) => e.key === 'Escape' && close()
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [open, close])

  if (!open) return null

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
    <div className={styles.scrim} onClick={close}>
      <div
        className={`${styles.card} ${expired ? styles.expired : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.close} onClick={close} title="Закрыть">
          ✕
        </button>

        <div className={styles.title}>Код верификации</div>
        <div className={styles.sub}>Временный код для ввода в личном кабинете реселлера</div>

        <div className={styles.codeBox}>
          <div className={styles.code}>{expired ? '— — — —' : code || '········'}</div>

          {expired ? (
            <div className={`${styles.ttl} ${styles.ttlExpired}`}>Срок действия истёк</div>
          ) : (
            <div className={`${styles.ttl} ${warn ? styles.ttlWarn : ''}`}>
              Действует {formatTtl(secondsLeft)}
            </div>
          )}
        </div>

        {expired ? (
          <button className={styles.action} onClick={() => request()}>
            Сгенерировать новый код
          </button>
        ) : (
          <button className={`${styles.action} ${copied ? styles.copied : ''}`} onClick={copy}>
            {copied ? <IconCheck width="16" height="16" /> : <IconCopy width="16" height="16" />}
            {copied ? 'Скопировано' : 'Скопировать'}
          </button>
        )}

        <div className={styles.note}>
          Передайте код владельцу аккаунта — он введёт его в личном кабинете реселлера
        </div>
      </div>
    </div>
  )
}
