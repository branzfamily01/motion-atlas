(() => {
  'use strict';
  const $ = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => [...root.querySelectorAll(sel)];
  const STORAGE = { favorites:'motion-atlas:favorites', compare:'motion-atlas:compare', text:'motion-atlas:text' };
  const { motions, categories, purposes } = window.MA_DATA;
  const { defaultDuration, playMotion, exportCode, aiPrompt } = window.MA_ENGINE;

  const state = {
    category:'ALL', purpose:'all', query:'', favoritesOnly:false,
    favorites:new Set(readJSON(STORAGE.favorites, [])),
    compare:readJSON(STORAGE.compare, []).filter(id => motions.some(m=>m.id===id)).slice(0,4),
    globalText:localStorage.getItem(STORAGE.text) || 'Motion Atlas',
    detail:null,
    settings:{duration:700,delay:0,intensity:100,easing:'cubic-bezier(.22,1,.36,1)'}
  };

  function readJSON(key, fallback){ try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } }
  function saveState(){ localStorage.setItem(STORAGE.favorites, JSON.stringify([...state.favorites])); localStorage.setItem(STORAGE.compare, JSON.stringify(state.compare)); localStorage.setItem(STORAGE.text,state.globalText); }
  function motionById(id){ return motions.find(m=>m.id===id); }
  function renderFilters(){
    const cat=$('#categoryRow'); cat.innerHTML=''; categories.forEach(c=>{const b=document.createElement('button');b.type='button';b.className='chip'+(state.category===c?' active':'');b.textContent=c;b.onclick=()=>{state.category=c;renderFilters();renderGrid()};cat.appendChild(b)});
    const pur=$('#purposeRow'); pur.innerHTML=''; purposes.forEach(([key,label])=>{const b=document.createElement('button');b.type='button';b.className='chip'+(state.purpose===key?' active':'');b.textContent=label;b.onclick=()=>{state.purpose=key;renderFilters();renderGrid()};pur.appendChild(b)});
  }

  function filteredMotions(){
    const q=state.query.trim().toLowerCase();
    return motions.filter(m=>{
      if(state.category!=='ALL'&&m.category!==state.category) return false;
      if(state.purpose!=='all'&&!m.purpose.includes(state.purpose)) return false;
      if(state.favoritesOnly&&!state.favorites.has(m.id)) return false;
      if(q){ const hay=[m.name,m.category,m.desc,...m.tags,...m.purpose].join(' ').toLowerCase(); if(!hay.includes(q)) return false; }
      return true;
    });
  }

  function renderGrid(){
    const list=filteredMotions(); const grid=$('#motionGrid'); grid.innerHTML=''; $('#resultCount').textContent=list.length; $('#emptyState').hidden=list.length!==0;
    list.forEach(m=>{
      const card=document.createElement('article');card.className='motion-card';card.dataset.id=m.id;
      const preview=document.createElement('div');preview.className='card-preview';
      const replay=document.createElement('button');replay.className='replay-mini';replay.type='button';replay.textContent='↻';replay.setAttribute('aria-label',`${m.name}を再生`);replay.onclick=e=>{e.stopPropagation();playMotion(preview,m)};preview.appendChild(replay);
      const body=document.createElement('div');body.className='card-body';
      body.innerHTML=`<div class="card-topline"><span class="category-tag">${m.category}</span><button class="favorite-btn ${state.favorites.has(m.id)?'active':''}" type="button" aria-label="お気に入り">${state.favorites.has(m.id)?'★':'☆'}</button></div><h3>${m.name}</h3><p>${m.desc}</p><div class="tags">${m.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div><div class="card-actions"><button class="ghost-btn detail-open" type="button">調整する</button><button class="ghost-btn compare-add" type="button">${state.compare.includes(m.id)?'✓ 比較中':'＋ 比較'}</button></div>`;
      $('.favorite-btn',body).onclick=()=>toggleFavorite(m.id);
      $('.detail-open',body).onclick=()=>openDetail(m.id);
      $('.compare-add',body).onclick=()=>toggleCompare(m.id);
      card.append(preview,body);grid.appendChild(card); requestAnimationFrame(()=>playMotion(preview,m));
    });
    updateCounts();
  }

  function toggleFavorite(id){ state.favorites.has(id)?state.favorites.delete(id):state.favorites.add(id); saveState(); renderGrid(); if(state.detail?.id===id) updateDetailButtons(); showToast(state.favorites.has(id)?'お気に入りに追加':'お気に入りから削除'); }
  function toggleCompare(id){
    const at=state.compare.indexOf(id);
    if(at>=0) state.compare.splice(at,1); else { if(state.compare.length>=4){showToast('比較は最大4つです');return;} state.compare.push(id); }
    saveState();renderGrid();updateCounts();if(state.detail?.id===id) updateDetailButtons(); if($('#compareDialog').open) renderCompare();
  }

  function updateCounts(){
    $('#favoriteCount').textContent=state.favorites.size; $('#compareCount').textContent=state.compare.length;
    const dock=$('#compareDock'); dock.hidden=state.compare.length===0; $('#dockNames').textContent=state.compare.map(id=>motionById(id)?.name).filter(Boolean).join(' · ');
  }

  function openDetail(id){
    const m=motionById(id); if(!m)return; state.detail=m; state.settings={duration:defaultDuration(m),delay:0,intensity:100,easing:'cubic-bezier(.22,1,.36,1)'};
    $('#detailCategory').textContent=m.category;$('#detailTitle').textContent=m.name;$('#detailDescription').textContent=m.desc;$('#detailText').value=state.globalText;
    syncControls(); updateDetailButtons(); $('#detailDialog').showModal(); requestAnimationFrame(()=>playDetail());
  }
  function syncControls(){const s=state.settings;$('#durationRange').value=s.duration;$('#delayRange').value=s.delay;$('#intensityRange').value=s.intensity;$('#easingSelect').value=s.easing;$('#durationOut').value=`${s.duration}ms`;$('#delayOut').value=`${s.delay}ms`;$('#intensityOut').value=`${s.intensity}%`;}
  function playDetail(){ if(!state.detail)return; playMotion($('#detailPreview'),state.detail,state.settings,$('#detailText').value); }
  function updateDetailButtons(){if(!state.detail)return;$('#detailFavorite').textContent=(state.favorites.has(state.detail.id)?'★ お気に入り済み':'♡ お気に入り');$('#detailCompare').textContent=state.compare.includes(state.detail.id)?'✓ 比較中':'＋ 比較';}
  async function copyText(text,label){try{await navigator.clipboard.writeText(text);showToast(label)}catch{const ta=document.createElement('textarea');ta.value=text;document.body.appendChild(ta);ta.select();document.execCommand('copy');ta.remove();showToast(label)}}

  function renderCompare(){
    const root=$('#compareGrid');root.innerHTML='';state.compare.forEach(id=>{const m=motionById(id);if(!m)return;const card=document.createElement('section');card.className='compare-card';const preview=document.createElement('div');preview.className='card-preview compare-preview';preview.dataset.id=m.id;const head=document.createElement('div');head.className='compare-card-head';head.innerHTML=`<strong>${m.name}</strong><button class="remove-compare" type="button">削除</button>`;$('.remove-compare',head).onclick=()=>toggleCompare(id);card.append(preview,head);root.appendChild(card);requestAnimationFrame(()=>playMotion(preview,m));});
    if(state.compare.length===0){root.innerHTML='<div class="empty-state"><strong>比較するMotionがありません</strong><span>一覧から「＋ 比較」を選んでください。</span></div>'}
  }
  function openCompare(){renderCompare();$('#compareDialog').showModal();}

  let toastTimer; function showToast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('show'),1500)}

  function init(){
    $('#globalText').value=state.globalText; renderFilters(); renderGrid(); updateCounts();
    $('#searchInput').addEventListener('input',e=>{state.query=e.target.value;renderGrid()});
    $('#globalText').addEventListener('input',e=>{state.globalText=e.target.value||'Motion Atlas';saveState();clearTimeout(window.__maRender);window.__maRender=setTimeout(renderGrid,120)});
    $('#favoritesBtn').onclick=()=>{state.favoritesOnly=!state.favoritesOnly;$('#favoritesBtn').style.background=state.favoritesOnly?'rgba(156,255,208,.15)':'';renderGrid()};
    $('#compareBtn').onclick=()=>state.compare.length?openCompare():showToast('比較したいMotionを追加してください');
    $('#openCompare').onclick=openCompare; $('#clearCompare').onclick=()=>{state.compare=[];saveState();renderGrid();updateCounts()};
    $('#resetFilters').onclick=()=>{state.category='ALL';state.purpose='all';state.query='';state.favoritesOnly=false;$('#searchInput').value='';$('#favoritesBtn').style.background='';renderFilters();renderGrid()};
    $$('[data-close]').forEach(b=>b.onclick=()=>document.getElementById(b.dataset.close).close());
    $('#detailReplay').onclick=playDetail;
    $('#detailText').addEventListener('input',playDetail);
    $('#durationRange').addEventListener('input',e=>{state.settings.duration=+e.target.value;syncControls();playDetail()});
    $('#delayRange').addEventListener('input',e=>{state.settings.delay=+e.target.value;syncControls();playDetail()});
    $('#intensityRange').addEventListener('input',e=>{state.settings.intensity=+e.target.value;syncControls();playDetail()});
    $('#easingSelect').addEventListener('change',e=>{state.settings.easing=e.target.value;syncControls();playDetail()});
    $('#detailFavorite').onclick=()=>toggleFavorite(state.detail.id); $('#detailCompare').onclick=()=>toggleCompare(state.detail.id);
    $('#copyAiBtn').onclick=()=>copyText(aiPrompt(state.detail,state.settings,$('#detailText').value),'AI指示をコピーしました');
    $('#copyCodeBtn').onclick=()=>copyText(exportCode(state.detail,state.settings,$('#detailText').value),'HTML / CSSをコピーしました');
    $('#syncPlay').onclick=()=>$$('.compare-preview').forEach(p=>playMotion(p,motionById(p.dataset.id)));
    if('serviceWorker' in navigator && location.protocol.startsWith('http')) window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
  }
  document.addEventListener('DOMContentLoaded',init);
})();
