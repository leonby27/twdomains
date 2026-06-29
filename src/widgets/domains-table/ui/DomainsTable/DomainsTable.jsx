import { useUnit } from 'effector-react'
import { DomainRow } from '@/entities/domain'
import { openDomainDetails } from '@/features/domain-details'
import { Spinner } from '@/shared/ui/Spinner'
import { useIncrementalList } from '@/shared/lib/useIncrementalList'
import { $visibleDomains } from '../../model/domainsTable.js'
import styles from './DomainsTable.module.css'

// Таблица доменов: шапка колонок + строки. Данные — из $visibleDomains.
// Первые 30 строк, остальное догружается при скролле (имитация).
export function DomainsTable() {
  const [domains, openDetails] = useUnit([$visibleDomains, openDomainDetails])
  const { visible, hasMore, sentinelRef } = useIncrementalList(domains, 30)

  return (
    <div className={styles.table}>
      <div className={styles.head}>
        <span>Домен</span>
        <span>Оплачен до</span>
        <span>Регистратор</span>
        <span />
      </div>
      <div className={styles.body}>
        {visible.length === 0 ? (
          <div className={styles.empty}>Ничего не найдено</div>
        ) : (
          visible.map((d) => (
            <DomainRow key={d.name} domain={d} onClick={() => openDetails(d.name)} />
          ))
        )}
        {hasMore && (
          <div className={styles.loader} ref={sentinelRef}>
            <Spinner size={24} />
          </div>
        )}
      </div>
    </div>
  )
}
