
import React, { useEffect, useState } from 'react'
import api from '../api/client'

export default function Points() {
  const [rows, setRows] = useState([])
  const [users, setUsers] = useState({})

  useEffect(() => {
    api.get('/tasks/summary/points').then(r => setRows(r.data))
    api.get('/users').then(r => {
      const map = {}; r.data.forEach(u => map[u._id] = u.name)
      setUsers(map)
    })
  }, [])

  return (
    <div className="card">
      <h3>Podsumowanie punktów</h3>
      <table className="table">
        <thead><tr><th>Użytkownik</th><th>Punkty</th></tr></thead>
        <tbody>
          {rows.map(r => <tr key={r._id}><td>{users[r._id] || '(brak)'}</td><td><span className="badge">{r.totalPoints}</span></td></tr>)}
        </tbody>
      </table>
    </div>
  )
}
