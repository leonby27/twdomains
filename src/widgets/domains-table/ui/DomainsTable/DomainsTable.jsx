import { useUnit } from 'effector-react'
import { DomainRow } from '@/entities/domain'
import { openDomainDetails } from '@/features/domain-details'
import { $visibleDomains } from '../../model/domainsTable.js'
import styles from './DomainsTable.module.css'

// Таблица доменов: шапка колонок + строки. Данные — из $visibleDomains.
export function DomainsTable() {
  const [domains, openDetails] = useUnit([$visibleDomains, openDomainDetails])

  return (
    <div className={styles.table}>
      <div className={styles.head}>
        <span>Домен</span>
        <span>Оплачен до</span>
        <span>Регистратор</span>
        <span />
      </div>
      <div className={styles.body}>
        {domains.length === 0 ? (
          <div className={styles.empty}>Ничего не найдено</div>
        ) : (
          domains.map((d) => (
            <DomainRow key={d.name} domain={d} onClick={() => openDetails(d.name)} />
          ))
        )}
      </div>
    </div>
  )
}
