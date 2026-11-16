/* Portafolio · Santiago Carrillo
   Todo es mejora progresiva: si este archivo no carga, el contenido se ve completo. */
(function(){
  var root=document.documentElement;
  root.classList.add('js');
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  var nativeScroll=!!(window.CSS&&CSS.supports&&CSS.supports('animation-timeline: view()'));

  /* ---------- Navegación: menú hamburguesa ---------- */
  (function(){
    var nav=document.getElementById('nav'),burger=document.getElementById('burger'),links=document.getElementById('nav-links');
    if(!nav||!burger||!links)return;
    function setOpen(open){
      nav.classList.toggle('open',open);
      burger.setAttribute('aria-expanded',open?'true':'false');
      burger.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');
    }
    burger.addEventListener('click',function(){setOpen(!nav.classList.contains('open'));});
    links.addEventListener('click',function(e){if(e.target.closest('a'))setOpen(false);});
    document.addEventListener('keydown',function(e){
      if(e.key==='Escape'&&nav.classList.contains('open')){setOpen(false);burger.focus();}
    });
    document.addEventListener('click',function(e){
      if(nav.classList.contains('open')&&!nav.contains(e.target))setOpen(false);
    });
    window.addEventListener('resize',function(){if(window.innerWidth>900)setOpen(false);});

    function onScroll(){nav.classList.toggle('scrolled',window.scrollY>8);}
    window.addEventListener('scroll',onScroll,{passive:true});onScroll();
  })();

  /* ---------- Navegación: resaltar la sección activa ---------- */
  (function(){
    if(!('IntersectionObserver' in window))return;
    var navLinks=document.querySelectorAll('.nav-links a[href^="#"]');
    var map={};
    navLinks.forEach(function(a){map[a.getAttribute('href').slice(1)]=a;});
    var sections=document.querySelectorAll('main section[id]');
    function setActive(id){
      navLinks.forEach(function(a){
        if(map[id]===a)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current');
      });
    }
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(e){if(e.isIntersecting)setActive(e.target.id);});
    },{rootMargin:'-40% 0px -55% 0px'});
    sections.forEach(function(s){io.observe(s);});
  })();

  /* ---------- Hero: palabra rotativa ---------- */
  (function(){
    var el=document.getElementById('word');
    if(!el||reduce)return;
    var words=(el.getAttribute('data-words')||'').split('|').filter(Boolean);
    if(words.length<2)return;
    var i=0;
    setInterval(function(){
      if(document.hidden)return;
      i=(i+1)%words.length;
      el.classList.remove('swap');
      void el.offsetWidth; // reinicia la animación
      el.textContent=words[i];
      el.classList.add('swap');
    },2600);
  })();

  /* ---------- Contacto: copiar mail ---------- */
  (function(){
    var btn=document.getElementById('copy'),toast=document.getElementById('toast'),mail=document.getElementById('email');
    if(!btn||!toast||!mail)return;
    var timer;
    function say(msg){toast.textContent=msg;clearTimeout(timer);timer=setTimeout(function(){toast.textContent='';},2600);}
    function selectMail(){
      var r=document.createRange();r.selectNodeContents(mail);
      var s=window.getSelection();s.removeAllRanges();s.addRange(r);
    }
    btn.addEventListener('click',function(){
      var text=mail.textContent.trim();
      var fail=function(){selectMail();say('Mail seleccionado, copialo con Ctrl+C');};
      try{navigator.clipboard.writeText(text).then(function(){say('¡Mail copiado!');},fail);}catch(e){fail();}
    });
  })();

  /* ---------- Stack: filtro por categoría ---------- */
  (function(){
    var tabs=document.querySelectorAll('.tab'),tiles=document.querySelectorAll('.tile');
    tabs.forEach(function(t){t.addEventListener('click',function(){
      var c=t.getAttribute('data-cat');
      tabs.forEach(function(x){x.setAttribute('aria-pressed',x===t?'true':'false');});
      tiles.forEach(function(el){
        var show=c==='todos'||el.getAttribute('data-cat')===c;
        el.hidden=!show;
        el.classList.remove('in','pending');
        if(show&&!reduce){void el.offsetWidth;el.classList.add('in');}
      });
    });});
  })();

  /* ---------- Tarjetas: brillo que sigue al cursor ---------- */
  (function(){
    if(!(window.matchMedia&&matchMedia('(hover: hover)').matches))return;
    document.querySelectorAll('.glow').forEach(function(card){
      var tilt=!reduce&&card.classList.contains('tilt');
      var max=card.classList.contains('featured')?3:6; // grados
      card.addEventListener('pointermove',function(e){
        var r=card.getBoundingClientRect();
        var x=e.clientX-r.left,y=e.clientY-r.top;
        card.style.setProperty('--mx',x+'px');
        card.style.setProperty('--my',y+'px');
        if(tilt){
          card.style.setProperty('--ry',((x/r.width-.5)*2*max).toFixed(2)+'deg');
          card.style.setProperty('--rx',((.5-y/r.height)*2*max).toFixed(2)+'deg');
        }
      });
      if(tilt)card.addEventListener('pointerleave',function(){
        card.style.setProperty('--rx','0deg');card.style.setProperty('--ry','0deg');
      });
    });
  })();

  /* ---------- Luz que sigue al cursor + botones con efecto imán ---------- */
  (function(){
    if(reduce||!(window.matchMedia&&matchMedia('(hover: hover) and (pointer: fine)').matches))return;
    var glow=document.querySelector('.cursor-glow');
    if(glow){
      var x=0,y=0,raf=0;
      window.addEventListener('pointermove',function(e){
        x=e.clientX;y=e.clientY;root.classList.add('cursor-on');
        if(!raf)raf=requestAnimationFrame(function(){raf=0;glow.style.setProperty('--cx',x+'px');glow.style.setProperty('--cy',y+'px');});
      },{passive:true});
      document.addEventListener('pointerleave',function(){root.classList.remove('cursor-on');});
    }
    document.querySelectorAll('.magnet').forEach(function(el){
      el.addEventListener('pointermove',function(e){
        var r=el.getBoundingClientRect();
        el.style.setProperty('--tx',((e.clientX-r.left-r.width/2)*.22).toFixed(1)+'px');
        el.style.setProperty('--ty',((e.clientY-r.top-r.height/2)*.35).toFixed(1)+'px');
      });
      el.addEventListener('pointerleave',function(){el.style.setProperty('--tx','0px');el.style.setProperty('--ty','0px');});
    });
  })();

  /* ---------- Parallax: cada capa se mueve a su propia velocidad ---------- */
  (function(){
    if(reduce)return;
    var items=Array.prototype.map.call(document.querySelectorAll('[data-parallax]'),function(el){
      return {el:el,ref:el.parentElement||el,s:parseFloat(el.getAttribute('data-parallax'))||0};
    });
    if(!items.length)return;
    var ticking=false;
    function update(){
      ticking=false;
      var vh=window.innerHeight;
      items.forEach(function(it){
        var r=it.ref.getBoundingClientRect(); // se mide el contenedor para no realimentar el desplazamiento
        if(r.bottom<-vh||r.top>vh*2)return;
        var p=(vh/2-(r.top+r.height/2))*it.s,lim=vh*.6*Math.abs(it.s);
        p=Math.max(-lim,Math.min(lim,p));
        it.el.style.setProperty('--p',p.toFixed(1)+'px');
      });
    }
    function onScroll(){if(!ticking){ticking=true;requestAnimationFrame(update);}}
    window.addEventListener('scroll',onScroll,{passive:true});
    window.addEventListener('resize',onScroll);
    update();
  })();

  /* ---------- Scroll más lento y suave con la rueda del mouse (solo compu) ---------- */
  (function(){
    if(reduce||!(window.matchMedia&&matchMedia('(hover: hover) and (pointer: fine)').matches))return;
    var target=window.scrollY,cur=target,raf=0,EASE=.075,SPEED=.85;
    function maxY(){return root.scrollHeight-window.innerHeight;}
    function scrollsItself(el){ // no se toca la rueda dentro de elementos con su propio scroll
      for(;el&&el!==document.body&&el!==root;el=el.parentElement){
        var oy=getComputedStyle(el).overflowY;
        if((oy==='auto'||oy==='scroll')&&el.scrollHeight>el.clientHeight)return true;
      }
      return false;
    }
    function step(){
      cur+=(target-cur)*EASE;
      if(Math.abs(target-cur)<.5){cur=target;raf=0;}
      window.scrollTo({top:cur,behavior:'instant'});
      if(raf)raf=requestAnimationFrame(step);
    }
    window.addEventListener('wheel',function(e){
      if(e.ctrlKey||e.defaultPrevented||Math.abs(e.deltaX)>Math.abs(e.deltaY)||scrollsItself(e.target))return;
      e.preventDefault();
      var d=e.deltaY*(e.deltaMode===1?40:e.deltaMode===2?window.innerHeight:1);
      if(!raf){target=cur=window.scrollY;}
      target=Math.max(0,Math.min(maxY(),target+d*SPEED));
      if(!raf)raf=requestAnimationFrame(step);
    },{passive:false});
    // Si se scrollea por otro medio (teclado, barra, links), se sincroniza
    window.addEventListener('scroll',function(){if(!raf){target=cur=window.scrollY;}},{passive:true});
  })();

  /* ---------- Niveles tipo videojuego: candados, mapa y aviso ---------- */
  (function(){
    var badges=Array.prototype.slice.call(document.querySelectorAll('.level'));
    if(!badges.length)return;
    var hud={};
    document.querySelectorAll('.hud a').forEach(function(a){hud[a.getAttribute('data-hud')]=a;});
    var fill=document.getElementById('hud-fill'),toast=document.getElementById('level-toast'),ttxt=document.getElementById('level-toast-txt');
    var maxLv=0,timer;
    function sectionOf(b){var s=b.closest('section');return s?s.id:'';}
    function unlockUpTo(n,announce){
      if(n<=maxLv)return;
      badges.forEach(function(b){
        if(+b.getAttribute('data-level')<=n&&!b.classList.contains('unlocked')){
          b.classList.add('unlocked');
          var a=hud[sectionOf(b)];if(a)a.classList.add('unlocked');
        }
      });
      maxLv=n;
      if(fill)fill.style.setProperty('--hud',((n-1)/(badges.length-1)).toFixed(3));
      if(announce&&toast&&ttxt){
        var b=badges.filter(function(x){return +x.getAttribute('data-level')===n;})[0];
        ttxt.textContent='Nivel 0'+n+' · '+b.getAttribute('data-name');
        toast.classList.remove('show');void toast.offsetWidth;toast.classList.add('show');
        clearTimeout(timer);timer=setTimeout(function(){toast.classList.remove('show');},2600);
      }
    }
    if(!('IntersectionObserver' in window)){unlockUpTo(badges.length,false);return;}
    root.classList.add('levels'); // recién ahora los candados se muestran cerrados
    var io=new IntersectionObserver(function(entries){entries.forEach(function(e){
      if(e.isIntersecting){io.unobserve(e.target);unlockUpTo(+e.target.getAttribute('data-level'),true);}
    });},{rootMargin:'0px 0px -25% 0px'});
    badges.forEach(function(b){io.observe(b);});
    // Nivel actual en el mapa
    var cur=new IntersectionObserver(function(entries){entries.forEach(function(e){
      if(!e.isIntersecting)return;
      Object.keys(hud).forEach(function(k){hud[k].classList.toggle('current',k===e.target.id);});
    });},{rootMargin:'-40% 0px -55% 0px'});
    document.querySelectorAll('main section[id]').forEach(function(s){cur.observe(s);});
  })();

  /* ---------- Rutas GET /... que se "decodifican" al aparecer ---------- */
  (function(){
    if(reduce||!('IntersectionObserver' in window))return;
    var chars='abcdefghijklmnopqrstuvwxyz0123456789/_-{}<>';
    function scramble(el){
      var final=el.textContent,start=null,dur=700;
      function frame(t){
        if(start===null)start=t;
        var p=Math.min((t-start)/dur,1),fixed=Math.floor(p*final.length),out='';
        for(var i=0;i<final.length;i++){
          out+=(i<fixed||final[i]==='/')?final[i]:chars[Math.floor(Math.random()*chars.length)];
        }
        el.textContent=out;
        if(p<1)requestAnimationFrame(frame);else el.textContent=final;
      }
      requestAnimationFrame(frame);
    }
    var io=new IntersectionObserver(function(entries){entries.forEach(function(e){
      if(e.isIntersecting){io.unobserve(e.target);scramble(e.target);}
    });},{rootMargin:'0px 0px -15% 0px'});
    document.querySelectorAll('.scramble').forEach(function(el){io.observe(el);});
  })();

  /* ---------- Respaldo de animaciones de scroll (navegadores sin animation-timeline) ---------- */
  (function(){
    if(reduce||nativeScroll)return;

    var bar=document.querySelector('.progress');
    var steps=document.getElementById('steps');
    var stepEls=steps?steps.querySelectorAll('.step'):[];
    var track=document.querySelector('.proc-track');
    var RC={ring:[[.05,.11],[.21,.26],[.36,.41],[.50,.55]],seg:[[.12,.21],[.27,.36],[.42,.50]],on:[.125,.275,.425,.565]};
    var RP={ring:[[.03,.13],[.28,.38],[.53,.63],[.78,.88]],seg:[[.15,.25],[.40,.50],[.65,.75]],on:[.15,.40,.65,.90]};
    if(steps)root.classList.add('io-line');

    var sheet=document.querySelector('.sheet'),heroGrid=document.querySelector('.hero-grid');
    function clamp(v){return v<0?0:v>1?1:v;}
    var ticking=false;
    function update(){
      ticking=false;
      var h=root,max=h.scrollHeight-h.clientHeight,vh0=window.innerHeight;
      if(bar)bar.style.transform='scaleX('+(max>0?clamp(h.scrollTop/max):0)+')';
      if(sheet){var sr=sheet.getBoundingClientRect();sheet.style.setProperty('--enter',clamp((vh0-sr.top)/(vh0*.55)).toFixed(3));}
      if(heroGrid){var hr=heroGrid.getBoundingClientRect();heroGrid.style.setProperty('--leave',clamp(-hr.top/Math.max(hr.height,1)).toFixed(3));}
      if(steps){
        var vh=window.innerHeight,tr=track&&track.getBoundingClientRect(),pinned=tr&&tr.height>vh*1.5,R,p;
        if(pinned){R=RP;p=-tr.top/(tr.height-vh);} // mientras la sección está fija ("contain")
        else{var r=steps.getBoundingClientRect();R=RC;p=(vh-r.top)/(vh+r.height);} // "cover"
        stepEls.forEach(function(st,i){
          st.style.setProperty('--r',clamp((p-R.ring[i][0])/(R.ring[i][1]-R.ring[i][0])).toFixed(3));
          if(i<R.seg.length)st.style.setProperty('--s',clamp((p-R.seg[i][0])/(R.seg[i][1]-R.seg[i][0])).toFixed(3));
          st.classList.toggle('reached',p>=R.on[i]);
        });
      }
    }
    function onScroll(){if(!ticking){ticking=true;requestAnimationFrame(update);}}
    window.addEventListener('scroll',onScroll,{passive:true});
    window.addEventListener('resize',onScroll);
    update();

    if(!('IntersectionObserver' in window))return;
    root.classList.add('io');
    var els=document.querySelectorAll('.reveal,.tile');
    var io=new IntersectionObserver(function(entries){entries.forEach(function(e){
      if(e.isIntersecting){
        e.target.classList.add('shown');
        e.target.classList.remove('pending');
        io.unobserve(e.target);
        setTimeout(function(){e.target.style.transitionDelay='';},900);
      }
    });},{rootMargin:'0px 0px -8% 0px'});
    var vh=window.innerHeight;
    els.forEach(function(el){
      if(el.getBoundingClientRect().top<vh)return; // lo que ya se ve no se oculta
      el.classList.add('pending');
      var parent=el.parentNode;
      if(parent&&(parent.classList.contains('services')||parent.classList.contains('p-grid')||parent.tagName==='OL'||parent.classList.contains('tiles'))){
        var idx=Array.prototype.indexOf.call(parent.children,el);
        el.style.transitionDelay=(idx%4)*80+'ms';
      }
      io.observe(el);
    });
  })();
})();
