import { useNavigate } from 'react-router-dom'
import { useUnit } from 'effector-react'
import { Header } from '@/widgets/header'
import { CodeModal } from '@/features/generate-code'
import { LogoutConfirmModal } from '@/features/logout'
import { ProfileModal } from '@/features/profile'
import { DomainDetailsModal } from '@/features/domain-details'
import { $reloadKey } from '@/shared/model/reload'
import styles from './PanelLayout.module.css'

// Каркас авторизованных страниц: шапка + контентный контейнер (+ опц. «Назад»).
// Клик по логотипу меняет reloadKey → контент перемонтируется и проигрывает «обновление».
export function PanelLayout({ children, back }) {
  const navigate = useNavigate()
  const reloadKey = useUnit($reloadKey)
  return (
    <div>
      <Header />
      <main
        key={reloadKey}
        className={`${styles.content} ${reloadKey > 0 ? styles.refresh : ''}`}
      >
        {back && (
          <button className={styles.back} onClick={() => navigate(back)}>
            ‹ Назад
          </button>
        )}
        {children}
      </main>
      <CodeModal />
      <LogoutConfirmModal />
      <ProfileModal />
      <DomainDetailsModal />
    </div>
  )
}
