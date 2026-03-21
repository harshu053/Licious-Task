import styles from './prioritypill.module.scss'

const variantClass = {
  low: styles.low,
  medium: styles.medium,
  high: styles.high,
}

export default function PriorityPill({ value }) {
  return (
    <span className={[styles.root, variantClass[value]].filter(Boolean).join(' ')}>
      {value}
    </span>
  )
}
