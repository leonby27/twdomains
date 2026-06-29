import { useState } from 'react'
import { useUnit } from 'effector-react'
import { DomainRowMobile } from '@/entities/domain'
import { DomainResellerFilter } from '@/features/filter-domains-by-reseller'
import { DomainSearch } from '@/features/search-domains'
import { GenerateCodeButton } from '@/features/generate-code'
import { openDomainDetails } from '@/features/domain-details'
import { $visibleDomains } from '@/widgets/domains-table'
import { Faq } from '@/widgets/faq'
import { IconFilter, IconSearch } from '@/shared/ui/Icon'
import { Spinner } from '@/shared/ui/Spinner'
import { useIncrementalList } from '@/shared/lib/useIncrementalList'
import styles from './HomeMobile.module.css'

// Мобильный вид: карточка кода сверху, заголовок с иконками фильтра/поиска,
// компактный список доменов, FAQ.
export function HomeMobile() {
  const [domains, openDetails] = useUnit([$visibleDomains, openDomainDetails])
  const [openFilter, setOpenFilter] = useState(false)
  const [openSearch, setOpenSearch] = useState(false)
  const { visible, hasMore, sentinelRef } = useIncrementalList(domains, 30)

  return (
    <>
      <GenerateCodeButton />

      <div className={styles.bar}>
        <h1 className={styles.title}>Мои домены</h1>
        <button
          className={`${styles.iconBtn} ${openFilter ? styles.on : ''}`}
          title="Фильтр"
          onClick={() => setOpenFilter((v) => !v)}
        >
          <IconFilter width="24" height="24" />
        </button>
        <button
          className={`${styles.iconBtn} ${openSearch ? styles.on : ''}`}
          title="Поиск"
          onClick={() => setOpenSearch((v) => !v)}
        >
          <IconSearch width="24" height="24" />
        </button>
      </div>

      {openFilter && (
        <div className={styles.reveal}>
          <DomainResellerFilter />
        </div>
      )}
      {openSearch && (
        <div className={styles.reveal}>
          <DomainSearch />
        </div>
      )}

      {domains.length === 0 ? (
        <div className={styles.empty}>Ничего не найдено</div>
      ) : (
        <div className={styles.list}>
          {visible.map((d) => (
            <DomainRowMobile key={d.name} domain={d} onClick={() => openDetails(d.name)} />
          ))}
        </div>
      )}
      {hasMore && (
        <div className={styles.loader} ref={sentinelRef}>
          <Spinner size={24} gray />
        </div>
      )}

      <Faq />
    </>
  )
}
