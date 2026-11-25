(function(){
  var header=document.getElementById('header');
  if(header){
    function onScroll(){ header.classList.toggle('scrolled', window.scrollY>40); }
    window.addEventListener('scroll', onScroll, {passive:true}); onScroll();
  }
  // Spotlight: light each work as it enters view
  var works=document.querySelectorAll('.work, .today');
  if('IntersectionObserver' in window && works.length){
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){ e.target.classList.add('lit'); io.unobserve(e.target); }
      });
    }, {threshold:.35});
    works.forEach(function(w){ io.observe(w); });
  } else {
    works.forEach(function(w){ w.classList.add('lit'); });
  }
})();
