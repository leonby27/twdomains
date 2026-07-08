import { useEffect } from 'react'
import { useUnit } from 'effector-react'
import { IconCheck } from '@/shared/ui/Icon'
import { asset } from '@/shared/lib/asset'
import {
  $contactModalOpen,
  $email,
  $message,
  $messageSent,
  closeContactModal,
  emailChanged,
  messageChanged,
  messageSent,
} from '../../model/modal.js'
import styles from './ContactModal.module.css'

// Модалка «Напишите в поддержку» — форма email + свободное сообщение.
export function ContactModal() {
  const [open, email, message, sent, close, changeEmail, changeMessage, send] = useUnit([
    $contactModalOpen,
    $email,
    $message,
    $messageSent,
    closeContactModal,
    emailChanged,
    messageChanged,
    messageSent,
  ])

  useEffect(() => {
    if (!open) return undefined
    const h = (e) => e.key === 'Escape' && close()
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [open, close])

  if (!open) return null

  const canSubmit = email.includes('@') && message.trim()

  function submit(e) {
    e.preventDefault()
    if (!canSubmit) return
    send()
  }

  return (
    <div className={styles.scrim} onClick={close}>
      <div className={styles.card} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={close} title="Закрыть">
          ✕
        </button>

        {sent ? (
          <div className={styles.sentState}>
            <div className={styles.sentIcon}>
              <IconCheck width="28" height="28" />
            </div>
            <div className={styles.title}>Сообщение отправлено</div>
            <div className={styles.sub}>Мы ответим вам на вашу почту в течение рабочего дня</div>
          </div>
        ) : (
          <>
            <div className={styles.icon}>
              <img src={asset('/chat.png')} alt="" width="80" height="80" />
            </div>
            <div className={styles.title}>Напишите в поддержку</div>
            <div className={styles.sub}>Опишите вопрос — ответим на почту в течение рабочего дня</div>

            <form onSubmit={submit}>
              <input
                className={styles.input}
                type="email"
                placeholder="Ваш email"
                value={email}
                onChange={(e) => changeEmail(e.target.value)}
                autoFocus
              />
              <textarea
                className={styles.textarea}
                placeholder="Опишите ваш вопрос..."
                value={message}
                onChange={(e) => changeMessage(e.target.value)}
                rows={4}
              />
              <button className={styles.action} type="submit" disabled={!canSubmit}>
                Отправить сообщение
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
