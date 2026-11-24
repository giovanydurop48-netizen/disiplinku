import { iso } from '../utils'

export default function Trend({att}){
 const days=[...Array(7)].map((_,i)=>{const d=new Date();d.setDate(d.getDate()-6+i);const k=iso(d);const r=att.filter(a=>a.date===k);
  return{l:['Min','Sen','Sel','Rab','Kam','Jum','Sab'][d.getDay()],ok:r.filter(a=>a.status==='Tepat Waktu').length,late:r.filter(a=>a.status==='Terlambat').length}});
 const mx=Math.max(1,...days.map(d=>d.ok+d.late));
 return <svg viewBox="0 0 320 150" width="100%" role="img" aria-label="Tren kedisiplinan 7 hari">
  {days.map((d,i)=>{const x=i*45+12,h1=d.ok/mx*100,h2=d.late/mx*100;return <g key={i}>
   <rect x={x} y={115-h1} width="28" height={h1} rx="3" fill="var(--ok)"/><rect x={x} y={115-h1-h2} width="28" height={h2} rx="3" fill="var(--wn)"/>
   <text x={x+14} y="132" textAnchor="middle" fontSize="11" fill="var(--mu)">{d.l}</text></g>})}</svg>}

