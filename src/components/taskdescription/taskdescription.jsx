import styles from './taskdescription.module.scss'

export default function TaskDescription({ text }) {
  if (text) {
    return <p className={styles.text}>{text}</p>
  }
  return <p className={styles.muted}>No description</p>
}
