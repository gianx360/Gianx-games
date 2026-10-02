'use client';
import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {supabase} from '@/lib/supabase';
type Kind='four'|'tic-tac-toe';
const games=[{kind:'four' as Kind,title:'FOUR.',mark:'● ● ● ●',desc:'Connect four pieces before your opponent.'},{kind:'tic-tac-toe' as Kind,title:'TIC TAC TOE.',mark:'× ○ ×',desc:'Classic three in a row.'}];
function code(){const chars='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';return Array.from({length:5},()=>chars[Math.floor(Math.random()*chars.length)]).join('')}
export default function Home(){const router=useRouter();const [busy,setBusy]=useState<Kind|null>(null);const [err,setErr]=useState('');
async function create(kind:Kind){setBusy(kind);setErr('');const id=code(),token=crypto.randomUUID(),size=kind==='four'?42:9;const {error}=await supabase.from('games').insert({id,game_type:kind,board:Array(size).fill(0),turn:1,status:'waiting',player1_token:token});if(error){setErr(error.message);setBusy(null);return}localStorage.setItem(`gianx-games:${id}`,token);router.push(`/${kind}/${id}`)}
return <main className="hub"><header className="hubHead"><div><div className="brand">Gianx Labs presents</div><h1 className="hubTitle">GIANX<br/>GAMES.</h1></div><p className="hubIntro">Simple games. Play with friends.<br/><strong>No account. No download.</strong><br/>Just share a link and play.</p></header><section className="gameGrid">{games.map(g=><article className="gameCard" key={g.kind}><div className="gameMark">{g.mark}</div><h2>{g.title}</h2><p>{g.desc}</p><button className="primary" onClick={()=>create(g.kind)} disabled={!!busy}>{busy===g.kind?'CREATING…':'CREATE GAME'}</button></article>)}</section>{err&&<div className="error">{err}</div>}<section className="hubHow"><span>HOW IT WORKS</span><p>Choose a game → create a private room → send the link to a friend → play live on your phones, tablets or computers.</p></section><footer className="foot">GIANX GAMES / V1.0 / GIANX LABS</footer></main>}
