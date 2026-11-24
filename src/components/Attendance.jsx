import { useState, useRef } from 'react'
import { bcls } from '../utils'

export default function Attendance({students,att,stats,tdy,scan,excuse}){
 const [nis,setNis]=useState('');const [msg,setMsg]=useState('');const ref=useRef();
 const submit=e=>{e.preventDefault();const s=students.find(x=>x.nis===nis.trim());if(!s)setMsg('NIS tidak ditemukan');else{setMsg('');scan(s)}setNis('');ref.current&&ref.current.focus()};
 return <div className="grid">
  <form className="card" onSubmit={submit}><h3>⚡ Mode Kiosk – Scan / Ketik NIS</h3><p className="sub">Cocok untuk barcode scanner. Scan pertama = masuk, scan kedua = pulang. Status dihitung otomatis.</p>
   <input ref={ref} className="in big" autoFocus placeholder="NIS lalu Enter" value={nis} onChange={e=>setNis(e.target.value)}/>{msg&&<p className="sub" style={{color:'var(--bad)',marginTop:8}}>{msg}</p>}</form>
  <div className="card tw"><h3>Absensi Hari Ini</h3><table><thead><tr><th>Siswa</th><th>Masuk</th><th>Pulang</th><th>Status</th><th>Aksi</th></tr></thead><tbody>
   {students.map(s=>{const r=att.find(a=>a.sid===s.id&&a.date===tdy);return <tr key={s.id}><td>{s.name}<br/><small className="sub">{s.cls}</small></td><td>{r?r.in:'-'}</td><td>{r?r.out:'-'}</td>
    <td><span className={'bd '+(r?bcls(r.status):'')}>{r?(r.status==='Terlambat'?`Terlambat ${r.late}m`:r.status):'Belum absen'}</span></td>
    <td><div className="row"><button className="btn p" onClick={()=>scan(s)}>{r&&r.in!=='-'?'Pulang':'Masuk'}</button>
     {!r&&['Izin','Sakit','Alpha'].map(k=><button key={k} className="btn" onClick={()=>excuse(s,k,'')}>{k}</button>)}</div></td></tr>})}</tbody></table></div></div>}

