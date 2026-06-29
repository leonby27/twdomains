import { useNavigate } from 'react-router-dom'
import { Button } from '@/shared/ui/Button'
import { ROUTES } from '@/shared/config/routes'

// Кнопка входа: ведёт на экран перехода в Госуслуги (где запускается loginFx).
export function GosuslugiButton() {
  const navigate = useNavigate()
  return (
    <Button
      variant="ghost"
      block
      style={{ fontWeight: 500 }}
      onClick={() => navigate(ROUTES.gosuslugi)}
    >
      <img src="/gos.svg" alt="" width="26" height="26" />
      Войти через Госуслуги
    </Button>
  )
}
