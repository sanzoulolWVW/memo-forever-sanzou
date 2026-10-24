'use strict';
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const link = (url,label) => `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)}</a>`;
const search = q => 'https://www.wowhead.com/forever/search?q='+encodeURIComponent(q);
const textAnchor = text => '#:~:text='+encodeURIComponent(text).replace(/'/g,'%27').replace(/-/g,'%2D');
const KEY='sanzou-memo-v2';
let state={checks:{},timers:{},sound:false,volume:40};
try {
 const x=JSON.parse(localStorage.getItem(KEY));
 if(x && typeof x==='object' && !Array.isArray(x)) {
  state.sound=x.sound===true;
  if(Number.isFinite(x.volume))state.volume=Math.max(0,Math.min(100,x.volume));
  for(const part of ['checks','timers'])if(x[part]&&typeof x[part]==='object'&&!Array.isArray(x[part]))state[part]=x[part];
 }
} catch {}
// Keep checks and retained timers from v2, discard obsolete reminders.
state.timers=Object.fromEntries(BUFFS.filter(([id])=>Object.hasOwn(state.timers,id)).map(([id])=>[id,state.timers[id]]));
function save(){try{localStorage.setItem(KEY,JSON.stringify(state));}catch{$('#storage-warning').hidden=false;}}
let audio, activeTone;
async function unlockAudio(){try{audio??=new (window.AudioContext||window.webkitAudioContext)();if(audio.state==='suspended')await audio.resume();return audio.state==='running';}catch{return false;}}
function stopTone(){if(activeTone){try{activeTone.stop();}catch{}activeTone=null;}}
function chime(){
 stopTone();
 if(!audio || audio.state!=='running' || state.volume===0)return;
 try{
  const osc=audio.createOscillator(),gain=audio.createGain(),now=audio.currentTime;
  osc.connect(gain);gain.connect(audio.destination);osc.type='sine';osc.frequency.setValueAtTime(660,now);osc.frequency.setValueAtTime(880,now+.24);
  const peak=.14*(state.volume/100)**2;
  gain.gain.setValueAtTime(0,now);gain.gain.linearRampToValueAtTime(peak,now+.025);gain.gain.exponentialRampToValueAtTime(.0001,now+.65);
  activeTone=osc;osc.onended=()=>{osc.disconnect();gain.disconnect();if(activeTone===osc)activeTone=null;};osc.start();osc.stop(now+.7);
 }catch{}
}
const notices=new Map();
function notice(message,key='info'){
 let item=notices.get(key);
 if(!item){
  const box=document.createElement('div'),text=document.createElement('span'),close=document.createElement('button');
  box.className='notice';box.dataset.notice=key;close.textContent='×';close.setAttribute('aria-label','Fermer cette alerte');
  close.onclick=()=>{box.remove();notices.delete(key);};box.append(text,close);$('#alerts').append(box);item={box,text};notices.set(key,item);
 }
 item.text.textContent=message;
}
function announce(id,name){
 notice(name+' : timer terminé.','timer-'+id);
 if(state.sound)chime();
 if('Notification' in window && Notification.permission==='granted'){
  // Native notifications are silent: the volume slider controls the page chime.
  try{new Notification('MEMO FOREVER SANZOU',{body:name+' : timer terminé.',tag:'timer-'+id,silent:true});}catch{}
 }
}
$('#sound').checked=state.sound;
$('#sound').onchange=async e=>{state.sound=e.target.checked;if(state.sound)await unlockAudio();else stopTone();save();};
function updateVolume(){
 $('#volume').value=state.volume;$('#volume-value').textContent=state.volume+' %';
 $('#volume').setAttribute('aria-valuetext',state.volume+' %');
}
updateVolume();
$('#volume').oninput=e=>{state.volume=Number(e.target.value);stopTone();updateVolume();save();};
$('#test-alert').onclick=async()=>{const ready=await unlockAudio();chime();notice(!ready?'Le son n’est pas disponible dans ce navigateur.':state.volume===0?'Son coupé · volume à 0 %.':'Test sonore · volume '+state.volume+' %.','sound-test');};
$('#notifications').onclick=async()=>{
 if(!('Notification' in window)){notice('Notifications indisponibles ici. Les alertes restent visibles dans la page.','notifications');return;}
 try{const p=await Notification.requestPermission();notice(p==='granted'?'Notifications activées. Garde la page ouverte.':'Notifications non autorisées. Les alertes restent visibles dans la page.','notifications');}catch{notice('Notifications indisponibles dans ce navigateur.','notifications');}
};
const timerElements=new Map();
function getTimer(id,minutes){
 const t=state.timers[id];
 if(!t || typeof t!=='object' || !['idle','running','paused','expired'].includes(t.status) || !Number.isFinite(t.duration)||t.duration<1000||t.duration>86400000 || !Number.isFinite(t.remaining)||t.remaining<0 || (t.status==='running'&&!Number.isFinite(t.end))){state.timers[id]={status:'idle',duration:minutes*60000,remaining:minutes*60000};}
 return state.timers[id];
}
function remaining(t,now=Date.now()){return t.status==='running'?Math.max(0,t.end-now):t.status==='expired'?0:t.remaining;}
function format(ms){let s=Math.ceil(ms/1000);return [Math.floor(s/3600),Math.floor(s%3600/60),s%60].map(n=>String(n).padStart(2,'0')).join(':');}
for(const [id,name,minutes] of BUFFS){
 const t=getTimer(id,minutes),row=document.createElement('div');row.className='timer';row.dataset.timer=id;
 row.innerHTML=`<span class="timer-name" id="name-${id}">${esc(name)}</span><label class="duration" for="minutes-${id}"><span class="sr-only">Durée de ${esc(name)}</span><input id="minutes-${id}" type="number" min="0.016666666666666666" max="1440" step="any" value="${t.duration/60000}"> <span>min</span></label><div class="timer-time"><span class="clock" aria-label="Temps restant pour ${esc(name)}"></span><progress max="1" value="1" aria-label="Progression de ${esc(name)}"></progress></div><div class="timer-controls"><button class="start">Démarrer</button><button class="pause">Pause</button><button class="reset" aria-label="Réinitialiser ${esc(name)}" title="Réinitialiser">↺</button></div>`;
 $('#timer-list').append(row);
 const els={row,out:row.querySelector('.clock'),bar:row.querySelector('progress'),input:row.querySelector('input'),start:row.querySelector('.start'),pause:row.querySelector('.pause')};timerElements.set(id,els);
 els.start.onclick=()=>{
  const current=state.timers[id];unlockAudio();
  if(current.status==='paused'){current.end=Date.now()+current.remaining;current.status='running';}
  else{
   const min=Number(els.input.value);
   if(!Number.isFinite(min)||min<1/60||min>1440){notice('Durée : entre 1 seconde et 1 440 minutes.','duration');els.input.focus();return;}
   current.duration=min*60000;current.remaining=current.duration;current.end=Date.now()+current.duration;current.status='running';
  }
  const previous=notices.get('timer-'+id);if(previous){previous.box.remove();notices.delete('timer-'+id);}
  save();tick();
 };
 els.pause.onclick=()=>{const current=state.timers[id];if(current.status==='running'){current.remaining=remaining(current);current.status=current.remaining>0?'paused':'expired';if(current.status==='expired')announce(id,name);save();tick();}};
 row.querySelector('.reset').onclick=()=>{const current=state.timers[id];current.status='idle';current.remaining=current.duration;delete current.end;save();tick();};
 els.input.onchange=()=>{const current=state.timers[id],n=Number(els.input.value);if(['idle','expired'].includes(current.status)&&Number.isFinite(n)&&n>=1/60&&n<=1440){current.duration=n*60000;if(current.status==='idle')current.remaining=current.duration;save();tick();}};
}
function tick(){
 let active=0,dirty=false;const expired=[];
 for(const [id,name] of BUFFS){
  const t=state.timers[id],el=timerElements.get(id);
  if(t.status==='running'&&t.end<=Date.now()){t.status='expired';t.remaining=0;dirty=true;expired.push([id,name]);}
  if(t.status==='running')active++;
  const ms=remaining(t);el.out.textContent=t.status==='expired'?'Terminé':format(ms)+(t.status==='paused'?' · pause':'');
  el.bar.value=Math.max(0,Math.min(1,ms/t.duration));el.row.className='timer '+t.status;
  el.pause.disabled=t.status!=='running';el.start.disabled=t.status==='running';el.start.textContent=t.status==='paused'?'Reprendre':t.status==='expired'?'Relancer':'Démarrer';el.input.disabled=t.status==='running'||t.status==='paused';
 }
 if(dirty)save();expired.forEach(([id,name])=>announce(id,name));$('#active-count').textContent=active?`${active} timer${active>1?'s':''} en cours`:'Aucun timer en cours';
}
setInterval(tick,500);document.addEventListener('visibilitychange',tick);
const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
function drawTable(kind,data){
 const q=normalize($('#'+kind+'-search').value),n=Number($('#'+kind+'-level').value);
 const rows=data.filter(x=>(!q||normalize(x.join(' ')).includes(q))&&(!n||(x[1]!==null&&x[1]<=n&&x[2]>=n))&&(kind!=='zone'||$('#horde').checked||!x[5].startsWith('Horde')));
 $('#'+kind+'-count').textContent=`${rows.length} / ${data.length}`;
 $('#'+kind+'-rows').innerHTML=rows.length?rows.map(x=>{
  const base=x[4]?'https://www.wowhead.com/forever/zone='+x[4]:search(x[3]);
  let links=link(base,'Lien Wowhead ↗');
  if(kind==='dungeon'){
   const guide=DUNGEON_GUIDES[x[3]];
   links=guide?(guide.url?link(guide.url,'Guide Wowhead ↗')+' '+link(guide.url+textAnchor(guide.quests),'Quêtes ↗'):link(OVERVIEW_GUIDE+textAnchor(guide.heading),'Aperçu Wowhead ↗')):link(base,'Lien Wowhead ↗')+' '+link(base+'#quests','Quêtes ↗');
  }
  return `<tr><td class="level">${x[1]===null?'—':x[1]===x[2]?x[1]:x[1]+'–'+x[2]}</td><td>${esc(x[0])}</td><td>${links}</td></tr>`;
 }).join(''):'<tr><td colspan="3">Aucun résultat.</td></tr>';
}
for(const [kind,data] of [['zone',ZONES]]){for(const suffix of ['search','level'])$('#'+kind+'-'+suffix).oninput=()=>drawTable(kind,data);drawTable(kind,data);}$('#horde').onchange=()=>drawTable('zone',ZONES);
const tasks=[
 ['sleeping-bag','Niv. 14 · Obtenir le Cozy Sleeping Bag',`<p>Chaîne Alliance, à partir du niveau 14. Le trajet traverse des zones plus dangereuses : voyager accompagné facilite les derniers passages.</p><ol><li><strong>Marche de l’Ouest · 37.5, 50.7</strong> — inspecter les débris brûlés de la ferme Alexston.</li><li><strong>Tarides · 46.4, 73.9</strong> — trouver les autres débris au sud de Taurajo, puis lire la note.</li><li><strong>Serres-Rocheuses · camp vers 40.6, 52.4</strong> — suivre le sentier près de la Retraite de Roche-Soleil, examiner les objets du camp et prendre la suite.</li><li><strong>Serres-Rocheuses · 39.6, 49.9</strong> — rejoindre le monticule au nord.</li><li><strong>Loch Modan · 49.5, 12.8</strong> — descendre prudemment sur la façade du barrage, côté Paluns, pour la figurine.</li><li><strong>Hautebrande · 87.3, 49.6</strong> — monter sur le chariot au mur de Thoradin ; rejoindre le sac du messager côté Arathi, <strong>22.5, 24.2</strong>.</li><li>Prendre la dernière quête et ouvrir la sacoche juste dessous pour recevoir le sac.</li></ol><p>${link(SOURCES.bag,'Guide illustré et récompenses intermédiaires ↗')}</p><button data-open-buffs>Ouvrir les timers du sac</button>`],
 ['cooking','Cuisine · Débloquer la nourriture et le feu',`<ol><li>Apprendre Cuisine chez un maître.</li><li>Fabriquer un Basic Campfire Kit avec un Bois simple ; l’utiliser depuis le sac.</li><li>Cuisiner un plat et manger jusqu’à recevoir Bien nourri.</li><li>Reporter la durée de son infobulle dans le timer Nourriture.</li></ol><p>${link(SOURCES.xp,'Nourriture et bonus XP ↗')} · ${link(SOURCES.camp,'Recettes de campement ↗')}</p>`],
 ['camp','Buffs de campement · Débloquer ses objets de métiers',`<p>Apprendre l’objet de palier 20 chez le maître du métier (Cuisine commence avec le feu au palier 1). Poser le feu, puis l’objet, et s’asseoir environ une minute. Les premiers feux acceptent trois objets. Un personnage pose un objet avec une recharge d’une heure.</p><div class="table-wrap"><table><thead><tr><th>Métier</th><th>Objet</th><th>Apport</th></tr></thead><tbody>${CAMP.map(x=>`<tr><td>${esc(x[0])}</td><td>${link(search(x[1]),x[1])}</td><td>${esc(x[2])}</td></tr>`).join('')}</tbody></table></div><p>Les buffs durent une heure ; les équivalents de classe ne se cumulent pas. La tente apporte du repos, puis impose une recharge : le timer ne mesure pas la quantité d’XP restante. Les services de vente ne sont pas des buffs.</p><p>${link(SOURCES.camp,'Recettes, composants, plans et incompatibilités ↗')}</p><button data-open-buffs>Ouvrir les timers de campement</button>`],
 ['books','Livres · Collection, coordonnées et récompenses',`<p>Ramasser les livres puis les rendre à <strong>Garion Wendell</strong>, tour des Mages de Hurlevent : <code>49.0, 86.4</code>. Les seuils sont cumulatifs. Deux exemplaires du même titre ne comptent qu’une fois.</p><h4>Récompenses au choix</h4><ul><li><strong>10 livres :</strong> Scholarly Pendant ou Erudite’s Amulet.</li><li><strong>20 livres, niveau 20 :</strong> Field Researcher’s Loop ou Philanthropist’s Ring.</li><li><strong>25 livres, niveau 30 :</strong> Truthseeker’s Bow, Crest of Elucidation ou Researcher’s Night Light. L’arc demande actuellement le niveau 40 pour être équipé.</li></ul><h4>12 repères pour commencer</h4><p>Coordonnées sur la carte de la zone indiquée. Coche uniquement les livres déjà rendus. Cette sélection de départ ne suffit pas à atteindre le palier 25 ; le catalogue lié ci-dessous contient la suite.</p><div id="book-list" class="booklist"></div><p id="book-progress"></p><p>${link(SOURCES.books,'Catalogue complet, emplacements et captures ↗')} · ${link(SOURCES.library,'Carte des livres ↗')}</p>`]
];
function updateChecks(){document.querySelectorAll('[data-check]').forEach(c=>{c.checked=state.checks[c.dataset.check]===true;c.closest('.task')?.classList.toggle('done',c.checked);});$('#progress').textContent=tasks.filter(t=>state.checks[t[0]]===true).length+' / '+tasks.length+' objectifs terminés';$('#book-progress').textContent=BOOKS.filter(b=>state.checks['book-'+b[0]]===true).length+' / '+BOOKS.length+' livres de cette sélection rendus';}
$('#tasks').innerHTML=tasks.map(([id,title,body])=>`<div class="task"><label><input type="checkbox" data-check="${id}" aria-label="Terminé : ${esc(title)}"></label><details><summary>${esc(title)} <small>Voir le guide</small></summary><div class="guide">${body}</div></details></div>`).join('');
$('#book-list').innerHTML=BOOKS.map(([id,name,zone,coords])=>`<label class="book"><input type="checkbox" data-check="book-${id}"><span>${esc(name)}<small>${esc(zone)}</small><code>${esc(coords)}</code></span></label>`).join('');
$('#tasks').addEventListener('change',e=>{if(e.target.matches('[data-check]')){state.checks[e.target.dataset.check]=e.target.checked;save();updateChecks();}});
$('#reset-checks').onclick=()=>{if(confirm('Décocher les objectifs et les livres ? Les timers et les quêtes seront conservés.')){for(const [id] of tasks)delete state.checks[id];for(const [id] of BOOKS)delete state.checks['book-'+id];save();updateChecks();}};
function openSection(id){const el=document.getElementById(id);if(el?.matches('details.section')){el.open=true;el.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}}
document.querySelectorAll('nav a').forEach(a=>a.onclick=()=>openSection(a.hash.slice(1)));
document.querySelectorAll('[data-open-buffs]').forEach(b=>b.onclick=()=>openSection('buffs'));
$('#collapse').onclick=()=>{document.querySelectorAll('details').forEach(d=>d.open=false);window.scrollTo({top:0,behavior:'smooth'});};
document.querySelectorAll('[data-source]').forEach(a=>{a.href=SOURCES[a.dataset.source];a.target='_blank';a.rel='noopener noreferrer';});
// Sections intentionally start closed, including after reloading an anchor URL.
updateChecks();tick();save();


document.querySelectorAll('[data-copy-command]').forEach(button=>{
 button.addEventListener('click',async()=>{
  const command=button.closest('li').querySelector('code').textContent;
  const status=document.getElementById('graphics-copy-status');
  try{
   await navigator.clipboard.writeText(command);
   status.textContent='Commande copiée : '+command;
  }catch{
   status.textContent='Copie automatique indisponible. Sélectionne la commande puis copie-la manuellement.';
  }
 });
});
