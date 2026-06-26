import { useNavigate } from 'react-router-dom'
import { Button } from '@/shared/ui/Button'
import { IconGos } from '@/shared/ui/Icon'
import { ROUTES } from '@/shared/config/routes'

// Кнопка входа: ведёт на экран перехода в Госуслуги (где запускается loginFx).
export function GosuslugiButton() {
  const navigate = useNavigate()
  return (
    <Button variant="gos" block onClick={() => navigate(ROUTES.gosuslugi)}>
      <IconGos width="20" height="20" />
      Войти через Госуслуги
    </Button>
  )
}
