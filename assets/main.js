(function(){
  var header=document.getElementById('header');
  if(header){
    function onScroll(){ header.classList.toggle('scrolled', window.scrollY>40); }
    window.addEventListener('scroll', onScroll, {passive:true}); onScroll();
  }

  // Works filters
  var chips=document.querySelectorAll('.chip');
  var cards=document.querySelectorAll('.card');
  chips.forEach(function(chip){
    chip.addEventListener('click', function(){
      chips.forEach(function(c){ c.setAttribute('aria-pressed','false'); });
      chip.setAttribute('aria-pressed','true');
      var f=chip.getAttribute('data-filter');
      cards.forEach(function(card){
        var cats=(card.getAttribute('data-cat')||'').split(' ');
        var show=(f==='all' || cats.indexOf(f)>-1);
        card.style.display=show?'':'none';
      });
    });
  });

  // Lightbox
  var lb=document.getElementById('lightbox');
  if(lb){
    var lbImg=document.getElementById('lbImg'), lbCap=document.getElementById('lbCap'), closeBtn=document.getElementById('closeBtn');
    function openLb(card){
      var img=card.querySelector('img');
      var title=card.querySelector('.title') ? card.querySelector('.title').textContent : '';
      var en=card.querySelector('.en-name') ? card.querySelector('.en-name').textContent : '';
      lbImg.src=img.src; lbImg.alt=img.alt;
      lbCap.innerHTML='';
      lbCap.appendChild(document.createTextNode(title));
      var s=document.createElement('small'); s.textContent=en; lbCap.appendChild(s);
      lb.classList.add('open'); document.body.style.overflow='hidden'; closeBtn.focus();
    }
    function closeLb(){ lb.classList.remove('open'); document.body.style.overflow=''; }
    cards.forEach(function(card){
      card.addEventListener('click', function(){ openLb(card); });
      card.addEventListener('keydown', function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); openLb(card); } });
    });
    closeBtn.addEventListener('click', closeLb);
    lb.addEventListener('click', function(e){ if(e.target===lb) closeLb(); });
    document.addEventListener('keydown', function(e){ if(e.key==='Escape') closeLb(); });
  }
})();
