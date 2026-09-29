(function(){
  var btn=document.getElementById('copy'),toast=document.getElementById('toast'),mail=document.getElementById('email');
  function selectMail(){var r=document.createRange();r.selectNodeContents(mail);var s=window.getSelection();s.removeAllRanges();s.addRange(r);}
  btn.addEventListener('click',function(){
    var text=mail.textContent.trim();
    var done=function(){toast.textContent='Mail copiado';setTimeout(function(){toast.textContent='';},2200);};
    var fail=function(){selectMail();toast.textContent='Mail seleccionado, copialo con Ctrl+C';};
    try{navigator.clipboard.writeText(text).then(done,fail);}catch(e){fail();}
  });
})();

(function(){
  var tabs=document.querySelectorAll('.tab'),tiles=document.querySelectorAll('.tile');
  tabs.forEach(function(t){t.addEventListener('click',function(){
    var c=t.dataset.cat;
    tabs.forEach(function(x){x.setAttribute('aria-pressed',x===t?'true':'false');});
    tiles.forEach(function(el){var show=c==='todos'||el.dataset.cat===c;el.hidden=!show;el.classList.remove('in');if(show){void el.offsetWidth;el.classList.add('in');}});
  });});
})();

(function(){
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  if(window.CSS&&CSS.supports('animation-timeline: view()'))return;
  var bar=document.querySelector('.progress');
  function onScroll(){var h=document.documentElement,max=h.scrollHeight-h.clientHeight;if(bar)bar.style.transform='scaleX('+(max>0?h.scrollTop/max:0)+')';}
  addEventListener('scroll',onScroll,{passive:true});onScroll();
  if(!('IntersectionObserver' in window))return;
  document.documentElement.classList.add('io');
  var els=document.querySelectorAll('.sec-head,.status,.project,.tile,.tabs,.extra,.edu > div,.contact');
  var io=new IntersectionObserver(function(entries){entries.forEach(function(e){
    if(e.isIntersecting){e.target.classList.add('shown');e.target.classList.remove('pending');io.unobserve(e.target);}
  });},{rootMargin:'0px 0px -8% 0px'});
  var vh=innerHeight;
  els.forEach(function(el,i){
    if(el.getBoundingClientRect().top<vh)return;
    el.classList.add('pending');
    if(el.classList.contains('tile'))el.style.transitionDelay=(Array.prototype.indexOf.call(el.parentNode.children,el)%4)*60+'ms';
    io.observe(el);
  });
})();
