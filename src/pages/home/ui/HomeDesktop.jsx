import { DomainSearch } from '@/features/search-domains'
import { GenerateCodeButton } from '@/features/generate-code'
import { DomainsTable } from '@/widgets/domains-table'
import { Faq } from '@/widgets/faq'
import styles from './HomePage.module.css'

// Десктоп-вид «Мои домены»: заголовок + поиск + таблица + генерация кода справа.
export function HomeDesktop() {
  return (
    <>
      <div className={styles.top}>
        <div>
          <h1 className={styles.title}>Мои домены</h1>
        </div>
        <GenerateCodeButton />
      </div>
      <DomainSearch />
      <DomainsTable />
      <Faq />
    </>
  )
}
