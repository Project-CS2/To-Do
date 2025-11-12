
import React, { useEffect, useState } from 'react'
import api from '../api/client'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'

export default function Tasks() {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState({ status: '' })
  const [edit, setEdit] = useState(null)

  const load = async () => {
    const params = {}
    if (filter.status) params.status = filter.status
    const { data } = await api.get('/tasks', { params })
    setTasks(data)
    setEdit(null)
  }

  const remove = async (id) => { await api.delete(`/tasks/${id}`); load() }

  useEffect(() => { load() }, [filter.status])

  return (
    <div>
      <div className="card">
        <div className="row">
          <select value={filter.status} onChange={e=>setFilter({...filter, status: e.target.value})}>
            <option value="">(wszystkie statusy)</option>
            <option value="todo">do zrobienia</option>
            <option value="inprogress">w trakcie</option>
            <option value="done">zakończone</option>
          </select>
          <button className="button" onClick={()=>setEdit({})}>+ Nowe zadanie</button>
        </div>
      </div>
      {edit && <TaskForm initial={edit} onSaved={load} />}
      <TaskList tasks={tasks} onEdit={setEdit} onDelete={remove} />
    </div>
  )
}
