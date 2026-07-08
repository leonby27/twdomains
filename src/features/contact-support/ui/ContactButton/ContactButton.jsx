import { useUnit } from 'effector-react'
import { IconMessage } from '@/shared/ui/Icon'
import { openContactModal } from '../../model/modal.js'
import styles from './ContactButton.module.css'

// Плавающая круглая кнопка «Есть вопросы?» — открывает форму сообщения.
export function ContactButton() {
  const open = useUnit(openContactModal)
  return (
    <button className={styles.fab} onClick={() => open()} title="Есть вопросы? Напишите нам">
      <IconMessage width="24" height="24" />
    </button>
  )
}
