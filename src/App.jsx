import { useEffect, useMemo, useState } from 'react'
import ConfirmDialog from './components/confirmdialog/ConfirmDialog.jsx'
import TaskBoard from './components/taskboard/taskboard.jsx'
import TaskEditorModal from './components/taskeditor/TaskEditorModal.jsx'
import { filterTasks, sortTasksForDisplay } from './lib/filters.js'
import {
  createTaskId,
  loadTasks,
  loadTheme,
  saveTasks,
  saveTheme,
} from './lib/tasksStorage.js'

export default function App() {
  const [tasks, setTasks] = useState(loadTasks)
  const [theme, setTheme] = useState(loadTheme)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [view, setView] = useState('list')

  const [editorOpen, setEditorOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)

  const [deleteTarget, setDeleteTarget] = useState(null)

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    saveTheme(theme)
  }, [theme])

  const modalOpen = editorOpen || Boolean(deleteTarget)
  useEffect(() => {
    if (!modalOpen) {
      document.body.style.overflow = ''
      return
    }
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [modalOpen])

  const counts = useMemo(() => {
    const total = tasks.length
    const completed = tasks.filter((t) => t.completed).length
    return {
      total,
      completed,
      pending: total - completed,
    }
  }, [tasks])

  const filtered = useMemo(() => {
    const list = filterTasks(tasks, {
      search,
      status: statusFilter,
      priority: priorityFilter,
    })
    return sortTasksForDisplay(list)
  }, [tasks, search, statusFilter, priorityFilter])

  const filtersActive =
    search.trim().length > 0 ||
    statusFilter !== 'all' ||
    priorityFilter !== 'all'

  const emptyHint =
    tasks.length === 0
      ? 'Create a task to get started. You can filter by status and priority once you have a few.'
      : 'Try clearing search or filters to see more tasks.'

  function openNewTask() {
    setEditingTask(null)
    setEditorOpen(true)
  }

  function openEdit(task) {
    setEditingTask(task)
    setEditorOpen(true)
  }

  function closeEditor() {
    setEditorOpen(false)
    setEditingTask(null)
  }

  function handleSave(payload) {
    if (editingTask) {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === editingTask.id
            ? {
                ...t,
                title: payload.title,
                description: payload.description,
                priority: payload.priority,
                dueDate: payload.dueDate,
                completed: payload.completed,
              }
            : t,
        ),
      )
      return
    }
    setTasks((prev) => [
      ...prev,
      {
        id: createTaskId(),
        title: payload.title,
        description: payload.description,
        priority: payload.priority,
        dueDate: payload.dueDate,
        completed: false,
        createdAt: Date.now(),
      },
    ])
  }

  function toggleComplete(id) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t,
      ),
    )
  }

  function confirmDelete() {
    if (!deleteTarget) return
    const id = deleteTarget.id
    setTasks((prev) => prev.filter((t) => t.id !== id))
    setDeleteTarget(null)
    if (editingTask && editingTask.id === id) closeEditor()
  }

  return (
    <div className="app-shell">
      <header className="top-bar">
        <div className="top-bar-inner">
          <div className="brand">
            <span className="brand-mark" aria-hidden />
            <div>
              <p className="brand-kicker">Workspace</p>
              <h1 className="brand-title">Task board</h1>
            </div>
          </div>
          <div className="top-actions">
            <div
              className="view-toggle"
              role="group"
              aria-label="Layout"
            >
              <button
                type="button"
                className={view === 'list' ? 'is-active' : ''}
                onClick={() => setView('list')}
              >
                List
              </button>
              <button
                type="button"
                className={view === 'cards' ? 'is-active' : ''}
                onClick={() => setView('cards')}
              >
                Cards
              </button>
            </div>
            <button
              type="button"
              className="theme-toggle"
              onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
              aria-label={theme === 'dark' ? 'Use light theme' : 'Use dark theme'}
            >
              {theme === 'dark' ? 'Light' : 'Dark'}
            </button>
            <button type="button" className="btn btn-primary" onClick={openNewTask}>
              New task
            </button>
          </div>
        </div>
      </header>

      <main className="main">
        <section className="stats" aria-label="Task counts">
          <div className="stat-card">
            <span className="stat-value">{counts.total}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat-card stat-card--pending">
            <span className="stat-value">{counts.pending}</span>
            <span className="stat-label">Pending</span>
          </div>
          <div className="stat-card stat-card--done">
            <span className="stat-value">{counts.completed}</span>
            <span className="stat-label">Completed</span>
          </div>
        </section>

        <section className="toolbar" aria-label="Search and filters">
          <label className="search-field">
            <span className="sr-only">Search by title or description</span>
            <input
              type="search"
              placeholder="Search title or description…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoComplete="off"
            />
          </label>
          <div className="filter-group">
            <label className="filter">
              <span className="filter-label">Status</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </label>
            <label className="filter">
              <span className="filter-label">Priority</span>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>
            {filtersActive ? (
              <button
                type="button"
                className="btn btn-ghost btn-small clear-filters"
                onClick={() => {
                  setSearch('')
                  setStatusFilter('all')
                  setPriorityFilter('all')
                }}
              >
                Reset filters
              </button>
            ) : null}
          </div>
        </section>

        <section className="board-section" aria-label="Tasks">
          <TaskBoard
            tasks={filtered}
            view={view}
            emptyHint={emptyHint}
            onToggle={toggleComplete}
            onEdit={openEdit}
            onDelete={(task) => setDeleteTarget(task)}
          />
        </section>
      </main>

      <TaskEditorModal
        open={editorOpen}
        task={editingTask}
        onClose={closeEditor}
        onSave={handleSave}
      />

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete this task?"
        message={
          deleteTarget
            ? `“${
                deleteTarget.title.length > 72
                  ? `${deleteTarget.title.slice(0, 72)}…`
                  : deleteTarget.title
              }” will be removed. You can’t undo this.`
            : ''
        }
        confirmLabel="Delete"
        cancelLabel="Keep"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}
