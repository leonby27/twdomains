import { IconQuestion } from '@/shared/ui/Icon'
import styles from './Faq.module.css'

const LINKS = [
  'Как добавить домен?',
  'Как передать домен другому лицу?',
  'Как сменить регистратора?',
]

// Футер с частыми вопросами.
export function Faq() {
  return (
    <div className={styles.faq}>
      <span className={styles.q}>
        <IconQuestion width="22" height="22" />
      </span>
      <span className={styles.title}>Частые вопросы</span>
      <span className={styles.divider} />
      <nav className={styles.links}>
        {LINKS.map((l) => (
          <a key={l} href="#" onClick={(e) => e.preventDefault()}>
            {l}
          </a>
        ))}
      </nav>
    </div>
  )
}
