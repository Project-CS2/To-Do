
import React from 'react'
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Tasks from './pages/Tasks.jsx'
import Users from './pages/Users.jsx'
import Points from './pages/Points.jsx'

export default function App() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const logout = () => { localStorage.removeItem('token'); localStorage.removeItem('user'); navigate('/login') }

  return (
    <div className="container">
      <div className="nav">
        <div style={{display:'flex',gap:12,alignItems:'center'}}>
          <strong>✅ To-Do Team</strong>
          {token && (
            <>
              <NavLink to="/" end>Tasks</NavLink>
              <NavLink to="/users">Users</NavLink>
              <NavLink to="/points">Points</NavLink>
            </>
          )}
        </div>
        <div>
          {!token ? <NavLink to="/login" className="button">Login</NavLink> :
            <button className="button ghost" onClick={logout}>Logout</button>}
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Tasks />} />
        <Route path="/users" element={<Users />} />
        <Route path="/points" element={<Points />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}
