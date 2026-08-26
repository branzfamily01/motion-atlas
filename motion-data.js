(() => {
  'use strict';
  const motions = [
    {id:'fade-up',name:'Fade Up',category:'ENTER',kind:'fadeUp',desc:'下から静かに浮かびながら表示。迷ったときの万能な登場。',tags:['ふわっと','上品','読みやすい'],purpose:['clean','premium']},
    {id:'fade-down',name:'Fade Down',category:'ENTER',kind:'fadeDown',desc:'上からわずかに降りて自然に定着する登場。',tags:['自然','見出し'],purpose:['clean']},
    {id:'fade-left',name:'Slide From Left',category:'ENTER',kind:'slideLeft',desc:'左から滑らかに入る。順序や流れを見せたいときに。',tags:['スライド','導線'],purpose:['attention']},
    {id:'fade-right',name:'Slide From Right',category:'ENTER',kind:'slideRight',desc:'右から滑らかに入る。カードや補足UIに使いやすい。',tags:['スライド','UI'],purpose:['attention']},
    {id:'zoom-soft',name:'Soft Zoom',category:'ENTER',kind:'zoomSoft',desc:'小さく始まり、過度に跳ねず本来のサイズへ。',tags:['ズーム','柔らかい'],purpose:['clean','kids']},
    {id:'drop-soft',name:'Soft Drop',category:'ENTER',kind:'dropSoft',desc:'少し上から落ち、柔らかく着地する。',tags:['着地','軽快'],purpose:['kids']},
    {id:'flip-in',name:'Flip In',category:'ENTER',kind:'flipIn',desc:'奥行きを伴って手前へ反転する登場。',tags:['3D','反転'],purpose:['attention']},
    {id:'reveal-mask',name:'Mask Reveal',category:'ENTER',kind:'maskReveal',desc:'マスクが開いて内容が現れる。高級感のある見出し向け。',tags:['マスク','高級感'],purpose:['premium']},

    {id:'blur-reveal',name:'Blur Reveal',category:'TEXT',kind:'blurReveal',split:'chars',desc:'文字のぼけが取れながら浮かぶ。静かな印象と存在感を両立。',tags:['blur','文字','上品'],purpose:['premium','clean']},
    {id:'char-rise',name:'Character Rise',category:'TEXT',kind:'charRise',split:'chars',desc:'文字を1文字ずつ少しずらして上昇表示。',tags:['stagger','文字'],purpose:['attention','premium']},
    {id:'word-rise',name:'Word Cascade',category:'TEXT',kind:'wordRise',split:'words',desc:'単語単位で順に現れ、文章を読み進めるリズムを作る。',tags:['word','stagger'],purpose:['clean']},
    {id:'letter-pop',name:'Letter Pop',category:'TEXT',kind:'letterPop',split:'chars',desc:'文字が小さく弾みながら順番に出る。',tags:['pop','楽しい'],purpose:['kids','success']},
    {id:'text-stretch',name:'Text Stretch',category:'TEXT',kind:'textStretch',desc:'横方向の圧縮から通常幅へ戻る印象的な見出し。',tags:['scaleX','タイトル'],purpose:['attention']},
    {id:'text-tilt',name:'Tilt Settle',category:'TEXT',kind:'tiltSettle',desc:'少し傾いた状態から水平へ整う。人間味のある登場。',tags:['rotate','自然'],purpose:['kids']},
    {id:'text-glitch',name:'Micro Glitch',category:'TEXT',kind:'microGlitch',desc:'ごく短い横ズレでデジタル感を加える。',tags:['glitch','デジタル'],purpose:['attention']},
    {id:'text-focus',name:'Focus Pull',category:'TEXT',kind:'focusPull',desc:'ピントが合うように明瞭になる。静かな強調に。',tags:['focus','blur'],purpose:['premium']},
    {id:'text-swing',name:'Gentle Swing',category:'TEXT',kind:'gentleSwing',desc:'小さく左右へ揺れて止まる。親しみを出したい場面に。',tags:['swing','かわいい'],purpose:['kids']},
    {id:'text-highlight',name:'Highlight Sweep',category:'TEXT',kind:'highlightSweep',desc:'光が文字表面を横切るような強調。',tags:['shine','highlight'],purpose:['attention','premium']},
    {id:'text-breathe',name:'Text Breathe',category:'TEXT',kind:'breathe',desc:'ゆっくり膨らんで戻る呼吸のような待機モーション。',tags:['pulse','loop'],purpose:['attention']},
    {id:'text-jump',name:'Tiny Jump',category:'TEXT',kind:'tinyJump',desc:'一度だけ小さく跳ねて注意を引く。',tags:['jump','軽快'],purpose:['kids','attention']},

    {id:'button-lift',name:'Button Lift',category:'BUTTON',kind:'buttonLift',demo:'button',desc:'ボタンが手前へ浮く、王道のホバー反応。',tags:['hover','button'],purpose:['clean']},
    {id:'button-press',name:'Button Press',category:'BUTTON',kind:'buttonPress',demo:'button',desc:'押し込まれる感覚を縮小と影で表現。',tags:['press','tap'],purpose:['clean']},
    {id:'button-shine',name:'Button Shine',category:'BUTTON',kind:'buttonShine',demo:'button',desc:'表面を光が横切るCTA向けモーション。',tags:['shine','CTA'],purpose:['premium','attention']},
    {id:'button-wiggle',name:'Button Wiggle',category:'BUTTON',kind:'wiggle',demo:'button',desc:'小刻みな回転で「ここを押して」を伝える。',tags:['wiggle','attention'],purpose:['kids','attention']},
    {id:'button-pulse',name:'Button Pulse',category:'BUTTON',kind:'buttonPulse',demo:'button',desc:'外周へ柔らかな波紋が広がるような強調。',tags:['pulse','CTA'],purpose:['attention']},
    {id:'button-squash',name:'Squash & Release',category:'BUTTON',kind:'squash',demo:'button',desc:'横に少し潰れて戻る、触感のある反応。',tags:['squash','tap'],purpose:['kids']},
    {id:'button-nudge',name:'Arrow Nudge',category:'BUTTON',kind:'nudge',demo:'button',desc:'ボタン全体が少し前へ進み、次の行動を促す。',tags:['next','導線'],purpose:['attention']},
    {id:'button-glow',name:'Glow Confirm',category:'BUTTON',kind:'glow',demo:'button',desc:'短い発光で操作受付を伝える。',tags:['glow','feedback'],purpose:['success']},

    {id:'card-lift',name:'Card Lift',category:'CARD',kind:'cardLift',demo:'card',desc:'カードが持ち上がる定番インタラクション。',tags:['hover','card'],purpose:['clean']},
    {id:'card-tilt',name:'Card Tilt',category:'CARD',kind:'cardTilt',demo:'card',desc:'軽い3D傾きでカードに奥行きを与える。',tags:['3D','tilt'],purpose:['attention']},
    {id:'card-flip',name:'Card Flip',category:'CARD',kind:'cardFlip',demo:'card',desc:'Y軸回転で裏返るように切り替える。',tags:['flip','3D'],purpose:['kids']},
    {id:'card-pop',name:'Card Pop',category:'CARD',kind:'cardPop',demo:'card',desc:'小さく縮んだ状態から気持ちよく現れる。',tags:['pop','enter'],purpose:['kids','success']},
    {id:'card-slide',name:'Card Slide Settle',category:'CARD',kind:'cardSlide',demo:'card',desc:'横から入り、少し戻って定位置に収まる。',tags:['slide','settle'],purpose:['attention']},
    {id:'card-focus',name:'Card Focus',category:'CARD',kind:'cardFocus',demo:'card',desc:'ぼけたカードが徐々に鮮明になる。',tags:['blur','focus'],purpose:['premium']},
    {id:'card-glow',name:'Card Glow',category:'CARD',kind:'cardGlow',demo:'card',desc:'境界が一瞬光り、選択状態を伝える。',tags:['selected','glow'],purpose:['success']},
    {id:'card-breathe',name:'Card Breathe',category:'CARD',kind:'cardBreathe',demo:'card',desc:'わずかな拡縮で待機中のカードに生命感を出す。',tags:['loop','subtle'],purpose:['clean']},

    {id:'scroll-reveal',name:'Scroll Reveal',category:'SCROLL',kind:'scrollReveal',desc:'スクロール到達を想定した下からの表示。',tags:['scroll','reveal'],purpose:['clean']},
    {id:'scroll-clip',name:'Clip Reveal',category:'SCROLL',kind:'clipReveal',desc:'上から下へクリップが開くように現れる。',tags:['clip','scroll'],purpose:['premium']},
    {id:'scroll-zoom',name:'Scroll Zoom',category:'SCROLL',kind:'scrollZoom',desc:'遠くから近づくように拡大しながら表示。',tags:['zoom','scroll'],purpose:['attention']},
    {id:'scroll-skew',name:'Skew Settle',category:'SCROLL',kind:'skewSettle',desc:'斜めの勢いから水平へ落ち着く。',tags:['skew','dynamic'],purpose:['attention']},
    {id:'scroll-parallax',name:'Parallax Nudge',category:'SCROLL',kind:'parallaxNudge',desc:'奥行き差を感じるゆっくりした縦移動。',tags:['parallax','depth'],purpose:['premium']},
    {id:'scroll-fade',name:'Long Fade',category:'SCROLL',kind:'longFade',desc:'移動量を抑え、ゆっくり透明度だけを上げる。',tags:['fade','quiet'],purpose:['premium','clean']},

    {id:'success-pop',name:'Success Pop',category:'FEEDBACK',kind:'successPop',demo:'feedback',symbol:'✓',desc:'完了直後にチェックが弾んで定着。',tags:['success','complete'],purpose:['success','kids']},
    {id:'success-ring',name:'Success Ring',category:'FEEDBACK',kind:'successRing',demo:'feedback',symbol:'✓',desc:'完了マークが広がる輪とともに現れる。',tags:['success','ring'],purpose:['success']},
    {id:'error-shake',name:'Error Shake',category:'FEEDBACK',kind:'errorShake',demo:'feedback',symbol:'!',desc:'左右シェイクで入力エラーを即座に伝える。',tags:['error','shake'],purpose:['error']},
    {id:'warning-pulse',name:'Warning Pulse',category:'FEEDBACK',kind:'warningPulse',demo:'feedback',symbol:'!',desc:'注意状態を短い拡縮で伝える。',tags:['warning','pulse'],purpose:['error','attention']},
    {id:'loading-spin',name:'Loading Spin',category:'FEEDBACK',kind:'loadingSpin',demo:'feedback',symbol:'↻',desc:'シンプルな回転で処理中を示す。',tags:['loading','spin'],purpose:['loading']},
    {id:'loading-bob',name:'Loading Bob',category:'FEEDBACK',kind:'loadingBob',demo:'feedback',symbol:'•',desc:'上下の小さな往復で軽い待機感を作る。',tags:['loading','bounce'],purpose:['loading','kids']},
    {id:'save-flash',name:'Saved Flash',category:'FEEDBACK',kind:'saveFlash',demo:'feedback',symbol:'✓',desc:'保存完了を短い発光で示し、すぐ静止する。',tags:['save','flash'],purpose:['success']},
    {id:'notify-pop',name:'Notify Pop',category:'FEEDBACK',kind:'notifyPop',demo:'feedback',symbol:'1',desc:'通知バッジが勢いよく現れ、軽く戻る。',tags:['notification','badge'],purpose:['attention']},

    {id:'gradient-drift',name:'Gradient Drift',category:'BACKGROUND',kind:'gradientDrift',demo:'background',desc:'グラデーションがゆっくり流れる背景。',tags:['gradient','ambient'],purpose:['premium']},
    {id:'background-breathe',name:'Ambient Breathe',category:'BACKGROUND',kind:'backgroundBreathe',demo:'background',desc:'背景全体が静かに明暗変化する。',tags:['ambient','subtle'],purpose:['premium','clean']}
  ];

  const categories = ['ALL','TEXT','BUTTON','CARD','ENTER','SCROLL','FEEDBACK','BACKGROUND'];
  const purposes = [
    ['all','すべて'],['premium','高級感'],['attention','目立たせる'],['clean','読みやすく'],['kids','楽しく'],['success','完了を伝える'],['error','注意・エラー'],['loading','待機中']
  ];
  window.MA_DATA = { motions, categories, purposes };
})();
