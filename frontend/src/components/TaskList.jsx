
import React from 'react'

export default function TaskList({ tasks, onEdit, onDelete }) {
  return (
    <div className="card" style={{marginTop:12}}>
      <table className="table">
        <thead>
          <tr>
            <th>Tytuł</th>
            <th>Status</th>
            <th>Punkty</th>
            <th>Owner</th>
            <th>Assignees</th>
            <th>Termin</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(t => (
            <tr key={t._id}>
              <td>{t.title}</td>
              <td>
                <span className={`status-dot status-${t.status === 'inprogress' ? 'inprogress' : (t.status === 'done' ? 'done' : 'todo')}`}></span>
                {t.status}
              </td>
              <td><span className="badge">{t.points}</span></td>
              <td>{t.ownerId?.name || '-'}</td>
              <td>{(t.assignees||[]).map(a => a.name).join(", ")}</td>
              <td>{t.dueDate ? new Date(t.dueDate).toLocaleDateString() : '-'}</td>
              <td>
                <button className="button ghost" onClick={()=>onEdit(t)}>Edytuj</button>{' '}
                <button className="button" onClick={()=>onDelete(t._id)}>Usuń</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
