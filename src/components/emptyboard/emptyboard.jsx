import styles from './emptyboard.module.scss'

export default function EmptyBoard({ hint }) {
  return (
    <div className={styles.root}>
      <p className={styles.title}>Nothing here yet</p>
      <p className={styles.text}>{hint}</p>
    </div>
  )
}
