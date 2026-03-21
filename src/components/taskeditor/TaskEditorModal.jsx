import { useEffect, useId, useRef, useState } from 'react'

const emptyForm = () => ({
  title: '',
  description: '',
  priority: 'medium',
  dueDate: '',
  completed: false,
})

export default function TaskEditorModal({ open, task, onClose, onSave }) {
  const titleId = useId()
  const errId = useId()
  const firstField = useRef(null)
  const [values, setValues] = useState(emptyForm)
  const [error, setError] = useState('')

  const isEdit = Boolean(task)

  useEffect(() => {
    if (!open) return
    setError('')
    if (task) {
      setValues({
        title: task.title,
        description: task.description,
        priority: task.priority,
        dueDate: task.dueDate || '',
        completed: task.completed,
      })
    } else {
      setValues(emptyForm())
    }
    const id = requestAnimationFrame(() => firstField.current?.focus())
    return () => cancelAnimationFrame(id)
  }, [open, task])

  useEffect(() => {
    if (!open) return
    function onKey(e) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  function submit(e) {
    e.preventDefault()
    const title = values.title.trim()
    if (!title) {
      setError('Add a title so you can find this task later.')
      firstField.current?.focus()
      return
    }
    const description = values.description.trim()
    const dueDate = values.dueDate.trim()
    if (dueDate && !/^\d{4}-\d{2}-\d{2}$/.test(dueDate)) {
      setError('Pick a valid date from the calendar.')
      return
    }
    setError('')
    onSave({
      title,
      description,
      priority: values.priority,
      dueDate,
      completed: isEdit ? values.completed : false,
    })
    onClose()
  }

  return (
    <div
      className="modal-root"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        className="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="modal-head">
          <h2 id={titleId} className="modal-title">
            {isEdit ? 'Edit task' : 'New task'}
          </h2>
          <button
            type="button"
            className="icon-btn"
            aria-label="Close"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <form className="task-form" onSubmit={submit}>
          <label className="field">
            <span className="field-label">Title</span>
            <input
              ref={firstField}
              type="text"
              name="title"
              autoComplete="off"
              maxLength={500}
              value={values.title}
              onChange={(e) => setValues((v) => ({ ...v, title: e.target.value }))}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? errId : undefined}
            />
          </label>
          <label className="field">
            <span className="field-label">Description</span>
            <textarea
              name="description"
              rows={4}
              maxLength={8000}
              value={values.description}
              onChange={(e) =>
                setValues((v) => ({ ...v, description: e.target.value }))
              }
            />
          </label>
          <div className="field-row">
            <label className="field field--grow">
              <span className="field-label">Priority</span>
              <select
                name="priority"
                value={values.priority}
                onChange={(e) =>
                  setValues((v) => ({ ...v, priority: e.target.value }))
                }
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>
            <label className="field field--grow">
              <span className="field-label">Due date</span>
              <input
                type="date"
                name="dueDate"
                value={values.dueDate}
                onChange={(e) =>
                  setValues((v) => ({ ...v, dueDate: e.target.value }))
                }
              />
            </label>
          </div>
          {isEdit && (
            <label className="check-row">
              <input
                type="checkbox"
                checked={values.completed}
                onChange={(e) =>
                  setValues((v) => ({ ...v, completed: e.target.checked }))
                }
              />
              <span>Mark as completed</span>
            </label>
          )}
          {error ? (
            <p id={errId} className="form-error" role="alert">
              {error}
            </p>
          ) : null}
          <div className="modal-actions">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {isEdit ? 'Save changes' : 'Create task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
