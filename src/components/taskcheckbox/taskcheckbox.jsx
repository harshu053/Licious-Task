import styles from './taskcheckbox.module.scss'

export default function TaskCheckbox({ completed, onToggle, label }) {
  return (
    <button
      type="button"
      className={`${styles.root} ${completed ? styles.on : ''}`.trim()}
      onClick={onToggle}
      aria-label={label}
    />
  )
}
