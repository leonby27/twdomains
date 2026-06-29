import { useEffect } from 'react'
import { useUnit } from 'effector-react'
import { $domains, selectDomainByName } from '@/entities/domain'
import { Button } from '@/shared/ui/Button'
import { IconGlobe } from '@/shared/ui/Icon'
import {
  $selectedDomainName,
  $domainDetailsOpen,
  closeDomainDetails,
} from '../../model/domainDetails.js'
import styles from './DomainDetailsModal.module.css'

// Модалка детали домена: реселлер, срок, администратор, размещение + действия.
export function DomainDetailsModal() {
  const [open, name, domains, close] = useUnit([
    $domainDetailsOpen,
    $selectedDomainName,
    $domains,
    closeDomainDetails,
  ])

  useEffect(() => {
    if (!open) return undefined
    const h = (e) => e.key === 'Escape' && close()
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [open, close])

  if (!open) return null
  const domain = selectDomainByName(domains, name)
  if (!domain) return null

  return (
    <div className={styles.scrim} onClick={close}>
      <div className={styles.card} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={close} title="Закрыть">
          ✕
        </button>

        <div className={styles.head}>
          <span className={styles.ic}>
            <IconGlobe width="20" height="20" />
          </span>
          <div className={styles.name}>{domain.name}</div>
        </div>

        <dl className={styles.kv}>
          <div className={styles.row}>
            <dt>Регистратор</dt>
            <dd>{domain.reseller}</dd>
          </div>
          <div className={styles.row}>
            <dt>Оплачен до</dt>
            <dd>{domain.paidUntil}</dd>
          </div>
          <div className={styles.row}>
            <dt>Размещение</dt>
            <dd>{domain.hosting}</dd>
          </div>
        </dl>

        <div className={styles.actions}>
          <Button variant="soft" block>
            Открыть в ЛК реселлера
          </Button>
        </div>
      </div>
    </div>
  )
}
