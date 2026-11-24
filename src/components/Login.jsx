import { useState } from 'react'

export default function Login({onOk}){
 const [n,setN]=useState('');const [p,setP]=useState('');const [e,setE]=useState(false);
 const go=ev=>{ev.preventDefault();if(n.trim()==='admin'&&p==='12345')onOk('admin');else setE(true)};
 return <div className="login"><form className="card grid" onSubmit={go}>
  <div className="logo">DK</div><h2>DisiplinKu</h2><p className="sub">Sistem disiplin waktu siswa berbasis skor, tren, dan pembinaan otomatis.</p>
  <input className="in" placeholder="Nama" value={n} onChange={x=>setN(x.target.value)} autoComplete="username"/>
  <input className="in" type="password" placeholder="Password" value={p} onChange={x=>setP(x.target.value)} autoComplete="current-password"/>
  {e&&<div className="warnbox">Nama atau password salah.</div>}
  <button className="btn p">Masuk</button><p className="sub">Demo: admin / 12345</p></form></div>}

