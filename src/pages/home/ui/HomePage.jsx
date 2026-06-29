import { useIsMobile } from '@/shared/lib/useIsMobile'
import { HomeDesktop } from './HomeDesktop.jsx'
import { HomeMobile } from './HomeMobile.jsx'

// Главный экран «Мои домены»: мобильный и десктоп виды по вьюпорту.
export function HomePage() {
  const isMobile = useIsMobile()
  return isMobile ? <HomeMobile /> : <HomeDesktop />
}
