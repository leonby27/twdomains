import { useNavigate } from 'react-router-dom'
import { Header } from '@/widgets/header'
import { CodeModal } from '@/features/generate-code'
import styles from './PanelLayout.module.css'

// Каркас авторизованных страниц: шапка + контентный контейнер (+ опц. «Назад»).
export function PanelLayout({ children, back }) {
  const navigate = useNavigate()
  return (
    <div>
      <Header />
      <main className={styles.content}>
        {back && (
          <button className={styles.back} onClick={() => navigate(back)}>
            ‹ Назад
          </button>
        )}
        {children}
      </main>
      <CodeModal />
    </div>
  )
}
