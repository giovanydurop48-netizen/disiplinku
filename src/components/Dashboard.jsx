import { lvl } from '../utils'
import Trend from './Trend'

export default function Dashboard({students,att,stats,tdy}){
 const t=att.filter(a=>a.date===tdy);const ok=t.filter(a=>a.status==='Tepat Waktu').length,lt=t.filter(a=>a.status==='Terlambat').length;
 const rank=[...students].sort((a,b)=>stats[b.id].score-stats[a.id].score||stats[b.id].streak-stats[a.id].streak);
 const risk=students.filter(s=>stats[s.id].week>=3||stats[s.id].score<60);
 const avg=students.length?Math.round(students.reduce((s,x)=>s+stats[x.id].score,0)/students.length):0;
 return <div className="grid">
  <div className="grid g4">{[['Total siswa',students.length],['Hadir hari ini',t.length],['Tepat waktu',ok],['Terlambat',lt],['Belum absen',students.length-t.length],['Skor rata-rata',avg]].map(([l,v])=><div key={l} className="card stat"><span>{l}</span><b>{v}</b></div>)}</div>
  {risk.length>0&&<div className="card"><h3>⚠ Peringatan Dini Pembinaan</h3><p className="sub">Terlambat ≥3× dalam 7 hari atau skor di bawah 60.</p>
   {risk.map(s=><div className="warnbox" key={s.id}><span><b>{s.name}</b> ({s.cls}) – {stats[s.id].week}× terlambat minggu ini, skor {stats[s.id].score}</span>
    <a className="btn" target="_blank" rel="noopener" href={`https://wa.me/${s.wa}?text=${encodeURIComponent(`Yth. orang tua/wali ${s.name}, kami menginformasikan bahwa ananda terlambat ${stats[s.id].week} kali dalam 7 hari terakhir. Mohon kerja samanya untuk pembinaan kedisiplinan. Terima kasih.`)}`}>Kirim WhatsApp ke wali</a></div>)}</div>}
  <div className="grid g2">
   <div className="card"><h3>Tren 7 Hari</h3><p className="sub"><span style={{color:'var(--ok)'}}>■</span> Tepat waktu &nbsp;<span style={{color:'var(--wn)'}}>■</span> Terlambat</p><Trend att={att}/></div>
   <div className="card"><h3>🏆 Papan Disiplin</h3><p className="sub">Skor = 100 − 3×terlambat − 8×alpha − menit telat÷5</p>
    {rank.map((s,i)=>{const st=stats[s.id],[lb,c]=lvl(st.score);return <div className="lb" key={s.id}><span className="rk">{i+1}</span><span style={{flex:1}}>{s.name}<br/><small className="sub">🔥 {st.streak} hari beruntun</small></span>
     <div className="bar" style={{maxWidth:80}}><i style={{width:st.score+'%'}}/></div><b>{st.score}</b><span className={'bd '+c}>{lb}</span></div>})}</div></div></div>}

