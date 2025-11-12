
import React, { useState } from 'react'
import api from '../api/client'

export default function Login() {
  const [email, setEmail] = useState('admin@example.com')
  const [password, setPassword] = useState('admin123')
  const [msg, setMsg] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await api.post('/auth/login', { email, password })
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      setMsg('OK — zalogowano. Przejdź do zakładki Tasks.')
    } catch (e) {
      setMsg(e?.response?.data?.msg || 'Błąd logowania')
    }
  }

  return (
    <div className="card" style={{maxWidth:420, margin:'40px auto'}}>
      <h2>Logowanie</h2>
      <form onSubmit={onSubmit}>
        <label>E-mail</label>
        <input className="input" value={email} onChange={e=>setEmail(e.target.value)} />
        <label style={{marginTop:8}}>Hasło</label>
        <input type="password" className="input" value={password} onChange={e=>setPassword(e.target.value)} />
        <div style={{marginTop:12}}>
          <button className="button" type="submit">Zaloguj</button>
        </div>
        <p>{msg}</p>
      </form>
      <p style={{opacity:.8, fontSize:12}}>TIP: zarejestruj się przez API: POST /api/auth/register</p>
    </div>
  )
}
