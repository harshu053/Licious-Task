import styles from './taskactions.module.scss'

export default function TaskActions({
  completed,
  onToggle,
  onEdit,
  onDelete,
}) {
  return (
    <div className={styles.root}>
      <button
        type="button"
        className="btn btn-small btn-ghost"
        onClick={onToggle}
        aria-pressed={completed}
      >
        {completed ? 'Mark pending' : 'Complete'}
      </button>
      <button
        type="button"
        className="btn btn-small btn-ghost"
        onClick={onEdit}
      >
        Edit
      </button>
      <button
        type="button"
        className={`btn btn-small btn-ghost ${styles.delete}`}
        onClick={onDelete}
      >
        Delete
      </button>
    </div>
  )
}
