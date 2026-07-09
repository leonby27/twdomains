import { useEffect, useRef, useState } from 'react'
import { useUnit } from 'effector-react'
import {
  $code,
  $secondsLeft,
  $expired,
  codeRequested,
  ticked,
} from '@/entities/code'
import { IconCopy, IconCheck, IconRefresh } from '@/shared/ui/Icon'
import { formatTtl } from '@/shared/lib/formatTtl'
import { $codeModalOpen, closeCodeModal } from '../../model/modal.js'
import styles from './CodeModal.module.css'

const ROLL_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
const ROLL_TICKS = 6
const ROLL_DURATION = 260
const ROLL_STAGGER = 22

// Как в счётчиках на главной: перед итоговым значением символ «прокручивает»
// случайные варианты со всё большей задержкой между ними (эффект замедления).
function rollToChar(finalChar, applyChar, delayBeforeStart) {
  if (finalChar === '-' || finalChar === ' ') {
    applyChar(finalChar)
    return () => {}
  }
  const timers = []
  for (let tick = 1; tick <= ROLL_TICKS; tick++) {
    const progress = tick / ROLL_TICKS
    const at = delayBeforeStart + progress * progress * ROLL_DURATION
    const isLast = tick === ROLL_TICKS
    timers.push(
      setTimeout(() => {
        applyChar(isLast ? finalChar : ROLL_CHARS[Math.floor(Math.random() * ROLL_CHARS.length)])
      }, at)
    )
  }
  return () => timers.forEach(clearTimeout)
}

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
  const [spinning, setSpinning] = useState(false)
  const [agreed, setAgreed] = useState(true)
  const [displayChars, setDisplayChars] = useState(() => (code || '········').split(''))
  const prevCodeRef = useRef(code)
  const cleanupsRef = useRef([])

  // Прокрутка символов — только когда код реально сменился, не при первой загрузке.
  useEffect(() => {
    const target = (expired ? '— — — —' : code || '········').split('')
    cleanupsRef.current.forEach((cancel) => cancel())
    cleanupsRef.current = []

    const isRealChange = prevCodeRef.current && code && prevCodeRef.current !== code
    prevCodeRef.current = code
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (isRealChange && !expired && !reducedMotion) {
      setDisplayChars(
        target.map((c) => (c === '-' ? '-' : ROLL_CHARS[Math.floor(Math.random() * ROLL_CHARS.length)]))
      )
      target.forEach((finalChar, i) => {
        const cancel = rollToChar(
          finalChar,
          (c) => setDisplayChars((prev) => prev.map((cur, idx) => (idx === i ? c : cur))),
          i * ROLL_STAGGER
        )
        cleanupsRef.current.push(cancel)
      })
    } else {
      setDisplayChars(target)
    }

    return () => cleanupsRef.current.forEach((cancel) => cancel())
  }, [code, expired])

  // Согласие всегда включено по умолчанию при каждом открытии модалки.
  useEffect(() => {
    if (open) setAgreed(true)
  }, [open])

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

        <div className={styles.title}>Код подтверждения</div>
        <div className={styles.sub}>Временный код для ввода в аккаунте реселлера</div>

        <div className={styles.codeBox}>
          <div className={styles.codeRow}>
            <div className={`${styles.code} ${!agreed ? styles.blurred : ''}`}>
              {displayChars.map((char, i) => (
                <span className={styles.char} key={i}>
                  {char}
                </span>
              ))}
            </div>
            {!expired && (
              <button
                className={styles.refresh}
                onClick={() => {
                  setSpinning(true)
                  request()
                }}
                data-tooltip="Обновить код"
              >
                <IconRefresh
                  width="18"
                  height="18"
                  className={spinning ? styles.spin : ''}
                  onAnimationEnd={() => setSpinning(false)}
                />
              </button>
            )}
          </div>

          {expired ? (
            <div className={`${styles.ttl} ${styles.ttlExpired}`}>Срок действия истёк</div>
          ) : (
            <div className={`${styles.ttl} ${warn ? styles.ttlWarn : ''}`}>
              Действует {formatTtl(secondsLeft)}
            </div>
          )}
        </div>

        <div className={styles.note}>
          Передайте код владельцу аккаунта — он введёт его для подтверждения операции с доменом
        </div>

        {expired ? (
          <button className={styles.action} onClick={() => request()}>
            Сгенерировать новый код
          </button>
        ) : (
          <button
            className={`${styles.action} ${copied ? styles.copied : ''}`}
            onClick={copy}
            disabled={!agreed}
          >
            {copied ? <IconCheck width="16" height="16" /> : <IconCopy width="16" height="16" />}
            {copied ? 'Скопировано' : 'Скопировать'}
          </button>
        )}

        <label className={styles.consent}>
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <span>
            Я согласен передать код верификации, понимаю последствия передачи кода и
            согласен с{' '}
            <a href="#" onClick={(e) => e.preventDefault()}>
              условиями
            </a>{' '}
            передачи кода.
          </span>
        </label>
      </div>
    </div>
  )
}
