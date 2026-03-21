const STORAGE_KEY = 'tm-dashboard-tasks-v1'
const THEME_KEY = 'tm-dashboard-theme'

const PRIORITIES = new Set(['low', 'medium', 'high'])

function normalizeTask(raw) {
  if (!raw || typeof raw !== 'object') return null
  const id = typeof raw.id === 'string' && raw.id.trim() ? raw.id.trim() : null
  if (!id) return null
  const title =
    typeof raw.title === 'string' ? raw.title.trim().slice(0, 500) : ''
  const description =
    typeof raw.description === 'string' ? raw.description.slice(0, 8000) : ''
  const priority = PRIORITIES.has(raw.priority) ? raw.priority : 'medium'
  const dueDate =
    typeof raw.dueDate === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(raw.dueDate)
      ? raw.dueDate
      : ''
  const completed = Boolean(raw.completed)
  const createdAt =
    typeof raw.createdAt === 'number' && Number.isFinite(raw.createdAt)
      ? raw.createdAt
      : Date.now()
  return {
    id,
    title: title || 'Untitled task',
    description,
    priority,
    dueDate,
    completed,
    createdAt,
  }
}

export function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const data = JSON.parse(raw)
    if (!Array.isArray(data)) return []
    return data.map(normalizeTask).filter(Boolean)
  } catch {
    return []
  }
}

export function saveTasks(tasks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  } catch (e) {
    if (e && (e.name === 'QuotaExceededError' || e.code === 22)) {
      window.alert(
        'Could not save: browser storage is full. Try deleting some tasks or clearing site data.',
      )
    }
  }
}

export function loadTheme() {
  try {
    const v = localStorage.getItem(THEME_KEY)
    if (v === 'dark' || v === 'light') return v
  } catch {
    /* ignore */
  }
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  }
  return 'light'
}

export function saveTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme)
  } catch {
    /* ignore */
  }
}

export function createTaskId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `t-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}
