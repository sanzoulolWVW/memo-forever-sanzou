'use strict';
document.querySelectorAll('[data-todo-point]').forEach(host=>{
 const point=TODO_LOCATIONS[host.dataset.todoPoint];
 if(!point?.p)return;
 host.innerHTML=`<details class="todo-map-details"><summary>Map & TomTom · ${esc(point.p.zone)} · ${point.p.x}, ${point.p.y}</summary><div class="todo-map-content"></div></details>`;
 const details=host.querySelector('details');
 details.addEventListener('toggle',()=>{
  if(!details.open||details.dataset.loaded)return;
  const body=details.querySelector('.todo-map-content');
  body.innerHTML=locationHtml(point);wireLocation(body);details.dataset.loaded='true';
 });
});
