import EmptyBoard from '../emptyboard/emptyboard.jsx'
import TaskCard from '../taskcard/taskcard.jsx'
import TaskRow from '../taskrow/taskrow.jsx'
import styles from './taskboard.module.scss'

export default function TaskBoard({
  tasks,
  view,
  emptyHint,
  onToggle,
  onEdit,
  onDelete,
}) {
  if (tasks.length === 0) {
    return <EmptyBoard hint={emptyHint} />
  }

  if (view === 'cards') {
    return (
      <div className={styles.grid}>
        {tasks.map((t) => (
          <TaskCard
            key={t.id}
            task={t}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    )
  }

  return (
    <div className={styles.list}>
      {tasks.map((t) => (
        <TaskRow
          key={t.id}
          task={t}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
