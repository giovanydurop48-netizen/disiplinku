import { useState, useEffect, useMemo } from 'react'
import { iso, hm, toMin, load, store, DEF, SEED, seedAtt, calc } from './utils'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Attendance from './components/Attendance'
import Students from './components/Students'
import History from './components/History'
import Settings from './components/Settings'

export default function App(){
 const [user,setUser]=useState(()=>load('dw_user',null));
 const [theme,setTheme]=useState(()=>load('dw_theme','auto'));
 const [students,setStudents]=useState(()=>load('dw_students',SEED));
 const [att,setAtt]=useState(()=>load('dw_att',null)||seedAtt());
 const [cfg,setCfg]=useState(()=>({...DEF,...load('dw_cfg',{})}));
 const [page,setPage]=useState('dashboard');
 const [toast,setToast]=useState('');
 useEffect(()=>store('dw_students',students),[students]);
 useEffect(()=>store('dw_att',att),[att]);
 useEffect(()=>store('dw_cfg',cfg),[cfg]);
 useEffect(()=>{store('dw_theme',theme);if(theme==='auto')document.documentElement.removeAttribute('data-theme');else document.documentElement.dataset.theme=theme},[theme]);
 const say=m=>{setToast(m);clearTimeout(window.__t);window.__t=setTimeout(()=>setToast(''),2600)};
 const tdy=iso(new Date());
 const stats=useMemo(()=>{const m={};students.forEach(s=>m[s.id]=calc(s.id,att));return m},[students,att]);

 // inti logika absensi
 const scan=(s)=>{const now=new Date(),rec=att.find(a=>a.sid===s.id&&a.date===tdy);
  if(!rec){const over=hm(now)>cfg.inLimit&&toMin(hm(now))-toMin(cfg.inLimit)-cfg.tol>0?toMin(hm(now))-toMin(cfg.inLimit)-cfg.tol:0;
   setAtt(a=>[...a,{id:Date.now(),sid:s.id,date:tdy,in:hm(now),out:'-',status:over?'Terlambat':'Tepat Waktu',late:over,note:''}]);
   say(over?`${s.name} terlambat ${over} menit`:`${s.name} tepat waktu ✓`)}
  else if(rec.out==='-'&&rec.in!=='-'){setAtt(a=>a.map(x=>x.id===rec.id?{...x,out:hm(now)}:x));say(`${s.name} sudah pulang`)}
  else say(`${s.name} sudah tercatat hari ini`)};
 const excuse=(s,status,note)=>{if(att.find(a=>a.sid===s.id&&a.date===tdy))return say('Sudah tercatat hari ini');
  setAtt(a=>[...a,{id:Date.now(),sid:s.id,date:tdy,in:'-',out:'-',status,late:0,note}]);say(`${s.name}: ${status}`)};

 if(!user)return <Login onOk={n=>{setUser(n);store('dw_user',n)}}/>;
 const tabs=[['dashboard','Dashboard'],['attendance','Absensi'],['students','Siswa'],['history','Riwayat'],['settings','Pengaturan']];
 return <div>
  <header className="nav"><div className="brand"><div className="logo">DK</div>DisiplinKu</div>
   <div className="row"><span className="sub" style={{margin:0}}>{user}</span>
    <button className="btn" onClick={()=>setTheme(theme==='dark'?'light':'dark')}>{theme==='dark'?'☀ Terang':'☾ Gelap'}</button>
    <button className="btn" onClick={()=>{setUser(null);store('dw_user',null)}}>Keluar</button></div></header>
  <main className="wrap">
   <div className="tabs">{tabs.map(([k,l])=><button key={k} className={'tab'+(page===k?' on':'')} onClick={()=>setPage(k)}>{l}</button>)}</div>
   {page==='dashboard'&&<Dashboard {...{students,att,stats,tdy}}/>}
   {page==='attendance'&&<Attendance {...{students,att,stats,tdy,scan,excuse,say}}/>}
   {page==='students'&&<Students {...{students,setStudents,att,setAtt,stats,say}}/>}
   {page==='history'&&<History {...{students,att}}/>}
   {page==='settings'&&<Settings {...{cfg,setCfg,say}} reset={()=>{setAtt(seedAtt());setStudents(SEED);say('Data demo dipulihkan')}}/>}
  </main>
  {toast&&<div className="toast">{toast}</div>}
 </div>}

