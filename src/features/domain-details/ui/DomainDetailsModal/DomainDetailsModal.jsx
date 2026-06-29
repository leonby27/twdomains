import { useEffect } from 'react'
import { useUnit } from 'effector-react'
import { $domains, selectDomainByName, DateBadge } from '@/entities/domain'
import { $user } from '@/entities/session'
import { openCodeModal } from '@/features/generate-code'
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
  const [open, name, domains, user, close, openCode] = useUnit([
    $domainDetailsOpen,
    $selectedDomainName,
    $domains,
    $user,
    closeDomainDetails,
    openCodeModal,
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
            <IconGlobe width="26" height="26" />
          </span>
          <div>
            <div className={styles.name}>{domain.name}</div>
            <DateBadge date={domain.paidUntil} status={domain.dateStatus} prefix="Оплачен до" />
          </div>
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
            <dt>Администратор</dt>
            <dd>{user?.fullName} · ЕСИА</dd>
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
          <Button variant="ghost" block>
            Продлить домен
          </Button>
          <Button
            variant="ghost"
            block
            onClick={() => {
              close()
              openCode()
            }}
          >
            Сгенерировать код верификации
          </Button>
        </div>
      </div>
    </div>
  )
}
