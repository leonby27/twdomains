import { useState } from 'react'
import { useUnit } from 'effector-react'
import { IconMessage, IconMail } from '@/shared/ui/Icon'
import { useIsMobile } from '@/shared/lib/useIsMobile'
import { openContactModal } from '../../model/modal.js'
import styles from './ContactButton.module.css'

// Плавающая кнопка поддержки. Раскрывает меню: «Написать в чат» / «Написать письмо».
// Десктоп — по ховеру, мобайл — по клику.
export function ContactButton() {
  const open = useUnit(openContactModal)
  const isMobile = useIsMobile()
  const [expanded, setExpanded] = useState(false)

  const hoverProps = isMobile
    ? {}
    : { onMouseEnter: () => setExpanded(true), onMouseLeave: () => setExpanded(false) }

  // TODO: интеграция с Jivosite — открытие виджета чата.
  const openChat = () => {
    setExpanded(false)
  }
  const openMail = () => {
    setExpanded(false)
    open()
  }

  return (
    <>
      {isMobile && expanded && (
        <div className={styles.overlay} onClick={() => setExpanded(false)} />
      )}
      <div className={styles.wrap} {...hoverProps}>
        {expanded && (
          <div className={styles.menu}>
            <button className={styles.item} onClick={openChat}>
              <span className={styles.itemIc}>
                <IconMessage width="20" height="20" />
              </span>
              Написать в чат
            </button>
            <button className={styles.item} onClick={openMail}>
              <span className={styles.itemIc}>
                <IconMail width="20" height="20" />
              </span>
              Написать письмо
            </button>
          </div>
        )}
        <button
          className={styles.fab}
          onClick={() => isMobile && setExpanded((v) => !v)}
          title="Есть вопросы? Напишите нам"
        >
          <IconMessage width="24" height="24" />
        </button>
      </div>
    </>
  )
}
