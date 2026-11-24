import { useState } from 'react'
import { toMin } from '../utils'

export default function Settings({cfg,setCfg,say,reset}){
 const [f,setF]=useState(cfg);
 const save=e=>{e.preventDefault();if(toMin(f.outLimit)<=toMin(f.inLimit))return say('Batas pulang harus setelah batas masuk');setCfg({...f,tol:Math.max(0,Number(f.tol)||0)});say('Pengaturan disimpan')};
 return <form className="card grid" style={{maxWidth:480}} onSubmit={save}><h3>Pengaturan Waktu</h3>
  <label className="sub">Batas masuk<input type="time" className="in" value={f.inLimit} onChange={e=>setF({...f,inLimit:e.target.value})}/></label>
  <label className="sub">Batas pulang<input type="time" className="in" value={f.outLimit} onChange={e=>setF({...f,outLimit:e.target.value})}/></label>
  <label className="sub">Toleransi (menit)<input type="number" min="0" className="in" value={f.tol} onChange={e=>setF({...f,tol:e.target.value})}/></label>
  <div className="row"><button className="btn p">Simpan</button><button type="button" className="btn" onClick={reset}>Pulihkan data demo</button></div></form>}
