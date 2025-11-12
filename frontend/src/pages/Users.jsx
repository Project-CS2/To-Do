
import React, { useEffect, useState } from 'react'
import api from '../api/client'

export default function Users() {
  const [users, setUsers] = useState([])

  useEffect(() => { api.get('/users').then(r => setUsers(r.data)) }, [])

  return (
    <div className="card">
      <h3>Użytkownicy</h3>
      <table className="table">
        <thead><tr><th>Imię</th><th>Email</th><th>Rola</th></tr></thead>
        <tbody>
          {users.map(u => <tr key={u._id}><td>{u.name}</td><td>{u.email}</td><td>{u.role}</td></tr>)}
        </tbody>
      </table>
      <p style={{opacity:.8, fontSize:12, marginTop:8}}>Dodawanie nowych użytkowników przez API / panel admina — do rozbudowy.</p>
    </div>
  )
}
