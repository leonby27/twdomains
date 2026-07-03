import { useUnit } from 'effector-react'
import { DomainRowMobile } from '@/entities/domain'
import { $reseller, MOCK_EMPTY } from '@/features/filter-domains-by-reseller'
import { GenerateCodeCard } from '@/features/generate-code'
import { $visibleDomains } from '@/widgets/domains-table'
import { Faq } from '@/widgets/faq'
import { IconGlobe } from '@/shared/ui/Icon'
import { EmptyState } from '@/shared/ui/EmptyState'
import { Spinner } from '@/shared/ui/Spinner'
import { useIncrementalList } from '@/shared/lib/useIncrementalList'
import styles from './HomeMobile.module.css'

// Мобильный вид: карточка кода сверху, заголовок, компактный список доменов, FAQ.
export function HomeMobile() {
  const [domains, reseller] = useUnit([$visibleDomains, $reseller])
  const { visible, hasMore, sentinelRef } = useIncrementalList(domains, 30)

  return (
    <>
      <GenerateCodeCard />

      <div className={styles.bar}>
        <h1 className={styles.title}>Мои домены</h1>
      </div>

      {reseller === MOCK_EMPTY ? (
        <EmptyState
          icon={<IconGlobe width="28" height="28" />}
          title="Доменов пока нет"
          text="Здесь появятся ваши верифицированные домены."
        />
      ) : domains.length === 0 ? (
        <div className={styles.empty}>Ничего не найдено</div>
      ) : (
        <div className={styles.list}>
          {visible.map((d) => (
            <DomainRowMobile key={d.name} domain={d} />
          ))}
        </div>
      )}
      {reseller !== MOCK_EMPTY && hasMore && (
        <div className={styles.loader} ref={sentinelRef}>
          <Spinner size={24} gray />
        </div>
      )}

      <Faq />
    </>
  )
}
