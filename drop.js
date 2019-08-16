//wait the freeze

fn.upImgur=function(base64,cid){
  //console.log(base64)
  //base64 is data:image/jpeg...,....
  let blob = fn.toBlob(base64)
  ,c =cid
  ,formData = new FormData()
  formData.append('type', 'file')
  formData.append('image', blob)
  return fetch('https://api.imgur.com/3/upload.json', {
   method: 'POST',
   headers: {
    Accept: 'application/json',
    Authorization: `Client-ID ${c}` // imgur specific
   },
   body: formData
  })
   .then(d=>d.json())
 }
 fn.img=function(d){
  let el=fn.ce('img'); el.src=d||''; 
  el.onclick=function(){fn.copy(this.src)};
  return el
 }
 fn.stock=function(key,type,data){
  let gi=()=>{return (localStorage.getItem(key) )? JSON.parse(localStorage.getItem(key)) :[] }
  ,si=(d)=>{return localStorage.setItem(key, JSON.stringify(d)) }
  ;
  if(type==='save'){let a =gi(); a.push(data); return si(a)}
  else if(type==='allsave'){ return si(data) }
  else{return gi()} 
 }
 fn.deleteMe=function(el,caller){
  let is={}; 
  is.element=function(o){return !!(o && o.nodeType === 1)}
  ;
  if(!is.element(el)){
   console.log('delemteMe not element',el)
   return el;
  }
  el.setAttribute('tabindex','-1') //interactive-able
  el.style.outline='none'
  el.onkeydown=(e)=>{
   if(e.which===46){
    e.target.remove();//46 delete
    caller(e)
   }
  }
  return el;
 }  

var dnd=(caller=>function(ev){
 let target=ev.target
 let type=ev.type,mark ='drag'  //mark is .drag the custom class
 ;
 if(type!='paste'){
  ev.stopPropagation();
  ev.preventDefault();
 }
 if(type==='drop'||type==='paste'){
  //this paste hack, allow the chrome only.
  const flg= (type==='paste')
  ,files=(flg)?ev.clipboardData.items:ev.target.files||ev.dataTransfer.files
  ;
  ;[].slice.call(files)
  //.filter(f=>f.type.match('*.*')) 
  //.slice(0,10) //10 is limit
   .map((f)=>{
   let r=new FileReader(); 
   r.onloadend=(function(f){
    return function(ev){
     ev.target.file=f/**/ ;
     caller(ev)
    };
   })(f);

   if(flg&&f.kind ==='string'){
    var _f=JSON.parse(JSON.stringify({kind:f.kind,type:f.type}))
    return f.getAsString(function(str) {
     ev.target.result=str; ev.target.file=_f; caller(ev);
    });
   }    
   r.readAsDataURL((flg)?f.getAsFile():f); 
  })
  ;
  target.classList.remove(mark)
  return;
 }
 if(type==='dragover'){ target.classList.add(mark);ev.dataTransfer.dropEffect = 'copy';return}
 if(type==='dragleave'){ target.classList.remove(mark);return}
})

var _dnd=dnd(caller)
// ;['onpaste','ondragover','ondrop','ondragleave'].forEach(d=>el[d]=_dnd)
// return el; 
//onpaste ="_dnd(event)" ondragover="_dnd(event)" ondrop="_dnd(event)" ondragleave="_dnd(event)"

let cid='62b4efa067f48c6'
,im=((base64)=>fn.upImgur(base64,cid))
;//double load check

;
function caller(e){
 let imghead='data:image'
 ,cnk=e.target.result.slice(0,imghead.length)
 ;
 if(!cnk===imghead) return console.log('not image')
 let calc=(d)=>{
  d.data.link; return d.data.link;
  console.log(e.target)
 }
 ;
 imgc(e.target.result).fit({w:300})
  .then(im).then(calc)
 ;
}
;