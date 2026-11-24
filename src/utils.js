export const pad=n=>String(n).padStart(2,'0');
export const iso=d=>{const x=new Date(d);return x.getFullYear()+'-'+pad(x.getMonth()+1)+'-'+pad(x.getDate())};
export const hm=d=>pad(d.getHours())+':'+pad(d.getMinutes());
export const toMin=t=>{const [h,m]=t.split(':').map(Number);return h*60+m};
export const load=(k,f)=>{try{const v=localStorage.getItem(k);return v?JSON.parse(v):f}catch(e){return f}};
export const store=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
export const DEF={inLimit:'07:00',outLimit:'15:00',tol:0};
export const SEED=[{id:1,nis:'1001',name:'Giovany',cls:'X RPL',wa:'6281234567001'},{id:2,nis:'1002',name:'Aisyah Putri',cls:'X RPL',wa:'6281234567002'},{id:3,nis:'1003',name:'Bima Pratama',cls:'X TKJ',wa:'6281234567003'},{id:4,nis:'1004',name:'Citra Lestari',cls:'X TKJ',wa:'6281234567004'},{id:5,nis:'1005',name:'Dimas Arya',cls:'X RPL',wa:'6281234567005'}];
export function seedAtt(){const o=[];let id=1;for(let d=1;d<=12;d++){const dt=new Date();dt.setDate(dt.getDate()-d);if(dt.getDay()%6===0)continue;SEED.forEach((s,i)=>{const r=(d*7+i*11)%10;let st='Tepat Waktu',late=0,m=400+r*3;if(r<(i===3?6:i===4?3:1)){st='Terlambat';late=4+r*4;m=420+late}else if(r===9&&i===2){st='Alpha'}
o.push({id:id++,sid:s.id,date:iso(dt),in:st==='Alpha'?'-':pad(Math.floor(m/60))+':'+pad(m%60),out:st==='Alpha'?'-':'15:05',status:st,late,note:''})})}return o}
export const calc=(sid,att)=>{const rs=att.filter(a=>a.sid===sid);const t=rs.filter(a=>a.status==='Terlambat'),al=rs.filter(a=>a.status==='Alpha');const mins=t.reduce((s,a)=>s+a.late,0);
const score=Math.max(0,100-t.length*3-al.length*8-Math.floor(mins/5));let streak=0;
for(const a of [...rs].sort((a,b)=>b.date.localeCompare(a.date))){if(a.status==='Tepat Waktu')streak++;else if(a.status==='Izin'||a.status==='Sakit')continue;else break}
const wk=iso(Date.now()-6*864e5);return{score,streak,mins,late:t.length,alpha:al.length,week:t.filter(a=>a.date>=wk).length}};
export const lvl=s=>s>=90?['Teladan','ok']:s>=75?['Baik','ok']:s>=60?['Pembinaan','warn']:['Kritis','bad'];
export const bcls=s=>s==='Tepat Waktu'?'ok':s==='Terlambat'?'warn':s==='Alpha'?'bad':'';

