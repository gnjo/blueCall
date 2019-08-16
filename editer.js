fn.lex=(str)=>{
  let title='',url='',line=0,c=44;
  let a =str.split('\n').forEach((d)=>{
   if( d.charAt(0) === '＃' ) title = d;
   else if(d.charAt(0) === '＠'/* && is.imgurl(d.slice(1))*/) url =d.slice(1);
   line += Math.ceil((d.length+0.1)/c)
  });
  return {t:title,u:url,l:line,s:str}
 }

var edKeydown=_.debounce(_edKeydown,70)

var ic=(url)=>{
 return `
  background-image: url('${url}'), radial-gradient(#00cccc, #101010), repeating-linear-gradient(transparent 0, rgba(0, 0, 0, 0.3) 2.5px, transparent 5px);
`.trim();
}
function _edKeydown(e){
 setTimeout((data)=>{
  let d=fn.lex(data)
  ,isPre=e.target.nodeName.toLowerCase() ==='pre'
  ,frame=e.target.parentElement
  ;
  if(isPre&&d.u){ //image change
   frame.q('.blueCall').style= ic(d.u)
  }else if(!isPre){ //line 
   let num=fn.menum(frame,'body>.codeframe')
   frame.q('h1').textContent=fn.pad(num,3) +d.t
  }
 },0,e.target.textContent)
}