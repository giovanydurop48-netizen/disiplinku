import { useState } from 'react'
import { lvl } from '../utils'

export default function Students({students,setStudents,att,setAtt,stats,say}){
 const [f,setF]=useState({nis:'',name:'',cls:'',wa:''});const [del,setDel]=useState(null);
 const add=e=>{e.preventDefault();if(students.some(s=>s.nis===f.nis.trim()))return say('NIS sudah terdaftar');
  setStudents([...students,{id:Date.now(),nis:f.nis.trim(),name:f.name.trim(),cls:f.cls.trim(),wa:f.wa.replace(/\D/g,'').replace(/^0/,'62')}]);setF({nis:'',name:'',cls:'',wa:''});say('Siswa ditambahkan')};
 const rm=id=>{if(del!==id){setDel(id);return say('Klik sekali lagi untuk menghapus')}setStudents(students.filter(s=>s.id!==id));setAtt(att.filter(a=>a.sid!==id));setDel(null);say('Siswa dihapus')};
 return <div className="grid"><form className="card" onSubmit={add}><h3>Tambah Siswa</h3><div className="row" style={{marginTop:10}}>
  {[['nis','NIS'],['name','Nama lengkap'],['cls','Kelas'],['wa','No. WhatsApp wali']].map(([k,p])=><input key={k} className="in" required={k!=='wa'} placeholder={p} value={f[k]} onChange={e=>setF({...f,[k]:e.target.value})}/>)}
  <button className="btn p">Simpan</button></div></form>
  <div className="card tw"><table><thead><tr><th>NIS</th><th>Nama</th><th>Kelas</th><th>Skor</th><th>Level</th><th></th></tr></thead><tbody>
  {students.map(s=>{const [l,c]=lvl(stats[s.id].score);return <tr key={s.id}><td>{s.nis}</td><td>{s.name}</td><td>{s.cls}</td><td>{stats[s.id].score}</td><td><span className={'bd '+c}>{l}</span></td>
   <td><button className="btn d" onClick={()=>rm(s.id)}>{del===s.id?'Yakin?':'Hapus'}</button></td></tr>})}</tbody></table></div></div>}

