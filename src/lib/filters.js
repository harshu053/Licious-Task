export function filterTasks(tasks, { search, status, priority }) {
  const q = (search || '').trim().toLowerCase()
  return tasks.filter((t) => {
    if (status === 'pending' && t.completed) return false
    if (status === 'completed' && !t.completed) return false
    if (priority !== 'all' && t.priority !== priority) return false
    if (!q) return true
    const inTitle = t.title.toLowerCase().includes(q)
    const inDesc = t.description.toLowerCase().includes(q)
    return inTitle || inDesc
  })
}

export function sortTasksForDisplay(tasks) {
  return [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1
    const ad = a.dueDate || '9999-99-99'
    const bd = b.dueDate || '9999-99-99'
    if (ad !== bd) return ad.localeCompare(bd)
    return b.createdAt - a.createdAt
  })
}

export function isOverdue(task) {
  if (task.completed || !task.dueDate) return false
  const d = task.dueDate
  const today = new Date()
  const y = today.getFullYear()
  const m = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  const todayStr = `${y}-${m}-${day}`
  return d < todayStr
}

export function formatDueLabel(iso) {
  if (!iso) return 'No due date'
  const [y, mo, d] = iso.split('-').map(Number)
  if (!y || !mo || !d) return iso
  const date = new Date(y, mo - 1, d)
  return date.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
