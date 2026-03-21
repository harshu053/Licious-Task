import { isOverdue } from '../../lib/filters'
import PriorityPill from '../prioritypill/prioritypill.jsx'
import TaskActions from '../taskactions/taskactions.jsx'
import TaskCheckbox from '../taskcheckbox/taskcheckbox.jsx'
import TaskDescription from '../taskdescription/taskdescription.jsx'
import TaskDueDisplay from '../taskduedisplay/taskduedisplay.jsx'
import styles from './taskcard.module.scss'

export default function TaskCard({ task, onToggle, onEdit, onDelete }) {
  const overdue = isOverdue(task)
  const statusLabel = task.completed
    ? 'Mark as pending'
    : 'Mark as completed'

  return (
    <article
      className={`${styles.root} ${task.completed ? styles.done : ''} ${
        overdue ? styles.overdue : ''
      }`.trim()}
    >
      <header className={styles.head}>
        <TaskCheckbox
          completed={task.completed}
          onToggle={() => onToggle(task.id)}
          label={statusLabel}
        />
        <h3 className={styles.title}>{task.title}</h3>
      </header>
      <TaskDescription text={task.description} />
      <div className={styles.meta}>
        <PriorityPill value={task.priority} />
        <TaskDueDisplay dueDate={task.dueDate} showOverdue={overdue} />
      </div>
      <TaskActions
        completed={task.completed}
        onToggle={() => onToggle(task.id)}
        onEdit={() => onEdit(task)}
        onDelete={() => onDelete(task)}
      />
    </article>
  )
}
