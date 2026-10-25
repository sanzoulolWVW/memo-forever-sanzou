'use strict';
const factionNames={alliance:'Alliance',horde:'Horde',both:'Neutral',unknown:'Unconfirmed'};
const slotNames={};
const questDone=id=>state.checks['quest-'+id]===true;
const shareName=q=>q.share===true?'Yes':q.share===false?'No':'Unconfirmed';
function dungeonId(x){return QUEST_DATA.mapping[x[0].includes('Service Entrance')?'Stratholme-service':x[3]];}
function questIds(id){return QUEST_DATA.groups[id]||[];}
function visibleQuest(q){const f=$('#quest-faction').value;return f==='all'||q.faction===f||(f!=='both'&&q.faction==='both');}
function dungeonLink(x){const guide=DUNGEON_GUIDES[x[3]];return guide?(guide.url||OVERVIEW_GUIDE+textAnchor(guide.heading)):'https://www.wowhead.com/forever/zone='+x[4];}
function questRow(id){
 const q=QUEST_DATA.quests[id];
 return `<div class="quest-row${questDone(id)?' done':''}" data-quest-row="${esc(id)}"><label class="quest-check"><input type="checkbox" data-quest-check="${esc(id)}" ${questDone(id)?'checked':''} aria-label="Quest completed: ${esc(q.name)}"></label><details class="quest-detail" data-quest="${esc(id)}"><summary><span class="quest-name">${esc(q.name)}${q.restrictions.length?'<small>'+esc(q.restrictions.join(' / '))+'</small>':''}</span><span class="faction ${esc(q.faction)}">${esc(factionNames[q.faction]||'Unconfirmed')}</span><span class="quest-min">Min. ${q.min??'?'}</span><span class="quest-zone">${esc(q.location||'Location unconfirmed')}</span><span class="quest-share">Shareable <b>${shareName(q)}</b></span><span class="quest-chevron" aria-hidden="true">⌄</span></summary><div class="quest-body"></div></details></div>`;
}
function renderDungeon(container,x,id){
 const ids=questIds(id).filter(k=>visibleQuest(QUEST_DATA.quests[k]));
 const header=`<div class="dungeon-intro">${link(dungeonLink(x),'View on Wowhead ↗')}<span>${esc(x[5])}</span></div>`;
 container.innerHTML=header+(ids.length?`<div class="quest-list">${ids.map(questRow).join('')}</div>`:`<p class="empty-quests">${questIds(id).length?'No quests for the selected faction.':'Quests for this dungeon are not yet documented in the consulted sources.'}</p>`);
 container.querySelectorAll('.quest-detail').forEach(d=>d.addEventListener('toggle',()=>{if(d.open&&!d.dataset.loaded){renderQuest(d);d.dataset.loaded='true';}}));
}
function drawDungeons(){
 const openIds=new Set([...document.querySelectorAll('.dungeon[open]')].map(d=>d.dataset.dungeon));
 const query=normalize($('#dungeon-search').value.trim()),level=Number($('#dungeon-level').value);
 const rows=DUNGEONS.filter(x=>{
  const id=dungeonId(x),qs=questIds(id).map(k=>QUEST_DATA.quests[k]).filter(visibleQuest);
  return (!level||(x[1]<=level&&x[2]>=level))&&(!query||normalize(x.join(' ')).includes(query)||qs.some(q=>normalize([q.name,q.en,q.location,q.giver].join(' ')).includes(query)));
 });
 $('#dungeon-count').textContent=`${rows.length} / ${DUNGEONS.length} dungeons · ${Object.keys(QUEST_DATA.quests).filter(questDone).length} quests checked in total`;
 $('#dungeon-list').innerHTML=rows.length?rows.map(x=>{
  const id=dungeonId(x),ids=questIds(id).filter(k=>visibleQuest(QUEST_DATA.quests[k]));
  return `<details class="dungeon" data-dungeon="${id}" ${openIds.has(id)?'open':''}><summary><span class="level">${x[1]}–${x[2]}</span><span class="dungeon-name">${esc(x[0])}</span><span class="dungeon-progress">${ids.length?`${ids.filter(questDone).length} / ${ids.length} quests`:'Quests coming soon'}</span><span class="quest-chevron" aria-hidden="true">⌄</span></summary><div class="dungeon-body"></div></details>`;
 }).join(''):'<p class="empty-quests">No dungeons match your search.</p>';
 $('#dungeon-list').querySelectorAll('.dungeon').forEach(d=>{
  const x=rows.find(x=>dungeonId(x)===d.dataset.dungeon);
  const populate=()=>{if(d.open&&!d.dataset.loaded){renderDungeon(d.querySelector('.dungeon-body'),x,d.dataset.dungeon);d.dataset.loaded='true';}};
  d.addEventListener('toggle',populate);populate();
 });
}
function pointOptions(q){
 const points=[];
 q.starters.forEach(s=>{
  if(s.positions.length)s.positions.forEach(p=>points.push({s,p}));else points.push({s,p:null});
 });
 return points;
}
function locationHtml({s,p}){
 const type=s.via?'Dropped by':s.kind==='npc'?'NPC':s.kind==='object'?'Object to inspect':'Starting item';
 let html=`<p class="giver"><small>${type}</small>${link('https://www.wowhead.com/forever/'+s.kind+'='+s.id,s.name)}${s.via?'<span>Collect: '+esc(s.via)+'</span>':''}</p>`;
 if(!p)return html+`<p class="muted">${s.zone?esc(s.zone)+' · ':''}Coordinates not recorded. ${link('https://www.wowhead.com/forever/'+s.kind+'='+s.id,'View starting point ↗')}</p>`;
 const command='/way '+(p.uiMap?'#'+p.uiMap+' ':'')+p.x+' '+p.y+' '+s.name;
 html+=`<p class="point-caption">${esc(p.zone)} · <strong>${p.x}, ${p.y}</strong></p>`;
 if(p.mapId&&QUEST_DATA.validMaps.includes(p.mapId)){
  html+=`<figure class="quest-map"><div class="map-frame"><img loading="lazy" src="https://wow.zamimg.com/images/wow/classic/maps/enus/normal/${p.mapId}.jpg" alt="Map of ${esc(p.zone)}" width="488" height="325"><span class="map-pin" style="left:${p.mapX}%;top:${p.mapY}%" title="${esc(s.name)}" aria-label="Marker for ${esc(s.name)}">!</span><p class="map-failure" hidden>Map unavailable. Use the coordinates below.</p></div><figcaption>Classic map · approximate marker${p.samples>1?' · multiple locations recorded':''}</figcaption></figure>`;
 }else html+='<p class="muted map-unavailable">No map background available for this location.</p>';
 html+=`<div class="tomtom"><input type="text" readonly aria-label="TomTom command for ${esc(s.name)}" value="${esc(command)}"><button type="button" data-copy-way>Copy TomTom</button></div><p class="copy-status" role="status" aria-live="polite">${p.uiMap?'':'Use in the indicated zone.'}</p>`;
 return html;
}
function renderQuest(details){
 const q=QUEST_DATA.quests[details.dataset.quest],body=details.querySelector('.quest-body'),points=pointOptions(q);
 const rewards=q.rewards.length?`<p class="muted">${q.choice===true?'Choose a reward':q.choice===false?'Recorded rewards':'Items associated with this quest · check reward choices in game'}</p><ul class="quest-rewards">${q.rewards.map(i=>`<li class="quality-${i.quality??0}">${i.icon?`<img loading="lazy" src="https://wow.zamimg.com/images/wow/icons/medium/${encodeURIComponent(i.icon)}.jpg" width="28" height="28" alt="">`:''}<span>${i.id?link('https://www.wowhead.com/forever/item='+i.id,i.name):esc(i.name)}${i.slot||i.level?'<small>'+esc(slotNames[i.slot]||i.slot||'')+(i.level?' · lvl. '+i.level:'')+'</small>':''}</span></li>`).join('')}</ul>`:'<p class="muted">No items recorded in the sources. Check Wowhead for current gains and rewards.</p>';
 body.innerHTML=`${q.prerequisites.length?'<div class="quest-prerequisites"><h4>Prerequisites</h4>'+q.prerequisites.map(series=>'<p>'+series.map(p=>p.id?link('https://www.wowhead.com/forever/quest='+p.id,p.name):esc(p.name)).join(' → ')+'</p>').join('')+'</div>':''}<div class="quest-columns"><section><h4>Rewards</h4>${rewards}</section><section class="quest-location"><h4>Where to pick up the quest</h4>${points.length>1?`<label class="point-picker">Starting point <select data-point>${points.map(({s,p},i)=>`<option value="${i}">${esc(s.name)}${p?' · '+esc(p.zone):''}</option>`).join('')}</select></label>`:''}<div class="location-content">${points.length?locationHtml(points[0]):`<p>${esc(q.giver||'Quest giver not recorded')}</p><p class="muted">${esc(q.location||'Location and coordinates not recorded.')}</p>`}</div></section></div><div class="quest-bottom"><span>Shareable : ${shareName(q)}${q.share?' · prerequisites and restrictions apply':''}</span>${q.wowhead?link(q.wowhead,'Open quest on Wowhead ↗'):'Quest link unavailable'}</div>`;
 const picker=body.querySelector('[data-point]');if(picker)picker.onchange=()=>{body.querySelector('.location-content').innerHTML=locationHtml(points[Number(picker.value)]);wireLocation(body);};
 wireLocation(body);
}
function wireLocation(body){
 body.querySelectorAll('.quest-map img').forEach(img=>img.onerror=()=>{img.hidden=true;img.parentElement.querySelector('.map-pin').hidden=true;img.parentElement.querySelector('.map-failure').hidden=false;});
 body.querySelectorAll('[data-copy-way]').forEach(button=>button.onclick=async()=>{
  const input=button.previousElementSibling,status=button.parentElement.nextElementSibling;
  try{await navigator.clipboard.writeText(input.value);status.textContent='TomTom command copied.';}catch{input.focus();input.select();status.textContent='Command selected: press Ctrl+C to copy.';}
 });
 body.querySelectorAll('.quest-rewards img').forEach(img=>img.onerror=()=>{img.hidden=true;});
}
$('#dungeon-list').addEventListener('change',e=>{
 if(!e.target.matches('[data-quest-check]'))return;
 const id=e.target.dataset.questCheck;state.checks['quest-'+id]=e.target.checked;save();
 document.querySelectorAll('[data-quest-check]').forEach(input=>{input.checked=questDone(input.dataset.questCheck);input.closest('.quest-row').classList.toggle('done',input.checked);});
 document.querySelectorAll('.dungeon').forEach(d=>{const ids=questIds(d.dataset.dungeon).filter(k=>visibleQuest(QUEST_DATA.quests[k]));if(ids.length)d.querySelector('.dungeon-progress').textContent=`${ids.filter(questDone).length} / ${ids.length} quests`;});
 $('#dungeon-count').textContent=`${document.querySelectorAll('.dungeon').length} / ${DUNGEONS.length} dungeons · ${Object.keys(QUEST_DATA.quests).filter(questDone).length} quests checked in total`;
});
for(const id of ['dungeon-search','dungeon-level','quest-faction'])$('#'+id).addEventListener('input',drawDungeons);
drawDungeons();
