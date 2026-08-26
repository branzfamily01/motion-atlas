(() => {
  'use strict';
  const $ = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => [...root.querySelectorAll(sel)];
  function buildFrames(kind, intensity=100){
    const n = intensity/100, d=v=>Math.round(v*n*10)/10;
    const map = {
      fadeUp:[{opacity:0,transform:`translateY(${d(26)}px)`},{opacity:1,transform:'translateY(0)'}],
      fadeDown:[{opacity:0,transform:`translateY(-${d(24)}px)`},{opacity:1,transform:'translateY(0)'}],
      slideLeft:[{opacity:0,transform:`translateX(-${d(44)}px)`},{opacity:1,transform:'translateX(0)'}],
      slideRight:[{opacity:0,transform:`translateX(${d(44)}px)`},{opacity:1,transform:'translateX(0)'}],
      zoomSoft:[{opacity:0,transform:`scale(${Math.max(.45,1-.22*n)})`},{opacity:1,transform:'scale(1)'}],
      dropSoft:[{opacity:0,transform:`translateY(-${d(42)}px) scale(.96)`},{opacity:1,transform:'translateY(0) scale(1)'}],
      flipIn:[{opacity:0,transform:`perspective(500px) rotateX(${d(68)}deg) scale(.92)`},{opacity:1,transform:'perspective(500px) rotateX(0) scale(1)'}],
      maskReveal:[{clipPath:'inset(0 100% 0 0)',opacity:.4},{clipPath:'inset(0 0 0 0)',opacity:1}],
      blurReveal:[{opacity:0,filter:`blur(${d(10)}px)`,transform:`translateY(${d(16)}px)`},{opacity:1,filter:'blur(0)',transform:'translateY(0)'}],
      charRise:[{opacity:0,transform:`translateY(${d(30)}px) rotate(${d(3)}deg)`},{opacity:1,transform:'translateY(0) rotate(0)'}],
      wordRise:[{opacity:0,transform:`translateY(${d(18)}px)`,filter:`blur(${d(5)}px)`},{opacity:1,transform:'translateY(0)',filter:'blur(0)'}],
      letterPop:[{opacity:0,transform:'scale(.25)'},{opacity:1,transform:`scale(${1+.18*n})`,offset:.7},{opacity:1,transform:'scale(1)'}],
      textStretch:[{opacity:0,transform:`scaleX(${Math.max(.2,1-.55*n)})`,letterSpacing:`${d(8)}px`},{opacity:1,transform:'scaleX(1)',letterSpacing:'0px'}],
      tiltSettle:[{opacity:0,transform:`rotate(-${d(7)}deg) translateY(${d(12)}px)`},{opacity:1,transform:'rotate(0) translateY(0)'}],
      microGlitch:[{transform:'translateX(0)',filter:'none'},{transform:`translateX(${d(5)}px)`,filter:'hue-rotate(25deg)',offset:.25},{transform:`translateX(-${d(4)}px)`,offset:.5},{transform:`translateX(${d(2)}px)`,offset:.7},{transform:'translateX(0)',filter:'none'}],
      focusPull:[{opacity:.15,filter:`blur(${d(13)}px)`,transform:'scale(1.06)'},{opacity:1,filter:'blur(0)',transform:'scale(1)'}],
      gentleSwing:[{transform:`rotate(${d(6)}deg)`},{transform:`rotate(-${d(5)}deg)`,offset:.45},{transform:`rotate(${d(2)}deg)`,offset:.75},{transform:'rotate(0)'}],
      highlightSweep:[{filter:'brightness(.8)',textShadow:'none'},{filter:'brightness(1.8)',textShadow:`0 0 ${d(22)}px rgba(255,255,255,.75)`,offset:.45},{filter:'brightness(1)',textShadow:'none'}],
      breathe:[{transform:'scale(1)',opacity:.88},{transform:`scale(${1+.045*n})`,opacity:1,offset:.5},{transform:'scale(1)',opacity:.88}],
      tinyJump:[{transform:'translateY(0)'},{transform:`translateY(-${d(15)}px)`,offset:.45},{transform:'translateY(0)'}],
      buttonLift:[{transform:'translateY(0) scale(1)',boxShadow:'0 10px 30px rgba(0,0,0,.25)'},{transform:`translateY(-${d(7)}px) scale(${1+.02*n})`,boxShadow:'0 18px 40px rgba(0,0,0,.36)'}],
      buttonPress:[{transform:'translateY(0) scale(1)'},{transform:`translateY(${d(4)}px) scale(${1-.04*n})`,offset:.5},{transform:'translateY(0) scale(1)'}],
      buttonShine:[{filter:'brightness(1)',boxShadow:'0 10px 30px rgba(0,0,0,.25)'},{filter:'brightness(1.5)',boxShadow:`0 0 ${d(32)}px rgba(200,230,255,.55)`,offset:.5},{filter:'brightness(1)',boxShadow:'0 10px 30px rgba(0,0,0,.25)'}],
      wiggle:[{transform:'rotate(0)'},{transform:`rotate(-${d(5)}deg)`,offset:.2},{transform:`rotate(${d(5)}deg)`,offset:.4},{transform:`rotate(-${d(3)}deg)`,offset:.62},{transform:'rotate(0)'}],
      buttonPulse:[{transform:'scale(1)',boxShadow:'0 0 0 0 rgba(156,255,208,.45)'},{transform:`scale(${1+.035*n})`,boxShadow:`0 0 0 ${d(16)}px rgba(156,255,208,0)`,offset:.75},{transform:'scale(1)',boxShadow:'0 0 0 0 rgba(156,255,208,0)'}],
      squash:[{transform:'scale(1)'},{transform:`scaleX(${1+.12*n}) scaleY(${1-.09*n})`,offset:.45},{transform:'scale(1)'}],
      nudge:[{transform:'translateX(0)'},{transform:`translateX(${d(10)}px)`,offset:.55},{transform:'translateX(0)'}],
      glow:[{boxShadow:'0 10px 30px rgba(0,0,0,.25)'},{boxShadow:`0 0 ${d(35)}px rgba(156,255,208,.8)`,offset:.5},{boxShadow:'0 10px 30px rgba(0,0,0,.25)'}],
      cardLift:[{transform:'translateY(0)',boxShadow:'0 0 0 rgba(0,0,0,0)'},{transform:`translateY(-${d(11)}px)`,boxShadow:'0 24px 45px rgba(0,0,0,.35)'}],
      cardTilt:[{transform:'perspective(600px) rotateX(0) rotateY(0)'},{transform:`perspective(600px) rotateX(${d(7)}deg) rotateY(-${d(10)}deg)`,offset:.55},{transform:'perspective(600px) rotateX(0) rotateY(0)'}],
      cardFlip:[{transform:'perspective(600px) rotateY(0)'},{transform:'perspective(600px) rotateY(180deg)'}],
      cardPop:[{opacity:0,transform:'scale(.65)'},{opacity:1,transform:`scale(${1+.08*n})`,offset:.72},{transform:'scale(1)'}],
      cardSlide:[{opacity:0,transform:`translateX(${d(55)}px)`},{opacity:1,transform:`translateX(-${d(5)}px)`,offset:.8},{transform:'translateX(0)'}],
      cardFocus:[{opacity:.2,filter:`blur(${d(12)}px)`,transform:'scale(.95)'},{opacity:1,filter:'blur(0)',transform:'scale(1)'}],
      cardGlow:[{boxShadow:'0 0 0 rgba(138,168,255,0)'},{boxShadow:`0 0 ${d(34)}px rgba(138,168,255,.65)`,offset:.55},{boxShadow:'0 0 0 rgba(138,168,255,0)'}],
      cardBreathe:[{transform:'scale(1)'},{transform:`scale(${1+.025*n})`,offset:.5},{transform:'scale(1)'}],
      scrollReveal:[{opacity:0,transform:`translateY(${d(46)}px)`},{opacity:1,transform:'translateY(0)'}],
      clipReveal:[{clipPath:'inset(0 0 100% 0)',opacity:.2},{clipPath:'inset(0 0 0 0)',opacity:1}],
      scrollZoom:[{opacity:0,transform:`scale(${Math.max(.4,1-.35*n)})`},{opacity:1,transform:'scale(1)'}],
      skewSettle:[{opacity:0,transform:`translateY(${d(28)}px) skewY(${d(7)}deg)`},{opacity:1,transform:'translateY(0) skewY(0)'}],
      parallaxNudge:[{opacity:.35,transform:`translateY(${d(34)}px) scale(.98)`},{opacity:1,transform:'translateY(0) scale(1)'}],
      longFade:[{opacity:0},{opacity:1}],
      successPop:[{opacity:0,transform:'scale(.2) rotate(-20deg)'},{opacity:1,transform:`scale(${1+.22*n}) rotate(4deg)`,offset:.66},{transform:'scale(1) rotate(0)'}],
      successRing:[{opacity:.2,transform:'scale(.45)',boxShadow:'0 0 0 0 rgba(156,255,208,.55)'},{opacity:1,transform:'scale(1)',boxShadow:`0 0 0 ${d(18)}px rgba(156,255,208,0)`}],
      errorShake:[{transform:'translateX(0)'},{transform:`translateX(-${d(10)}px)`,offset:.18},{transform:`translateX(${d(10)}px)`,offset:.36},{transform:`translateX(-${d(6)}px)`,offset:.55},{transform:`translateX(${d(4)}px)`,offset:.72},{transform:'translateX(0)'}],
      warningPulse:[{transform:'scale(1)',filter:'brightness(1)'},{transform:`scale(${1+.15*n})`,filter:'brightness(1.4)',offset:.5},{transform:'scale(1)',filter:'brightness(1)'}],
      loadingSpin:[{transform:'rotate(0deg)'},{transform:'rotate(360deg)'}],
      loadingBob:[{transform:'translateY(0)'},{transform:`translateY(-${d(16)}px)`,offset:.5},{transform:'translateY(0)'}],
      saveFlash:[{filter:'brightness(1)',transform:'scale(.9)',opacity:.5},{filter:'brightness(1.8)',transform:`scale(${1+.12*n})`,opacity:1,offset:.55},{filter:'brightness(1)',transform:'scale(1)'}],
      notifyPop:[{opacity:0,transform:'scale(.1)'},{opacity:1,transform:`scale(${1+.3*n})`,offset:.6},{transform:'scale(1)'}],
      gradientDrift:[{backgroundPosition:'0% 50%'},{backgroundPosition:'100% 50%'},{backgroundPosition:'0% 50%'}],
      backgroundBreathe:[{filter:'brightness(.8) saturate(.9)',transform:'scale(1)'},{filter:'brightness(1.2) saturate(1.2)',transform:`scale(${1+.015*n})`,offset:.5},{filter:'brightness(.8) saturate(.9)',transform:'scale(1)'}]
    };
    return map[kind] || map.fadeUp;
  }

  function defaultDuration(m){
    if(['loadingSpin','breathe','cardBreathe','gradientDrift','backgroundBreathe'].includes(m.kind)) return 1200;
    if(['microGlitch','errorShake','notifyPop'].includes(m.kind)) return 500;
    return 700;
  }

  function createTarget(m, text, large=false){
    const stage=document.createElement('div'); stage.className='preview-stage';
    const target=document.createElement('div'); target.className='preview-target';
    if(m.demo==='button'){ target.classList.add('button-demo'); target.textContent=text || 'Continue'; }
    else if(m.demo==='card'){ target.classList.add('card-demo'); target.textContent=text || 'Preview Card'; }
    else if(m.demo==='feedback'){ target.classList.add('feedback-demo'); target.textContent=m.symbol || '✓'; }
    else if(m.demo==='background'){ target.classList.add('background-demo'); target.textContent=text || m.name; }
    else if(m.split){
      target.classList.add('split-wrap');
      const units=m.split==='chars' ? [...(text||m.name)] : (text||m.name).split(/(\s+)/);
      units.forEach(unit=>{ const s=document.createElement('span'); s.className='unit'; s.textContent=unit; target.appendChild(s); });
    } else target.textContent=text || m.name;
    stage.appendChild(target); return {stage,target};
  }

  function playMotion(container,m,settings={},text='Motion Atlas'){
    if(!container || !m) return;
    container.getAnimations({subtree:true}).forEach(a=>a.cancel());
    const old=$('.preview-stage',container); if(old) old.remove();
    const {stage,target}=createTarget(m,text); container.prepend(stage);
    const duration=settings.duration ?? defaultDuration(m);
    const delay=settings.delay ?? 0;
    const intensity=settings.intensity ?? 100;
    const easing=settings.easing ?? 'cubic-bezier(.22,1,.36,1)';
    const loop=['loadingSpin','breathe','cardBreathe','gradientDrift','backgroundBreathe'].includes(m.kind);
    const opts={duration,delay,easing,fill:'both',iterations:loop?Infinity:1};
    if(m.split){
      const units=$$('.unit',target); units.forEach((u,i)=>u.animate(buildFrames(m.kind,intensity),{...opts,delay:delay+i*Math.max(26,Math.round(duration*.075)),iterations:1}));
    } else target.animate(buildFrames(m.kind,intensity),opts);
  }
  function cssKeyframes(m, settings){
    const frames=buildFrames(m.kind,settings.intensity); const props=new Set(frames.flatMap(f=>Object.keys(f).filter(k=>k!=='offset')));
    const points=frames.map((f,i)=>{
      const pct=Math.round((f.offset ?? (frames.length===1?1:i/(frames.length-1)))*100);
      const lines=[...props].map(p=> f[p]!==undefined ? `    ${camelToKebab(p)}: ${f[p]};` : '').filter(Boolean).join('\n'); return `  ${pct}% {\n${lines}\n  }`;
    }).join('\n');
    return `@keyframes motionAtlas-${m.id} {\n${points}\n}`;
  }
  function camelToKebab(s){return s.replace(/[A-Z]/g,m=>'-'+m.toLowerCase())}
  function exportCode(m, settings, text){
    const source=String(text||m.name);
    const loop=['loadingSpin','breathe','cardBreathe','gradientDrift','backgroundBreathe'].includes(m.kind);
    if(m.split){
      const units=m.split==='chars' ? [...source] : source.split(/(\s+)/);
      const html=units.map(u=>`<span class="ma-unit">${escapeHTML(u)}</span>`).join('');
      const step=Math.max(25,Math.round(settings.duration*.075));
      const delays=units.map((_,i)=>`.ma-${m.id} .ma-unit:nth-child(${i+1}) { animation-delay: ${settings.delay+i*step}ms; }`).join('\n');
      return `<!-- Motion Atlas: ${m.name} -->\n<div class="ma-${m.id}">${html}</div>\n\n<style>\n${cssKeyframes(m,settings)}\n\n.ma-${m.id} { display: inline-flex; flex-wrap: wrap; }\n.ma-${m.id} .ma-unit {\n  display: inline-block;\n  white-space: pre;\n  animation: motionAtlas-${m.id} ${settings.duration}ms ${settings.easing} 1 both;\n}\n${delays}\n\n@media (prefers-reduced-motion: reduce) {\n  .ma-${m.id} .ma-unit { animation: none; }\n}\n</style>`;
    }
    return `<!-- Motion Atlas: ${m.name} -->\n<div class="ma-${m.id}">${escapeHTML(source)}</div>\n\n<style>\n${cssKeyframes(m,settings)}\n\n.ma-${m.id} {\n  animation: motionAtlas-${m.id} ${settings.duration}ms ${settings.easing} ${settings.delay}ms ${loop?'infinite':'1'} both;\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .ma-${m.id} { animation: none; }\n}\n</style>`;
  }
  function escapeHTML(str){return String(str).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}
  function aiPrompt(m,s,text){
    const split=m.split?`「${m.split==='chars'?'1文字':'単語'}ずつ」開始タイミングを約${Math.max(25,Math.round(s.duration*.075))}msずらしてください。`:'';
    return `対象「${text||m.name}」に「${m.name}」のモーションを実装してください。\n\n狙い：${m.desc}\n時間：${s.duration}ms\n開始遅延：${s.delay}ms\n強さ：${s.intensity}%\nイージング：${s.easing}\n${split}\n動きは1回の操作・登場につき1回を基本にし、完了後は静止してください（ローディングや待機表現なら必要に応じてループ）。既存レイアウトを崩さず、transform / opacity / filter等を優先して滑らかに実装してください。prefers-reduced-motion: reduce の場合はアニメーションを無効化または最小化してください。外部ライブラリは、この表現に本当に必要な場合だけ使ってください。`;
  }
  window.MA_ENGINE = { buildFrames, defaultDuration, playMotion, cssKeyframes, exportCode, aiPrompt };
})();
