import { useState } from 'react'
import { bcls } from '../utils'

export default function History({students,att}){
 const [q,setQ]=useState('');const [st,setSt]=useState('');const [cl,setCl]=useState('');const [csv,setCsv]=useState(false);
 const rows=att.map(a=>({...a,s:students.find(s=>s.id===a.sid)})).filter(r=>r.s&&(!st||r.status===st)&&(!cl||r.s.cls===cl)&&(!q||(r.s.name+r.s.nis).toLowerCase().includes(q.toLowerCase()))).sort((a,b)=>b.date.localeCompare(a.date)||b.id-a.id);
 const text='Tanggal,NIS,Nama,Kelas,Masuk,Pulang,Status,Menit Telat\n'+rows.map(r=>[r.date,r.s.nis,r.s.name,r.s.cls,r.in,r.out,r.status,r.late].join(',')).join('\n');
 return <div className="card"><div className="row" style={{marginBottom:12}}>
  <input className="in" placeholder="Cari nama / NIS" value={q} onChange={e=>setQ(e.target.value)}/>
  <select className="in" value={st} onChange={e=>setSt(e.target.value)}><option value="">Semua status</option>{['Tepat Waktu','Terlambat','Izin','Sakit','Alpha'].map(x=><option key={x}>{x}</option>)}</select>
  <select className="in" value={cl} onChange={e=>setCl(e.target.value)}><option value="">Semua kelas</option>{[...new Set(students.map(s=>s.cls))].map(x=><option key={x}>{x}</option>)}</select>
  <button className="btn" onClick={()=>setCsv(!csv)}>Ekspor CSV</button></div>
  {csv&&<div style={{marginBottom:12}}><textarea className="in" readOnly value={text} onFocus={e=>e.target.select()}/><p className="sub">Salin teks di atas lalu tempel ke Excel / Google Sheets.</p></div>}
  <div className="tw"><table><thead><tr><th>Tanggal</th><th>NIS</th><th>Nama</th><th>Masuk</th><th>Pulang</th><th>Status</th></tr></thead><tbody>
  {rows.slice(0,150).map(r=><tr key={r.id}><td>{r.date}</td><td>{r.s.nis}</td><td>{r.s.name}</td><td>{r.in}</td><td>{r.out}</td><td><span className={'bd '+bcls(r.status)}>{r.status}{r.late?` ${r.late}m`:''}</span></td></tr>)}</tbody></table>
  {!rows.length&&<p className="sub" style={{padding:16}}>Tidak ada data.</p>}</div></div>}

