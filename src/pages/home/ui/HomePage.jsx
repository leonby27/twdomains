import { DomainResellerFilter } from '@/features/filter-domains-by-reseller'
import { DomainSearch } from '@/features/search-domains'
import { GenerateCodeButton } from '@/features/generate-code'
import { DomainsTable } from '@/widgets/domains-table'
import { Faq } from '@/widgets/faq'
import styles from './HomePage.module.css'

// Главный экран: «Мои домены» — фильтр, генерация кода, поиск, таблица, FAQ.
export function HomePage() {
  return (
    <>
      <div className={styles.top}>
        <div>
          <h1 className={styles.title}>Мои домены</h1>
          <DomainResellerFilter />
        </div>
        <GenerateCodeButton />
      </div>
      <DomainSearch />
      <DomainsTable />
      <Faq />
    </>
  )
}
