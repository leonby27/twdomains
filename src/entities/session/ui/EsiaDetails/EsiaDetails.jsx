import styles from './EsiaDetails.module.css'

// Паспортные данные из профиля ЕСИА: дата рождения, паспорт, кем выдан.
// ФИО не дублируем — оно уже над блоком. Середина номера скрыта звёздочками.
export function EsiaDetails({ user }) {
  if (!user?.passport) return null
  const num = user.passport.number
  return (
    <div className={styles.card}>
      <div className={styles.head}>Личные данные</div>
      <dl className={styles.list}>
        <div className={styles.row}>
          <dt>Дата рождения</dt>
          <dd>{user.birthDate}</dd>
        </div>
        <div className={styles.row}>
          <dt>Место рождения</dt>
          <dd>{user.birthPlace}</dd>
        </div>
        <div className={styles.row}>
          <dt>Паспорт РФ</dt>
          <dd>
            {user.passport.series} {'*'.repeat(num.length - 2)}
            {num.slice(-2)}
          </dd>
        </div>
        <div className={styles.row}>
          <dt>Дата выдачи</dt>
          <dd>{user.passport.issueDate}</dd>
        </div>
        <div className={styles.row}>
          <dt>Код подразделения</dt>
          <dd>{user.passport.departmentCode}</dd>
        </div>
        <div className={styles.row}>
          <dt>Кем выдан</dt>
          <dd>{user.passport.issuedBy}</dd>
        </div>
      </dl>
    </div>
  )
}
