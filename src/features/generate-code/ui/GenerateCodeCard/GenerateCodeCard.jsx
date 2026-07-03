import { useUnit } from 'effector-react'
import { Button } from '@/shared/ui/Button'
import { asset } from '@/shared/lib/asset'
import { openCodeModal } from '../../model/modal.js'
import styles from './GenerateCodeCard.module.css'

// Мобильная карточка верификации (макет VH-Layouts 66844:88338):
// замок в круге, заголовок, описание и акцентная кнопка генерации кода.
export function GenerateCodeCard() {
  const open = useUnit(openCodeModal)
  return (
    <section className={styles.card}>
      <span className={styles.circle}>
        <img src={asset('/lock.svg')} alt="" width="32" height="32" />
      </span>
      <h2 className={styles.title}>Код подтверждения</h2>
      <p className={styles.text}>
        Код нужно будет ввести в личном кабинете панели управления Timeweb —
        например, чтобы верифицировать, продлить или передать домен
      </p>
      <Button variant="accent" block style={{ fontWeight: 500 }} onClick={() => open()}>
        Сгенерировать
      </Button>
    </section>
  )
}
