import { useParams } from 'react-router-dom'
import { useUnit } from 'effector-react'
import { $domains, selectDomainByName, DateBadge } from '@/entities/domain'
import { $user } from '@/entities/session'
import { openCodeModal } from '@/features/generate-code'
import { Button } from '@/shared/ui/Button'
import { IconGlobe } from '@/shared/ui/Icon'
import styles from './DomainDetailPage.module.css'

// Деталь домена: реселлер, срок, администратор, размещение + действия.
export function DomainDetailPage() {
  const { name } = useParams()
  const [domains, user, openCode] = useUnit([$domains, $user, openCodeModal])
  const domain = selectDomainByName(domains, decodeURIComponent(name || ''))

  if (!domain) {
    return <div className={styles.empty}>Домен не найден</div>
  }

  return (
    <div className={styles.detail}>
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
        <Button variant="ghost" block onClick={() => openCode()}>
          Сгенерировать код верификации
        </Button>
      </div>
    </div>
  )
}
