import { useNavigate } from 'react-router-dom'
import { IconChevronRight } from '@/shared/ui/Icon'
import { ROUTES } from '@/shared/config/routes'
import styles from './GenerateCodeButton.module.css'

// Карточка-кнопка «Сгенерировать код» — ведёт на экран генерации кода.
export function GenerateCodeButton() {
  const navigate = useNavigate()
  return (
    <button className={styles.gencode} onClick={() => navigate(ROUTES.code)}>
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
