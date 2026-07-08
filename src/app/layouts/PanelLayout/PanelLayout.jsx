import { useNavigate, useLocation } from 'react-router-dom'
import { useUnit } from 'effector-react'
import { Header } from '@/widgets/header'
import { MobileTabBar } from '@/widgets/mobile-tabbar'
import { CodeModal } from '@/features/generate-code'
import { LogoutConfirmModal } from '@/features/logout'
import { ProfileDrawer } from '@/features/profile'
import { ContactButton, ContactModal } from '@/features/contact-support'
import { $reloadKey } from '@/shared/model/reload'
import { ROUTES } from '@/shared/config/routes'
import styles from './PanelLayout.module.css'

// Каркас авторизованных страниц: шапка + контентный контейнер (+ опц. «Назад»).
// Клик по логотипу меняет reloadKey → контент перемонтируется и проигрывает «обновление».
export function PanelLayout({ children, back }) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const reloadKey = useUnit($reloadKey)
  // Вложенные detail-страницы (напр. «Личные данные») скрывают нижний таб-бар —
  // у них своя кнопка «Назад», а таб-бар был бы конкурирующей навигацией.
  const showTabBar = pathname !== ROUTES.passport
  return (
    <div>
      <Header />
      <main
        key={reloadKey}
        className={`${styles.content} ${showTabBar ? '' : styles.noTabBar} ${reloadKey > 0 ? styles.refresh : ''}`}
      >
        {back && (
          <button className={styles.back} onClick={() => navigate(back)}>
            ‹ Назад
          </button>
        )}
        {children}
      </main>
      {showTabBar && <MobileTabBar />}
      <ContactButton />
      <CodeModal />
      <LogoutConfirmModal />
      <ProfileDrawer />
      <ContactModal />
    </div>
  )
}
