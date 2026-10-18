(function(){
  // 原調 C の4小節（3小節目は2つ）。[原調からの音程, 種類]
  var bars=[[[9,'m9']],[[2,'m9']],[[7,'7sus4'],[7,'13']],[[0,'maj9']]];
  var root=document.getElementById('bars'); if(!root){return;}
  var lyrics=JSON.parse(root.getAttribute('data-lyrics'));
  var keyLabel=root.getAttribute('data-key'), origLabel=root.getAttribute('data-orig');
  // 長調の表示キーと優先方式（アプリの仕様書の表と同じ）
  var keys=['C','D♭','D','E♭','E','F','F♯','G','A♭','A','B♭','B'];
  var sharpKey={0:1,2:1,4:1,6:1,7:1,9:1,11:1};
  var sharp=['C','C♯','D','D♯','E','F','F♯','G','G♯','A','A♯','B'];
  var flat=['C','D♭','D','E♭','E','F','G♭','G','A♭','A','B♭','B'];
  var off=0, keyEl=document.getElementById('key');
  function spell(pc,k){ if(k===6&&pc===5){return 'E♯';} return (sharpKey[k]?sharp:flat)[pc]; }
  function name(pc,k){var n=spell(pc,k);return n.length>1?n.charAt(0)+'<span class="acc">'+n.charAt(1)+'</span>':n;}
  function render(flash){
    var k=(off%12+12)%12;
    keyEl.textContent=keyLabel+' '+keys[k]+(k===0?'':origLabel);
    root.innerHTML=bars.map(function(b,i){return '<div class="cell"><div class="bar">'+b.map(function(c){
      return '<span class="ch'+(flash?' flash':'')+'">'+name((c[0]+k)%12,k)+'<sub>'+c[1]+'</sub></span>';}).join('')+'</div><div class="ly">'+lyrics[i]+'</div></div>';}).join('');
    if(flash){setTimeout(function(){Array.prototype.forEach.call(root.querySelectorAll('.ch'),function(x){x.classList.remove('flash');});},350);}
  }
  document.getElementById('up').onclick=function(){off=(off+1)%12;render(true);};
  document.getElementById('down').onclick=function(){off=(off+11)%12;render(true);};
  document.getElementById('reset').onclick=function(){off=0;render(true);};
  render(false);
})();
