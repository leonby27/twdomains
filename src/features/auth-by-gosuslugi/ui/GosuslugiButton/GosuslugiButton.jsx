import { useNavigate } from 'react-router-dom'
import { Button } from '@/shared/ui/Button'
import { asset } from '@/shared/lib/asset'
import { ROUTES } from '@/shared/config/routes'

// Кнопка входа: ведёт на экран перехода в Госуслуги (где запускается loginFx).
export function GosuslugiButton({ disabled = false }) {
  const navigate = useNavigate()
  return (
    <Button
      variant="ghost"
      block
      disabled={disabled}
      style={{ fontWeight: 500 }}
      onClick={() => navigate(ROUTES.gosuslugi)}
    >
      <img src={asset('/gos.svg')} alt="" width="26" height="26" />
      Войти через Госуслуги
    </Button>
  )
}
