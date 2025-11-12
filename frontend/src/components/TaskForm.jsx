
import React, { useState, useEffect } from 'react'
import api from '../api/client'

export default function TaskForm({ initial, onSaved }) {
  const [title, setTitle] = useState(initial?.title || '')
  const [description, setDescription] = useState(initial?.description || '')
  const [ownerId, setOwnerId] = useState(initial?.ownerId?._id || '')
  const [assignees, setAssignees] = useState(initial?.assignees?.map(a=>a._id) || [])
  const [points, setPoints] = useState(initial?.points ?? 0)
  const [status, setStatus] = useState(initial?.status || 'todo')
  const [dueDate, setDueDate] = useState(initial?.dueDate ? initial.dueDate.slice(0,10) : '')
  const [users, setUsers] = useState([])

  useEffect(() => { api.get('/users').then(r => setUsers(r.data)) }, [])

  const save = async () => {
    const body = { title, description, ownerId, assignees, points: Number(points), status, dueDate }
    if (initial?._id) {
      await api.put(`/tasks/${initial._id}`, body)
    } else {
      await api.post('/tasks', body)
    }
    onSaved?.()
  }

  return (
    <div className="card" style={{marginTop:12}}>
      <div className="row">
        <input className="input" placeholder="Tytuł" value={title} onChange={e=>setTitle(e.target.value)} />
        <select value={status} onChange={e=>setStatus(e.target.value)}>
          <option value="todo">do zrobienia</option>
          <option value="inprogress">w trakcie</option>
          <option value="done">zakończone</option>
        </select>
        <input className="input" type="number" placeholder="Punkty" value={points} onChange={e=>setPoints(e.target.value)} style={{maxWidth:120}} />
        <input className="input" type="date" value={dueDate} onChange={e=>setDueDate(e.target.value)} style={{maxWidth:180}} />
      </div>
      <div className="row" style={{marginTop:8}}>
        <select value={ownerId} onChange={e=>setOwnerId(e.target.value)}>
          <option value="">owner</option>
          {users.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
        </select>
        <select multiple value={assignees} onChange={e=>setAssignees([...e.target.selectedOptions].map(o=>o.value))} style={{minHeight:80}}>
          {users.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
        </select>
        <button className="button" onClick={save}>{initial?._id ? "Zapisz" : "Dodaj"}</button>
      </div>
      <textarea className="input" placeholder="Opis" value={description} onChange={e=>setDescription(e.target.value)} style={{marginTop:8, minHeight:80}} />
    </div>
  )
}
