import { formatDueLabel } from '../../lib/filters'
import OverdueTag from '../overduetag/overduetag.jsx'
import styles from './taskduedisplay.module.scss'

export default function TaskDueDisplay({ dueDate, showOverdue }) {
  return (
    <span className={styles.root}>
      {formatDueLabel(dueDate)}
      {showOverdue ? <OverdueTag /> : null}
    </span>
  )
}
