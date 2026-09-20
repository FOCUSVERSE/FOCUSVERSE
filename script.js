(() => {
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];

  const cursor = $('.cursor-glow');
  if (cursor && matchMedia('(pointer:fine)').matches) {
    addEventListener('pointermove', e => {
      cursor.animate({left:`${e.clientX}px`,top:`${e.clientY}px`},
        {duration:180,fill:'forwards',easing:'ease-out'});
    });
  } else if (cursor) cursor.style.display='none';

  const reveal = $$('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.animate(
        [{opacity:0,transform:'translateY(28px)'},{opacity:1,transform:'translateY(0)'}],
        {duration:850,easing:'cubic-bezier(.16,1,.3,1)',fill:'forwards'}
      );
      observer.unobserve(entry.target);
    });
  }, {threshold:.12});
  reveal.forEach(el => observer.observe(el));

  $$('.magnetic').forEach(el => {
    if (!matchMedia('(pointer:fine)').matches) return;
    el.addEventListener('pointermove', e => {
      const r=el.getBoundingClientRect();
      const x=e.clientX-r.left-r.width/2, y=e.clientY-r.top-r.height/2;
      el.style.transform=`translate(${x*.07}px,${y*.07}px)`;
    });
    el.addEventListener('pointerleave',()=>el.style.transform='');
  });

  $$('.stage').forEach(btn => btn.addEventListener('click', () => {
    $$('.stage').forEach(x=>x.classList.remove('active'));
    btn.classList.add('active');
    const name = btn.dataset.world || btn.innerText.trim();
    const label = $('#worldName');
    if(label) label.textContent=name;
  }));

  const fallback = {
    latestVersion:'1.0.0',
    android:'https://github.com/FOCUSVERSE/FOCUSVERSE/releases/download/v1.0.0/FOCUSVERSE-v1.0.0.apk',
    windows:'https://github.com/FOCUSVERSE/FOCUSVERSE/releases/download/v1.0.0/FOCUSVERSE-Windows-v1.0.0.zip'
  };

  fetch('./version.json?v='+Date.now(), {cache:'no-store'})
    .then(r=>r.ok?r.json():Promise.reject())
    .then(cfg=>{
      $('#androidDownload').href=cfg.android||fallback.android;
      $('#windowsDownload').href=cfg.windows||fallback.windows;
      $('#version').textContent='v'+String(cfg.latestVersion||fallback.latestVersion).replace(/^v/i,'');
    }).catch(()=>{
      $('#androidDownload').href=fallback.android;
      $('#windowsDownload').href=fallback.windows;
      $('#version').textContent='v'+fallback.latestVersion;
    });

  $$('.navlinks a, .top-cta, .hero a, .footer a').forEach(a=>{
    a.addEventListener('click', e=>{
      const id=a.getAttribute('href');
      if(!id || !id.startsWith('#')) return;
      const target=$(id);
      if(!target) return;
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth',block:'start'});
    });
  });
})();