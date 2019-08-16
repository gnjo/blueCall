
let a=document.querySelector('#codeframe')
,body=document.body
;
console.log(a)
Array.from({length:8}).map(d=>{
 let el=document.importNode(a.content,true)
 body.appendChild(el)
})

var cmdMap={}
cmdMap['[DEL]']=(e)=>{
 
}
cmdMap['[ADD]']=(e)=>{
 
}
cmdMap['[LST]']=(e)=>{
 
}
cmdMap['[STT]']=(e)=>{
 //stt coding fixed
 let frame=e.target.parentElement.parentElement
 ,now =fn.jpTime()
  frame.name=(frame.name==='coding')?`${now} fixed`:'coding' 
 ;[].slice.call(frame.querySelectorAll('pre,code'))
  .map(el=>{
  if(frame.name==='coding') el.setAttribute('contenteditable',"plaintext-only")
  else el.removeAttribute('contenteditable')
 })
 ;
}

function ctrl(e){
 if(!e.target.nodeName.toLowerCase==='label') return;
 let cmd=e.target.textContent
 ;
 cmdMap[cmd].call(this,e)
}
