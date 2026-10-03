// Final native-scroll presentation review and actual loop/playback verification.
import {chromium} from '@playwright/test';
import {mkdir,writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const out='docs/qa/v4/acceptance';await mkdir(out,{recursive:true});
const browser=await chromium.launch({channel:'msedge'});
const page=await browser.newPage({viewport:{width:1920,height:1080}});
const result={status:'RUNNING',errors:[],loops:[],frames:[],checks:[]};
page.on('pageerror',e=>result.errors.push(e.message));
const navigate=async id=>{await page.locator('.chapter-menu summary').click();await page.locator(`.chapter-panel a[href="#${id}"]`).click();await page.waitForTimeout(350);};
try {
 await page.goto(process.env.QA_URL||'http://127.0.0.1:3000',{waitUntil:'networkidle'});
 await page.waitForFunction(()=>document.querySelectorAll('.pin-spacer').length===6);
 assert.equal(await page.locator('source').count(),0);
 assert.equal(await page.evaluate(()=>performance.getEntriesByType('resource').filter(e=>e.name.includes('-poster.webp')).length),0,'Posters below the fold are lazy');
 for(const [chapter,index,name] of [['pratica',1,'lecture'],['em-movimento',0,'gesture'],['em-movimento',1,'practice'],['em-movimento',2,'exchange']]){
  await navigate(chapter);await page.locator(`#${chapter} .scene-header button`).nth(index).click();
  await page.waitForFunction(name=>{const v=document.querySelector(`[data-video="${name}"] video`);return v.readyState>=2&&!v.paused;},name);
  const samples=[];let crossed=false,previous=-1;const duration=await page.locator(`[data-video="${name}"] video`).evaluate(v=>v.duration);
  for(let i=0;i<(duration+2)*5;i++){
   const state=await page.locator(`[data-video="${name}"] video`).evaluate(v=>({time:v.currentTime,paused:v.paused,muted:v.muted}));
   samples.push(state.time);assert.equal(state.paused,false);assert.ok(state.muted);if(previous>state.time+.5)crossed=true;previous=state.time;await page.waitForTimeout(200);
  }
  assert.ok(crossed,`${name} loops across its endpoint`);result.loops.push({name,duration,crossed,samples});
  assert.equal(await page.locator('video').evaluateAll(v=>v.filter(e=>!e.paused).length),1);
  await navigate('conversa');assert.ok(await page.locator('video').evaluateAll(v=>v.every(e=>e.paused)));
 }
 result.checks.push('Four real loops, muted, one active player, all paused outside their chapters');
 // Begin again from the top and traverse the entire presentation with native
 // wheel events. Captures are critiqued separately, not treated as assertions.
 await navigate('inicio');let lastShot=-1000;
 const sample=async()=>{
  const s=await page.evaluate(()=>({y:scrollY,width:innerWidth,height:innerHeight,header:document.querySelector('.chapter-current').textContent,overflow:document.documentElement.scrollWidth>innerWidth+1,players:[...document.querySelectorAll('video')].filter(v=>!v.paused).map(v=>v.closest('[data-video]').dataset.video)}));
  assert.equal(s.overflow,false);assert.ok(s.players.length<=1);
  if(s.y-lastShot>=700){await page.waitForTimeout(250);s.file=`frame-${String(result.frames.length).padStart(2,'0')}.png`;await page.screenshot({path:`${out}/${s.file}`});result.frames.push(s);lastShot=s.y;}
 };
 await sample();const max=await page.evaluate(()=>document.documentElement.scrollHeight-innerHeight);
 while(await page.evaluate(()=>scrollY)<max-1){await page.mouse.wheel(0,140);await page.waitForTimeout(100);await sample();}
 await page.screenshot({path:`${out}/end.png`});result.frames.push({file:'end.png',...await page.evaluate(()=>({y:scrollY,width:innerWidth,height:innerHeight,header:document.querySelector('.chapter-current').textContent}))});
 const observed=[...new Set(result.frames.map(f=>f.header.slice(0,2)))];assert.equal(observed.length,11);result.checks.push('1920×1080: entire presentation slowly traversed again from the top; all eleven chapters observed');
 // Fast native traversal and reverse reconstruct the clean opening.
 await page.mouse.wheel(0,-max);await page.waitForTimeout(650);assert.ok((await page.evaluate(()=>scrollY))<3);
 await page.mouse.wheel(0,max);await page.waitForTimeout(650);await page.mouse.wheel(0,-max);await page.waitForTimeout(650);
 assert.ok(await page.locator('[data-node]').evaluateAll(nodes=>nodes.every(n=>getComputedStyle(n).visibility==='hidden')));
 assert.ok(!(await page.locator('.opening-bridge').evaluate(e=>getComputedStyle(e).clipPath)).includes('100%'),'Bridge returns intact');
 await page.screenshot({path:`${out}/opening-final.png`});result.checks.push('Fast/reverse traversal returns the original mosaic and clean network');
 assert.deepEqual(result.errors,[]);result.status='PASS';
}catch(e){result.status='FAIL';result.failure=e.stack;process.exitCode=1;await page.screenshot({path:`${out}/failure.png`});}
finally{await writeFile(`${out}/results.json`,JSON.stringify(result,null,2));console.log(JSON.stringify({status:result.status,checks:result.checks,loops:result.loops.map(l=>({name:l.name,duration:l.duration,crossed:l.crossed})),frames:result.frames.length,errors:result.errors,failure:result.failure},null,2));await browser.close();}
