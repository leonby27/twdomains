import { useUnit } from 'effector-react'
import { IconChevronRight } from '@/shared/ui/Icon'
import { openCodeModal } from '../../model/modal.js'
import styles from './GenerateCodeButton.module.css'

// Карточка-кнопка «Сгенерировать код» — открывает модалку с кодом верификации.
export function GenerateCodeButton() {
  const open = useUnit(openCodeModal)
  return (
    <button className={styles.gencode} onClick={() => open()}>
      <span className={styles.ic}>
        <img src="/lock.svg" alt="" width="24" height="24" />
      </span>
      <span className={styles.body}>
        <span className={styles.title}>Сгенерировать код</span>
        <span className={styles.sub}>для верификации домена</span>
      </span>
      <IconChevronRight className={styles.arrow} width="20" height="20" />
    </button>
  )
}
