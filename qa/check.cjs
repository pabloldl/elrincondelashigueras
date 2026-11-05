const {spawn}=require('node:child_process');
const fs=require('node:fs');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
const root=path.resolve(__dirname,'..');
const browser=spawn('C:/Program Files/Google/Chrome/Application/chrome.exe',['--headless','--disable-gpu','--no-first-run','--no-default-browser-check','--remote-debugging-port=0','--user-data-dir='+path.join(__dirname,'browser-tests'),'about:blank'],{windowsHide:true});
let socket;let seq=0;const pending=new Map();
const delay=ms=>new Promise(r=>setTimeout(r,ms));
function send(method,params={},sessionId){return new Promise((resolve,reject)=>{const id=++seq;pending.set(id,{resolve,reject});socket.send(JSON.stringify({id,method,params,sessionId}));});}
const timeout=setTimeout(()=>{browser.kill();process.exit(1);},60000);
let started=false;
browser.stderr.on('data',async chunk=>{
 const match=chunk.toString().match(/DevTools listening on (ws:\/\/\S+)/);if(!match||started)return;started=true;
 try{
  socket=new WebSocket(match[1]);await new Promise(r=>socket.addEventListener('open',r,{once:true}));
  socket.addEventListener('message',e=>{const m=JSON.parse(e.data);if(pending.has(m.id)){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(m.error):p.resolve(m.result);}});
  const {targetId}=await send('Target.createTarget',{url:'about:blank'});
  const {sessionId}=await send('Target.attachToTarget',{targetId,flatten:true});
  const cmd=(method,params)=>send(method,params,sessionId);
  await cmd('Page.enable');
  const results=[];
  for(const width of [375,390,768,1440,1920]){
   await cmd('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:width<650});
   await cmd('Page.navigate',{url:pathToFileURL(path.join(root,'index.html')).href});await delay(2400);
   const {result}=await cmd('Runtime.evaluate',{expression:`(async()=>{await document.fonts.ready;const nav=document.querySelector('#navigation'),button=document.querySelector('.menu-toggle');const before=nav.classList.contains('is-open');button.click();const opened=nav.classList.contains('is-open')&&button.getAttribute('aria-expanded')==='true';document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape'}));return {width:innerWidth,scrollWidth:document.documentElement.scrollWidth,overflow:document.documentElement.scrollWidth>innerWidth,robots:document.querySelectorAll('meta[name="robots"]').length,menuOpens:opened,menuCloses:!nav.classList.contains('is-open'),buttonVisible:getComputedStyle(button).display!=='none',fontLoaded:document.fonts.check('16px Fraunces'),title:document.title}})()`,awaitPromise:true,returnByValue:true});
   results.push(result.value);if([390,1440].includes(width)){const shot=await cmd('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});fs.writeFileSync(path.join(__dirname,width+'.png'),Buffer.from(shot.data,'base64'));}
  }
  await cmd('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
  await delay(150);
  const reduced=await cmd('Runtime.evaluate',{expression:`({matches:matchMedia('(prefers-reduced-motion: reduce)').matches,animation:getComputedStyle(document.querySelector('.hero-copy')).animationName,hidden:[...document.querySelectorAll('.reveal')].filter(e=>getComputedStyle(e).opacity==='0').length})`,returnByValue:true});
  await cmd('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
  const gallery = await cmd('Runtime.evaluate',{expression:`(async()=>{const links=[...document.querySelectorAll('.photo-link')];await Promise.all(links.map(link=>{const img=link.querySelector('img');img.loading='eager';return img.decode().catch(()=>{});}));links[0].click();const viewer=document.querySelector('.photo-viewer');await viewer.querySelector('img').decode();const opened=viewer.open&&viewer.querySelector('img').naturalWidth>0;viewer.querySelector('.viewer-close').click();await new Promise(resolve=>setTimeout(resolve,50));return {photos:links.length,allLoaded:links.every(link=>link.querySelector('img').naturalWidth>0),viewerOpens:opened,viewerCloses:!viewer.open,scrollUnlocked:!document.documentElement.classList.contains('viewer-open')};})()`,awaitPromise:true,returnByValue:true});
  await delay(100);
  const full=await cmd('Page.captureScreenshot',{format:'png',captureBeyondViewport:true});fs.writeFileSync(path.join(__dirname,'full.png'),Buffer.from(full.data,'base64'));
  const output={testedAt:new Date().toISOString(),browser:'Chrome headless (Windows)',results,reducedMotion:reduced.result.value,gallery:gallery.result.value};fs.writeFileSync(path.join(__dirname,'results.json'),JSON.stringify(output,null,2));console.log(JSON.stringify(output,null,2));
  await send('Browser.close');clearTimeout(timeout);socket.close();
 }catch(error){console.error(error);browser.kill();clearTimeout(timeout);process.exitCode=1;}
});
